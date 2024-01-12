---
title: A look at Chrome’s security review culture
author: Alex Gough
date: 2023-07-20
source-url: https://security.googleblog.com/2023/07/a-look-at-chromes-security-review.html
source-blog: Google Security Blog
excerpt: 
---

Security reviewers must develop the confidence and skills to make fast, difficult decisions. A simplistic piece of advice to reviewers is "just be confident" but in reality that takes practice and experience. Confidence comes with time, and people are there to support each other as we learn. This post shares advice we give to people doing security reviews for Chrome.

### Security Review in Chrome

Chrome has a lightweight launch process. Teams write requirements and design documents outlining why the feature should be built, how the feature will benefit users, and how the feature will be built. Developers write code behind a [feature flag](https://chromium.googlesource.com/chromium/src/+/main/base/feature_list.h) and must pass a Launch Review before turning it on. Teams think about security early-on and coordinate with the security team. Teams are responsible for the safety of their features and ensuring that the security team is able to say 'yes' to its security review.

Security review focuses on the design of a proposed feature, not its details and is distinct from [code review](https://chromium.googlesource.com/chromium/src/+/master/docs/security/ipc-reviews.md). Chrome changes need approval from engineers familiar with the code being changed but not necessarily from security experts. It is not practical for security engineers to scrutinize every change. Instead we focus on the feature's architecture, and how it might affect people using Chrome.

Reviewers function best in an open and supportive engineering culture. Security review is not an easy task -- it applies security engineering insights in a social context that could become adversarial and fractious. Google, and Chrome, embody a [security-centric](https://static.googleusercontent.com/media/sre.google/en//static/pdf/building_secure_and_reliable_systems.pdf#page=481) engineering culture, where respectful disagreement is valued, where [we learn from mistakes](https://sre.google/sre-book/postmortem-culture/), where decisions can be revisited, and where developers see the security team as a partner that helps them ship features safely. Within the security team we support each other by encouraging questioning & learning, and provide mentorship and coaching to help reviewers enhance their reviewing skills.

### Learning security review

Start by shadowing
------------------

Start with some help. As a new reviewer, you may not feel you're 100% ready --- don't let that put you off. The best way to learn is to observe and see what's involved before easing in to doing reviews on your own. Start by shadowing to get a feel for the process. Ask the person you are shadowing how they plan to approach the review, then look at the materials yourself. Concentrate on learning how to review rather than on the details of the thing you are reviewing. Don't get too involved but observe how the reviewer does things and ask them why. Next time try to co-review something - ask the feature team some questions and talk through your thoughts with the other reviewer. Let them make the final approval decision. Do this a few times and you'll be ready to be the main reviewer, and remember that you can always reach out for help and advice.

Read enough to make a decision
------------------------------

Read a lot, but know when to stop. Understand what the feature is doing, what's new, and what's built on existing, approved, mechanisms. Focus on the new things. If you need to educate yourself, skim older docs or code for context. It can help to look at related reviews for repeated issues and solutions. It is tempting to try to understand everything and at first you'll dig deeper than you need to. You'll get better at knowing when to stop after a few reviews. Treat existing, approved, features as building blocks that you don't need to fully understand, but might be useful to skim as background.

Launch review is a gate. It's ok to ask feature teams to have the materials ready. Try to use your time wisely --- if a design doc is very brief and lacks any security discussion you can quickly say "please add a security considerations section" and stop thinking about it until the team comes back with more complete documentation. If the design document doesn't fully explain something that is a sign the document needs to be expanded --- if something isn't clear to you or isn't covered then start asking questions. Remember that you're not looking for every possible bug, but ensuring that major concerns are addressed upfront.

As you're reading, read actively and write down observations and questions as you go. Cross them off if you find an answer later. For your first reviews this will take a long time. Don't worry too much about that - you won't know yet which details matter. Over time you'll learn where to focus your attention. This is also a good time to pair up with a seasoned reviewer. Schedule a chat to go over your thoughts before you share them with the feature team. This will help you understand the process people go through and allows a safe evaluation of your thoughts before you share them more widely - this will help you build confidence. Next, clarify any questions with the feature team. Try to write a sentence or two describing the feature - if you can't do this it indicates you need more information.

Ask questions to improve documentation
--------------------------------------

You have permission to be ignorant! Use it! Ask questions until you understand areas of uncertainty. Asking questions provides real value, and often triggers the team to realize that something should be done differently. In particular --- if it's confusing to you it's probably badly explained or badly thought out, or shows that an assumption or tacit knowledge is missing from a design document. If you're worried about looking ignorant, make use of the more experienced reviewers around you --- ask on the chat or book some time to talk over your thoughts one-on-one. This should help you formulate your question so that it's useful to the feature team. Try to write out what you think is happening, and let the feature team tell you if you're close or not.

The chances that you'll understand everything immediately are very low, and that's ok. In meetings about a feature a favorite question of mine is 'what are you secretly worried about?' followed by an awkward pause. People will absolutely tell you things! Sometimes there's a domain-knowledge mismatch when you don't have the right words to ask the question, so you can't get a useful answer. Always ask for a diagram that shows which process or component different parts of a feature are happening in --- this helps you hone in on the critical interfaces, and will illustrate the design more clearly than screenfuls of text or code.

Center people in your security analysis
---------------------------------------

We're here to help people. Try to center people in your thoughts and arguments. How will people use the feature? Who are they? Who might harm them and how? Are there particular groups of people that might be more vulnerable than others, and what can we do to protect them? How does the feature make people feel? How will their experience of the application change? How will their lives be affected? Think about how a bad actor might abuse the feature. What implicit assumptions is the implementation making about the people using it? What or who are we asking people to trust? What if someone modifies traffic, changes a message, passes in bad data, or tricks someone into using the feature when they don't want to? This is a great thing to discuss when you're pairing with another reviewer --- be sure to ask them what they like to think about.

Think about what can go wrong
-----------------------------

Take time to think and bring an adversarial mindset and bring a different perspective. In some ways the purpose of a security review is to stop and think before unleashing new ideas on the world. Make focus time in your calendar or sit somewhere unusual to give yourself space to think. A skeptical, enquiring mindset is more useful than deep knowledge. You're there to ask the questions the feature team won't have thought about. They will naturally focus on what they need to do to make the feature work. Security review is about thinking about what else might happen when it's working, or what might happen if someone deliberately tries to do things the designers didn't expect. Try to take a different perspective.

Trust your spidey-senses. If you can't quite put your finger on what might go wrong, but something feels off. Sometimes a feature is just plain complicated, or in a risky area of code, or feels like it's been rushed. It can be difficult to articulate these concerns to a team without rubbing people the wrong way. Use people you trust to bounce your thoughts off and hone in on what you are worried about. Discuss with other reviewers whether and how these risks can be communicated. Your spidey-senses are probably correct, and they're as important as any single concrete solvable threat you've spotted.

Approve and keep notes
----------------------

Pause then approve. Once you've understood what's happening and iterated through any concerns you've raised you'll be ready to approve the feature for launch. It's worth taking a short pause here to let your brain do its thinking in the background before you press the button. Try to concisely describe the feature --- if you can't then go back and ask more questions! It's important to get questions and concerns to teams quickly but final approval can wait for some digestion time. If you cannot come up with a clear decision then reach out to other reviewers to discuss what to do next. Let the feature team know you're working on it and when you'll get back to them. After a pause, if nothing else occurs to you then click Approved and write a short paragraph saying why. Note any follow-on work the team has promised to complete before launching. This is also a great time to leave yourself a short note for your performance review --- it's easy to lose track of what you reviewed and the changes your input led to --- having a rolling document will both help you spot patterns, and help you tell the story of the work you've done.

### Expect to make mistakes, and learn from them

Nothing we do in software is forever, and many mistakes will be found and fixed later. You will make mistakes. Mainly small ones that won't really matter. Security is about evaluating new risks in the context of the value provided to people using a product. This tradeoff extends into the design and launch process of which you are just a small part. You only have so much time, and It's inevitable that you might sometimes see things that aren't there, or not notice things that are. Security reviewers are one element in a layered defense and the consequences of a mistake will be contained by things you did spot. It's good to try to find specific problems, but more important to locate and apply general security principles like [sandboxing](https://chromium.googlesource.com/chromium/src/+/main/docs/design/sandbox.md) and [the rule of two](https://chromium.googlesource.com/chromium/src/+/main/docs/security/rule-of-2.md). Sometimes you might think something is fine, but later realize that it isn't. This often happens when we learn something new about a feature, or discover that an assumption was invalid. This is where careful communication is important. Feature teams will be happy to know about any problems you uncover, and will find time to fix them later if possible. Remember that Looks Good To Me doesn't mean Looks Perfect To Me.

### How to be better

Experienced reviewers can always improve, and apply their insights widely within their organization.

It's not always easy
--------------------

It takes time to learn security engineering and build a working knowledge of the architecture of a complex product. Reviewing is different from the normal development journey - when an engineer works on a feature they start in an ambiguous situation and gradually learn or invent everything needed to deeply understand and solve the problem. To be effective as a security reviewer we have to embrace ambiguity and ignorance, and learn how to swiftly learn just enough to have a useful opinion, before starting again for our next review. This may seem daunting - and it is - but over time reviewers get better at knowing where to focus their efforts.

Security reviewing can feel invisible. Security is not an all-or-nothing quality of a feature. Rather it forms one concern that a product must balance while still shipping, adding new features, and appealing to people that use it. Security is an important concern (for Chrome it's both a critical engineering pillar, and something people say they value when choosing Chrome) but it's not the only factor. It's our job to identify and articulate security risks, and advocate for better approaches, but sometimes another concern dominates. If deviations from our advice are well justified we shouldn't feel ignored - we did our bit.

Your peers are there to help you. If you need support, ask questions on the reviewing team's chat, or schedule thirty minutes or a coffee with another reviewer to discuss a particular review.

Help teams secure their features
--------------------------------

Remember that developers know what they are doing, but might not be thinking about the things you are thinking about. You might not be confident in what you know about their feature, but imagine how the feature team feels coming to the mysterious halls of the security people! Often we'll ask a team to implement one or more of our layered defenses before they get to launch their feature. This might be the first time they've had to write a fuzzer or harden a library. You'll get requests for examples or help with implementation. Find an expert or spend time doing these things yourself. The security process should be as smooth a speed bump as possible. Any familiarity you have with these techniques will improve our interactions and maintain our reputation as a helpful team. If we ask someone to do something but can't help them make progress we will be a source of frustration. If we help people they will be likely to approach us early-on next time they have a security question.

Training is available
---------------------

Develop mind-tricks and frameworks for having difficult conversations. Sometimes (especially when you get involved early in a project's design phase) you will need to disagree with a feature's design, or nudge a team in a more secure direction. While a supportive technical culture should make it safe to surface and resolve technical differences, it takes energy and patience to work through these conflicts. It's harder still to say 'no', or ask a team to commit to more work than they were expecting. These are skills you can practice and become more comfortable doing. Look for courses you can take. Some suggestions include "having difficult conversations", "mentoring", "coaching", "persuasive writing", and "threat modeling".

Scale your impact
-----------------

Find ways to scale your impact. Security decisions are made based on judgment and mechanisms but judgment doesn't scale! To maintain a sustainable security workload for ourselves, and empower feature teams to make their own decisions, we need to make judgment as small a part of the puzzle as possible.

Encourage good patterns. If a design addresses a security concern, say so on the launch bug or a mailing list. This helps for later reviews, and provides useful feedback to the design team. Help newer reviewers see good or bad patterns, and the rhythm of reviews by telling a few stories of what went well and what got missed in the past. Establish architectural patterns that contain the consequences of a problem. Make these easy to follow while preventing anti-patterns - ideally a bad security idea shouldn't even compile.

Write guidance or policies. Distill decisions into FAQs, threat models, principles or rules. Get involved with the people building foundational pieces of your product, and get them to own their security guidance so that it gets applied as part of that team's advice to other teams. A checklist of things to look for in a particular area is a great starting point for the team making the next feature in that space, and for the reviewer that signs off at the end.

Level-up your developers. We can raise the level of expertise across the wider developer community, and reduce the burden of reviewing for security teams. Through repeated engagements with the same team you can start to set expectations - each time, drop some hints about what could be done better next time. Encourage system diagrams, [risk assessments](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html), threat modeling or sandboxing. Soon teams will start with these, and reviews will be much smoother.

Anoint security champions. In larger feature teams encourage a couple of security champions within the group to serve as initial points of contact and a first line of review. Support these people! Offer to talk them through their design docs and help them think about security concerns. They will grow into local experts who know when to call on security specialists. They can write security principles for their area, leading to secure features and smooth launch reviews.

### Summary

Do a few reviews to develop confidence in your decisions. You won't understand all the details of a feature. You will sometimes say yes to the wrong things or get teams to do unnecessary work. You'll ask insightful questions and improve designs..

Remember that security reviewing is difficult. Remember that people are there to help you. Remember that every good decision you encourage keeps people safe from harm, and increases their trust in you and your product. As you mature, maintain a supportive culture where reviewers can grow, and where you help other teams develop new features with safety in mind.