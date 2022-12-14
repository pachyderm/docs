---
# metadata # 
title: Activate Enterprise via Pachctl
description: Learn how to deploy the Enterprise edition of Pachyderm using the pachctl CLI for an existing cluster.
date: 
# taxonomy #
tags: ["enterprise"]
series:
seriesPart:
---

## Before You Start 

- You must have a Pachyderm [Enterprise Activation Code](https://www.pachyderm.com/trial/).
- You must have pachctl and Pachyderm installed. 

## How to Activate Enterprise Pachyderm via Pachctl 

1. Open your terminal.
2. Input the following command:

```s
echo <your-activation-token> | pachctl license activate
```

3. Verify the status of the enterprise activation:

```s
pachctl enterprise get-state

# ACTIVE
```

You unlocked Pachyderm's enterprise features.
