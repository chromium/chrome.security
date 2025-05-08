---
title: How we’re using AI to combat the latest scams
author: Jasika Bawa, Andy Lim, and Xinghui Lu, Google Chrome Security
date: 2025-05-08
source-url: https://security.googleblog.com/2025/05/using-ai-to-stop-tech-support-scams-in.html
source-blog: Google Security Blog
---

Tech support scams are an increasingly prevalent form of cybercrime, characterized by deceptive tactics aimed at extorting money or gaining unauthorized access to sensitive data. In a tech support scam, the goal of the scammer is to trick you into believing your computer has a serious problem, such as a virus or malware infection, and then convince you to pay for unnecessary services, software, or grant them remote access to your device. Tech support scams on the web often employ alarming pop-up warnings mimicking legitimate security alerts. We've also observed them to use full-screen takeovers and disable keyboard and mouse input to create a sense of crisis.

Chrome has always worked with Google Safe Browsing to help keep you safe online. Now, with this week's launch of Chrome 137, Chrome will offer an additional layer of protection using the on-device Gemini Nano large language model (LLM). This new feature will leverage the LLM to generate signals that will be used by Safe Browsing in order to deliver higher confidence verdicts about potentially dangerous sites like tech support scams.

Initial research using LLMs has shown that they are relatively effective at understanding and classifying the varied, complex nature of websites. As such, we believe we can leverage LLMs to help detect scams at scale and adapt to new tactics more quickly. But why on-device? Leveraging LLMs on-device allows us to see threats *when* users see them. We've found that the average malicious site exists for less than 10 minutes, so on-device protection allows us to detect and block attacks that haven't been crawled before. The on-device approach also empowers us to see threats *the way* users see them. Sites can render themselves differently for different users, often for legitimate purposes (e.g. to account for device differences, offer personalization, provide time-sensitive content), but sometimes for illegitimate purposes (e.g. to evade security crawlers) -- as such, having visibility into how sites are presenting themselves to real users enhances our ability to assess the web.

**How it works**

At a high level, here's how this new layer of protection works.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdBy208g6OvBj96GRY-gYdb-cZ_IgKRDRkXh3-hLO3hR8IyCBIZifB6dnNP_vIfLFkoDb18TQeNJ-rDQKftNE9784jClEgqkx_8jsI1EJeaKcAaVSGhp41a2frCVKtBkjAhpCwI3u7bnW2wEJ8V9VQoTwxc-gsWE6oKNh6Ps01FPQg54tHxCzOq2Nk_O2g/s1600/Screenshot%202025-05-07%20at%202.35.55%E2%80%AFPM.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdBy208g6OvBj96GRY-gYdb-cZ_IgKRDRkXh3-hLO3hR8IyCBIZifB6dnNP_vIfLFkoDb18TQeNJ-rDQKftNE9784jClEgqkx_8jsI1EJeaKcAaVSGhp41a2frCVKtBkjAhpCwI3u7bnW2wEJ8V9VQoTwxc-gsWE6oKNh6Ps01FPQg54tHxCzOq2Nk_O2g/s1600/Screenshot%202025-05-07%20at%202.35.55%E2%80%AFPM.png)

Overview of how on-device LLM assistance in mitigating scams works

When a user navigates to a potentially dangerous page, specific triggers that are characteristic of tech support scams (for example, the use of the [keyboard lock API](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard/lock)) will cause Chrome to evaluate the page using the on-device Gemini Nano LLM. Chrome provides the LLM with the contents of the page that the user is on and queries it to extract security signals, such as the intent of the page. This information is then sent to Safe Browsing for a final verdict. If Safe Browsing determines that the page is likely to be a scam based on the LLM output it receives from the client, in addition to other intelligence and metadata about the site, Chrome will show a warning interstitial.

This is all done in a way that preserves performance and privacy. In addition to ensuring that the LLM is only triggered sparingly and run locally on the device, we carefully manage resource consumption by considering the number of tokens used, running the process asynchronously to avoid interrupting browser activity, and implementing throttling and quota enforcement mechanisms to limit GPU usage. LLM-summarized security signals are only sent to Safe Browsing for users who have opted-in to the [Enhanced Protection mode of Safe Browsing](https://support.google.com/chrome/answer/9890866?hl=en&co=GENIE.Platform%3DDesktop&oco=0#zippy=%2Cenhanced-protection) in Chrome, giving them protection against threats Google may not have seen before. Standard Protection users will also benefit indirectly from this feature as we add newly discovered dangerous sites to blocklists.

**Future considerations**

The scam landscape continues to evolve, with bad actors constantly adapting their tactics. Beyond tech support scams, in the future we plan to use the capabilities described in this post to help detect other popular scam types, such as package tracking scams and unpaid toll scams. We also plan to utilize the growing power of Gemini to extract additional signals from website content, which will further enhance our detection capabilities. To protect even more users from scams, we are working on rolling out this feature to Chrome on Android later this year. And finally, we are collaborating with our research counterparts to explore solutions to potential exploits such as prompt injection in content and timing bypass.