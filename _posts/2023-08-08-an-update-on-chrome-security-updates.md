---
title: An update on Chrome Security updates – shipping security fixes to you faster
author: Amy Ressler
date: 2023-08-08
source-url: https://security.googleblog.com/2023/08/an-update-on-chrome-security-updates.html
source-blog: Google Security Blog
excerpt: 
---

To get security fixes to you faster, starting now in Chrome 116, Chrome is shipping weekly Stable channel updates.

Chrome ships a new milestone release [every four weeks](https://chromiumdash.appspot.com/schedule). In between those major releases, we ship updates to address security and other high impact bugs. We currently schedule one of these Stable channel updates (or "*Stable Refresh*") between each milestone. Starting in Chrome 116, Stable updates will be released every week between milestones.

This should not change how you use or update Chrome, nor is the frequency of milestone releases changing, but it does mean security fixes will get to you faster.

### Reducing the Patch Gap

[Chromium](https://www.chromium.org/Home/) is the open source project which powers Chrome and many other browsers. Anyone can view the [source code](https://source.chromium.org/), submit changes for review, and see the changes made by anyone else, even security bug fixes. Users of our Canary (and Beta) channels receive those fixes and can sometimes give us early warning of unexpected stability, compatibility, or performance problems in advance of the fix reaching the Stable channel.

This openness has benefits in testing fixes and discovering bugs, but comes at a cost: bad actors could possibly take advantage of the visibility into these fixes and develop exploits to apply against browser users who haven't yet received the fix. This exploitation of a known and patched security issue is referred to as n-day exploitation.

That's why we believe it's really important to ship security fixes as soon as possible, to minimize this "patch gap".

When a Chrome security bug is fixed, the fix is *landed* in the public Chromium source code repository. The fix is then publicly accessible and discoverable. After the patch is landed, individuals across Chrome are working to test and verify the patch, and evaluate security bug fixes for backporting to affected release branches. Security fixes impacting Stable channel then await the next Stable channel update once they have been backported. The time between the patch being landed and shipped in a Stable channel update is the patch gap.

Chrome began releasing Stable channel updates every two weeks in 2020, with Chrome 77, as a way to help reduce the patch gap. Before Chrome 77, our patch gap averaged 35 days. Since moving the biweekly release cadence, the patch gap has been reduced to around 15 days. The switch to weekly updates allows us to ship security fixes even faster, and further reduce the patch gap.

While we can't fully remove the potential for n-day exploitation, a weekly Chrome security update cadence allows up to ship security fixes 3.5 days sooner on average, *greatly reducing *the already small window for n-day attackers to develop and use an exploit against potential victims and making their lives much more difficult.

### Getting Fixes to You Faster

Not all security bug fixes are used for n-day exploitation. But we don't know which bugs are exploited in practice, and which aren't, so we treat all critical and high severity bugs as if they will be exploited. A lot of work goes into making sure these bugs get triaged and fixed as soon as possible. Rather than having fixes sitting and waiting to be included in the next bi-weekly update, weekly updates will allow us to get important security bug fixes to you sooner, and better protect you and your most sensitive data.

### Reducing Unplanned Updates

As always, we treat any Chrome bug with a [known in-the-wild exploit as a security incident of the highest priority](https://www.youtube.com/watch?v=VN-3-ov8uMM) and set about fixing the bug and getting a fix out to users as soon as possible. This has meant shipping the fix in an unscheduled update, so that you are protected immediately. By now shipping stable updates weekly, we expect the number of unplanned updates to decrease since we'll be shipping updates more frequently.

### What You Can Do

Keep a lookout for notifications from your desktop or mobile device letting you know an [update of Chrome is available](https://www.google.com/chrome/update/). If an update is available, please update immediately each time!

If you are concerned that updating Chrome will interrupt your work or result in lost tabs, not to worry -- when relaunching Chrome to update, [your open tabs and windows are saved](https://support.google.com/chrome/answer/95414) and Chrome re-opens them after restart. If you are browsing in Incognito mode, your tabs will not be saved. You can simply choose to delay restarting by selecting **Not now**, and the updates will be applied the next time you restart Chrome.

We are exploring improved ways of informing you a new Chrome update is available. Keep a lookout for these new notifications which have been rolled out for Stable experimentation to 1% of users.

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7DXfKiWJIcqdFBvPlg_ZGnnR6qrzIsunDS_IlkClc1TpP_4oXJxAtDjcrE2AL-ommP_5Yn_2MEGT0xta9ycIOZu1SBOM4xhCfzfS-t9i8dzKTTzJ_cxBcnO3xyu7K5uQbhoAYex6VTiyG0p_urQjVx-QksmAMrzJGeggIO8RO3KAgYuoGaxzGOTBMVD6z/s1600/Screenshot%202023-08-07%2010.25.24%20PM.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7DXfKiWJIcqdFBvPlg_ZGnnR6qrzIsunDS_IlkClc1TpP_4oXJxAtDjcrE2AL-ommP_5Yn_2MEGT0xta9ycIOZu1SBOM4xhCfzfS-t9i8dzKTTzJ_cxBcnO3xyu7K5uQbhoAYex6VTiyG0p_urQjVx-QksmAMrzJGeggIO8RO3KAgYuoGaxzGOTBMVD6z/s1600/Screenshot%202023-08-07%2010.25.24%20PM.png)

Other Chromium-based browsers have varying patch gaps. Chrome does not control the update cadence of other Chromium browsers. The change described here is only applicable to Chrome. If you are using other Chromium browsers, you may want to explore the security update cadence of those browsers.

The rest is on us -- with this change we're dedicated to continuing to work to get security fixes to you as fast as possible.