---
title: Towards HTTPS by default
author: Joe DeBlasio, Chrome Security team
date: 2023-08-16
source-url: https://blog.chromium.org/2023/08/towards-https-by-default.html
source-blog: Chromium blog
excerpt: 
---

For the past several years, [more than 90%](https://transparencyreport.google.com/https/overview?hl=en) of Chrome users' navigations have been to HTTPS sites, across all major platforms. Thankfully, that means that most traffic is encrypted and authenticated, and thus safe from network attackers. However, a stubborn 5-10% of traffic has remained on HTTP, allowing attackers to eavesdrop on or change that data. Chrome shows a warning in the address bar when a connection to a site is not secure, but we believe this is insufficient: not only do many people not notice that warning, but by the time someone notices the warning, the damage may already have been done.

We believe that the web should be secure by default. [HTTPS-First Mode](https://blog.chromium.org/2021/07/increasing-https-adoption.html) lets Chrome deliver on exactly that promise, by getting explicit permission from you before connecting to a site insecurely. Our goal is to eventually enable this mode for everyone by default. While the web isn't quite ready to universally enable HTTPS-First Mode today, we're announcing several important stepping stones towards that goal.

### Automatic upgrades

Chrome will automatically upgrade all http:// navigations to https://, even when you click on a link that explicitly declares http://. This works very similarly to [HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) upgrading, but Chrome will detect when these upgrades fail (e.g. due to a site providing an invalid certificate or returning a HTTP 404), and will automatically fallback to http://. This change ensures that Chrome only ever uses insecure HTTP when HTTPS truly isn't available, and not because you clicked on an out-of-date insecure link. We're currently experimenting with this change in Chrome version 115, working to standardize the behavior across the web, and plan to roll out the feature to everyone soon. While this change can't protect against active network attackers, it's a stepping stone towards HTTPS-First mode for everyone and protects more traffic from passive network eavesdroppers.

### Warning on insecurely downloaded files

Building and expanding on our previous work [removing support for mixed downloads](https://blog.chromium.org/2020/02/protecting-users-from-insecure.html), Chrome will start showing a warning before downloading any high-risk files over an insecure connection. Downloaded files can contain malicious code that bypasses Chrome's sandbox and other protections, so a network attacker has a unique opportunity to compromise your computer when insecure downloads happen. This warning aims to inform people of the risk they're taking. You will still be able to download the file if you're comfortable with the risk. Unless HTTPS-First Mode is enabled, Chrome will not show warnings when insecurely downloading files like images, audio, or video, as these file types are relatively safe. We're expecting to roll out these warnings starting in mid September.

[![Chrome will inform you if a file was downloaded insecurely.](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEil0cFrf9w3NuP__F_fospAVauXsYDZjI3DUr5S9Y9BSwabFBj1MQTA7b0HkEOp3L6t2hOeqf5YWW7X5Jyi14N5MGu71h0siCxxr1ubrrfMK4MeTDf6KJrSD9aD6FjuTK5HY2n8fcbjjVcOtNZ-UT5PeOAvmDblEuIYiQv2cHonubCKIMX6BXE_N-tF79zm/w320-h169/Chrome%20will%20inform%20you%20if%20a%20file%20was%20downloaded%20insecurely.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEil0cFrf9w3NuP__F_fospAVauXsYDZjI3DUr5S9Y9BSwabFBj1MQTA7b0HkEOp3L6t2hOeqf5YWW7X5Jyi14N5MGu71h0siCxxr1ubrrfMK4MeTDf6KJrSD9aD6FjuTK5HY2n8fcbjjVcOtNZ-UT5PeOAvmDblEuIYiQv2cHonubCKIMX6BXE_N-tF79zm/s712/Chrome%20will%20inform%20you%20if%20a%20file%20was%20downloaded%20insecurely.png)

### Expanding HTTPS-First Mode protections for more people

Our ultimate goal is to enable HTTPS-First Mode for everyone. To that end, we're expanding HTTPS-First Mode protections to several new areas:

-   We've enabled HTTPS-First Mode for users enrolled in Google's [Advanced Protection Program](https://landing.google.com/advancedprotection/) who are also signed-in to Chrome. These users have asked Google for the strongest protection available, and HTTPS-First Mode helps avoid the very real threats of insecure connections these users face.

-   We're planning to enable HTTPS-First Mode by default in Incognito Mode for a more secure browsing experience soon. 

-   We're currently experimenting with automatically enabling HTTPS-First-Mode protections on sites that Chrome knows you typically access over HTTPS.

-   Finally, we're exploring automatically enabling HTTPS-First Mode for users that only very rarely use HTTP.

### Try it out

If you'd like to try out HTTPS upgrading or warning on insecure downloads before they roll out to everyone, you can do so in Chrome today by enabling the "HTTPS Upgrades" and "Insecure download warnings" flags at chrome://flags.  And if you want stronger protections, you can also turn on HTTPS-First Mode by enabling "Always use secure connections" in Chrome security settings (chrome://settings/security)!

### Information for Developers and Enterprise

If you're a developer, you can ensure your users don't see warnings or encounter failed upgrades on your sites by using HTTPS and ensuring that your site doesn't host content only accessible over HTTP. We encourage you to fully adopt HTTPS and redirect all HTTP URLs to their HTTPS equivalents. Even if you believe that your site does not host personal information, using HTTP puts your users at increased risk of network attackers injecting malicious content into their browsers. Malicious network attackers rely on insecure sites to get a foothold towards your users. We're exploring additional ways we can reduce the risk users experience by visiting insecure websites by, for instance, reducing the lifetime of cookies accessible over HTTP -- switching to HTTPS ensures that your users' experience will not be impacted by these future changes. If you can't support HTTPS yet, you can ensure that users can access your site by making sure that your server either does not respond to requests on port 443 at all, or uses HTTPS to redirect users back to HTTP.

We know that enterprises and education networks have unique needs. These features can be turned on early, customized, or turned off entirely via the [HttpsOnlyMode](https://chromeenterprise.google/policies/#HttpsOnlyMode), [HttpsUpgradesEnabled](https://chromeenterprise.google/policies/#HttpsUpgradesEnabled), [HttpAllowlist](https://chromeenterprise.google/policies/#HttpAllowlist), and [InsecureContentAllowedForUrls](https://chromeenterprise.google/policies/#InsecureContentAllowedForUrls) policies.

### Part of our ongoing commitment

Chrome has a [long](https://blog.chromium.org/2018/05/evolving-chromes-security-indicators.html)  [history](https://blog.chromium.org/2019/10/no-more-mixed-messages-about-https.html)  [of](https://blog.chromium.org/2020/02/protecting-users-from-insecure.html)  [working](https://blog.chromium.org/2020/08/protecting-google-chrome-users-from.html)  [towards](https://blog.chromium.org/2021/03/a-safer-default-for-navigation-https.html)  [a](https://blog.chromium.org/2021/07/increasing-https-adoption.html)  [secure-by-default](https://blog.chromium.org/2023/05/an-update-on-lock-icon.html) web, and we're not stopping here.  We're so close to the finish line, and we're excited to help the web get to HTTPS by default.