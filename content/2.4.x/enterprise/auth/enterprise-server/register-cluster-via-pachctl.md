---
# metadata # 
title: Register a Cluster via Pachctl
description: Learn how to register a pachd cluster to your Enterprise Server using Pachctl.
date: 
# taxonomy #
tags: ["enterprise", "deployment", "pachctl"]
series:
seriesPart:
---

## Before You Start 

- You must have an Enterprise license key
- You must have an active Pachyderm cluster

## How to Register a Cluster 

1. Open your terminal.
2. Run the following command:
```s
pachctl enterprise register --id <my-pachd-config-name> --enterprise-server-address <pach-enterprise-IP>:650 --pachd-address <pachd-IP>:650
```
   |Attribute|Description|
   |-|-|
   |`--id`| the name of the context pointing to your cluster in `~/.pachyderm/config.json`.|
   |`--enterprise-server-address`|the host and port where pachd can reach the enterprise server.|
   |`--pachd-address`|the host and port where the enterprise server can reach pachd.  This may be internal to the kubernetes cluster, or over the internet.|

3. View all registered clusters with your enterprise server: 
```s
pachctl license list-clusters

# Using enterprise context: my-enterprise-context-name
# id: john
# address: ae1ba915f8b5b477c98cd26c67d7563b-66539067.us-west-2.elb.amazonaws.com:650
# version: 2.0.0
# auth_enabled: true
# last_heartbeat: 2021-05-21 18:37:36.072156 +0000 UTC

# ---
# id: doe
# address: 34.71.247.191:650
# version: 2.0.0
# auth_enabled: true
# last_heartbeat: 2021-05-21 18:43:42.157027 +0000 UTC
# ---
```
4. Activate Authentication:
```s
pachctl auth activate --enterprise
```
5. [Set up your Identity Provider (IdP)](../../authentication/connectors/).



