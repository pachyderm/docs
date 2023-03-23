---
# metadata # 
title: Check IdP User
description: Learn how to check which IdP user you are logged in as using pachctl. 
date: 
# taxonomy #
tags: ["workflows", "permissions", "management"]
series:
seriesPart:
weight: 4
directory: true
---

## Before You Start 

- Your organization must have an active [Enterprise license key](../../../).
- You must have pachctl installed.

## How to Check Your Current User

1. Open a terminal.
2. Run the following command:
```s
pachctl auth whoami

# You are "user:one-pachyderm-user@gmail.com"
# session expires: 08 May 21 13:59 EDT
```
