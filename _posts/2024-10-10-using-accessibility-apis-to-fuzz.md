---
title: Using Chrome's accessibility APIs to find security bugs
author: Adrian Taylor
date: 2024-10-10
source-url: https://security.googleblog.com/2024/10/using-chromes-accessibility-apis-to.html
source-blog: Google Security Blog
---

Chrome’s user interface (UI) code is complex, and sometimes has bugs. 

Are those bugs security bugs? Specifically, if a user’s clicks and actions result in memory corruption, is that something that an attacker can exploit to harm that user?

Our [security severity guidelines](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/severity-guidelines.md) say “yes, sometimes.” For example, an attacker could very likely convince a user to click an autofill prompt, but it will be much harder to convince the user to step through a whole flow of different dialogs.

Even if these bugs aren’t the _most_ easily exploitable, it takes a great deal of time for our security shepherds to make these determinations. User interface bugs are often flakey (that is, not reliably reproducible). Also, even if these bugs aren’t necessarily deemed to be exploitable, they may still be annoying crashes which bother the user.

It would be great if we could find these bugs automatically.

If only the whole tree of Chrome UI controls were exposed, somehow, such that we could enumerate and interact with each UI control automatically.

Aha! Chrome exposes all the UI controls to assistive technology. Chrome goes to great lengths to ensure its entire UI is exposed to screen readers, braille devices and other such assistive tech. This tree of controls includes all the toolbars, menus, and the [structure of the page itself](https://developer.chrome.com/blog/full-accessibility-tree). This structural definition of the browser user interface is already sometimes used in other contexts, for example by some password managers, demonstrating that investing in accessibility has [benefits for all users](https://en.wikipedia.org/wiki/Curb_cut_effect). We’re now taking that investment and leveraging it to find security bugs, too. 

Specifically, we’re now “fuzzing” that accessibility tree - that is, interacting with the different UI controls semi-randomly to see if we can make things crash. This technique has a [long pedigree](https://folklore.org/Monkey_Lives.html?sort=date?sort=date).

Screen reader technology is a bit different on each platform, but on Linux the tree can be explored using [Accerciser](https://help.gnome.org/users/accerciser/stable/introduction.html.en).


_screenshot of Accerciser showing the tree of UI controls in Chrome_

All we have to do is explore the same tree of controls with a fuzzer. How hard can it be?


    _“We do this not because it is easy, but because we thought it would be easy” - Anon._

Actually we never thought this would be easy, and a few different bits of tech have had to fall into place to make this possible. Specifically,



*   There are lots of combinations of ways to interact with Chrome. Truly randomly clicking on UI controls probably won’t find bugs - we would like to leverage [coverage-guided fuzzing](https://google.github.io/clusterfuzz/reference/coverage-guided-vs-blackbox/#coverage-guided-fuzzing) to help the fuzzer select combinations of controls that seem to reach into new code within Chrome.
*   We need any such bugs to be genuine. We therefore need to fuzz the actual Chrome UI, or something very similar, rather than exercising parts of the code in an unrealistic unit-test-like context. That’s where our [InProcessFuzzer](https://source.chromium.org/chromium/chromium/src/+/main:chrome/test/fuzzing/in_process_fuzzer.h) framework comes into play - it runs fuzz cases within a Chrome browser_test; essentially a real version of Chrome.
*   But such browser_tests have a high startup cost. We need to amortize that cost over thousands of test cases by running a batch of them within each browser invocation. [Centipede](https://github.com/google/fuzztest/tree/main/centipede) is designed to do that.
*   But each test case won’t be idempotent. Within a given invocation of the browser, the UI state may be successively modified by each test case. We intend to add [concatenation](https://issues.chromium.org/issues/344606392) to centipede to resolve this.
*   Chrome is a noisy environment with lots of timers, which may well confuse coverage-guided fuzzers. Gathering coverage for such a large binary is slow in itself. So, we don’t know if coverage-guided fuzzing will successfully explore the UI paths here.

All of these concerns are common to the other fuzzers which run in the browser_test context, most notably our [new IPC fuzzer](https://source.chromium.org/chromium/chromium/src/+/main:chrome/test/fuzzing/renderer_fuzzing/renderer_in_process_mojolpm_fuzzer.cc) (blog posts to follow). But the UI fuzzer presented some specific challenges.

Finding UI bugs is only useful if they’re actionable. Ideally, that means:



*   Our fuzzing infrastructure gives a thorough set of diagnostics.
*   It can bisect to find when the bug was introduced and when it was fixed.
*   It can minimize complex test cases into the smallest possible reproducer.
*   The test case is descriptive and says which UI controls were used, so a human may be able to reproduce it.

These requirements together mean that the test cases should be stable across each Chrome version - if a given test case reproduces a bug with Chrome 125, hopefully it will do so in Chrome 124 and Chrome 126 (assuming the bug is present in both). Yet this is tricky, since Chrome UI controls are deeply nested and often anonymous.

Initially, the fuzzer picked controls simply based on their ordinal at each level of the tree (for instance “control 3 nested in control 5 nested in control 0”) but such test cases are unlikely to be stable as the Chrome UI evolves. Instead, we settled on an approach where the controls are named, when possible, and otherwise identified by a combination of role and ordinal. This yields test cases like this:


```


##### action {


#####   path_to_control {


#####     named {


#####       name: "Test - Chromium"


#####     }


#####   }


#####   path_to_control {


#####     anonymous {


#####       role: "panel"


#####     }


#####   }


#####   path_to_control {


#####     anonymous {


#####       role: "panel"


#####     }


#####   }


#####   path_to_control {


#####     anonymous {


#####       role: "panel"


#####     }


#####   }


#####   path_to_control {


#####     named {


#####       name: "Bookmarks"


#####     }


#####   }


#####   take_action {


#####     action_id: 12


#####   }


##### }
```


Fuzzers are unlikely to stumble across these control names by chance, even with the instrumentation applied to string comparisons. In fact, this by-name approach turned out to be only 20% as effective as picking controls by ordinal. To resolve this we added a custom mutator which is smart enough to put in place control names and roles which are known to exist. We randomly use this mutator or the standard libprotobuf-mutator in order to get the best of both worlds. This approach has proven to be about 80% as quick as the original ordinal-based mutator, while providing stable test cases.



_Chart of code coverage achieved by minutes fuzzing with different strategies_

So, does any of this work?

We don’t know yet! - and you can follow along as we find out. The fuzzer found a couple of [potential](https://issues.chromium.org/issues/348021995) [bugs](https://issues.chromium.org/issues/348328060) (currently access restricted) in the accessibility code itself but hasn’t yet explored far enough to discover bugs in Chrome’s fundamental UI. But, at the time of writing, this has only been running on our ClusterFuzz infrastructure for a few hours, and isn’t yet working on our [coverage dashboard](https://analysis.chromium.org/coverage/p/chromium/file?host=chromium.googlesource.com&project=chromium/src&ref=refs/heads/main&revision=d4e6019588463e5cf95111345e52771c4aaf4b4c&path=//chrome/test/fuzzing/atspi_in_process_fuzzer.cc&platform=fuzz&test_suite_type=any&modifier_id=0). If you’d like to follow along, keep an eye on our coverage dashboard as it expands to cover UI code.

