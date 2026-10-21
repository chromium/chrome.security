---
title: "Protecting Chrome and Android Users from Compromised eMudhra Intermediate CA Certificates"
author: Chrome and Android Security Teams
date: 2026-10-20
source-url: https://blog.google/security/protecting-chrome-and-android-users-from-compromised-emudhra-intermediate-ca-certificates/
source-blog: Google Security Blog
excerpt: On Saturday, October 17, 2026, at 18:05 UTC, the Chrome Root Program received a report from a security researcher regarding the compromise of private keys associated with eight eMudhra subordinate Certification Authority (CA) certificates. The private keys for these certificates were generated with insufficient randomness (i.e., weak cryptographic entropy), enabling anyone to forge trusted HTTPS certificates to impersonate any website against clients that have not yet removed trust in those CAs.
---