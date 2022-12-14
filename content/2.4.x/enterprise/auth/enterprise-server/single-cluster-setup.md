---
# metadata # 
title: Activate Enterprise Server for Single-Cluster
description: Learn how to set up a Pachyderm enterprise server for a single-cluster environment embedded in pachd.
date: 
# taxonomy #
tags: ["enterprise", "deployment", "helm"]
series:
seriesPart:
---

You can register an existing single-cluster Pachyderm instance to the embedded [Enterprise Server](../) that comes included with `pachd` using the steps in this guide. Doing so enables you to also activate [authentication](../../) and set up [IdP connectors](../../authentication/connectors). 

## Before You Start

- You must have an Enterprise license key
- You must an active Pachyderm cluster

##  How to Activate Enterprise Server 

1. Open your terminal.
2. Activate Enterprise Server:
```s
echo <your-activation-token> | pachctl license activate
```
3. Activate Authentication:
```s
pachctl auth activate --enterprise
```
4. [Set up your Identity Provider (IdP)](../../authentication/connectors/).
