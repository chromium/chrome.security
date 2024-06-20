---
title: Staying Safe with Chrome Extensions
author: Benjamin Ackerman, Anunoy Ghosh and David Warren
date: 2024-06-20
source-url: https://security.googleblog.com/2024/06/staying-safe-with-chrome-extensions.html
source-blog: Google Security Blog
---

Chrome extensions can boost your browsing, empowering you to do anything from customizing the look of sites to providing personalized advice when you're planning a vacation. But as with any software, extensions can also introduce risk.

That's why we have a team whose only job is to focus on keeping you safe as you install and take advantage of Chrome extensions. Our team:

-   Provides you with a personalized summary of the extensions you've installed
-   Reviews extensions before they're published on the Chrome Web Store
-   Continuously monitors extensions after they're published

### A summary of your extensions

The top of the extensions page (chrome://extensions) warns you of any extensions you have installed that might pose a security risk. (If you don't see a warning panel, you probably don't have any extensions you need to worry about.) The panel includes:

-   Extensions suspected of including malware
-   Extensions that violate Chrome Web Store policies
-   Extensions that have been unpublished by a developer, which might indicate that an extension is no longer supported
-   Extensions that aren't from the [Chrome Web Store](https://security.googleblog.com/2024/06/chromewebstore.google.com/)
-   Extensions that haven't published what they do with data they collect and other privacy practices

You'll get notified when Chrome's Safety Check has recommendations for you or you can check on your own by running Safety Check. Just type "run safety check" in Chrome's address bar and select the corresponding shortcut: "Go to Chrome safety check."

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGnX_FKYFwb8VZZcQnZ3-XBpz2N_7yicx-E6FYd0gPL2-WtKiKStwT6-9h-i6y-wlxaFuCriKKNceyRJxSIBkP4V2b0-rk-TK0C9XNxivbsUmpJe3o7TCrlAlKS2eO39XDVePBHjwjI9AqOnCcs-X7qiiFL3wfozInqP5FxGs4dykCva0QObfrWxAqd2g5/s16000/PS_Extension-Review-Panel_V3.gif)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGnX_FKYFwb8VZZcQnZ3-XBpz2N_7yicx-E6FYd0gPL2-WtKiKStwT6-9h-i6y-wlxaFuCriKKNceyRJxSIBkP4V2b0-rk-TK0C9XNxivbsUmpJe3o7TCrlAlKS2eO39XDVePBHjwjI9AqOnCcs-X7qiiFL3wfozInqP5FxGs4dykCva0QObfrWxAqd2g5/s1920/PS_Extension-Review-Panel_V3.gif)

*User flow of removing extensions highlighted by Safety Check.*

Besides the Safety Check, you can visit the extensions page directly in a number of ways:

-   Navigate to chrome://extensions
-   Click the puzzle icon and choose "Manage extensions"
-   Click the More choices menu and choose menu > Extensions > Manage Extensions

### Reviewing extensions before they're published

Before an extension is even accessible to install from the Chrome Web Store, we have two levels of verification to ensure an extension is safe:

1.  **An automated review**: Each extension gets examined by our machine-learning systems to spot possible violations or suspicious behavior.
2.  **A human review**: Next, a team member examines the images, descriptions, and public policies of each extension. Depending on the results of both the automated and manual review, we may perform an even deeper and more thorough review of the code.

This review process weeds out the overwhelming majority of bad extensions before they even get published. In 2024, less than 1% of all installs from the Chrome Web Store were found to include malware. We're proud of this record and yet some bad extensions still get through, which is why we also monitor published extensions.

### Monitoring published extensions

The same Chrome team that reviews extensions before they get published also reviews extensions that are already on the Chrome Web Store. And just like the pre-check, this monitoring includes both human and machine reviews. We also work closely with trusted security researchers outside of Google, and even pay researchers who report possible threats to Chrome users through our [Developer Data Protection Rewards Program](https://bughunters.google.com/about/rules/5878023369523200/developer-data-protection-reward-program-rules#chrome-extensions).

What about extensions that get updated over time, or are programmed to execute malicious code at a later date? Our systems monitor for that as well, by periodically reviewing what extensions are actually doing and comparing that to the stated objectives defined by each extension in the Chrome Web Store.

If the team finds that an extension poses a severe risk to Chrome users, it's immediately remove from the Chrome Web Store and the extension gets disabled on all browsers that have it installed.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5EZOqvRh5BCBErZ6qEN2pXYDPjbCUXL8VmMKCXo-Hz57cfx9yMD97oCmoZ2qpHOGM-3rAPkoStj458SJLdFSz2lNKq6ggIsbb31Paa2uEK_j1YsHlJVnk0wWkRRxQpYjAKWHkldOktUBtVLLogyHg40TTt4SdqY4aQFit9PhYdDT6RJrgwrW0xN5vNeZg/s16000/Chrome_Privacy-Sandbox_Extensions-Safety-Blog-In-line-Asset-1.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5EZOqvRh5BCBErZ6qEN2pXYDPjbCUXL8VmMKCXo-Hz57cfx9yMD97oCmoZ2qpHOGM-3rAPkoStj458SJLdFSz2lNKq6ggIsbb31Paa2uEK_j1YsHlJVnk0wWkRRxQpYjAKWHkldOktUBtVLLogyHg40TTt4SdqY4aQFit9PhYdDT6RJrgwrW0xN5vNeZg/s2000/Chrome_Privacy-Sandbox_Extensions-Safety-Blog-In-line-Asset-1.png)

*The extensions page highlights when you have a potentially unsafe extension downloaded*

### Others steps you can take to stay safe

Review new extensions before installing them
--------------------------------------------

The Chrome Web Store provides useful information about each extension and its developer. The following information should help you decide whether it's safe to install an extension:

-   [Verified and featured badges](https://blog.google/products/chrome/find-great-extensions-new-chrome-web-store-badges/) are awarded by the Chrome team to extensions that follow our technical best practices and meet a high standard of user experience and design
-   Ratings and reviews from our users
-   Information about the developer
-   Privacy practices, including information about how an extension handles your data

Be careful of sites that try to quickly persuade you to install extensions, especially if the site has little in common with the extension.

Review extensions you've already installed
------------------------------------------

Even though Safety Check and your Extensions page (chrome://extensions) warn you of extensions that might pose a risk, it's still a good idea to review your extensions from time to time.

1.  Uninstall extensions that you no longer use.
2.  Review the description of an extension in the Chrome Web Store, considering the extension's ratings, reviews, and privacy practices --- reviews can change over time.
3.  Compare an extension's stated goals with 1) the permissions requested by an extension and 2) the privacy practices published by the extension. If requested permissions don't align with stated goals, consider uninstalling the extension.
4.  [Limit the sites](https://support.google.com/chrome_webstore/answer/2664769?hl=en) an extension has permission to work on.

Enable Enhanced Protection
--------------------------

The Enhanced protection mode of Safe Browsing is Chrome's [highest level of protection](https://security.googleblog.com/2022/12/enhanced-protection-strongest-level-of.html) that we offer. Not only does this mode provide you with the best protections against phishing and malware, but it also provides additional features targeted to keep you safe against potentially harmful extensions. Threats are constantly evolving and Safe Browsing's Enhanced protection mode is the best way to ensure that you have the most advanced security features in Chrome. This can be enabled from the Safe Browsing settings page in Chrome (chrome://settings/security) and selecting "Enhanced".
