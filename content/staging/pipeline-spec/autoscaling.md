---
# metadata # 
title:  Autoscaling
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

`autoscaling` indicates that the pipeline should automatically scale the worker
pool based on the datums it has to process.
The maximum number of workers is controlled by the `parallelism_spec`.
A pipeline with no outstanding jobs
will go into *standby*. A pipeline in a *standby* state will have no pods running and
thus will consume no resources. 

```s
{
    "autoscaling": bool
}
```