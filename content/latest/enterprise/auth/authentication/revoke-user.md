---
# metadata # 
title: Revoke User Access
description: Learn how to revoke user access to a Pachyderm cluster.
date: 
# taxonomy #
tags: ["workflows", "permissions", "management"]
series:
seriesPart:
weight: 5
---

## Before You Start 

- You must have `clusterAdmin` role permissions.


## How to Revoke User Access

{{% notice warning %}}
You must remove the revoked user from your IdP user registry after completing the steps in this guide.
{{% /notice %}}

### Revoke a Specific Token 

```s
pachctl auth revoke --token=<pach token>
```

### Revoke All Tokens

```s
pachctl auth revoke --user=idp:usernamen@pachyderm.io
```