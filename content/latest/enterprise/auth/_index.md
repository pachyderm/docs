---
# metadata # 
title: Authentication & Authorization
description: Learn how to Pachyderm's user access management works.
date: 
# taxonomy #
tags: 
series:
seriesPart:
---
MLDM has an embedded **Open ID Connect** based on [**Dex**](https://dexidp.io/docs/), allowing for vendor-neutral authentication using your existing credentials from various back-ends. [See compatible connectors.](https://dexidp.io/docs/connectors/)

## Auth Token Duration

Pachd auth tokens duration is set to a 30 days default in pachd environment variable  `SESSION_DURATION_MINUTES`.
