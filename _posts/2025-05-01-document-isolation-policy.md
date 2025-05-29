---
title: Document Isolation Policy: Enable powerful web features with ease
author: Camille Lamy
date: 2025-05-01
source-url: https://developer.chrome.com/blog/document-isolation-policy
source-blog: Chrome for Developers Blog
---

From Chrome 137, Document Isolation Policy is a new feature that makes `crossOriginIsolation` adoption easier. Unlike COEP (`Cross-Origin-Embedder-Policy`), Document Isolation Policy applies per frame and makes no requirements of subframes. By enabling `crossOriginIsolation`, Document Isolation Policy unlocks access to powerful web functionalities like SharedArrayBuffers or WebAssembly threads.