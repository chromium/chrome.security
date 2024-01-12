---
title: Mitigating Side-Channel Attacks
author: Mike West, on behalf of Chrome's Web Platform Security team
date: 2021-03-12
source-url: https://blog.chromium.org/2021/03/mitigating-side-channel-attacks.html
source-blog: Chromium Blog
---

The web platform relies on the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) as a fundamental security boundary, and browsers do a pretty good job at preventing *explicit* leakage of data from one origin to another. Attacks like [Spectre](https://spectreattack.com/), however, show that we still have work to do to mitigate *implicit* data leakage. The side-channels exploited through these attacks prove that [attackers can read any data which enters a process hosting that attackers' code](https://chromium.googlesource.com/chromium/src/+/master/docs/security/side-channel-threat-model.md#introduction). These attacks are [quite practical](https://security.googleblog.com/2021/03/a-spectre-proof-of-concept-for-spectre.html) today, and pose a real risk to users.

Our goal must be to ensure that sensitive data doesn't unexpectedly enter an attacker's process. Browsers shoulder a large chunk of this responsibility: Chromium's [Site Isolation](https://www.chromium.org/Home/chromium-security/site-isolation) can separate the sites you visit into distinct OS-level processes, [cross-origin read blocking](https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md) prevents attackers from loading a subset of otherwise-vulnerable cross-origin resources, and APIs that substantially increase attackers' bandwidth (like [SharedArrayBuffer](https://developer.chrome.com/blog/enabling-shared-array-buffer/#cross-origin-isolation)) are being locked to [cross-origin isolated contexts](https://web.dev/cross-origin-isolation-guide/). This last mechanism, however, points in the direction of work that browsers can't do on their own.

Web developers know their applications intimately, and can make informed decisions about each page's and resource's risk of exposure. To defend users' data against exfiltration, web developers must step in, evaluate resources they host, and instruct browsers to isolate those resources accordingly. At a high-level, this defense consists of:

1.  Deciding when to respond to requests by examining incoming headers, paying special attention to the Origin header on the one hand, and various [Sec-Fetch- prefixed headers](https://web.dev/fetch-metadata/) on the other.
2.  Restricting attackers' ability to load resources as a subresource by setting a [cross-origin resource policy](https://resourcepolicy.fyi/) of same-origin (opening up to same-site or cross-origin only when necessary).
3.  Restricting attackers' ability to frame resources as a document by opting into framing protections via [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options): SAMEORIGIN or CSP's more granular [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) directive: for example, frame-ancestors 'self' https://trusted.embedder.
4.  Restricting attackers' ability to reference your application's windows by setting a [cross-origin opener policy](https://web.dev/coop-coep/). In the best case, you can default to a restrictive same-origin value, opening up to same-origin-allow-popups or unsafe-none only if necessary.
5.  Preventing MIME-type confusion attacks and increasing the robustness of passive defenses like [cross-origin read blocking](https://developers.google.com/web/updates/2018/07/site-isolation#corb) by setting correct [Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) headers, and globally asserting [X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options): nosniff.

Together, these various defenses help all browsers offer some degree of process-level protection for users' data, whether or not Site Isolation is available.

To find out more about employing these defenses, check out [Post-Spectre Web Development](https://w3c.github.io/webappsec-post-spectre-webdev/). It includes practical examples that explain in more detail how the security primitives discussed above apply to resources you might have on your sites.

These are useful steps you can take *today* to protect your origin against implicit data leaks. Looking forward, we hope to help the web [shift to safer defaults](https://speakerdeck.com/mikewest/isolation-by-default) which protect users against these attacks without requiring developer action.