---
title: Real-time, privacy-preserving URL protection
author: Jasika Bawa, Xinghui Lu, Google Chrome Security; Jonathan Li, Alex Wozniak, Google Safe Browsing
date: 2024-03-14
source-url: https://security.googleblog.com/2024/03/blog-post.html
source-blog: Google Security Blog
excerpt: 
---

For more than 15 years, Google Safe Browsing has been protecting users from phishing, malware, unwanted software and more, by identifying and warning users about potentially abusive sites on more than 5 billion devices around the world. As attackers grow more sophisticated, we've seen the need for protections that can adapt as quickly as the threats they defend against. That's why we're excited to announce a new version of Safe Browsing that will provide real-time, privacy-preserving URL protection for people using the [Standard protection](https://support.google.com/chrome/answer/9890866) mode of Safe Browsing in Chrome.

### Current landscape

Chrome automatically protects you by flagging potentially dangerous sites and files, hand in hand with Safe Browsing which discovers thousands of unsafe sites every day and adds them to its lists of harmful sites and files.

So far, for privacy and performance reasons, Chrome has first checked sites you visit against a locally-stored list of known unsafe sites which is updated every 30 to 60 minutes -- this is done using [hash-based checks](https://security.googleblog.com/2022/08/how-hash-based-safe-browsing-works-in.html).

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_QBMYx1Gz7H8twUQnE1pRiD8H0m2ckUodFJL0ySh23eh8foVsehxwVO9eu_JwL2BRI1LLUSEKFhJZsHx9IqHBzNCanJpKwHS0hNWn_nJL85jL64nQZTFJMqAkKc0KuU0Q6BnKGiAptLQUFSaHF1lZ1JfrBUxufZx8OPdFw1vjgoFhSjvaMSfZSsQXs2cz/s16000/Screenshot%202024-03-13%203.39.50%20PM.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_QBMYx1Gz7H8twUQnE1pRiD8H0m2ckUodFJL0ySh23eh8foVsehxwVO9eu_JwL2BRI1LLUSEKFhJZsHx9IqHBzNCanJpKwHS0hNWn_nJL85jL64nQZTFJMqAkKc0KuU0Q6BnKGiAptLQUFSaHF1lZ1JfrBUxufZx8OPdFw1vjgoFhSjvaMSfZSsQXs2cz/s1428/Screenshot%202024-03-13%203.39.50%20PM.png)

*Hash-based check overview*

But unsafe sites have adapted --- today, the majority of them exist for less than 10 minutes, meaning that by the time the locally-stored list of known unsafe sites is updated, many have slipped through and had the chance to do damage if users happened to visit them during this window of opportunity. Further, Safe Browsing's list of harmful websites continues to grow at a rapid pace. Not all devices have the resources necessary to maintain this growing list, nor are they always able to receive and apply updates to the list at the frequency necessary to benefit from full protection.

Safe Browsing's [Enhanced protection](https://security.googleblog.com/2020/05/enhanced-safe-browsing-protection-now.html) mode already stays ahead of such threats with technologies such as real-time list checks and AI-based classification of malicious URLs and web pages. We built this mode as an opt-in to give users the choice of sharing more security-related data in order to get stronger security. This mode has shown that checking lists in real time brings significant value, so we decided to bring that to the default Standard protection mode through a new API -- one that doesn't share the URLs of sites you visit with Google.

### Introducing real-time, privacy-preserving Safe Browsing

How it works
------------

In order to transition to real-time protection, checks now need to be performed against a list that is maintained on the Safe Browsing server. The server-side list can include unsafe sites as soon as they are discovered, so it is able to capture sites that switch quickly. It can also grow as large as needed because the Safe Browsing server is not constrained in the same way that user devices are.

Behind the scenes, here's what is happening in Chrome:

1.  When you visit a site, Chrome first checks its cache to see if the address (URL) of the site is already known to be safe (see the "Staying speedy and reliable" section for details).
2.  If the visited URL is not in the cache, it may be unsafe, so a real-time check is necessary.
3.  Chrome obfuscates the URL by following the [URL hashing guidance](https://developers.google.com/safe-browsing/v4/urls-hashing) to convert the URL into 32-byte full hashes.
4.  Chrome truncates the full hashes into 4-byte long hash prefixes.
5.  Chrome encrypts the hash prefixes and sends them to a privacy server (see the "Keeping your data private" section for details).
6.  The privacy server removes potential user identifiers and forwards the encrypted hash prefixes to the Safe Browsing server via a TLS connection that mixes requests with many other Chrome users.
7.  The Safe Browsing server decrypts the hash prefixes and matches them against the server-side database, returning full hashes of all unsafe URLs that match one of the hash prefixes sent by Chrome.
8.  After receiving the unsafe full hashes, Chrome checks them against the full hashes of the visited URL.
9.  If any match is found, Chrome will show a warning.

Keeping your data private
-------------------------

In order to preserve user privacy, we have partnered with [Fastly](https://www.fastly.com/blog/enabling-privacy-on-the-internet-with-oblivious-http), an edge cloud platform that provides content delivery, edge compute, security, and observability services, to operate an [Oblivious HTTP](https://datatracker.ietf.org/doc/rfc9458/) (OHTTP) privacy server between Chrome and Safe Browsing -- you can learn more about Fastly's commitment to user privacy on their [Customer Trust page](https://www.fastly.com/solutions/customer-trust). With OHTTP, Safe Browsing does not see your IP address, and your Safe Browsing checks are mixed amongst those sent by other Chrome users. This means Safe Browsing cannot correlate the URL checks you send as you browse the web.

Before hash prefixes leave your device, Chrome encrypts them using a public key from Safe Browsing. These encrypted hash prefixes are then sent to the privacy server. Since the privacy server doesn't know the private key, it cannot decrypt the hash prefixes, which offers privacy from the privacy server itself.

The privacy server then removes potential user identifiers such as your IP address and forwards the encrypted hash prefixes to the Safe Browsing server. The privacy server is operated independently by Fastly, meaning that Google doesn't have access to potential user identifiers (including IP address and User Agent) from the original request. Once the Safe Browsing server receives the encrypted hash prefixes from the privacy server, it decrypts the hash prefixes with its private key and then continues to check the server-side list.

Ultimately, Safe Browsing sees the hash prefixes of your URL but not your IP address, and the privacy server sees your IP address but not the hash prefixes. No single party has access to both your identity and the hash prefixes. As such, your browsing activity remains private.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgWX4X0IOWMDxOgv4_2z033z3i327gXtjV0U0eTdW2XRAxKJPp-_oaIplWUUwJBgt-UNvwNnhlHNPz30O26SVDKK1GImmt_-L0qYhMT-P8N00bMv3ufXZw4TxxTQoTOsXUWx7wUNzoQ05AQwdJn9vXMJmBQR-HG3yY1yW09GrvK1XXrF7Awe3mTxTnY9N-1/s16000/Screenshot%202024-03-13%203.41.41%20PM.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgWX4X0IOWMDxOgv4_2z033z3i327gXtjV0U0eTdW2XRAxKJPp-_oaIplWUUwJBgt-UNvwNnhlHNPz30O26SVDKK1GImmt_-L0qYhMT-P8N00bMv3ufXZw4TxxTQoTOsXUWx7wUNzoQ05AQwdJn9vXMJmBQR-HG3yY1yW09GrvK1XXrF7Awe3mTxTnY9N-1/s2030/Screenshot%202024-03-13%203.41.41%20PM.png)

*Real-time check overview*

Staying speedy and reliable
---------------------------

Compared with the hash-based check, the real-time check requires sending a request to a server, which adds additional latency. We have employed a few techniques to make sure your browsing experience continues to be smooth and responsive.

First, before performing the real-time check, Chrome checks against a global and local cache on your device to avoid unnecessary delay.

-   The global cache is a list of hashes of known-safe URLs that is served by Safe Browsing. Chrome fetches it in the background. If any full hash of the URL is found in the global cache, Chrome will consider it less risky and perform a hash-based check instead.
-   The local cache, on the other hand, is a list of full hashes that are saved from previous Safe Browsing checks. If there is a match in the local cache, and the cache has not yet expired, Chrome will not send a real-time request to the Safe Browsing server.

Both caches are stored in memory, so it is much faster to check them than sending a real-time request over the network.

In addition, Chrome follows a fallback mechanism in case of unsuccessful or slow requests. If the real-time request fails consecutively, Chrome will enter a back-off mode and downgrade the checks to hash-based checks for a certain period.

We are also in the process of introducing an [asynchronous mechanism](https://blog.chromium.org/2024/02/optimizing-safe-browsing-checks-in.html), which will allow the site to load while the real-time check is in progress. This will improve the user experience, as the real-time check won't block page load.

### What real-time, privacy-preserving URL protection means for you

Chrome users
------------

With the latest release of Chrome for desktop, Android, and iOS, we're upgrading the Standard protection mode of Safe Browsing so it will now check sites using Safe Browsing's real-time protection protocol, without sharing your browsing history with Google. You don't need to take any action to benefit from this improved functionality.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_2OYwTAxTggg27lIbawjb3dauEA8leW3aXfhYH-_xVjs-b_VASp92zpqARvsUX37tJKY4r6isvOE7KuHzo-PCGrfq-1R5rblAbpH2eDHi1NdWGzMdae43y143xiaYLS5DhKzbq0FEjkadtT0lzktQq2HcjBlAbKykUCn0CyJaQmIjeCV4gY3eVtnWd1q1/s16000/Red%20interstitial.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_2OYwTAxTggg27lIbawjb3dauEA8leW3aXfhYH-_xVjs-b_VASp92zpqARvsUX37tJKY4r6isvOE7KuHzo-PCGrfq-1R5rblAbpH2eDHi1NdWGzMdae43y143xiaYLS5DhKzbq0FEjkadtT0lzktQq2HcjBlAbKykUCn0CyJaQmIjeCV4gY3eVtnWd1q1/s3200/Red%20interstitial.png)

If you want more protection, we still encourage you to turn on the [Enhanced protection](https://support.google.com/chrome/answer/9890866) mode of Safe Browsing. You might wonder why you need enhanced protection when you'll be getting real-time URL protection in Standard protection -- this is because in Standard protection mode, the real-time feature can only protect you from sites that Safe Browsing has already confirmed to be unsafe. On the other hand, Enhanced protection mode is able to use additional information together with advanced machine learning models to protect you from sites that Safe Browsing may not yet have confirmed to be unsafe, for example because the site was only very recently created or is cloaking its true behavior to Safe Browsing's detection systems.

Enhanced protection also continues to offer protection beyond real-time URL checks, for example by providing deep scans for suspicious files and extra protection from suspicious Chrome extensions.

Enterprises
-----------

The real-time feature of the Standard protection mode of Safe Browsing is on by default for Chrome. If needed, it may be configured using the policy [SafeBrowsingProxiedRealTimeChecksAllowed](https://chromeenterprise.google/policies/#SafeBrowsingProxiedRealTimeChecksAllowed). It is also worth noting that in order for this feature to work in Chrome, enterprises may need to explicitly allow traffic to the Fastly privacy server. If the server is not reachable, Chrome will downgrade the checks to hash-based checks.

Developers
----------

While Chrome is the first surface where these protections are available, we plan to make them available to eligible developers for non-commercial use cases via the Safe Browsing API. Using the API, developers and privacy server operators can partner to better protect their products' users from fast-moving malicious actors in a privacy-preserving manner. To learn more, keep an eye out for our upcoming developer documentation to be published on the [Google for Developers](https://developers.google.com/) site.