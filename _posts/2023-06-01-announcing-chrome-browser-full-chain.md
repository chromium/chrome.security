---
title: Announcing the Chrome Browser Full Chain Exploit Bonus
author: Amy Ressler, on behalf of the Chrome VRP
date: 2023-06-01
source-url: https://security.googleblog.com/2023/06/announcing-chrome-browser-full-chain.html
source-blog: Google Security Blog
---

For 13 years, a key pillar of the Chrome Security ecosystem has included encouraging security researchers to find security vulnerabilities in Chrome browser and report them to us, through the [Chrome Vulnerability Rewards Program](https://g.co/chrome/vrp).

Starting today and until 1 December 2023, the first security bug report we receive with a functional full chain exploit, resulting in a Chrome sandbox escape, is eligible for **triple the full reward amount**. Your full chain exploit could result in a reward up to $180,000 (potentially more with other bonuses).

Any subsequent full chains submitted during this time are eligible for **double the full reward amount**!

We have historically put a premium on reports with exploits -- "high quality reports with a functional exploit" is the highest tier of reward amounts in our Vulnerability Rewards Program. Over the years, the threat model of Chrome browser has evolved as features have matured and new features and new mitigations, such a [MiraclePtr](https://security.googleblog.com/2022/09/use-after-freedom-miracleptr.html), have been introduced. Given these evolutions, we're always interested in explorations of new and novel approaches to fully exploit Chrome browser and we want to provide opportunities to better incentivize this type of research. These exploits provide us valuable insight into the potential attack vectors for exploiting Chrome, and allow us to identify strategies for better hardening specific Chrome features and ideas for future broad-scale mitigation strategies.

The full details of this bonus opportunity are available on the [Chrome VRP rules and rewards page](https://g.co/chrome/vrp). The summary is as follows:

-   The bug reports may be submitted in advance while exploit development continues during this 180-day window. The functional exploits must be submitted to Chrome by the end of the 180-day window to be eligible for the triple or double reward.
    -   The first functional full chain exploit we receive is eligible for the triple reward amount.
-   The full chain exploit must result in a Chrome browser sandbox escape, with a demonstration of attacker control / code execution outside of the sandbox.
-   Exploitation must be able to be performed remotely and no or very limited reliance on user interaction.
-   The exploit must have been functional in an active release channel of Chrome (Dev, Beta, Stable, Extended Stable) at the time of the initial reports of the bugs in that chain. Please do not submit exploits developed from publicly disclosed security bugs or other artifacts in old, past versions of Chrome.

As is consistent with our general rewards policy, if the exploit allows for remote code execution (RCE) in the browser or other highly-privileged process, such as network or GPU process, to result in a sandbox escape without the need of a first stage bug, the reward amount for renderer RCE "high quality report with functional exploit" would be granted and included in the calculation of the bonus reward total.

Based on our current [Chrome VRP reward matrix](https://bughunters.google.com/about/rules/5745167867576320/chrome-vulnerability-reward-program-rules#reward-amounts), your full chain exploit could result in a total reward of over $165,000 -$180,000 for the first full chain exploit and over $110,000 - $120,000 for subsequent full chain exploits we receive in the six month window of this reward opportunity.

We'd like to thank our entire Chrome researcher community for your past and ongoing efforts and security bug submissions! You've truly helped us make Chrome more secure for all users.

Happy Hunting!