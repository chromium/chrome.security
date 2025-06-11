---
title: "New permission prompt for Local Network Access"
author: Chris Thompson
date: 2025-06-09
source-url: https://developer.chrome.com/blog/local-network-access?hl=en
source-blog: Chrome for Developers Blog
---

Chrome is adding a new permission prompt for sites that make connections to a user's local network as part of the draft Local Network Access specification. The aim is to protect users from cross-site request forgery (CSRF) attacks targeting routers and other devices on private networks, and to reduce the ability of sites to use these requests to fingerprint the user's local network.

To understand how this change impacts the web ecosystem, the Chrome team is looking for feedback from developers who build web applications that rely on making connections to a user's local network or to software running locally on the user's machine. From Chrome 138, you can opt-in to these new restrictions by going to `chrome://flags/#local-network-access-check` and setting the flag to "Enabled (Blocking)".