---
title: Detecting browser data theft using Windows Event Logs
author: Will Harris
date: 2024-04-30
source-url: https://security.googleblog.com/2024/04/detecting-browser-data-theft-using.html
source-blog: Google Security Blog
---

Chromium's sandboxed process model defends well from malicious web content, but there are limits to how well the application can protect itself from malware already on the computer. Cookies and other credentials remain a high value target for attackers, and we are trying to tackle this ongoing threat in multiple ways, including working on web standards like [DBSC](https://blog.chromium.org/2024/04/fighting-cookie-theft-using-device.html) that will help disrupt the cookie theft industry since exfiltrating these cookies will no longer have any value.

Where it is not possible to prevent the theft of credentials and cookies by malware, the next best thing is making the attack more observable by antivirus, endpoint detection agents, or enterprise administrators with basic log analysis tools.

This blog describes one set of signals for use by system administrators or endpoint detection agents that should reliably flag any access to the browser's protected data from another application on the system. By increasing the likelihood of an attack being detected, this changes the calculus for those attackers who might have a strong desire to remain stealthy, and might cause them to rethink carrying out these types of attacks against our users.

**Background**

Chromium based browsers on Windows use the DPAPI (Data Protection API) to secure local secrets such as cookies, password etc. against theft. DPAPI protection is based on a key derived from the user's login credential and is designed to protect against unauthorized access to secrets from other users on the system, or when the system is powered off. Because the DPAPI secret is bound to the logged in user, it cannot protect against local malware attacks --- malware executing as the user or at a higher privilege level can just call the same APIs as the browser to obtain the DPAPI secret.

Since 2013, Chromium has been applying the CRYPTPROTECT_AUDIT flag to DPAPI calls to request that an audit log be generated when decryption occurs, as well as tagging the data as being owned by the browser. Because all of Chromium's encrypted data storage is backed by a DPAPI-secured key, any application that wishes to decrypt this data, including malware, should always reliably generate a clearly observable event log, which can be used to detect these types of attacks.

There are three main steps involved in taking advantage of this log:

1.  Enable logging on the computer running Google Chrome, or any other Chromium based browser.
2.  Export the event logs to your backend system.
3.  Create detection logic to detect theft.

This blog will also show how the logging works in practice by testing it against a python password stealer.

**Step 1: Enable logging on the system**

DPAPI events are logged into two places in the system. Firstly, there is the [4693](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4693) event that can be logged into the Security Log. This event can be enabled by turning on "Audit DPAPI Activity" and the steps to do this are described [here](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/audit-dpapi-activity), the policy itself sits deep within Security Settings -> Advanced Audit Policy Configuration -> Detailed Tracking.

Here is what the 4693 event looks like:

<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"> <System> <Provider Name="Microsoft-Windows-Security-Auditing" Guid="{...}" /> <EventID>4693</EventID> <Version>0</Version> <Level>0</Level> <Task>13314</Task> <Opcode>0</Opcode> <Keywords>0x8020000000000000</Keywords> <TimeCreated SystemTime="2015-08-22T06:25:14.589407700Z" /> <EventRecordID>175809</EventRecordID> <Correlation /> <Execution ProcessID="520" ThreadID="1340" /> <Channel>Security</Channel> <Computer>DC01.contoso.local</Computer> <Security /> </System> <EventData> <Data Name="SubjectUserSid">S-1-5-21-3457937927-2839227994-823803824-1104</Data> <Data Name="SubjectUserName">dadmin</Data> <Data Name="SubjectDomainName">CONTOSO</Data> <Data Name="SubjectLogonId">0x30d7c</Data> <Data Name="MasterKeyId">0445c766-75f0-4de7-82ad-d9d97aad59f6</Data> <Data Name="RecoveryReason">0x5c005c</Data> <Data Name="RecoveryServer">DC01.contoso.local</Data> <Data Name="RecoveryKeyId" /> <Data Name="FailureId">0x380000</Data> </EventData> </Event>

The issue with the 4693 event is that while it is generated if there is DPAPI activity on the system, it unfortunately does not contain information about which process was performing the DPAPI activity, nor does it contain information about which particular secret is being accessed. This is because the **Execution ProcessID** field in the event will always be the process id of lsass.exe because it is this process that manages the encryption keys for the system, and there is no entry for the description of the data.

It was for this reason that, in recent versions of Windows a new event type was added to help identify the process making the DPAPI call directly. This event was added to the **Microsoft-Windows-Crypto-DPAPI** stream which manifests in the Event Log in the Applications and Services Logs > Microsoft > Windows > Crypto-DPAPI part of the Event Viewer tree.

The new event is called **DPAPIDefInformationEvent** and has id 16385, but unfortunately is only emitted to the Debug channel and by default this is not persisted to an Event Log, unless Debug channel logging is enabled. This can be accomplished by enabling it directly in powershell:

$log = ` New-Object System.Diagnostics.Eventing.Reader.EventLogConfiguration ` Microsoft-Windows-Crypto-DPAPI/Debug $log.IsEnabled = $True $log.SaveChanges()

Once this log is enabled then you should start to see 16385 events generated, and these will contain the real process ids of applications performing DPAPI operations. Note that 16385 events are emitted by the operating system even for data not flagged with CRYPTPROTECT_AUDIT, but to identify the data as owned by the browser, the data description is essential. 16385 events are described later.

You will also want to enable [Audit Process Creation](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/audit-process-creation) in order to be able to know a current mapping of process ids to process names --- more details on that later. You might want to also consider enabling logging of [full command lines](https://learn.microsoft.com/en-gb/windows-server/identity/ad-ds/manage/component-updates/command-line-process-auditing).

**Step 2: Collect the events**

The events you want to collect are:

-   From Security log:

-   [4688](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4688): "A new process was created."

-   From Microsoft-Windows-Crypto-DPAPI/Debug log: (enabled above)

-   16385: "DPAPIDefInformationEvent"

These should be collected from all workstations, and persisted into your enterprise logging system for analysis.

**Step 3: Write detection logic to detect theft.**

With these two events is it now possible to detect when an unauthorized application calls into DPAPI to try and decrypt browser secrets.

The general approach is to generate a map of process ids to active processes using the 4688 events, then every time a 16385 event is generated, it is possible to identify the currently running process, and alert if the process does not match an authorized application such as Google Chrome. You might find your enterprise logging software can already keep track of which process ids map to which process names, so feel free to just use that existing functionality.

Let's dive deeper into the events.

A 4688 event looks like this - e.g. here is Chrome browser launching from explorer:

<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"> <System> <Provider Name="Microsoft-Windows-Security-Auditing" Guid="{...}" /> <EventID>4688</EventID> <Version>2</Version> <Level>0</Level> <Task>13312</Task> <Opcode>0</Opcode> <Keywords>0x8020000000000000</Keywords> <TimeCreated SystemTime="2024-03-28T20:06:41.9254105Z" /> <EventRecordID>78258343</EventRecordID> <Correlation /> <Execution ProcessID="4" ThreadID="54256" /> <Channel>Security</Channel> <Computer>WIN-GG82ULGC9GO.contoso.local</Computer> <Security /> </System> <EventData> <Data Name="SubjectUserSid">S-1-5-18</Data> <Data Name="SubjectUserName">WIN-GG82ULGC9GO$</Data> <Data Name="SubjectDomainName">CONTOSO</Data> <Data Name="SubjectLogonId">0xe8c85cc</Data> <Data Name="NewProcessId">0x17eac</Data> <Data Name="NewProcessName">C:\Program Files\Google\Chrome\Application\chrome.exe</Data> <Data Name="TokenElevationType">%%1938</Data> <Data Name="ProcessId">0x16d8</Data> <Data Name="CommandLine">"C:\Program Files\Google\Chrome\Application\chrome.exe" </Data> <Data Name="TargetUserSid">S-1-0-0</Data> <Data Name="TargetUserName">-</Data> <Data Name="TargetDomainName">-</Data> <Data Name="TargetLogonId">0x0</Data> <Data Name="ParentProcessName">C:\Windows\explorer.exe</Data> <Data Name="MandatoryLabel">S-1-16-8192</Data> </EventData> </Event>

The important part here is the **NewProcessId**, in hex **0x17eac **which is **97964**.

A 16385 event looks like this:

<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"> <System> <Provider Name="Microsoft-Windows-Crypto-DPAPI" Guid="{...}" /> <EventID>16385</EventID> <Version>0</Version> <Level>4</Level> <Task>64</Task> <Opcode>0</Opcode> <Keywords>0x2000000000000040</Keywords> <TimeCreated SystemTime="2024-03-28T20:06:42.1772585Z" /> <EventRecordID>826993</EventRecordID> <Correlation ActivityID="{777bf68d-7757-0028-b5f6-7b775777da01}" /> <Execution ProcessID="1392" ThreadID="57108" /> <Channel>Microsoft-Windows-Crypto-DPAPI/Debug</Channel> <Computer>WIN-GG82ULGC9GO.contoso.local</Computer> <Security UserID="S-1-5-18" /> </System> <EventData> <Data Name="OperationType">SPCryptUnprotect</Data> <Data Name="DataDescription">Google Chrome</Data> <Data Name="MasterKeyGUID">{4df0861b-07ea-49f4-9a09-1d66fd1131c3}</Data> <Data Name="Flags">0</Data> <Data Name="ProtectionFlags">16</Data> <Data Name="ReturnValue">0</Data> <Data Name="CallerProcessStartKey">32651097299526713</Data> <Data Name="CallerProcessID">97964</Data> <Data Name="CallerProcessCreationTime">133561300019253302</Data> <Data Name="PlainTextDataSize">32</Data> </EventData> </Event>

The important parts here are the **OperationType**, the **DataDescription **and the **CallerProcessID**.

For DPAPI decrypts, the **OperationType **will be SPCryptUnprotect.

Each Chromium based browser will tag its data with the product name, e.g. Google Chrome, or Microsoft Edge depending on the owner of the data. This will always appear in the **DataDescription **field, so it is possible to distinguish browser data from other DPAPI secured data.

Finally, the **CallerProcessID **will map to the process performing the decryption. In this case, it is 97964 which matches the process ID seen in the 4688 event above, showing that this was likely Google Chrome decrypting its own data! Bear in mind that since these logs only contain the path to the executable, for a full assurance that this is actually Chrome (and not malware pretending to be Chrome, or malware injecting into Chrome), additional protections such as removing administrator access, and application allowlisting could also be used to give a higher assurance of this signal. In recent versions of Chrome or Edge, you might also see logs of decryptions happening in the elevation_service.exe process, which is another legitimate part of the browser's data storage.

To detect unauthorized DPAPI access, you will want to generate a running map of all processes using 4688 events, then look for 16385 events that have a CallerProcessID that does not match a valid caller -- Let's try that now.

**Testing with a python password stealer**

We can test that this works with a public script to decrypt passwords taken from [a public blog](https://www.geeksforgeeks.org/how-to-extract-chrome-passwords-in-python/). It generates two events, as expected:

Here is the 16385 event, showing that a process is decrypting the "Google Chrome" key.

<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"> <System> < ... > <EventID>16385</EventID> < ... > <TimeCreated SystemTime="2024-03-28T20:28:13.7891561Z" /> < ... > </System> <EventData> <Data Name="OperationType">SPCryptUnprotect</Data> <Data Name="DataDescription">Google Chrome</Data> < ... > <Data Name="CallerProcessID">68768</Data> <Data Name="CallerProcessCreationTime">133561312936527018</Data> <Data Name="PlainTextDataSize">32</Data> </EventData> </Event>

Since the data description being decrypted was "Google Chrome" we know this is an attempt to read Chrome secrets, but to determine the process behind 68768 (0x10ca0), we need to correlate this with a 4688 event.

Here is the corresponding 4688 event from the Security Log (a process start for python3.exe) with the matching process id:

<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"> <System> < ... > <EventID>4688</EventID> < ... > <TimeCreated SystemTime="2024-03-28T20:28:13.6527871Z" /> < ... > </System> <EventData> < ... > <Data Name="NewProcessId">0x10ca0</Data> <Data Name="NewProcessName">C:\python3\bin\python3.exe</Data> <Data Name="TokenElevationType">%%1938</Data> <Data Name="ProcessId">0xca58</Data> <Data Name="CommandLine">"c:\python3\bin\python3.exe" steal_passwords.py</Data> < ... > <Data Name="ParentProcessName">C:\Windows\System32\cmd.exe</Data> </EventData> </Event>

In this case, the process id matches the python3 executable running a potentially malicious script, so we know this is likely very suspicious behavior, and should trigger an alert immediately! Bear in mind process ids on Windows are not unique so you will want to make sure you use the 4688 event with the timestamp closest, but earlier than, the 16385 event.

**Summary**

This blog has described a technique for strong detection of cookie and credential theft. We hope that all defenders find this post useful. Thanks to Microsoft for adding the DPAPIDefInformationEvent log type, without which this would not be possible.