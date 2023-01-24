---
# metadata # 
title: Log In via IdP
description: Learn how to log in to a Pachyderm cluster as an IdP user. 
date: 
# taxonomy #
tags: ["workflows", "permissions", "management"]
series:
seriesPart:
weight: 3
---

## Before You Start 

- Your organization must have an active [Enterprise License Key](../../../).
- You must have an [IdP Connector](../connectors) set up. 
- You must have pachctl installed.

## How to Log in to a Cluster via IdP

1. Open a terminal.
2. Input the following command:
```s
pachctl auth login
```
3. Select the connector you wish to use.
4. Provide your credentials

