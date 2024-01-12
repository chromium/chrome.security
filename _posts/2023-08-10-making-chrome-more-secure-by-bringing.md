---
title: Making Chrome more secure by bringing Key Pinning to Android
author: David Adrian, Joe DeBlasio and Carlos Joan Rafael Ibarra Lopez
date: 2023-08-10
source-url: https://security.googleblog.com/2023/08/making-chrome-more-secure-by-bringing.html
source-blog: Google Security Blog
excerpt: 
---

Chrome 106 added support for enforcing key pins on Android by default, bringing Android to parity with Chrome on desktop platforms. But what is key pinning anyway?

One of the reasons Chrome implements key pinning is the "[rule of two](https://chromium.googlesource.com/chromium/src/+/master/docs/security/rule-of-2.md)". This rule is part of Chrome's holistic secure development [process](https://security.googleblog.com/2023/07/a-look-at-chromes-security-review.html). It says that when you are writing code for Chrome, you can pick no more than two of: code written in an unsafe language, processing untrustworthy inputs, and running without a sandbox. This blog post explains how key pinning and the rule of two are related.

**The Rule of Two**

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkMCAZIV-7_1mjIhy60O5r_rMLsVIuYaojpukxs79U78aJZyMLGyIIA_0B_Ead2UNrzer1ij6etVoV9wuLzih5Izndu44rd-HEyOh3SsSEc1CKLfqaTxp43UJDewbIIbVdO2HLmQM10BlFpljOOCBxlDw0rPf-zA1BhRrxoO74ZHgcJB2lmb15Hbg78aJB/s1600/image1.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkMCAZIV-7_1mjIhy60O5r_rMLsVIuYaojpukxs79U78aJZyMLGyIIA_0B_Ead2UNrzer1ij6etVoV9wuLzih5Izndu44rd-HEyOh3SsSEc1CKLfqaTxp43UJDewbIIbVdO2HLmQM10BlFpljOOCBxlDw0rPf-zA1BhRrxoO74ZHgcJB2lmb15Hbg78aJB/s1600/image1.png)

Chrome is primarily written in the C and C++ languages, which are vulnerable to memory safety bugs. Mistakes with pointers in these languages can lead to memory being misinterpreted. Chrome invests in an ever-stronger multi-process architecture built on sandboxing and site isolation to help defend against memory safety problems. Android-specific features can be written in Java or Kotlin. These languages are memory-safe in the common case. Similarly, we're working on adding support to [write Chrome code in Rust](https://security.googleblog.com/2023/01/supporting-use-of-rust-in-chromium.html), which is also memory-safe.

Much of Chrome is [sandboxed](https://blog.chromium.org/2008/10/new-approach-to-browser-security-google.html), but the sandbox still requires a core high-privilege "broker" process to coordinate communication and launch sandboxed processes. In Chrome, the broker is the [browser process](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/design/sandbox.md). The browser process is the source of truth that allows the rest of Chrome to be sandboxed and coordinates communication between the rest of the processes.

If an attacker is able to craft a malicious input to the browser process that exploits a bug and allows the attacker to achieve remote code execution (RCE) in the browser process, that would effectively give the attacker full control of the victim's Chrome browser and potentially the rest of the device. Conversely, if an attacker achieves RCE in a sandboxed process, such as a renderer, the attacker's capabilities are extremely limited. The attacker cannot reach outside of the sandbox unless they can additionally exploit the sandbox itself.

Without sandboxing, which limits the actions an attacker can take, and without memory safety, which removes the ability of a bug to disrupt the intended control flow of the program, the rule of two requires that the browser process does not handle untrustworthy inputs. The relative risks between sandboxed processes and the browser process are why the browser process is only allowed to parse trustworthy inputs and specific IPC messages.

Trustworthy inputs are defined extremely strictly: A "trustworthy source" means that Chrome can prove that the data comes from Google. Effectively, this means that in situations where the browser process needs access to data from external sources, it must be read from Google servers. We can cryptographically prove that data came from Google servers if that data comes from:

-   The [component updater](https://chromium.googlesource.com/chromium/src/+/lkgr/components/component_updater/README.md) (Omaha)
-   The [variations framework](https://developer.chrome.com/docs/web-platform/chrome-variations/) (Finch)
-   A pinned HTTPS server

The component updater and the variations framework are services specific to Chrome used to ship data-only updates and configuration information. These services both use asymmetric cryptography to authenticate their data, and the public key used to verify data sent by these services is shipped in Chrome.

However, Chrome is a feature-filled browser with many different use cases, and many different features beyond just updating itself. Certain features, such as Sign-In and the Discover Feed, need to communicate with Google. For features like this, that communication can be considered trustworthy if it comes from a pinned HTTPS server.

When Chrome connects to an HTTPS server, the server says "a 3rd party you trust (a certification authority; CA) has vouched for my identity." It does this by presenting a certificate issued by a trusted certification authority. Chrome verifies the certificate before continuing. The modern web necessarily has a lot of CAs, all of whom can provide authentication for any website. To further ensure that the Chrome browser process is communicating with a trustworthy Google server we want to verify something more: whether a *specific* CA is vouching for the server. We do this by building a map of sites → expected CAs directly into Chrome. We call this *key pinning*. We call the map the *pin set*.

**What is Key Pinning?**

Key pinning was born as a defense against real attacks seen in the wild: attackers who can trick a CA to issue a seemingly-valid certificate for a server, and then the attacker can impersonate that server. This [happened to Google](https://security.googleblog.com/2011/08/update-on-attempted-man-in-middle.html) in 2011, when the DigiNotar certification authority was compromised and used to issue malicious certificates for Google services. To defend against this risk, Chrome contains a pin set for all Google properties, and we only consider an HTTPS input trustworthy if it's authenticated using a key in this pin set. This protects against malicious certificate issuance by third parties.

Key pinning can be brittle, and is rarely worth the risks. Allowing the pin set to get out of date can lead to locking users out of a website or other services, potentially permanently. Whenever pinning, it's important to have safety-valves such as not enforcing pinning (i.e. failing open) when the pins haven't been updated recently, including a "backup" key pin, and having fallback mechanisms for bootstrapping. It's hard for individual sites to manage all of these mechanisms, which is why [dynamic pinning over HTTPS (HPKP)](https://datatracker.ietf.org/doc/html/rfc7469) was [deprecated](https://groups.google.com/a/chromium.org/g/blink-dev/c/he9tr7p3rZ8/m/eNMwKPmUBAAJ). Key pinning is still an important tool for some use cases, however, where there's high-privilege communication that needs to happen between a client and server that are operated by the same entity, such as web browsers, automatic software updates, and package managers.

**Security Benefits of Key Pinning in Chrome, Now on Android**

By pinning in Chrome, we can protect users from CA compromise. We take steps to prevent an out-of-date pinset from unnecessarily blocking users from accessing Google or Google's services. As both a browser vendor and site operator, however, we have additional tools to ensure we keep our pin sets up to date---if we use a new key or a new domain, we can add it to the pin set in Chrome at the same time. In our original implementation of pinning, the pin set is directly compiled into Chrome and updating the pin set requires updating the entire Chrome binary. To make sure that users of old versions of Chrome can still talk to Google, pinning isn't enforced if Chrome detects that it is more than 10 weeks old.

Historically, Chrome enforced the age limit by comparing the current time to the build timestamp in the Chrome binary. Chrome did not enforce pinning on Android because the build timestamp on Android wasn't always reflective of the age of the Chrome pinset, which meant that the chance of a false positive pin mismatch was higher.

Without enforcing pins on Android, Chrome was limiting the ways engineers could build features that comply with the rule of two. To remove this limitation, we built an improved mechanism for distributing the built-in pin set to Chrome installs, including Android devices. Chrome still contains a built-in pin set compiled into the binary. However, we now additionally distribute the pin set via the component updater, which is a mechanism for Chrome to dynamically push out data-only updates to all Chrome installs without requiring a full Chrome update or restart. The component contains the latest version of the built-in pin set, as well as the certificate transparency log list and the contents of the [Chrome Root Store](https://g.co/chrome/root-policy). This means that even if Chrome is out of date, it can still receive updates to the pin set. The component also includes the timestamp the pin list was last updated, rather than relying on build timestamp.This drastically reduces the false positive risk of enabling key pinning on Android.

After we moved the pin set to component updater, we were able to do a slow rollout of pinning enforcement on Android. We determined that the false positive risk was now in line with desktop platforms, and enabled key pinning enforcement by default since Chrome 106, released in September 2022.

This change has been entirely invisible to users of Chrome. While not all of the changes we make in Chrome are flashy, we're constantly working behind the scenes to keep Chrome as secure as possible and we're excited to bring this protection to Android.