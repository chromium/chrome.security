---
title: "Agent security considerations for WebMCP"
author: "Julia Pagnucco and Alexandra Klepper"
date: 2026-06-09
source-url: https://developer.chrome.com/docs/agents/security
source-blog: Chrome for Developers
---

With [WebMCP](https://github.com/webmachinelearning/webmcp), web developers can build and expose structured tools to AI agents instrumenting the browser, including agents powered by extensions. Agents in the browser can operate within a user's authenticated session, so it's critical that agent developers design protections against malicious input from untrusted content. While this threat exists without WebMCP, we've identified some of the security techniques that are especially relevant for agents that use WebMCP.
