---
title: Redesigning Chrome downloads, to keep you productive and safe online
date: 2023-08-03
source-url: https://blog.chromium.org/2023/08/redesigning-chrome-downloads-to-keep.html
source-blog: Chromium blog
---

With the latest release of Chrome for desktop we are introducing a redesign of the Chrome downloads experience to make it easier for you to interact with your recent downloads. Let's go behind the scenes and learn more about this redesign from Chrome Senior Product Manager Jasika Bawa.

### What influenced your decision to redesign Chrome downloads?

Downloads are a core part of day to day web browsing, from getting the perfect cat themed background for your PC to saving a copy of your tax return. Over the years, we have listened to your feedback about the legacy Chrome downloads experience. We learned that while there was a lot about it that worked well for you, like strong support for core download journeys and built-in protection from potentially harmful files, it had its problems too. For example, it --

-   Occupied precious pixels at the bottom of the screen which squeezed the web content area, and was limited by screen width in how many files it could show at once

-   Didn't go away automatically, and only offered actions such as pause/resume and open in folder from a fixed overflow menu

-   Was no longer modern, interactive, and consistent with the look and feel of other browser UI or the browser ecosystem at large

All this made it clear that there was room for improvement for us to create a more intuitive experience for downloading in Chrome.

### What does the redesign have to offer?

The new download tray is available to the right of the Chrome address bar and replaces the legacy downloads experience at the bottom of your screen. When a download is in progress, an animated ring helps you monitor it with a quick glance. The tray opens when you've finished downloading a file and automatically dismisses itself, making it easy to access quickly and allowing you to continue browsing uninterrupted.

[![GIF of the Chrome browser with the cursor clicking the "save" option of a web file. The download in progress icon appears with a progress ring around it. Once the file has finished downloading, the download tray opens automatically.](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbJmzVloE8K113g3HXvVR5m0deTAdu9ojWOh4-HcgtdFdFE8uu2NCIHr0BAfQLyot8VtOk6qrNt51xjk0howX9ufqNicGw53OLikufsJrAJxuFSeMbdWBB-bCw8VoywDYQmM16_Zz56bPk2nbIBooBHDbDSVvypVvv-t9NQgT5EjXBKn6flb6WI3Uw0P3k/s16000/03_Downloads_Typical_Workflow.gif)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbJmzVloE8K113g3HXvVR5m0deTAdu9ojWOh4-HcgtdFdFE8uu2NCIHr0BAfQLyot8VtOk6qrNt51xjk0howX9ufqNicGw53OLikufsJrAJxuFSeMbdWBB-bCw8VoywDYQmM16_Zz56bPk2nbIBooBHDbDSVvypVvv-t9NQgT5EjXBKn6flb6WI3Uw0P3k/s1080/03_Downloads_Typical_Workflow.gif)

With the download tray, you can see a list of all your downloads from the past 24 hours in any browser window, not just the one in which you originally downloaded a file. The tray also offers in-line options to open the folder a download is in, cancel a download, retry a download should it fail for any reason, and pause/resume downloads.

[![GIF of the Chrome browser with the cursor opening the download tray to the right of the Chrome address bar. The download tray shows a file download in progress, and offers an in-line option to pause the download. The cursor clicks on the pause button, which turns into a play button. The cursor clicks on the play button to resume the download progress.](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVxwPqeNXRP5BuOktf_i-hO_BsAqiNPI0IKBJVfSUJ15wkd1cIpzB3zL-P6_GVU8OfJ5-aCCgu37-iZ0eBXPgeKdETiNxYt4e_rjPghPc7C2B03HpZloUjsELm7-wZuC9BSNq-6_q_-Ot03u_7QQM7rtOZOjcNBEcsVQU91l1BePBs4fusB0NFtxdSdpgf/s16000/02_Downloads_Pause_Resume.gif)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVxwPqeNXRP5BuOktf_i-hO_BsAqiNPI0IKBJVfSUJ15wkd1cIpzB3zL-P6_GVU8OfJ5-aCCgu37-iZ0eBXPgeKdETiNxYt4e_rjPghPc7C2B03HpZloUjsELm7-wZuC9BSNq-6_q_-Ot03u_7QQM7rtOZOjcNBEcsVQU91l1BePBs4fusB0NFtxdSdpgf/s1080/02_Downloads_Pause_Resume.gif)

### How will the new downloads experience help keep people safe online? 

We always want to make sure you are safe when downloading files, so Chrome will continue to provide clear warning signs of potential malware or viruses to protect your device and accounts. In fact, the additional space and more flexible UI of the new Chrome downloads experience will give us the opportunity to provide even more context when Chrome [protects you from a potentially malicious file](https://support.google.com/chrome/answer/6261569), and enable us to build advanced [deep scan](https://security.googleblog.com/2022/12/enhanced-protection-strongest-level-of.html) options that we couldn't before. Be sure to watch the [Google Security Blog](https://security.googleblog.com/) for more details on these coming soon.

In addition to download warnings, the download tray being anchored next to the Chrome address bar helps create a clearer separation of trusted browser UI from web content, which was something we wanted to ensure with the redesign.

[![Image asset of Chrome browser with zoom in of download tray showing a notification that a dangerous file was blocked from being downloaded.](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTIT3vfufB0MF9eg6j7R63Pnzb3WUEkFmCb5ZifLGjdBoLUt7SNZNM4o86VGq84QsN4k03XFLFhqLZcJIXEoKScOcY8bFgHFJa9Sa7WYD1fbcZjnYdF00BKfKLMGKHe7_mTTQu8YrN5utgTtNfS66K_28U8juA5qP-h3-g9yHL82446t6C4_cNyN73DZbt/s16000/01_Warning.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTIT3vfufB0MF9eg6j7R63Pnzb3WUEkFmCb5ZifLGjdBoLUt7SNZNM4o86VGq84QsN4k03XFLFhqLZcJIXEoKScOcY8bFgHFJa9Sa7WYD1fbcZjnYdF00BKfKLMGKHe7_mTTQu8YrN5utgTtNfS66K_28U8juA5qP-h3-g9yHL82446t6C4_cNyN73DZbt/s2251/01_Warning.png)

### How did you think about making the transition to the new downloads experience easier?

It was important to us that all the functionality of the legacy Chrome downloads experience be made available in the new one.  For example, you can still drag a downloaded file to another folder, program, or website, and perform actions like "Always open" from the new download tray. If you want a more detailed view of your downloads, you can continue to access this by selecting the "Show all downloads" option in the download tray, by clicking "Downloads" from the Chrome three dot menu, or by typing chrome://downloads in the Chrome address bar.

We also took feedback from our early experiments seriously, and used it to make changes like adjusting the frequency with which the download tray opens. You can even choose to have the tray not open automatically at all, in Chrome settings.

[![Image of the Downloads settings menu in Chrome browser when you can select the option to disable showing downloads when they're done.](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9rQCF4Q6wS6Fd3eRFNKBFDlW4PTEfKB66TcZpNqUCo-k-wuDttbt4Y2YST0OX6FVIbDglglvRLyrd6ACsYhiT9fAXdBcA4oxMo6KAZ9_mp-sOWK4VR4O6Y1bFTW2skTGLZFP0eiGaPKhevDG6t3_6PfX5xRC7WDHH43nKg0_IvH9fkchTMneMFoDLrsoS/s16000/05_NewSetting.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9rQCF4Q6wS6Fd3eRFNKBFDlW4PTEfKB66TcZpNqUCo-k-wuDttbt4Y2YST0OX6FVIbDglglvRLyrd6ACsYhiT9fAXdBcA4oxMo6KAZ9_mp-sOWK4VR4O6Y1bFTW2skTGLZFP0eiGaPKhevDG6t3_6PfX5xRC7WDHH43nKg0_IvH9fkchTMneMFoDLrsoS/s4168/05_NewSetting.png)

### Are there any steps developers need to take? 

For developers, we'd like to highlight the opportunity to update any guidance or visuals you may have built to help guide users through their download journey. You may want to consider referencing the [Download a file](https://support.google.com/chrome/answer/95759) topic in the Google Chrome Help Center as a starting point.

For extension developers, it is worth noting changes to [chrome.downloads](https://developer.chrome.com/docs/extensions/reference/downloads/) extensions APIs in case you need to update your extensions -- specifically, [setShelfEnabled](https://developer.chrome.com/docs/extensions/reference/downloads/#method-setShelfEnabled) has been replaced by [setUiOptions](https://developer.chrome.com/docs/extensions/reference/downloads/#method-setUiOptions) which lets you show or hide the new downloads experience.

We hope you'll enjoy this fresh coat of paint! We'll continue to build upon it in future releases to help you stay productive in Chrome while keeping you safe when downloading files from the web.