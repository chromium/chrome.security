---
title: Sustaining Digital Certificate Security — Entrust Certificate Distrust
author: Chrome Root Program
date: 2024-06-27
source-url: https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html
source-blog: Google Security Blog
excerpt: > 
  The Chrome Security Team prioritizes the security and privacy of Chrome's users, and we are unwilling to compromise on these values.

  The Chrome Root Program Policy states that CA certificates included in the Chrome Root Store must provide value to Chrome end users that exceeds the risk of their continued inclusion. It also describes many of the factors we consider significant when CA Owners disclose and respond to incidents. When things don't go right, we expect CA Owners to commit to meaningful and demonstrable change resulting in evidenced continuous improvement.
---

The Chrome Security Team prioritizes the security and privacy of Chrome's users, and we are unwilling to compromise on these values.

The [Chrome Root Program Policy](https://www.chromium.org/Home/chromium-security/root-ca-policy/) states that CA certificates included in the [Chrome Root Store](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.md) must provide value to Chrome end users that exceeds the risk of their continued inclusion. It also describes many of the [factors](https://www.chromium.org/Home/chromium-security/root-ca-policy/#7-reporting-and-responding-to-incidents) we consider significant when CA Owners disclose and respond to incidents. When things don't go right, we expect CA Owners to commit to meaningful and demonstrable change resulting in evidenced continuous improvement.

Over the past several years, publicly disclosed [incident reports](https://bugzilla.mozilla.org/buglist.cgi?o2=greaterthaneq&short_desc_type=casesubstring&o1=notequals&v1=Graveyard&classification=Client%20Software&classification=Developer%20Infrastructure&classification=Components&classification=Server%20Software&classification=Other&classification=Graveyard&v2=2015-11-01&f1=classification&bug_status=UNCONFIRMED&bug_status=NEW&bug_status=ASSIGNED&bug_status=REOPENED&bug_status=RESOLVED&bug_status=VERIFIED&bug_status=CLOSED&short_desc=Entrust&f2=creation_ts&component=CA%20Certificate%20Compliance&query_format=advanced&list_id=17064895) highlighted a pattern of concerning behaviors by Entrust that fall short of the above expectations, and has eroded confidence in their competence, reliability, and integrity as a publicly-trusted CA Owner.

In response to the above concerns and to preserve the integrity of the [Web PKI](https://security.googleblog.com/2023/05/how-chrome-root-program-keeps-users-safe.html#:~:text=Chrome%20uses%20digital,the%20%E2%80%9CWeb%20PKI.%E2%80%9D) ecosystem, Chrome will take the following actions.

Upcoming change in Chrome 127 and higher:

-  TLS server authentication certificates validating to the following Entrust roots whose *earliest* Signed Certificate Timestamp (SCT) is dated after **October 31, 2024,** will no longer be trusted by default.
  -  [CN=Entrust Root Certification Authority - EC1,OU=See www.entrust.net/legal-terms+OU=(c) 2012 Entrust, Inc. - for authorized use only,O=Entrust, Inc.,C=US](https://crt.sh/?q=02ED0EB28C14DA45165C566791700D6451D7FB56F0B2AB1D3B8EB070E56EDFF5)
  -  [CN=Entrust Root Certification Authority - G2,OU=See www.entrust.net/legal-terms+OU=(c) 2009 Entrust, Inc. - for authorized use only,O=Entrust, Inc.,C=US](https://crt.sh/?q=43DF5774B03E7FEF5FE40D931A7BEDF1BB2E6B42738C4E6D3841103D3AA7F339)
  -  [CN=Entrust.net Certification Authority (2048),OU=www.entrust.net/CPS_2048 incorp. by ref. (limits liab.)+OU=(c) 1999 Entrust.net Limited,O=Entrust.net](https://crt.sh/?q=6DC47172E01CBCB0BF62580D895FE2B8AC9AD4F873801E0C10B9C837D21EB177)
  -  [CN=Entrust Root Certification Authority,OU=www.entrust.net/CPS is incorporated by reference+OU=(c) 2006 Entrust, Inc.,O=Entrust, Inc.,C=US](https://crt.sh/?q=73C176434F1BC6D5ADF45B0E76E727287C8DE57616C1E6E6141A2B2CBC7D8E4C)
  -  [CN=Entrust Root Certification Authority - G4,OU=See www.entrust.net/legal-terms+OU=(c) 2015 Entrust, Inc. - for authorized use only,O=Entrust, Inc.,C=US](https://crt.sh/?q=DB3517D1F6732A2D5AB97C533EC70779EE3270A62FB4AC4238372460E6F01E88)
  -  [CN=AffirmTrust Commercial,O=AffirmTrust,C=US](https://crt.sh/?q=0376AB1D54C5F9803CE4B2E201A0EE7EEF7B57B636E8A93C9B8D4860C96F5FA7)
  -  [CN=AffirmTrust Networking,O=AffirmTrust,C=US](https://crt.sh/?q=0A81EC5A929777F145904AF38D5D509F66B5E2C58FCDB531058B0E17F3F0B41B)
  -  [CN=AffirmTrust Premium,O=AffirmTrust,C=US](https://crt.sh/?q=70A73F7F376B60074248904534B11482D5BF0E698ECC498DF52577EBF2E93B9A)
  -  [CN=AffirmTrust Premium ECC,O=AffirmTrust,C=US](https://crt.sh/?q=BD71FDF6DA97E4CF62D1647ADD2581B07D79ADF8397EB4ECBA9C5E8488821423)
-  TLS server authentication certificates validating to the above set of roots whose *earliest* SCT is on or before **October 31, 2024,** will be unaffected by this change.

This approach attempts to minimize disruption to existing subscribers using a recently announced Chrome [feature](https://source.chromium.org/chromium/chromium/src/+/main:net/cert/root_store.proto;drc=a783c3bab474ff68e675e2753f91c92ca817e072;l=15?q=f:root_store.proto&ss=chromium) to remove default trust based on the SCTs in certificates.

Additionally, should a Chrome user or enterprise [explicitly trust](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#Does-the-Chrome-Certificate-Verifier-consider-local-trust-decisions) any of the above certificates on a platform and version of Chrome [relying](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-did-these-features-land) on the [Chrome Root Store](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.md) (e.g., explicit trust is conveyed through a Group Policy Object on Windows), the SCT-based constraints described above will be overridden and certificates will function as they do today.

To further minimize risk of disruption, website operators are encouraged to review the "Frequently Asked Questions" listed below.

### **Why is Chrome taking action?**

Certification Authorities (CAs) serve a privileged and trusted role on the Internet that underpin encrypted connections between browsers and websites. With this tremendous responsibility comes an expectation of adhering to reasonable and consensus-driven security and compliance expectations, including those defined by the CA/Browser TLS Baseline Requirements.

Over the past six years, we have observed a pattern of compliance failures, unmet improvement commitments, and the absence of tangible, measurable progress in response to publicly disclosed incident reports. When these factors are considered in aggregate and considered against the inherent risk each publicly-trusted CA poses to the Internet ecosystem, it is our opinion that Chrome's continued trust in Entrust is no longer justified.

### **When will this action happen?**

Blocking action will begin on approximately November 1, 2024, affecting certificates issued at that point or later.

Blocking action will occur in Versions of [Chrome 127](https://chromiumdash.appspot.com/schedule) and greater on Windows, macOS, ChromeOS, Android, and Linux. Apple policies prevent the Chrome Certificate Verifier and corresponding Chrome Root Store from being used on Chrome for iOS.

### **What is the user impact of this action?**

By default, Chrome users in the above populations who navigate to a website serving a certificate issued by Entrust or AffirmTrust after October 31, 2024 will see a full page interstitial [similar to this one](https://untrusted-root.badssl.com/).

Certificates issued by other CAs are not impacted by this action.

### **How can a website operator tell if their website is affected?**

Website operators can determine if they are affected by this issue by using the Chrome Certificate Viewer.

Use the Chrome Certificate Viewer

-  Navigate to a website (e.g., [https://www.google.com](https://www.google.com/))
-  Click the "Tune" icon
-  Click "Connection is Secure"
-  Click "Certificate is Valid" (the Chrome Certificate Viewer will open)
  -  **Website owner action is not required**, if the "Organization (O)" field listed beneath the "Issued By" heading does not contain "Entrust" or "AffirmTrust".
  -  **Website owner action is required**, if the "Organization (O)" field listed beneath the "Issued By" heading contains "Entrust" or "AffirmTrust".

### **What does an affected website operator do?**

We recommend that affected website operators transition to a new publicly-trusted CA Owner as soon as reasonably possible. To avoid adverse website user impact, action **must** be completed before the existing certificate(s) expire if expiry is planned to take place after October 31, 2024.

While website operators could delay the impact of blocking action by choosing to collect and install a new TLS certificate issued from Entrust before Chrome's blocking action begins on November 1, 2024, website operators will inevitably need to collect and install a new TLS certificate from one of the many other CAs included in the [Chrome Root Store](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/root_store.md).

### **Can I test these changes before they take effect?**

Yes.

A command-line flag was added beginning in Chrome 128 (available in Canary/Dev at the time of this post's publication) that allows administrators and power users to simulate the effect of an SCTNotAfter distrust constraint as described in this blog post FAQ.

How to: Simulate an SCTNotAfter distrust

1\. Close all open versions of Chrome

2\. Start Chrome using the following command-line flag, substituting variables described below with actual values

--test-crs-constraints=$[Comma Separated List of Trust Anchor Certificate SHA256 Hashes]:sctnotafter=$[epoch_timestamp]

3\. Evaluate the effects of the flag with test websites 

Example: The following command will simulate an SCTNotAfter distrust with an effective date of April 30, 2024 11:59:59 PM GMT for all of the Entrust trust anchors included in the Chrome Root Store. The expected behavior is that any website whose certificate is issued before the enforcement date/timestamp will function in Chrome, and all issued after will display an interstitial.

--test-crs-constraints=02ED0EB28C14DA45165C566791700D6451D7FB56F0B2AB1D3B8EB070E56EDFF5, 43DF5774B03E7FEF5FE40D931A7BEDF1BB2E6B42738C4E6D3841103D3AA7F339, 6DC47172E01CBCB0BF62580D895FE2B8AC9AD4F873801E0C10B9C837D21EB177, 73C176434F1BC6D5ADF45B0E76E727287C8DE57616C1E6E6141A2B2CBC7D8E4C, DB3517D1F6732A2D5AB97C533EC70779EE3270A62FB4AC4238372460E6F01E88, 0376AB1D54C5F9803CE4B2E201A0EE7EEF7B57B636E8A93C9B8D4860C96F5FA7, 0A81EC5A929777F145904AF38D5D509F66B5E2C58FCDB531058B0E17F3F0B41B, 70A73F7F376B60074248904534B11482D5BF0E698ECC498DF52577EBF2E93B9A, BD71FDF6DA97E4CF62D1647ADD2581B07D79ADF8397EB4ECBA9C5E8488821423 :sctnotafter=1714521599

**Illustrative Command (on Windows):**

"C:\Users\User123\AppData\Local\Google\Chrome SxS\Application\chrome.exe" --test-crs-constraints=02ED0EB28C14DA45165C566791700D6451D7FB56F0B2AB1D3B8EB070E56EDFF5,43DF5774B03E7FEF5FE40D931A7BEDF1BB2E6B42738C4E6D3841103D3AA7F339,6DC47172E01CBCB0BF62580D895FE2B8AC9AD4F873801E0C10B9C837D21EB177,73C176434F1BC6D5ADF45B0E76E727287C8DE57616C1E6E6141A2B2CBC7D8E4C,DB3517D1F6732A2D5AB97C533EC70779EE3270A62FB4AC4238372460E6F01E88,0376AB1D54C5F9803CE4B2E201A0EE7EEF7B57B636E8A93C9B8D4860C96F5FA7,0A81EC5A929777F145904AF38D5D509F66B5E2C58FCDB531058B0E17F3F0B41B,70A73F7F376B60074248904534B11482D5BF0E698ECC498DF52577EBF2E93B9A,BD71FDF6DA97E4CF62D1647ADD2581B07D79ADF8397EB4ECBA9C5E8488821423:sctnotafter=1714521599

**Illustrative Command (on macOS):**

"/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary" --test-crs-constraints=02ED0EB28C14DA45165C566791700D6451D7FB56F0B2AB1D3B8EB070E56EDFF5,43DF5774B03E7FEF5FE40D931A7BEDF1BB2E6B42738C4E6D3841103D3AA7F339,6DC47172E01CBCB0BF62580D895FE2B8AC9AD4F873801E0C10B9C837D21EB177,73C176434F1BC6D5ADF45B0E76E727287C8DE57616C1E6E6141A2B2CBC7D8E4C,DB3517D1F6732A2D5AB97C533EC70779EE3270A62FB4AC4238372460E6F01E88,0376AB1D54C5F9803CE4B2E201A0EE7EEF7B57B636E8A93C9B8D4860C96F5FA7,0A81EC5A929777F145904AF38D5D509F66B5E2C58FCDB531058B0E17F3F0B41B,70A73F7F376B60074248904534B11482D5BF0E698ECC498DF52577EBF2E93B9A,BD71FDF6DA97E4CF62D1647ADD2581B07D79ADF8397EB4ECBA9C5E8488821423:sctnotafter=1714521599

**Note:** If copy and pasting the above commands, ensure no line-breaks are introduced.

Learn more about command-line flags [here](https://developer.chrome.com/docs/web-platform/chrome-flags#command-line_flags).

### **I use Entrust certificates for my internal enterprise network, do I need to do anything?**

Beginning in Chrome 127, enterprises can override Chrome Root Store constraints like those described for Entrust in this blog post by installing the corresponding root CA certificate as a [locally-trusted root](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#Does-the-Chrome-Certificate-Verifier-consider-local-trust-decisions) on the platform Chrome is running (e.g., installed in the Microsoft Certificate Store as a Trusted Root CA).

### **How do enterprises add a CA as locally-trusted?**

Customer organizations should defer to platform provider guidance.

### **What about other Google products?**

Other Google product team updates may be made available in the future.