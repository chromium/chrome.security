---
title: Evaluating Mitigations & Vulnerabilities in Chrome
author: Alex Gough
date: 2024-10-03
source-url: https://security.googleblog.com/2024/10/evaluating-mitigations-vulnerabilities.html
source-blog: Google Security Blog
---

The Chrome Security Team is constantly striving to make it safer to browse the web. We invest in mechanisms to make classes of security bugs impossible, mitigations that make it more difficult to exploit a security bug, and sandboxing to reduce the capability exposed by an isolated security issue. When choosing where to invest it is helpful to consider how bad actors find and exploit vulnerabilities. In this post we discuss several axes along which to evaluate the potential harm to users from exploits, and how they apply to the Chrome browser.

Historically the Chrome Security Team has made major investments and driven the web to be safer. We pioneered browser [sandboxing](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/design/sandbox.md), [site isolation](https://security.googleblog.com/2021/07/protecting-more-with-site-isolation.html) and the [migration to an encrypted web](https://blog.chromium.org/2023/08/towards-https-by-default.html). Today we’re investing in [Rust for memory safety](https://security.googleblog.com/2023/01/supporting-use-of-rust-in-chromium.html), hardening our existing C++ code-base, and improving detection with [GWP-asan](https://chromium.googlesource.com/chromium/src.git/+/HEAD/docs/gwp_asan.md) and [lightweight use-after-free](https://docs.google.com/document/d/1PE2tykvGqBJW3UpNcnOUwDHkkRAuNyfM5EHWDTNQ2VQ/edit?tab=t.0#heading=h.b966ynmd5x2b) (UAF) detection. Considerations of user-harm and attack utility shape our vulnerability [severity guidelines](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/severity-guidelines.md) and payouts for bugs reported through our [Vulnerability Rewards Program](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/security/vrp-faq.md). In the longer-term the Chrome Security Team advocates for operating system improvements like less-capable lightweight processes, less-privileged GPU and NPU containers, improved application isolation, and support for hardware-based isolation, memory safety and flow control enforcement.

When contemplating a particular security change it is easy to fall into a trap of security nihilism. It is tempting to reject changes that do not make exploitation impossible but only make it more difficult. However, the scale we are operating at can still make incremental improvements worthwhile. Over time, and over the population that uses Chrome and browsers based on Chromium, these improvements add up and impose real costs on attackers.

#### Threat Model for Code Execution

Our primary security goal is to make it safe to click on links, so people can feel confident browsing to pages they haven’t visited before. This document focuses on vulnerabilities and exploits that can lead to code execution, but the approach can be applied when mitigating other risks.

Attackers usually have some ultimate goal that can be achieved by executing their code outside of Chrome’s sandboxed or restricted processes. Attackers seek information or capabilities that we do not intend to be available to websites or extensions in the sandboxed renderer process. This might include executing code as the user or with system privileges, reading the memory of other processes, accessing credentials or opening local files. In this post we focus on attackers that start with JavaScript or the ability to send packets to Chrome and end up with something useful. We restrict discussion to memory-safety issues as they are a focus of current hardening efforts.

### User Harm ⇔ Attacker Utility

Chrome Security can scalably reduce risks to users by reducing attackers’ freedom of movement. Anything that makes some class of attackers’ ultimate goals more difficult, or (better) impossible, has value. People using Chrome have multiple, diverse adversaries. We should avoid thinking only about a single adversary, or a specific targeted user, the most advanced-persistent attackers or the most sophisticated people using the web. Chrome’s security protects a spectrum of people from a spectrum of attackers and risks. Focussing on a single bug, vector, attacker or user ignores the scale at which both Chrome and its attackers are operating. Reducing risks or increasing costs for even a fraction of threat scenarios helps someone, somewhere, be safer when using the web.

There are still better exploits for attackers and we should recognise and prioritize efforts that meaningfully prevent or fractionally reduce the availability or utility of the best bugs and escalation mechanisms.

#### Good Bugs and Bad Bugs

All bugs are bad bugs but some bugs are more amenable to exploitation. High value bugs and escalation mechanisms for attackers have some or all of the following attributes:

##### Reliable

An exploit that sometimes crashes, or that when launched only sometimes allows for exploitation, is less useful than one that can be mechanically triggered in all cases. Crashes might lead to detection by the target or by defenders that collect the crashes. Attackers might not always have more than one chance to launch their attacks. Bugs that only surface when different threads must do things in a certain order require more use of resources or time to trigger. If attackers are willing to risk detection by causing a crash they can retry their attacks as Chrome uses a multi-process architecture for cross-domain iframes. Conversely, bugs that only occur when the main browser process shuts down are more difficult to trigger as attackers get a single attempt per session.

##### Low-interaction

Chrome exists so that people can visit websites and click on links so we take that as our baseline for minimal interaction. Exploits that only work if a user performs an action, even if that action might be expected, are more risky for an attacker. This is because the code expressing the bug must be resident on a system for longer, the exploit likely has a lower yield as the action won’t always happen, and the bug is less silent as the user might become suspicious if they seem to be performing actions they are not used to performing. 

##### Ubiquitous

A bug that exists on several platforms and can be exploited the same way everywhere will be more useful than one which is only exploitable on one platform or needs to be ported to several platforms. Bugs that manifest on limited hardware types, or in fewer configurations, are only useful if the attacker has targets using them. Every bug an attacker has to integrate into their exploitation flow requires some ongoing maintenance and testing, so the fewer bugs needed the better. For Chrome some bugs only manifest on Linux, while others are present on all of our platforms. Chrome is one of the most ubiquitous software products today, but some of its libraries are even more widely used, so attackers may invest extra effort in finding and exploiting bugs in third party code that Chrome uses. Bugs that require a user to install an extension or rely on particular hardware configurations are less useful than ones reachable from any web page.

##### Fast

Attacks that require more than a few seconds to set up or execute are less likely to succeed and more likely to be caught. It is more difficult to test and develop a reliable exploit using a slow bug as the compile-test-debug cycle will be stretched.

##### Scriptable

Bugs that require an exploit to perform grooming or state manipulation to succeed are more valuable if their environment can be scripted. The closer the scripting is to the bug, the easier it is to control the context in which the bug will be triggered. Bugs deep in a codec, or a race in a thread the attacker does not control, are more difficult to script. Scriptable bugs are more easily integrated into an exploitation flow, while bugs that are not scriptable might only be useful if they can be integrated with a related [weird machine](https://langsec.org/papers/Bratus.pdf). Bugs that are adjacent to a scripting engine like JavaScript are easier to trigger - making some bugs in third party libraries more serious in Chrome than they might be in other contexts. Bugs in a tightly coupled API like WebGPU are easy to script. Chrome extensions can manipulate Chrome’s internal state and user-interface (for example, they can open, close and rearrange tabs), making some user-interaction scriptable.

##### Easy to Test

Attackers need long-term confidence in their exploits, and will want to test them against changing versions of Chrome and the operating system running Chrome. Bugs that can be automatically reproduced in a test environment can be tested easily. Bugs that can only be triggered with user interaction, or after complex network calls, or that require interaction with third-party services are harder to test. They need a complex test environment, or a patched version of Chrome that mimics the environment in a way that triggers the bug. Maintaining this sort of system takes time and resources, making such bugs less attractive. Note that being scriptable relates to the environment of the bug. Scriptable environments lend themselves to easier testing.

##### Silent

Bugs that cause side effects that can be detected are less useful than those which operate without alerting a user, modifying system state, emitting events, or causing repeatable and detectable network traffic. Side effects include metrics, crashes or slowdowns, pop ups & prompts, system logs and artifacts like downloaded files. Side effects might not alert a specific target of an attack as it happens but might lead to later identification of targeted systems. A bug that several groups know about could be detected without the attacker’s knowledge, even if it seems to succeed.

##### Long-lived

Attackers will prefer bugs that are not likely to be fixed or found by others. Analyzing and integrating a bug into an exploitation suite likely involves significant up-front work, and attackers will prefer bugs that are likely to last a long time. Many attackers sell exploits as a subscription service, and their economic model might be disrupted if they need to find bugs at a higher rate. Bugs recently introduced into a product, or that might be found with widely known fuzzing techniques, are likely to be found (and possibly fixed) faster.

##### Targeted

Attackers will try to protect their exploits from discovery and will prefer bugs that can be triggered only when they are confident they will only be exposed to chosen targets. It is relatively easy to fingerprint a web user using cookies, network knowledge and features of the web platform. Removing classes of delivery mechanisms (e.g. no unencrypted HTTP) can make it more difficult to target every exploit.

##### Easy to escalate

Modern browsers do have several mitigations that make it more difficult to exploit some bugs or bug classes. Attackers usually must take the primitives offered by a bug, then control them to achieve a sub-goal like executing arbitrary system calls. Some bugs won’t chain well to a follow-on stage, or might need significant integration effort or tooling to allow a follow-on stage to proceed. The utility of some bugs is related to how well they couple with later escalation or lateral movement mechanisms. Some bugs by themselves are not useful — but can be combined with other bugs to make them reliable or feasible. Many info leaks fit into this category. A stable read-what-where primitive or a way to probe which memory is allocated makes an arbitrary write easier to execute. If a particular escalation technique crops up often in exploit chains or examples it is worth seeing if it can be remediated.

##### Easy to find

This may be counter-intuitive but a bug that is easy to find can be useful until Chrome finds and fixes it and potential targets update. Chrome’s source code is publicly available and attackers can look for recent security or stability fixes and exploit them until the fixes are rolled out (N-days). Fuzzing finds the shallow bugs but does not hit those with even simple state requirements that are still amenable to manual discovery. An attacker may choose to specialize in finding bugs in a particular area that does not otherwise receive much security attention. Finally attackers might introduce the bug themselves in a library (a supply-chain attack).

##### Difficult to find

Some bugs might be easy to find for an attacker because they created the bug, or difficult to find because they are in an under-studied area of the code base, or behind state that is difficult to fuzz. This makes the bug, once found, more valuable as it is likely to be long-lived as other actors will be less likely to find it. Attackers willing to reverse engineer and target closed-source components of Chrome may have access to vulnerabilities that the wider security community are unlikely to discover.

### Attacker Goals & Economics

Some attackers have a business model, others have a budget. Coarsely we worry about attackers that want to make money, and attackers that want to spy on people. Bugs and escalation mechanisms are useful to either group if they are well suited to their way of working. We can evaluate mitigations against different attacker's differing economic models. An unsophisticated actor targeting unsophisticated users might use a widely delivered unreliable attack with a low yield (e.g. encouraging people to run a malicious download). They only need to win a small fraction of the time. Other groups may do limited bug discovery but instead take short-lived, already-fixed bugs and integrate them into exploit kits. Some attackers could be modeled as having an infinite budget but they will still choose the cheapest most reliable mechanism to achieve their goals. The deprecation of Flash and the subsequent move to exploiting v8 perhaps best illustrates this.

When deploying mitigations or removing attack-surface we are ultimately trying to hinder adversaries from achieving their goals. Some attackers might make different decisions if the economics of their operations are changed by reducing the yield of the bugs that enable their activities. Some actors may be willing to devote substantial resources to maintaining a capability to target people using the web - and we can only speculate about their response to changes we introduce. For these sophisticated attackers, removing whole classes of vulnerabilities or escalation mechanisms will be more effective.

### Avoid linear thinking

We perceive successful exploits as chains — linear steps that start with a bug, proceed through various escalation stages, and achieve an attacker’s immediate goal of code execution or data access outside the sandboxed renderer process. We even ask for such chains through our Vulnerability Rewards Programme. For example, a JS type confusion allows for an out of bounds read/write in the v8 sandbox, a v8 sandbox escape bug allows read/write in the renderer, overwriting a JIT write/execute region allows for arbitrary code execution, and calls to system or browser APIs lead to a browser sandbox escape. The attacker starts with the ability to serve JavaScript to a Chrome user, and ends up with unconstrained code execution on the user’s device, presumably to later use this to meet their higher-level goals. Even useful models of layered defense tend to focus on limited paths that trigger an incident (like the single arrow often drawn piercing [slices of swiss-cheese](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1298298/)).

In reality the terrain presented to the universe of attackers is a complex web of latent possibilities, some known to some, and many yet to be discovered. This is more than ‘attackers think in graphs’, as we must acknowledge that a defensive intervention can succeed even if it does not prevent every attacker from reaching every possible person they wish to exploit.

## Conclusion

It is tempting to reject a mitigation or removal of attack surface on the basis that attackers can simply find another way to achieve their goals. However this mindset presumes the most sophisticated attackers and their most desired targets. Our frame of analysis should be wider. We must recognize that many attackers have limited capability and expertise. Some may graft N-days onto red team tools. Some may have an expert or an exploit pipeline that performs well on a small subset of the Chrome codebase, but need training or more resources to obtain useful bugs if their current domain is taken away. Some will sell exploit kits that need rewriting if an escalation mechanism is removed. Previously reliable exploits might become less reliable, or take longer. Making life more difficult for attackers helps protect people using Chrome.

Although we argue that we should not “give up” on mitigations for escalation paths, it is still clearly more important to implement mitigations that make it impossible or difficult to trigger wide classes of initial vulnerabilities, or bypass a significant fraction of mitigations. Reported attacks always start with an initial vulnerability so it is tempting to invest all of our effort there, but this neglects beneficial interventions later in the attack mesh. Reductions in attacker utility translate to increases in attacker costs and reduction in aggregate risk.

A mitigation or bug-reduction mechanism that affects any of the axes of utility outlined above has some value to some of the people using Chrome. 

### Resources

* [Project Zero: What is a "good" memory corruption vulnerability?](https://googleprojectzero.blogspot.com/2015/06/what-is-good-memory-corruption.html) 
* [An Introduction to Exploit Reliability](https://blog.isosceles.com/an-introduction-to-exploit-reliability/)  & [What is a "good" Linux Kernel bug?](https://blog.isosceles.com/what-is-a-good-linux-kernel-bug/) (Isosceles)
* [Zero Day Markets with Mark Dowd](https://securitycryptographywhatever.com/2024/06/24/mdowd/) (Security Cryptography Whatever podcast)
* Escaping the Sandbox (Chrome and Adobe Pdf Reader) on Windows, Zer0Con 2024, Zhiniang Peng, R4nger, Q4n
* [Exploring Memory Safety in Critical Open Source Projects](https://www.cisa.gov/resources-tools/resources/exploring-memory-safety-critical-open-source-projects) (CISA.gov)