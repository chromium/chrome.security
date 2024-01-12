---
title: Announcing the Launch of the Chrome Root Program
author: Ryan Dickson, Chris Clements, Emily Stark
date: 2022-09-19
source-url: https://blog.chromium.org/2022/09/announcing-launch-of-chrome-root-program.html
source-blog: Chromium Blog
---

In 2020, we [announced](https://groups.google.com/g/mozilla.dev.security.policy/c/3Q36J4flnQs/m/VyWFiVwrBQAJ) we were in the early phases of establishing the Chrome Root Program and launching the Chrome Root Store.

The Chrome Root Program ultimately determines which website certificates are trusted by default in Chrome, and enables more consistent and reliable website certificate validation across platforms.

This post shares an update on our progress and how these changes help us better protect Chrome's users.



What's a root store or root program, anyway?
--------------------------------------------

Chrome uses [digital certificates](https://en.wikipedia.org/wiki/Public_key_certificate) (often referred to as "certificates," "HTTPS certificates," or "server authentication certificates") to ensure the connections it makes on behalf of its users are secure and private. Certificates are responsible for binding a domain name to a public key, which Chrome uses to encrypt data sent to and from the corresponding website.

As part of establishing a secure connection to a website, Chrome verifies that a recognized entity known as a "Certification Authority" (CA) issued its certificate. Certificates issued by a CA not recognized by Chrome or a user's local settings can cause users to see warnings and error pages.

Root stores, sometimes called "trust stores", tell operating systems and applications what certification authorities to trust. The [Chrome Root Store](https://g.co/chrome/root-store) contains the set of [root CA](https://en.wikipedia.org/wiki/Root_certificate) certificates Chrome trusts by default.

A root program is a governance structure that establishes the requirements and security review functions needed to manage the corresponding root store. Members of the Chrome Security Team are responsible for the Chrome Root Program. Our program policy, which establishes the minimum requirements for CAs to be included in the Chrome Root Store, is publicly available [here](https://g.co/chrome/root-policy).



Why is Chrome making these changes?
-----------------------------------

Historically, Chrome integrated with the root store and certificate verification process provided by the platform on which it was running. Standardizing the set of CAs trusted by Chrome across platforms through the transition to the Chrome Root Store, coupled with a consistent certificate verification experience through the use of the Chrome Certificate Verifier, will result in more consistent user and developer experiences.

Launching the Chrome Root Program also represents our ongoing commitment to participating in and improving the Web PKI ecosystem. Innovations like [ACME](https://www.rfc-editor.org/rfc/rfc8555.html) have made it easier than ever for website owners to obtain HTTPS certificates. Technologies like [Certificate Transparency](https://certificate.transparency.dev/) promote increased accountability and transparency, further improving security for Chrome's users. These enhancements, only made possible through community collaboration, make the web a safer place. However, there's still more work to be done.

We want to work alongside CA owners to define and operationalize the next generation of the Web PKI. Our vision for the future includes modern, reliable, highly agile, purpose-driven PKIs that promote automation, simplicity, and security - and we formed the Chrome Root Program and corresponding [policy](https://g.co/chrome/root-policy) to achieve these goals.



When are these changes taking place?
------------------------------------

A "rollout" is a gradual launch of a new feature. Sometimes, to ensure it goes smoothly, we don't enable a new feature for all of our users at once. Instead, we start with a small percentage of users and increase that percentage over time to ensure we minimize unanticipated compatibility issues. The Chrome Root Store and Certificate Verifier began rolling out on Windows and macOS in Chrome 105, with other platforms to follow.

Testing ahead of the rollout described above is possible on Windows and macOS using [these](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/testing.md) instructions.


Will these changes impact me?
-----------------------------

We expect the transition to the Chrome Root Store and Certificate Verifier to be seamless for most users, enterprises, and CA owners.

The Chrome Certificate Verifier considers locally-managed certificates during the certificate verification process. This means if an enterprise distributes a root CA certificate as trusted to its users (for example, by a Windows Group Policy Object), it will be considered trusted in Chrome.

Troubleshooting procedures and other frequently asked questions are available [here](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md).

What's next?
------------

While we don't know exactly what the future of the Web PKI will look like, we remain focused on promoting changes that increase speed, security, stability, and simplicity throughout the ecosystem.

With that in mind, the Chrome team continues to explore introducing future root program [policy](https://g.co/chrome/root-policy) requirements related to the following initiatives:

-   Encouraging modern infrastructures and agility

-   Focusing on simplicity

-   Promoting automation

-   Reducing mis-issuance

-   Increasing accountability and ecosystem integrity

-   Streamlining and improving domain validation practices

-   Preparing for a "[post-quantum](https://csrc.nist.gov/projects/post-quantum-cryptography)" world

We look forward to continuing our collaboration with members of the CA/Browser Forum and other Web PKI ecosystem participants to make the Internet a safer place.