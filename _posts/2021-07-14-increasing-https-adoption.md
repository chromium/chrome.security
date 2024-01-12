---
title: Increasing HTTPS adoption
author: Shweta Panditrao, Devon O'Brien, Emily Stark
date: 2021-07-14
source-url: https://blog.chromium.org/2021/07/increasing-https-adoption.html
source-blog: Chromium Blog
---

When a browser connects to websites over HTTPS (vs. HTTP), eavesdroppers and attackers on the network can't intercept or alter the data that's shared over that connection (including personal info, or even the page itself). This level of privacy and security is vital for the web ecosystem, so Chrome [continues](https://blog.chromium.org/2019/10/no-more-mixed-messages-about-https.html) [to](https://blog.chromium.org/2020/02/protecting-users-from-insecure.html) [invest](https://blog.chromium.org/2021/03/a-safer-default-for-navigation-https.html) in making HTTPS more widely supported.

Thankfully, HTTPS adoption has come [a long way in recent years](https://transparencyreport.google.com/https/overview?hl=en), and most operating systems now see 90%+ of page loads over HTTPS in Chrome. Still, there's more we can do to help make HTTPS the preferred protocol on the web, and better protect users on the remaining slice of the web that doesn't yet support HTTPS, so today we're sharing some future work in this area.

Opting in to an HTTPS-First World
---------------------------------

Beginning in M94, Chrome will offer HTTPS-First Mode, which will attempt to upgrade all page loads to HTTPS and display a full-page warning before loading sites that don't support it. Users who enable this mode gain confidence that Chrome is connecting them to sites over HTTPS whenever possible, and that they will see a warning before connecting to sites over HTTP. Based on ecosystem feedback, we'll explore making HTTPS-First mode the default for all users in the future. Mozilla has also shared their intent to make [HTTPS-only mode](https://blog.mozilla.org/security/2020/11/17/firefox-83-introduces-https-only-mode/) the future of web browsing in Firefox.

Experimenting with the lock icon
----------------------------------

As we approach an HTTPS-first future, we're also re-examining the lock icon that browsers typically show when a site loads over HTTPS. In particular, [our research](https://research.google/pubs/pub45366/) indicates that users often associate this icon with a site being trustworthy, when in fact it's only the connection that's secure. In a recent study, we found that only 11% of participants could correctly identify the meaning of the lock icon. To try and reduce this confusion, Chrome will run an experiment in M93 that replaces the lock in the address bar with a more neutral entry point to Page Info (example below). We hope that this experiment will improve the discoverability of critical privacy and security information and controls provided in Page Info, such as site permissions. Importantly, a "Not Secure" indicator will continue to show on sites without HTTPS support, and the experiment includes an enterprise policy in case organizations want to opt-out. In all cases, we'll provide advance notice if we decide to move ahead with a full launch.

![](https://lh5.googleusercontent.com/qX5CZSRNrhxon9VmUvf5hM_IGM5nYKrNSQgmjc4m08GnaIXvdV58jxpL41964FdzVswxfvsQe3zaSjP-nhW7_SzXtxAi8lw_Om0qTGLzDt0BybYO6XRGRaQCrDqHJMhmKOJooLOFafyTr2pV4kWds2okike_-YNzhjpwbZ1T3RhH2G-2)

Protecting users on the HTTP web
--------------------------------

While we are excited to see users adopt HTTPS-First Mode in future versions of Chrome, HTTP connections will still continue to be supported and Chrome will take additional steps to protect and inform users whenever they are using insecure connections. Continuing from our past efforts to [restrict new features to secure origins](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features) and [deprecate powerful features on insecure origins](https://www.chromium.org/Home/chromium-security/deprecating-powerful-features-on-insecure-origins), we'll evaluate a broad set of web platform features to determine if they should be limited or restricted on HTTP webpages.

In order to focus on changes that provide the greatest security improvements to our users, we are relying on a set of guiding principles to prioritize our future work in this area:

-   Better inform users when making trust decisions about sites over insecure connections
-   Limit the ability for sites to opt out of security policies over insecure connections
-   Restrict how, and for how long, Chrome stores site content provided over insecure connections

A deeper explanation of how we plan to act on these principles, as well as an updated list of affected features will be maintained on the [Chromium wiki](https://www.chromium.org/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) and we are excited to announce more details later this year.