---
# metadata #
title: Deferred Processing
description: Learn about the concept of deferred processing in Pachyderm.
date:
# taxonomy #
tags: ["data-operations", "datums", "branch triggers", "trigger"]
series:
seriesPart:
---

Deferred Processing is a technique that allows you to commit data more frequently than you process it. By default, Pachyderm automatically processes any newly commmitted data added to its input branch. For example, you may want to commit data hourly, but retrain your ML model daily. 

There are several ways to leverage deferred processing with Pachyderm:

1. Input repo staging branches
2. Commit-specific processing
3. Branch triggers
4. Pipeline Specification triggers
5. Kubernetes apps that use Pachyderm APIs

<!-- Todo: create guides for each method -->

 