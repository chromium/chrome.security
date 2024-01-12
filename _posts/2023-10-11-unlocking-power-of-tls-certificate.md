---
title: "Unlocking the power of TLS certificate automation for a safer and more reliable Internet"
author: "Chrome Root Program"
date: 2023-10-11
source-url: https://blog.chromium.org/2023/10/unlocking-power-of-tls-certificate.html
source-blog: Chromium blog
---

TL;DR: Automated certificate issuance and management strengthens the underlying security assurances provided by Transport Layer Security (TLS) by increasing agility and resilience. This post describes the benefits of automation and upcoming changes to the Chrome Root Program policy that represent Chrome Security's ongoing commitment to improving web security.

## Introduction

One of the most common tools for enhancing user security on the Internet is "Transport Layer Security" (TLS), formerly known as "Secure Socket Layer" (SSL). At its most basic level, TLS is a security protocol that encrypts data such that only the intended recipient can read it.

Encryption makes the Internet more secure, but only if consistently and reliably deployed. The adoption of modern practices, like automated TLS certificate issuance and management, helps achieve this goal.

### Background: TLS - The Foundation for Encrypted Communications on the Internet

You're probably more familiar with TLS than you think, as it's the underlying technology that puts the 'S' (referencing "Secure") in [HTTPS](https://web.dev/why-https-matters/). We recently [wrote](https://blog.chromium.org/2023/05/an-update-on-lock-icon.html) about HTTPS and how it's become the norm, with over [92%](https://transparencyreport.google.com/https/overview?hl=en) of page loads in Chrome on Android, Chrome OS, macOS, and Windows being transmitted using HTTPS.

TLS is the cryptographic protocol that establishes a secure channel between a web browser and the web server hosting the website a user is browsing. It provides a few core security properties:

-   Encryption: Ensures data being transmitted can't be intercepted and understood by third parties or unintended recipients.

-   Authentication: Ensures the web server or application a web browser is connecting to is who it claims to be.

-   Integrity: Ensures data has not been altered while in transit.

To establish a TLS connection, a web browser and server introduce themselves and agree on the rules used to secure ongoing subsequent connections. This introduction is referred to as the "TLS Handshake." If you'd like to look closer and improve your understanding of how TLS connections are established, check out [this](https://tls13.xargs.org/#wrapped-record-2) resource.

[X.509 certificates](https://en.wikipedia.org/wiki/X.509), sometimes referred to as "certificates," "TLS certificates," or "server authentication certificates," are an essential part of the TLS Handshake. Certificates are issued by trusted entities called "[Certification Authorities](https://en.wikipedia.org/wiki/Certificate_authority)" (CAs) and are responsible for verifying and subsequently binding a domain name (e.g., google.com) with a corresponding [public key](https://en.wikipedia.org/wiki/Public_key_certificate). The certificate allows the web browser to verify it's communicating with an authorized web server (i.e., server identity verification).

It's important to note that TLS isn't a perfect solution, nor does its use guarantee a website is completely safe. Remember, using TLS ensures web traffic is encrypted while in transit to or from the corresponding web server; it does not guarantee the safety or security of that content. TLS does not prevent phishing or malicious content like malware or viruses from being served to a website's users. Removing opportunities for confusion related to the terms "encrypted" (a security property provided by TLS) and "safe" (a subjective feeling) is one of the reasons why, beginning in Chrome 117, [Chrome replaced the lock icon](https://blog.chromium.org/2023/05/an-update-on-lock-icon.html) in the address bar with a new security-neutral "tune" icon.

## The Power of Automation

As outlined above, server authentication certificates underpin the encrypted connections between web browsers and web servers. Publicly trusted certificates -- those trusted in products like Chrome by default -- must adhere to both industry-wide and web browser-specific policies, like the CA/Browser Forum "[Baseline Requirements](https://cabforum.org/baseline-requirements-documents/)" and the Chrome Root Program [policy](https://g.co/chrome/root-policy). One such requirement is that a certificate's maximum validity is no more than 398 days.

Certificate validity is defined in [RFC 5280](https://datatracker.ietf.org/doc/html/rfc5280) and determines the functional lifetime a certificate may maximally be considered valid for use in establishing TLS connections. While today, the maximum certificate validity is set to 398 days, this hasn't always been the case. In just over ten years, the ecosystem has trended from unlimited certificate lifetime to 60 months (2012), to 39 months (2015), to 825 days (2018), to 398 days (2020). With each reduction in maximum validity, the underlying goal was always the same: improving security.

Shortening certificate lifetimes protects users by reducing the impact of compromised certificate keys and by speeding up the replacement of insecure technologies and practices across the web. Key compromises (i.e., when a web server certificate's corresponding private key is accidentally or intentionally exposed) and the discovery of internet security weaknesses (e.g., the [Heartbleed](https://en.wikipedia.org/wiki/Heartbleed) bug) are common events that can lead to real-world harm, and the web's users should be better protected against them.

The decreasing lifetime of certificates and the increasing number of certificates that organizations rely on have created a growing need for website operators to become more agile in managing certificates and corresponding infrastructure. Automation is one of the best methods of achieving increased agility, reliability, and security.

### What is Certificate Automation?

While there isn't a one-size-fits-all definition of certificate automation, there is one shared element: the requirement for "hands-on" input from humans during initial certificate issuance and ongoing renewal is minimized or eliminated. Certificate automation simplifies the often complex and error-prone tasks associated with managing certificates, enhancing security and operational efficiency.

In the Web [Public Key Infrastructure](https://en.wikipedia.org/wiki/Public_key_infrastructure) ("Web PKI"), there are two major categories of certificate automation solutions: open solutions relying on standards such as the Automatic Certificate Management Environment ([ACME](https://www.rfc-editor.org/rfc/rfc8555)) protocol and solutions often relying on proprietary tools or protocols.

### Benefits of Automation

Automated certificate issuance and management:

-   promotes agility.

-   Automation increases the speed at which the benefits of new security capabilities are realized.

-   increases resilience and reliability.

-   Automation eliminates human error and can help scale the certificate management process across complex environments.

-   Automation coupled with monitoring protects against website outages due to certificate expiration that could result in a loss of traffic, reputation, or revenue. 

-   Innovations like [ACME Renewal Information](https://datatracker.ietf.org/doc/draft-aaron-acme-ari/) (ARI) present opportunities to seamlessly protect website operators and organizations from outages related to unforeseen events. ARI allows CAs to communicate to web servers that they should attempt to renew a certificate during a defined window, for example, before a certificate is revoked due to an incident.

-   increases efficiency.

-   Automation reduces the time and resources required to manage certificates manually. Though there is an initial investment to automate, over time, team members have increased availability to focus on more strategic, value-adding activities.

### Why does Automation Lead to Better Security?

Automation improves security posture and increases resilience in response to unexpected events including CA incidents, Internet security weaknesses, and cryptographic deprecations.

*CA Incidents*

The Baseline Requirements prescribe response expectations for some types of CA incidents, and many of these responses include marking affected certificates as no longer trusted ("revoked"). Four years ago, Let's Encrypt [self-reported](https://bugzilla.mozilla.org/show_bug.cgi?id=1619047) a bug that affected over 3 million certificates. In response to the incident, nearly 2 million certificates were [revoked](https://bugzilla.mozilla.org/show_bug.cgi?id=1619179#:~:text=We%20revoked%201%2C711%2C396%20certificates%20by%20the%20deadline%20(56%25%20of%20the%20total%20affected)%2C%20based%20on%20our%20evaluation%20that%20they%20had%20been%20replaced%2C%20were%20not%20in%20use%2C%20or%20currently%20had%20CAA%20records%20forbidding%20issuance%20to%20Let%27s%20Encrypt), meaning website operators needed to intervene and trigger replacement to avoid a potential outage. While the scale of this incident was atypical, Web PKI incidents that necessitate certificate re-issuance are commonplace.

There are two important conclusions from this incident. First, the ACME protocol pioneered by and relied on by Let's Encrypt presented the opportunity for affected website operators to recover from the incident with limited manual effort. More than [1.7 million](https://bugzilla.mozilla.org/show_bug.cgi?id=1619179#c7:~:text=Since%20that%20announcement,in%20the%20future.) affected certificates were replaced in less than 48 hours. Second, the incident resulted in Let's Encrypt's commitment to developing and deploying a new protocol (ARI, described above) capable of improving response to future CA incidents such that certificate replacement can occur automatically without human intervention. Let's Encrypt [announced](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari.html) a production deployment of ARI in March 2023. Other CAs have the opportunity to deploy this open protocol to improve incident response.

*Internet Security Weaknesses*

In April 2014, a [security vulnerability](https://heartbleed.com/) ("Heartbleed") was discovered in a popular cryptographic software library used to secure the majority of servers on the Internet that broke the security properties provided by TLS. It was estimated that in response to the bug, over [500,000](https://www.netcraft.com/blog/heartbleed-certificate-revocation-tsunami-yet-to-arrive/) active publicly accessible server authentication certificates needed to be revoked and replaced. Despite a demonstrated vulnerability, remediation efforts from website operators were slow. Only [14%](https://www.netcraft.com/blog/keys-left-unchanged-in-many-heartbleed-replacement-certificates/#:~:text=Only%2014%25%20of,bug%20was%20disclosed.) of affected websites completed the necessary remediation steps within a month of disclosure. About [33%](https://www.bankinfosecurity.com/blogs/nonstop-heartbleed-nearly-200k-servers-still-vulnerable-p-2381) of affected devices remained vulnerable nearly three years after disclosure.

The maximum certificate validity permitted by the Baseline Requirements at the time was five years. For some website operators, this meant the need to revisit the state of their TLS configuration was incorrectly assumed to be years away - which partly explains the observed remediation inaction. Further, CAs who elected to revoke certificates faced significant costs related to hosting revocation information - [estimated for one CA](https://blog.cloudflare.com/the-hard-costs-of-heartbleed/#:~:text=What%20you%20can%27t,costs%20are%20significant.) to be between $400,000 and $952,992.40 USD per month. The Baseline Requirements obligate CAs to host revocation information for each certificate they issue until the end of its validity period, meaning these costs may have needed to be sustained over several years - representing potentially catastrophic financial consequences to the organizations responsible for underpinning the web's security.

Minimally, modern automation technologies like ACME and ARI would have reduced touch labor experienced by website operators to reissue affected certificates. Considering the concerns related to vulnerable private key reuse, popular ACME clients like [Certbot](https://certbot.eff.org/) and [Lego](https://go-acme.github.io/lego/) automatically create new key material for each certificate request. Further, if we could imagine a world where certificate validity was reduced, the maximum window of opportunity for attackers would have been significantly reduced from the 5-year window. As the degree of automation increases, so does the ease of transition to reduced certificate validity. Indeed, many sites are already using certificates with much shorter validity than today's maximum of 398 days. For example, [Facebook](https://engineering.fb.com/2023/08/07/security/short-lived-certificates-protect-tls-secrets/#:~:text=Now%2C%20we%E2%80%99ve%20introduced,of%20the%20setup.) has implemented a highly automated certificate issuance and management workflow to protect its network edge and corresponding devices with certificates that are used for just a few days. Other CAs are defaulting to certificates [valid for only 30 days](https://www.fastly.com/blog/announcing-certainly-fastlys-own-tls-certification-authority#:~:text=Tighter%20security%20and%20lower%20risk%20at%20no%20extra%20cost%20with%20short%2C%2030%2Dday%20validity%20periods%20that%20reduce%20the%20time%20in%20which%20a%20compromised%20certificate%20is%20usable.%C2%A0). A final point of interest is that [peer-reviewed research](https://par.nsf.gov/servlets/purl/10250152) demonstrates that in response to the manual intervention necessitated by Heartbleed, system administrators who implemented automation were more prompt in performing certificate replacements when compared to those who did not.

*Cryptographic Deprecations*

Cryptographic hash functions --- mathematical algorithms that produce a fixed-length output from an arbitrarily sized input --- are central to the security of certificates. In 2005, researchers [demonstrated](https://www.schneier.com/blog/archives/2005/02/cryptanalysis_o.html) the first weaknesses in the widely used [SHA-1](https://en.wikipedia.org/wiki/SHA-1) hash function. In response to growing security concerns, in 2014, Chrome announced a [deprecation timeline](https://security.googleblog.com/2014/09/gradually-sunsetting-sha-1.html), with the CA/Browser Forum ultimately prohibiting the issuance of certificates that used SHA-1 after January 1, 2016.

Unfortunately, this deprecation took years. Browsers had to wait for almost all affected certificates to be renewed, many of them manually, to avoid mass breakage. Modern automation technologies like ACME and ARI would have reduced the touch labor needed to reissue affected certificates. When coupled with reduced certificate validity, the web would have been able to transition away from SHA-1 much faster. And these cryptographic weaknesses weren't theoretical: in February 2017, researchers [demonstrated](https://shattered.io/static/shattered.pdf) a devastating vulnerability in SHA-1 --- barely avoiding a crisis because Chrome had finished [removing support](https://www.chromium.org/Home/chromium-security/education/tls/sha-1/) for affected certificates just weeks before.

Cryptographic deprecations aren't as infrequent as you might think, since there is a steady stream of legacy cryptography in TLS and PKI that Chrome is working to eradicate and modernize, ideally before it becomes vulnerable.

### The Opportunity for and Cost of Failure

Expired certificates bring a website down, causing loss of productivity, reputational harm, and  missed service level expectations.

When considering failed TLS connections observed in Chrome versions released within the last year (i.e., Chrome 106 and greater) on all platforms, over 22% of these resulted from certificates with an invalid validity date. 

A 2019 [study](https://dl.acm.org/doi/pdf/10.1145/3319535.3363192) found that 3.9% of all HTTPS sites have expired certificates.

### State of Automation in the Ecosystem

Between December 2022 and January 2023, our team ran a survey with owners of CAs included in the Chrome Root Store. The intent of the survey was to better understand existing and planned adoption of automated certificate issuance and management solutions.

When coupled with publicly available data from [Certificate Transparency](https://certificate.transparency.dev/) logs and tools like [crt.sh](https://crt.sh/cert-populations), the survey data estimated 58% of the certificates issued by the Web PKI today rely on the ACME protocol. There is clearly broad website operator support for issuing and managing certificates using ACME, and by extension, a strong demand for certificate automation in the Web PKI. The survey also highlighted that the set of CA owners that offer ACME support today and are included in the Chrome Root Store represent more than 95% of Web PKI's certificate population. 70% of those corresponding CA owners self-reported increasing demand for ACME services, which we interpret as a strong indicator of a healthy and growing ACME user population across the ecosystem. None of the CA owners supporting ACME today indicated that ACME demand was decreasing.

To better understand other types of automated certificate issuance and management solutions offered by CA owners included in the Chrome Root Store, we ran a separate survey between April and June 2023. When again coupled with publicly available data from Certificate Transparency logs and tools like crt.sh, the survey data indicated that more than 80% of the certificates issued by the Web PKI today are issued using some form of automation (which includes ACME). Organizations included in the Chrome Root Store that self-reported no automation support represented approximately .08% of the Web PKI certificate population.

## Our Commitment to Automation

The Chrome Root Program provides governance and security review to determine the set of CAs trusted by default in Chrome. We've blogged about the Chrome Root Program in the past [[1](https://blog.chromium.org/2022/09/announcing-launch-of-chrome-root-program.html) and [2](https://security.googleblog.com/2023/05/how-chrome-root-program-keeps-users-safe.html)], but if you missed it, we keep users safe online by:

-   Administering policy and governance activities to manage the set of CAs trusted by default in Chrome,

-   evaluating impact and corresponding security implications related to public security incident disclosures by participating CAs, and

-   leading positive change to make the ecosystem more resilient.

Specific to the last point, the June 2022 release (Version 1.1) of the Chrome Root Program policy introduced the Chrome Root Program's "[Moving Forward, Together](https://www.chromium.org/Home/chromium-security/root-ca-policy/moving-forward-together/)" (MFT) initiative that set out to share our vision of the future that includes modern, reliable, highly agile, purpose-driven PKIs with a focus on automation, simplicity, and security.

### Moving Forward, Together

While "Moving Forward, Together" is non-normative and therefore not policy, it represents future initiatives on which we hope to collaborate further with members of the Web PKI ecosystem. To explore and understand the broader ecosystem impacts of the related proposals described in MFT, we:

-   Study ecosystem data from publicly available tools like [crt.sh](http://crt.sh/) and [Censys](https://censys.com/),

-   interpret data resulting from Chrome tools, experiments, and usage data, 

-   evaluate peer-reviewed research, and, 

-   collect feedback through surveys like the ones related to automation solutions described earlier.

Some of the MFT initiatives might be achieved through collaborations within the CA/Browser Forum. In other cases, it might be most appropriate for corresponding changes to land only in the Chrome Root Program policy, as not all CA owners who adhere to the CA/Browser Forum Baseline Requirements intend to serve Chrome's focused PKI use case of server authentication - or wish to be trusted by default in Chrome. Regardless of how these proposals might eventually be implemented, we are committed to collaborating with community members to minimize adverse ecosystem impacts when appropriate and possible.

### Upcoming Policy Changes

As announced last week at CA/Browser Forum Face-to-Face Meeting 60, we'll soon be pre-releasing an updated version of the Chrome Root Program policy to collect feedback and requested clarifications from CA owners included in the Chrome Root Store.

One of the major focal points of Version 1.5 requires that applicants seeking inclusion in the Chrome Root Store must support automated certificate issuance and management. We've been communicating intent to require automation over the past year, including past Face-to-Face Meeting updates in [February](https://drive.google.com/file/d/1M71yS4BwWMovdiVz9cYSaDlM0gRbSR9n/view?usp=drive_link) and [June](https://drive.google.com/file/d/1k50_2h79B7o8ln5GEc5ZbyWiRDclKWVy/view?usp=drive_link).

It's important to note that these new requirements do not prohibit Chrome Root Store applicants from supporting "non-automated" methods of certificate issuance and renewal, nor require website operators to only rely on the automated solution(s) for certificate issuance and renewal. The intent behind this policy update is to make automated certificate issuance an option for a CA owner's customers.

While we prefer ACME solutions over those that rely on proprietary protocols or tools, both forms of automation satisfy the intent of the new policy requirement. Specifically, we prefer ACME because of its widespread ecosystem support and adoption. Further, ACME is open and benefits from continued innovation and enhancements from a robust set of ecosystem participants. There is an [extensive set](https://letsencrypt.org/docs/client-options/) of [well-documented](https://certbot.eff.org/) ACME client options spanning multiple languages and supported platforms. Last but not least, ACME was designed specifically to meet the TLS certificate issuance needs of the Web PKI.

## Future Opportunities Related to Automation

Promoting broader ubiquity of automated certificate issuance and management will establish an important foundation for the next generation of the Web PKI. Increased use of automation will also unlock future opportunities for more modern and agile infrastructures where strengthened security properties can be realized, for example, where maximum certificate validity can be reduced with minimal downsides.

Continued collaboration across members of the Web PKI ecosystem (e.g., web browsers, CAs, and website operators, and hosting providers) is necessary to make automation a viable option for all website operators. We've been encouraged by recent developments within the ACME ecosystem including [ACME Renewal Information](https://datatracker.ietf.org/doc/draft-aaron-acme-ari/) and [Automated Certificate Management Environment for Subdomains](https://datatracker.ietf.org/doc/rfc9444/). These initiatives aim to better protect website operators from unforeseen events that could affect certificate status and lead to outages, as well as to make it easier for popular server authentication use cases to be supported by ACME. There's further opportunity related to improved fail-over (e.g., allowing a graceful transition to a new CA if the preferred provider is unavailable at the time of a request). We're hopeful that as more CA owners support their customers in adopting automation, we'll see continued developments such as these, making it even easier for website operators to securely obtain and manage server authentication certificates.

## Learn More

If you're a website operator, we encourage you to discover the potential of automated certificate issuance and management, and you should get started today! While we've compiled the below list of resources to improve your understanding, we encourage you to reach out to your corresponding CA owner to learn how they support, or plan to support automation.

### Resources

-   <https://www.acmeisuptime.com/>  

-   <https://letsencrypt.org/how-it-works/> 

-   <https://certbot.eff.org/> 

-   [RFC 8555](https://www.rfc-editor.org/rfc/rfc8555.html)

If you previously investigated implementing an automated certificate issuance and management solution and determined that it was either too difficult or that there were too many obstacles to make it a viable solution, we encourage you to reconsider. The Web PKI continues to evolve, and recent developments have made it easier than ever to adopt automation. Modern web server platform providers like [Caddy](https://caddyserver.com/) help website operators configure TLS by default, as do many third-party hosting provider organizations.

If you depend on software or a service provider that does not support automated certificate issuance and management, share this post and ask the corresponding organization to include support for automation on their future product roadmap.

Finally, if you'd like to share with us any challenges, lessons learned, or opportunities for improvement related to certificate automation, let us know at chrome-root-program [at] google [dot] com.

Note: the service providers listed in this post should not be considered exhaustive or an endorsement. The references are only intended to be informational.