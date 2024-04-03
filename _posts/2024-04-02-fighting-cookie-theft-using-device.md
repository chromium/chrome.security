---
title: Fighting cookie theft using device bound sessions
author: Kristian Monsen, Chrome Counter Abuse
date: 02-04-2024
source-url: https://blog.chromium.org/2024/04/fighting-cookie-theft-using-device.html
source-blog: Chromium Blog
---

Cookies -- small files created by sites you visit -- are fundamental to the modern web. They make your online experience easier by saving browsing information, so that sites can do things like keep you signed in and remember your site preferences. Due to their powerful utility, cookies are also a lucrative target for attackers.

Many users across the web are victimized by [cookie theft malware](https://blog.google/threat-analysis-group/phishing-campaign-targets-youtube-creators-cookie-theft-malware/) that gives attackers access to their web accounts. Operators of Malware-as-a-Service (MaaS) frequently use social engineering to spread cookie theft malware. These operators even convince users to bypass multiple warnings in order to land the malware on their device. The malware then typically exfiltrates all authentication cookies from browsers on the device to remote servers, enabling the attackers to curate and sell the compromised accounts. Cookie theft like this happens *after* login, so it bypasses two-factor authentication and any other login-time reputation checks. It's also difficult to mitigate via anti-virus software since the stolen cookies continue to work even after the malware is detected and removed. And because of the way cookies and operating systems interact, primarily on desktop operating systems, Chrome and other browsers cannot protect them against malware that has the same level of access as the browser itself.

To address this problem, we're prototyping a new web capability called Device Bound Session Credentials (DBSC) that will help keep users more secure against cookie theft. The project is being developed in the open at [github.com/WICG/dbsc](https://github.com/WICG/dbsc) with the goal of becoming an open web standard.

By binding authentication sessions to the device, DBSC aims to disrupt the cookie theft industry since exfiltrating these cookies will no longer have any value. We think this will substantially reduce the success rate of cookie theft malware. Attackers would be forced to act locally on the device, which makes on-device detection and cleanup more effective, both for anti-virus software as well as for enterprise managed devices.

Learning from prior work, our goal is to build a technical solution that's practical to deploy to all sites large and small, to foster industry support to ensure broad adoption, and to maintain user privacy.

Technical solution
------------------

At a high level, the DBSC API lets a server start a new session with a specific browser on a device. When the browser starts a new session, it creates a new public/private key pair locally on the device, and uses the operating system to safely store the private key in a way that makes it hard to export. Chrome will use facilities such as Trusted Platform Modules (TPMs) for key protection, which are becoming more commonplace and are required for Windows 11, and we are looking at supporting [software-isolated solutions](https://techcommunity.microsoft.com/t5/windows-it-pro-blog/advancing-key-protection-in-windows-using-vbs/ba-p/4050988) as well.

The API allows a server to associate a session with this public key, as a replacement or an augmentation to existing cookies, and verify proof-of-possession of the private key throughout the session lifetime. To make this feasible from a latency standpoint and to aid migrations of existing cookie-based solutions, DBSC uses these keys to maintain the freshness of short-lived cookies through a dedicated DBSC-defined endpoint on the website. This happens out-of-band from regular web traffic, reducing the changes needed to legacy websites and apps. This ensures the session is still on the same device, enforcing it at regular intervals set by the server. For current implementation details please see the [public explainer](https://github.com/WICG/dbsc/blob/main/README.md).

Preserving user privacy
-----------------------

Each session is backed by a unique key and DBSC does not enable sites to correlate keys from different sessions on the same device, to ensure there's no persistent user tracking added. The user can delete the created keys at any time by deleting site data in Chrome settings. The out-of-band refresh of short-term cookies is only performed if a user is actively using the session (e.g. browsing the website).

DBSC doesn't leak any meaningful information about the device beyond the fact that the browser thinks it can offer some type of secure storage. The only information sent to the server is the per-session public key which the server uses to certify proof of key possession later.

We expect Chrome will initially support DBSC for roughly half of desktop users, based on the current hardware capabilities of users' machines. We are committed to developing this standard in a way that ensures it will not be abused to segment users based on client hardware. For example, we may consider supporting software keys for all users regardless of hardware capabilities. This would ensure that DBSC will not let servers differentiate between users based on hardware features or device state (i.e. if a device is [Play Protect certified](https://www.android.com/certified/) or not).

DBSC will be fully aligned with [the phase-out of third-party cookies in Chrome](https://developers.google.com/privacy-sandbox/3pcd). In third-party contexts, DBSC will have the same availability and/or segmentation that third-party cookies will, as set by user preferences and other factors. This is to make sure that DBSC does not become a new tracking vector once third-party cookies are phased out, while also ensuring that such cookies can be fully protected in the meantime. If the user completely opts out of cookies, third-party cookies, or cookies for a specific site, this will disable DBSC in those scenarios as well.

Improving user protection
-------------------------

We are currently experimenting with a DBSC prototype to protect some Google Account users running Chrome Beta. This is an early initiative to gauge the reliability, feasibility, and the latency of the protocol on a complex site, while also providing meaningful protection to our users. When it's deployed fully, consumers and enterprise users will get upgraded security for their Google accounts under the hood automatically. We are also working to enable this technology for our Google Workspace and Google Cloud customers to provide another layer of account security.

This prototype is integrated with the way Chrome and Google Accounts work together, but is validating and informing all aspects of the public API we want to build.

Interest outside Google
-----------------------

Many server providers, identity providers (IdPs) such as Okta, and browsers such as Microsoft Edge have expressed interest in DBSC as they want to secure their users against cookie theft. We are engaging with all interested parties to make sure we can present a standard that works for different kinds of websites in a privacy preserving way.

Where to follow the progress
----------------------------

Development happens on [GitHub](https://github.com/WICG/dbsc) and we have published an [estimated timeline](https://github.com/WICG/dbsc/wiki/DBSC-timeline). This is where we will post announcements and updates to the expected timelines as needed. Our goal is to allow [origin trials](https://developer.chrome.com/docs/web-platform/origin-trials) for all interested websites by the end of 2024. Please reach out if you'd like to get involved. We welcome feedback from all sources, either by opening a [new issue](https://github.com/WICG/dbsc/issues) or [starting a discussion](https://github.com/WICG/dbsc/discussions) on GitHub.