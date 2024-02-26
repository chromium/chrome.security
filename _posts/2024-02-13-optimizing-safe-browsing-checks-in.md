---
title: Optimizing Safe Browsing checks in Chrome
author: Jasika Bawa, Chrome Security & Jonathan Li, Google Safe Browsing
date: 2024-02-13
source-url: https://blog.chromium.org/2024/02/optimizing-safe-browsing-checks-in.html
source-blog: Chromium Blog
---

Balancing security and usability is always top of mind for us as we strive to stay on top of the constantly evolving threat landscape while building products that are delightful to use. To that end, we'd like to announce a few recent changes to how Chrome works with Google Safe Browsing to keep you safe online while optimizing for smooth and uninterrupted web browsing.

### Asynchronous checks

Today, Safe Browsing checks are on the blocking path of page loads in Chrome, meaning that users cannot see pages until checks are completed. While this works fine for local-first checks such as those made using [Safe Browsing API v4](https://developers.google.com/safe-browsing/v4), it can add latency for checks made directly with the Safe Browsing server. Starting in Chrome 122, we will begin to introduce an asynchronous mechanism which will allow sites to load even while real-time checks with Safe Browsing servers are in progress. We expect this to reduce page load time and improve user experience as real-time server-side checks will no longer block page load, although if a site is found to be dangerous after the page loads then a warning will still be shown.

In addition to the performance boost, this change will let us improve the quality of protection over time. By taking the remote lookup outside of the blocking path of the page load, we're now able to experiment with and deploy novel AI and ML based algorithms to detect and block more phishing and social engineering attacks. It was previously challenging to perform such experimentation because of the potential to delay page loads.

In terms of potential risks, we evaluated the following and concluded that sufficient mitigations are in place:

- Phishing and social engineering attacks: With the move to asynchronous checks, such sites may start to load while server-side Safe Browsing checks are in progress. We have studied the timing data and concluded that it is extremely unlikely a user would have significantly interacted with (e.g. typed in a password) such a site by the time a warning is shown.

- Exploits against the browser: Chrome maintains a local Safe Browsing list of some sites which are known to deliver browser exploits, and we'll continue to check that synchronously. Besides this, we always recommend [updating Chrome](https://support.google.com/chrome/answer/95414) as soon as an update is available, to stay protected online.

### Sub-resource checks

Most sites we encounter include various sub-resources as a way to render their content. These sub-resources can include images, scripts, and more. Chrome has historically checked both top-level URLs as well as sub-resources with Safe Browsing in order to warn on potentially harmful sites. While the majority of sub-resources are safe, in the past, we'd commonly observe compromised sites embedding sub-resources that were being leveraged by bad actors to distribute malware and exploit browsers at scale.

In recent years, we've seen this attacker trend decline -- large scale campaigns that exploit sub-resources are no longer common, making sub-resource checks less important. Additionally, our advances in intelligence gathering, threat detection, and Safe Browsing APIs mean that we now have other ways to protect users in real-time without relying on sub-resource checks. For example, Chrome's client-side visual ML model can spot images used to create phishing pages, regardless of their use of sub-resources.

As such, moving forward Chrome will no longer check the URLs of sub-resources with Safe Browsing. This means that Chrome clients now connect to Google less frequently, which reduces unnecessary network bandwidth cost for users. On the Safe Browsing side, the change allows us to drastically simplify detection logic and APIs, which helps improve infrastructure reliability and warning accuracy, thus reducing risk overall.

### PDF download checks

Finally, we have vastly reduced the frequency with which Chrome contacts Safe Browsing to check PDF downloads.

In the past, PDF was a widely exploited file type due to its popularity. As time has passed, thanks in part to the ongoing hardening of PDF viewers (for example, Chrome's PDF viewer is sandboxed), we aren't seeing widespread exploitation of PDF anymore, nor do we hear industry reports about it being a dangerous file type. Even when we have observed malicious PDFs in the wild, they have contained links that redirect users back to Chrome which gives us another chance to protect users.

As a result of this change, Chrome is now contacting Safe Browsing billions of times less often each week.

### What to expect

The changes described above, while mostly under the hood, should result in a smoother web browsing experience for Chrome users without a degradation in security posture. We'll continue to monitor trends in the threat landscape, and remain ready to respond to keep you safe online.