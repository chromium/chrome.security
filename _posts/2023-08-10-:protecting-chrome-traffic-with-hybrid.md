---
title: Protecting Chrome Traffic with Hybrid Kyber KEM
author: Devon O'Brien, Technical Program Manager, Chrome Security 
date: 2023-08-10
source-url: https://blog.chromium.org/2023/08/protecting-chrome-traffic-with-hybrid.html
source-blog: Chromium Blog
---

Teams across Google are working hard to prepare the web for the migration to quantum-resistant cryptography. Continuing with our [strategy](https://cloud.google.com/blog/products/identity-security/how-google-is-preparing-for-a-post-quantum-world) for handling this major transition, we are updating technical standards, testing and deploying new quantum-resistant algorithms, and working with the broader ecosystem to help ensure this effort is a success.

As a step down this path, Chrome will begin supporting [X25519Kyber768](https://www.ietf.org/archive/id/draft-tls-westerbaan-xyber768d00-02.html) for establishing symmetric secrets in TLS, starting in Chrome 116, and available behind a flag in Chrome 115. This hybrid mechanism combines the output of two cryptographic algorithms to create the session key used to encrypt the bulk of the TLS connection:

-   [X25519](https://www.rfc-editor.org/rfc/rfc7748) -- an elliptic curve algorithm widely used for key agreement in TLS today

-   [Kyber-768](https://pq-crystals.org/kyber/index.shtml) -- a quantum-resistant [Key Encapsulation Method](https://en.wikipedia.org/wiki/Key_encapsulation_mechanism), and [NIST's PQC winner](https://www.nist.gov/news-events/news/2022/07/nist-announces-first-four-quantum-resistant-cryptographic-algorithms) for general encryption

In order to identify ecosystem incompatibilities with this change, we are rolling this out to Chrome and to Google servers, over both TCP and QUIC and monitoring for possible compatibility issues. Chrome may also use this updated key agreement when connecting to third-party server operators, such as [Cloudflare](https://blog.cloudflare.com/post-quantum-for-all/), as they add support. If you are a developer or administrator experiencing an issue that you believe is caused by this change, please [file a bug](https://bugs.chromium.org/p/chromium/issues/entry?components=Internals%3ENetwork%3ESSL). The remainder of this post provides important background information to help understand this change as well as the motivations behind it.

### The Post-Quantum Motivation

Modern networking protocols like TLS use cryptography for a variety of purposes including protecting information (confidentiality) and validating the identity of websites (authentication). The strength of this cryptography is expressed in terms of how hard it would be for an attacker to violate one or more of these properties. There's a common mantra in cryptography that attacks only get better, not worse, which highlights the importance of moving to stronger algorithms as attacks advance and improve over time.

One such advancement is the development of quantum computers, which will be capable of efficiently performing certain computations that are out of reach of existing computing methods. Many types of asymmetric cryptography used today are considered strong against attacks using existing technology but do not protect against attackers with a sufficiently-capable quantum computer.

Quantum-resistant cryptography must also be secure against both quantum and classical cryptanalytic techniques. This is not theoretical: in 2022 and 2023, several [leading](https://eprint.iacr.org/2022/214.pdf)  [candidates](https://eprint.iacr.org/2022/975) for quantum-resistant cryptographic algorithms have been broken on inexpensive and commercially available hardware. Hybrid mechanisms such as X25519Kyber768 provide the flexibility to deploy and test new quantum-resistant algorithms while ensuring that connections are still protected by an existing secure algorithm.

On top of all these considerations, these algorithms must also be performant on commercially available hardware, providing yet another layer of challenge to this already complex problem.

### Why Protecting Data in Transit is Important Now

It's believed that quantum computers that can break modern classical cryptography won't arrive for 5, 10, possibly even 50 years from now, so why is it important to start protecting traffic today? The answer is that certain uses of cryptography are vulnerable to a type of attack called [Harvest Now, Decrypt Later](https://en.wikipedia.org/wiki/Harvest_now,_decrypt_later), in which data is collected and stored today and later decrypted once cryptanalysis improves.

In TLS, even though the symmetric encryption algorithms that protect the data in transit are considered safe against quantum cryptanalysis, the way that the symmetric keys are created is not. This means that in Chrome, the sooner we can update TLS to use quantum-resistant session keys, the sooner we can protect user network traffic against future quantum cryptanalysis.

### Deployment Considerations

Using X25519Kyber768 adds over a kilobyte of extra data to the TLS ClientHello message due to the addition of the Kyber-encapsulated key material. Our earlier [experiments with CECPQ2](https://www.chromium.org/cecpq2/) demonstrated that the vast majority of TLS implementations are compatible with this size increase; however, in certain limited cases, TLS middleboxes failed due to improperly hardcoded restrictions on message size.

To assist with enterprises dealing with network appliance incompatibility while these new algorithms get rolled out, administrators can disable X25519Kyber768 in Chrome using the [PostQuantumKeyAgreementEnabled](https://chromeenterprise.google/policies/#PostQuantumKeyAgreementEnabled) enterprise policy, available starting in Chrome 116. This policy will only be offered as a temporary measure; administrators are strongly encouraged to work with the vendors of the affected products to ensure that bugs causing incompatibilities get fixed as soon as possible.

As a final deployment consideration, both the X25519Kyber768 and the Kyber specifications are drafts and may change before they are finalized, which may result in Chrome's implementation changing as well.