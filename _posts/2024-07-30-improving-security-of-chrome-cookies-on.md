---
title: Improving the security of Chrome cookies on Windows
author: Will Harris
date: 2024-07-30
source-url: https://security.googleblog.com/2024/07/improving-security-of-chrome-cookies-on.html
source-blog: Google Security Blog
---

Cybercriminals using cookie theft [infostealer](https://cloud.google.com/blog/products/identity-security/a-year-in-the-cybersecurity-trenches-with-mandiant-managed-defense) malware continue to pose a risk to the safety and security of our users. We already have a number of initiatives in this area including [Chrome's download protection](https://security.googleblog.com/2024/07/building-security-into-redesigned.html) using Safe Browsing, [Device Bound Session Credentials](https://blog.chromium.org/2024/04/fighting-cookie-theft-using-device.html), and Google's account-based threat detection to flag the use of stolen cookies. Today, we're announcing another layer of protection to make Windows users safer from this type of malware.

Like other software that needs to store secrets, Chrome currently secures sensitive data like cookies and passwords using the strongest techniques the OS makes available to us - on macOS this is the [Keychain services](https://developer.apple.com/documentation/security/keychain_services/), and on Linux we use a system provided wallet such as kwallet or gnome-libsecret. On Windows, Chrome uses the Data Protection API (DPAPI) which protects the data at rest from other users on the system or cold boot attacks. However, the DPAPI does not protect against malicious applications able to execute code as the logged in user - which infostealers take advantage of.

In Chrome 127 we are introducing a new protection on Windows that improves on the DPAPI by providing **Application-Bound (App-Bound) Encryption primitives. Rather than allowing any app running as the logged in user to access this data, Chrome can now encrypt data tied to app identity, similar to how the Keychain operates on macOS.
We will be migrating each type of secret to this new system starting with cookies in Chrome 127. In future releases we intend to expand this protection to passwords, payment data, and other persistent authentication tokens, further protecting users from infostealer malware.
**How it works**

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpjkAClX2VvgsIhLi2zAmvRwVMPEeJqUhqisKHIKxbfGAwh8p8-V7Ixct5azzn_jYfJYo2izWnGcbkVh3cabbCLVQQQsJAJagvFPCFJsx4MibauJqnLVymQYdhdGGc53q3wSJSeTPQ6vyxXosJ-tJRKuaaoV7_J_E2KB9glSZ1m3NSEwEBj-duevgROHlM/s16000/Screenshot%202024-07-26%202.15.06%20PM.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpjkAClX2VvgsIhLi2zAmvRwVMPEeJqUhqisKHIKxbfGAwh8p8-V7Ixct5azzn_jYfJYo2izWnGcbkVh3cabbCLVQQQsJAJagvFPCFJsx4MibauJqnLVymQYdhdGGc53q3wSJSeTPQ6vyxXosJ-tJRKuaaoV7_J_E2KB9glSZ1m3NSEwEBj-duevgROHlM/s1416/Screenshot%202024-07-26%202.15.06%20PM.png)

App-Bound Encryption relies on a privileged service to verify the identity of the requesting application. During encryption, the App-Bound Encryption service encodes the app's identity into the encrypted data, and then verifies this is valid when decryption is attempted. If another app on the system tries to decrypt the same data, it will fail.

Because the App-Bound service is running with system privileges, attackers need to do more than just coax a user into running a malicious app. Now, the malware has to gain system privileges, or inject code into Chrome, something that legitimate software shouldn't be doing. This makes their actions more suspicious to antivirus software -- and more likely to be detected. Our other recent initiatives such as providing [event logs](https://security.googleblog.com/2024/04/detecting-browser-data-theft-using.html) for cookie decryption work in tandem with this protection, with the goal of further increasing the cost and risk of detection to attackers attempting to steal user data.

## Enterprise Considerations

Since malware can bypass this protection by running elevated, enterprise environments that do not grant their users the ability to run downloaded files as Administrator are particularly helped by this protection - malware cannot simply request elevation privilege in these environments and is forced to use techniques such as injection that can be more easily detected by endpoint agents.

App-Bound Encryption strongly binds the encryption key to the machine, so will not function correctly in environments where Chrome profiles roam between multiple machines. We encourage enterprises who wish to support roaming profiles to follow current [best practices](https://support.google.com/chrome/a/answer/7349337). If it becomes necessary, App-Bound encryption can be configured using the new [ApplicationBoundEncryptionEnabled](https://chromeenterprise.google/policies/#ApplicationBoundEncryptionEnabled) policy.

To further help detect any incompatibilities, Chrome emits an event when a failed verification occurs. The Event is ID 257 from 'Chrome' source in the Application log.

## Conclusion

App-Bound Encryption increases the cost of data theft to attackers and also makes their actions far noisier on the system. It helps defenders draw a clear line in the sand for what is acceptable behavior for other apps on the system. As the malware landscape continually evolves we are keen to continue engaging with others in the security community on improving detections and strengthening operating system protections, such as stronger app isolation primitives, for any bypasses.