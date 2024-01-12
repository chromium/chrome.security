---
title: An Update on the Lock Icon
author: David Adrian, Serena Chen, Joe DeBlasio, Emily Stark, and Emanuel von Zezschwitz, and the rest of Chrome Trusty Transport
date: 2023-05-02
source-url: https://blog.chromium.org/2023/05/an-update-on-lock-icon.html
source-blog: Chromium Blog
excerpt: Browsers have shown a lock icon when a site loads over HTTPS since the early versions of Netscape in the 1990s. For the last decade, Chrome participated in a major initiative to increase HTTPS adoption on the web, and to help make the web secure by default. As late as 2013, only 14% of the Alexa Top 1M sites supported HTTPS. Today, however, HTTPS has become the norm and over 95% of page loads in Chrome on Windows are over a secure channel using HTTPS. This is great news for the ecosystem; it also creates an opportunity to re-evaluate how we signal security protections in the browser. In particular, the lock icon.
---

_Editor's note: based on industry research (from Chrome and others), and the ubiquity of HTTPS, we will be replacing the lock icon in Chrome's address bar with a new "tune" icon -- both to emphasize that security should be the default state, and to make site settings more accessible. Read on to learn about this multi-year journey._

Browsers have shown a lock icon when a site loads over HTTPS since the early versions of Netscape in the 1990s. For the last decade, Chrome participated in a major initiative to [increase HTTPS adoption](https://www.usenix.org/conference/enigma2017/conference-program/presentation/schechter) on the web, and to help make the web secure by default. As late as 2013, only [14%](https://jhalderm.com/pub/papers/https-imc13.pdf) of the Alexa Top 1M sites supported HTTPS. Today, however, HTTPS has become the norm and [over 95% of page loads in Chrome on Windows are over a secure channel using HTTPS](https://transparencyreport.google.com/https/overview?hl=en). This is great news for the ecosystem; it also creates an opportunity to re-evaluate how we signal security protections in the browser. In particular, the lock icon.

The lock icon is meant to indicate that the network connection is a secure channel between the browser and site and that the network connection cannot be tampered with or eavesdropped on by third parties, but it's a remnant of an era where HTTPS was uncommon. HTTPS was originally so rare that at one point, Internet Explorer popped up an alert to users to notify them that the connection was secured by HTTPS, reminiscent of the ["Everything's Okay" alarm](https://simpsons.fandom.com/wiki/Everything%27s_Okay_Alarm) from The Simpsons. When HTTPS was rare, the lock icon drew attention to the additional protections provided by HTTPS. Today, this is no longer true, and HTTPS is the norm, not the exception, and we've been evolving Chrome accordingly.

For example: we know that the lock icon does not indicate website trustworthiness. We redesigned the lock icon in 2016 after our research showed that many users misunderstood what the icon conveyed. Despite our best efforts, [our research in 2021](https://research.google/pubs/pub51481/) showed that **only 11% of study participants correctly understood the precise meaning of the lock icon**. This misunderstanding is not harmless --- nearly all phishing sites use HTTPS, and therefore also display the lock icon. Misunderstandings are so pervasive that many organizations, including the [FBI](https://www.ic3.gov/Media/Y2019/PSA190610), publish explicit guidance that the lock icon is not an indicator of website safety.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBq_FRtvQmEwYveEh-SJ5K9ocrgYOLbU97Z5oT3xiS9m4gUUddYzGJ00pxKJ8TvMQZ13I3h_MGDOw3TdaJeGditVMPO-8I950E1i7cexj1x3GBtf3bPcm92YWqsfwS0C51743MEQpSWNbnUBgWEEpy7S-edVk1DTvakNQkLvBSFsxAgDAEQps1bx23Ww/s1314/heatmap.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBq_FRtvQmEwYveEh-SJ5K9ocrgYOLbU97Z5oT3xiS9m4gUUddYzGJ00pxKJ8TvMQZ13I3h_MGDOw3TdaJeGditVMPO-8I950E1i7cexj1x3GBtf3bPcm92YWqsfwS0C51743MEQpSWNbnUBgWEEpy7S-edVk1DTvakNQkLvBSFsxAgDAEQps1bx23Ww/s1314/heatmap.png)

When shown Chrome UI in research studies, users would look at the padlock to evaluate the trustworthiness of a hypothetical ecommerce site. We showed the site controls to experiment participants. The overlaid heat-maps represent the click patterns of respondents who were asked to indicate any information which was perceived helpful in the scenario.

The lock icon is currently a helpful entry point into site controls in Chrome. In 2021, we shared that we were experimenting with [replacing the lock icon](https://blog.chromium.org/2021/07/increasing-https-adoption.html) in Chrome with a more security-neutral entry point to site controls. We continued to mark [HTTP as insecure](https://blog.google/products/chrome/milestone-chrome-security-marking-http-not-secure/) in the URL bar. Users in the experiment opened the site controls more, and they didn't express any confusion that can follow major UI changes.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRlMaXduiXZSOPgMTX6_aNrz8Lv-JoriuiHaiK__ZhRN5iSfy0QGKndAwXe3jRPvpaWmPRDhWJP_Eujn0AsWPEqO-RSNQfpxcU7AZlKzS4yiv-c1tGnhH_94ddjG37iLua0rCvtO7aJFR9bl61rOwIuWlwu1hlMXjrM064ZTF_31xD681Su0VcGGYA3Q/s860/site-controls.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRlMaXduiXZSOPgMTX6_aNrz8Lv-JoriuiHaiK__ZhRN5iSfy0QGKndAwXe3jRPvpaWmPRDhWJP_Eujn0AsWPEqO-RSNQfpxcU7AZlKzS4yiv-c1tGnhH_94ddjG37iLua0rCvtO7aJFR9bl61rOwIuWlwu1hlMXjrM064ZTF_31xD681Su0VcGGYA3Q/s860/site-controls.png)[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9xAuoobZuThsUwFML3p9WT-BFW_0GRfbUlqoJuBuVt2lFymZaSmPzb0rqZ4ybodEErBHewbAPV6RD6ap3yTBAlcokOVFszspAiNaDt6W7DpvHvujPehuHraQNAZZwxwd3AhfZu3XSBJVNDkrw1EuwdK3khtFQ0hEJAXa8UZGCpmjbjFvW3xqRRFittg/s692/site-controls-small.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9xAuoobZuThsUwFML3p9WT-BFW_0GRfbUlqoJuBuVt2lFymZaSmPzb0rqZ4ybodEErBHewbAPV6RD6ap3yTBAlcokOVFszspAiNaDt6W7DpvHvujPehuHraQNAZZwxwd3AhfZu3XSBJVNDkrw1EuwdK3khtFQ0hEJAXa8UZGCpmjbjFvW3xqRRFittg/s692/site-controls-small.png)

Site controls currently accessible from the lock icon.

Based on these research results from ourselves and [others](https://ieeexplore.ieee.org/document/4223213), and the broader shift towards HTTPS, we will be replacing the lock icon in Chrome with a variant of the tune icon. We think the tune icon:

-   Does not imply "trustworthy"

-   Is more obviously clickable

-   Is commonly associated with settings or other controls

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgugOcJZQTuZzMo-ker60pSIzOIfBPPIV7Gq_7nmOU9lVqJWZ-qyurLC-Pj3lrPrrh-pemoJC6Ix27Dam2LmNasddSS21m37_7YV8qbC2MPE8j1gEIcBqcMqSAvhq5WnAJ34OV3IZYoqhivJo0oN3C2A4NWA0csosSV4jFIbqhOopCrXwKPFu96oW6_Yg/s1600/tune.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgugOcJZQTuZzMo-ker60pSIzOIfBPPIV7Gq_7nmOU9lVqJWZ-qyurLC-Pj3lrPrrh-pemoJC6Ix27Dam2LmNasddSS21m37_7YV8qbC2MPE8j1gEIcBqcMqSAvhq5WnAJ34OV3IZYoqhivJo0oN3C2A4NWA0csosSV4jFIbqhOopCrXwKPFu96oW6_Yg/s288/tune.png)

We plan to replace the lock icon with a variant of the tune icon, which is commonly used to indicate controls and settings.

Replacing the lock icon with a neutral indicator prevents the misunderstanding that the lock icon is associated with the trustworthiness of a page, and emphasizes that security should be the default state in Chrome. Our research has also shown that many users never understood that clicking the lock icon showed important information and controls. We think the new icon helps make permission controls and additional security information more accessible, while avoiding the misunderstandings that plague the lock icon.

The new icon is scheduled to launch in Chrome 117, which releases in early September 2023, as part of a general design refresh for desktop platforms. Chrome will continue to alert users when their connection is not secure. You can see the new tune icon now in Chrome Canary if you enable Chrome Refresh 2023 at chrome://flags#chrome-refresh-2023, but keep in mind this flag enables work that is still actively in-progress and under development, and does not represent a final product.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh42uF3vHKMYdRxs7Pn3IWFieNo15A49lukAYJ_WzOOgfN1frqfnkh45T-pUdZdIW-caFj1tA8IGBRRjgra_jd2JQ6igjESnX2xYieuWgA3aP4E7QU4mif8OrA7XAPwyURpVQ5azwDXe8NnuxjmV_4nnVEvc-YPBq76tcCOzBAS8pjQDNt-rKM88M3q6A/s1040/new-site-controls.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh42uF3vHKMYdRxs7Pn3IWFieNo15A49lukAYJ_WzOOgfN1frqfnkh45T-pUdZdIW-caFj1tA8IGBRRjgra_jd2JQ6igjESnX2xYieuWgA3aP4E7QU4mif8OrA7XAPwyURpVQ5azwDXe8NnuxjmV_4nnVEvc-YPBq76tcCOzBAS8pjQDNt-rKM88M3q6A/s1040/new-site-controls.png)

Same page controls, new icon. The lock continues to exist as a precisely scoped entry point to connection security information, but with a new top-level access point.

We'll be replacing the lock icon on Android at the same time as the broader desktop change. On iOS, the lock icon is not tappable, so we will be removing it entirely. On all platforms, we will continue to mark plaintext HTTP as insecure.

As HTTPS has become the norm, replacing the lock icon has long been a goal both of Chrome and the broader security community. We're excited that HTTPS adoption has grown so much over the years, and that we're finally able to safely take this step, and continue to move towards a web that is secure-by-default.