---
title: Building security into the redesigned Chrome downloads experience
author: Jasika Bawa, Lily Chen, and Daniel Rubery
date: 2024-07-24
source-url: https://security.googleblog.com/2024/07/building-security-into-redesigned.html
source-blog: Google Security Blog
---

Last year, we introduced a [redesign](https://blog.chromium.org/2023/08/redesigning-chrome-downloads-to-keep.html) of the Chrome downloads experience on desktop to make it easier for users to interact with recent downloads. At the time, we mentioned that the additional space and more flexible UI of the new Chrome downloads experience would give us new opportunities to make sure users stay safe when downloading files.

**Adding context and consistency to download warnings**

The redesigned Chrome downloads experience gives us the opportunity to provide even more context when Chrome protects a user from a [potentially malicious file](https://support.google.com/chrome/answer/6261569). Taking advantage of the additional space available in the new downloads UI, we have replaced our previous warning messages with more detailed ones that convey more nuance about the nature of the danger and can help users make more informed decisions.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3gQhfi9Adg__U7OfrbECy8i7-lZIrptsdyyahf0H2Ky5geMifkcYWAxdmNifsoRZiXn4uN5Ybgq2ycO0ZGEmajqLYEjRb5fH52Mw9-swQCxJ5cv67zEt133yYJh651bS5YpUDG9LcAyC5PwG-ZvL1fO2tFXwS91Q5c9V20ms70V6DWe1TJamrZc-NmTid/s16000/RedesignedWarning_inline_7.10.24_V3.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3gQhfi9Adg__U7OfrbECy8i7-lZIrptsdyyahf0H2Ky5geMifkcYWAxdmNifsoRZiXn4uN5Ybgq2ycO0ZGEmajqLYEjRb5fH52Mw9-swQCxJ5cv67zEt133yYJh651bS5YpUDG9LcAyC5PwG-ZvL1fO2tFXwS91Q5c9V20ms70V6DWe1TJamrZc-NmTid/s2000/RedesignedWarning_inline_7.10.24_V3.png)

*Our legacy, space-constrained warning vs. our redesigned one*

We also made download warnings more understandable by introducing a two-tier download warning taxonomy based on AI-powered malware verdicts from [Google Safe Browsing](https://safebrowsing.google.com/). These are:

1.  Suspicious files (lower confidence verdict, unknown risk of user harm)
2.  Dangerous files (high confidence verdict, high risk of user harm)

These two tiers of warnings are distinguished by iconography, color, and text, to make it easy for users to quickly and confidently make the best choice for themselves based on the nature of the danger and Safe Browsing's level of certainty. Overall, these improvements in clarity and consistency have resulted in significant changes in user behavior, including fewer warnings bypassed, warnings heeded more quickly, and all in all, better protection from malicious downloads.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPtYz0ba59W8_Orn_Q_viwJ_brTwqLTlZeGwUPAO0IRmuyKWSv4Fxr6Fb34UfBJzHAT0Ydok7JdnPb26t7GxRQD3whlixXbqzrfuFlKYs8DsuH1_Zd3QieU1-RyrGODIrWzJavG-PH0uBchqOFTT51Wgea8uLxTFD_2XHIBy3Vmw77nOmbOIbuqmNq4jOC/s16000/SuspiciousAndDangerous_inline_V2.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPtYz0ba59W8_Orn_Q_viwJ_brTwqLTlZeGwUPAO0IRmuyKWSv4Fxr6Fb34UfBJzHAT0Ydok7JdnPb26t7GxRQD3whlixXbqzrfuFlKYs8DsuH1_Zd3QieU1-RyrGODIrWzJavG-PH0uBchqOFTT51Wgea8uLxTFD_2XHIBy3Vmw77nOmbOIbuqmNq4jOC/s1080/SuspiciousAndDangerous_inline_V2.png)

*Differentiation between suspicious and dangerous warnings*

**Protecting more downloads with automatic deep scans**

Users who have opted-in to the [Enhanced Protection](https://support.google.com/chrome/answer/9890866) mode of Safe Browsing in Chrome are prompted to send the contents of suspicious files to Safe Browsing for deep scanning before opening the file. Suspicious files are a small fraction of overall downloads, and file contents are only scanned for security purposes and are deleted shortly after a verdict is returned.

We've found these additional scans to have been extraordinarily successful -- they help catch brand new malware that Safe Browsing has not seen before and dangerous files hosted on brand new sites. In fact, **files sent for deep scanning are over 50x more likely to be flagged as malware** than downloads in the aggregate.

Since Enhanced Protection users have already agreed to send a small fraction of their downloads to Safe Browsing for security purposes in order to benefit from additional protections, we recently moved towards automatic deep scans for these users rather than prompting each time. This will protect users from risky downloads while reducing user friction.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYi1YW6gCA9xGgTp67Z7QVvH6guYbAVN6HUl1XrOxAYHS308MtmpVddM83GMVWa8OUtctfL5HA0gMopBIgw8qNX3OXD6j_8HWKYyfzy0nwhFYxvhiJIsx3W251jg8Jnv2Wx4_X3WuNO5YNnJbxU52ru8maUatuULjEGYBNqR0fuJp181b9Gje9tllPDROo/s16000/Chrome_Auto-Scan-Block_Inline_V1.gif)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYi1YW6gCA9xGgTp67Z7QVvH6guYbAVN6HUl1XrOxAYHS308MtmpVddM83GMVWa8OUtctfL5HA0gMopBIgw8qNX3OXD6j_8HWKYyfzy0nwhFYxvhiJIsx3W251jg8Jnv2Wx4_X3WuNO5YNnJbxU52ru8maUatuULjEGYBNqR0fuJp181b9Gje9tllPDROo/s1080/Chrome_Auto-Scan-Block_Inline_V1.gif)

*An automatic deep scan resulting in a warning*

**Staying ahead of attackers who hide in encrypted archives**

Not all deep scans can be conducted automatically. A current trend in [cookie theft](https://blog.google/threat-analysis-group/phishing-campaign-targets-youtube-creators-cookie-theft-malware/) malware distribution is packaging malicious software in an encrypted archive -- a .zip, .7z, or .rar file, protected by a password -- which hides file contents from Safe Browsing and other antivirus detection scans. In order to combat this evasion technique, we have introduced two protection mechanisms depending on the mode of Safe Browsing selected by the user in Chrome.

Attackers often make the passwords to encrypted archives available in places like the page from which the file was downloaded, or in the download file name. For Enhanced Protection users, downloads of suspicious encrypted archives will now prompt the user to enter the file's password and send it along with the file to Safe Browsing so that the file can be opened and a deep scan may be performed. Uploaded files and file passwords are deleted a short time after they're scanned, and all collected data is only used by Safe Browsing to provide better download protections.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeWn18o6NDzNv7ILTz4Hv-U-4kH-WUx8goTr_8HavUJIn_f3vW9DKGJYxd0rmElQdxeYFp6bPmHU3XJkGnZUToAsdkSE_i_xjv7d4CEzR-7crVH3z2jLtOynwIeJYXBbddPfas_-rfSS3R-sbAZkpR3zQyCAiBCpXB4xzc7CUuyPkDRPdlx8lCtAIa5m2_/s16000/FilePassword_inline_Option%2003%20(More%20cropped%20in).png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeWn18o6NDzNv7ILTz4Hv-U-4kH-WUx8goTr_8HavUJIn_f3vW9DKGJYxd0rmElQdxeYFp6bPmHU3XJkGnZUToAsdkSE_i_xjv7d4CEzR-7crVH3z2jLtOynwIeJYXBbddPfas_-rfSS3R-sbAZkpR3zQyCAiBCpXB4xzc7CUuyPkDRPdlx8lCtAIa5m2_/s1080/FilePassword_inline_Option%2003%20(More%20cropped%20in).png)

*Enter a file password to send an encrypted file for a malware scan*

For those who use Standard Protection mode which is the default in Chrome, we still wanted to be able to provide some level of protection. In Standard Protection mode, downloading a suspicious encrypted archive will also trigger a prompt to enter the file's password, but in this case, both the file and the password stay on the local device and only the metadata of the archive contents are checked with Safe Browsing. As such, in this mode, users are still protected as long as Safe Browsing had previously seen and categorized the malware.

The Chrome Security team works closely with Safe Browsing, Google's [Threat Analysis Group](https://blog.google/threat-analysis-group/), and security researchers from around the world to gain insights into the techniques attackers are using. Using these insights, we are constantly adapting our product strategy to stay ahead of attackers and to keep users safe while downloading files in Chrome. We look forward to sharing more in the future!