---
# metadata # 
title:  Autoscaling
description: Enables autoscaling of the worker pool based on datums in queue. 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

## Spec 

```s
{
    "autoscaling": bool
}
```

## Behavior

- The maximum number of workers is controlled by the `parallelism_spec`.
- A pipeline with no outstanding jobs will go into *standby*. A pipeline in a *standby* state consumes no resources. 

## When to Use 
