---
# metadata # 
title:  Autoscaling PPS
description: Enable autoscaling of the worker pool based on datums in queue. 
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series:
seriesPart:
label: optional
---

## Spec 

```s

"autoscaling": bool

```

## Behavior

- The maximum number of workers is controlled by the `parallelism_spec`.
- A pipeline with no outstanding jobs will go into *standby*. A pipeline in a *standby* state consumes no resources. 

## When to Use 

You should consider enabling autoscaling if you have workloads that are:

- Resource-intensive or have variable resource needs, autoscaling can help ensure that your worker pool has the right number of nodes to handle the workload.

- Sensitive to latency, autoscaling can help ensure that there are enough resources available to handle spikes in traffic or demand.

-  Over-provisioned and not optimized for cost.
