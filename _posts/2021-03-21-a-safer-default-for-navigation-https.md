---
title: A safer default for navigation
author: Shweta Panditrao and Mustafa Emre Acer, Chrome team
date: 2021-03-21
source-url: https://blog.chromium.org/2021/03/a-safer-default-for-navigation-https.html
source-blog: Chromium Blog
---

Starting in version 90, Chrome's address bar will use *https://* by default, improving privacy and even loading speed for users visiting websites that support HTTPS. Chrome users who navigate to websites by manually typing a URL often don't include "http://" or "https://". For example, users often type "example.com" instead of "https://example.com" in the address bar. In this case, if it was a user's first visit to a website, Chrome would previously choose *http://* as the default protocol^1^. This was a practical default in the past, when much of the web did not support HTTPS.

Chrome will now default to HTTPS for most typed navigations that don't specify a protocol^2^. HTTPS is the more secure and most [widely used scheme](https://transparencyreport.google.com/https/overview?hl=en) in Chrome on all major platforms. In addition to being a clear security and privacy improvement, this change improves the initial loading speed of sites that support HTTPS, since Chrome will connect directly to the HTTPS endpoint without needing to be redirected from *http://* to *https://*. For sites that don't yet support HTTPS, Chrome will fall back to HTTP when the HTTPS attempt fails (including when there are certificate errors, such as name mismatch or untrusted self-signed certificate, or connection errors, such as DNS resolution failure). This change is rolling out initially on Chrome Desktop and Chrome for Android in version 90, with a release for Chrome on iOS following soon after.

[![](https://1.bp.blogspot.com/-g-M0w0sGYf4/YFnptLlig8I/AAAAAAAABbA/x033CnffCdc-s1J9AM-jk9ydiQPj_9CxQCLcBGAsYHQ/w514-h514/Chromium_HTTPS_Blog.gif)](https://1.bp.blogspot.com/-g-M0w0sGYf4/YFnptLlig8I/AAAAAAAABbA/x033CnffCdc-s1J9AM-jk9ydiQPj_9CxQCLcBGAsYHQ/s1080/Chromium_HTTPS_Blog.gif)

HTTPS protects users by encrypting traffic sent over the network, so that sensitive information users enter on websites cannot be intercepted or modified by attackers or eavesdroppers. Chrome is invested in ensuring that HTTPS is the default protocol for the web, and this change is one more step towards ensuring Chrome always uses secure connections by default.

^1^ One notable exception to this is any site in the [HSTS preload list](https://hstspreload.org/), which Chrome will always default to HTTPS.\
^2^ IP addresses, single label domains, and reserved hostnames such as test/ or localhost/ will continue defaulting to HTTP.