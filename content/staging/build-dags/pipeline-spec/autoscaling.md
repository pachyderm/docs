---
# metadata # 
title:  Autoscaling PPS
description: Enable autoscaling of the worker pool based on datums in queue. 
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart:
label: optional
---

{{% notice note %}}
For a single-page view of all PPS options, go to the [PPS series page](/series/pps).
{{% /notice %}}

## Spec 

```s

"autoscaling": false

```

## Behavior

The `autoscaling` attribute in a Pachyderm Pipeline Spec is used to specify whether the pipeline should automatically scale up or down based on the processing load.

If the `autoscaling` attribute is set to `true`, Pachyderm will monitor the processing load of the pipeline, and automatically scale up or down the number of worker nodes as needed to keep up with the demand. This can help to ensure that the pipeline is always running at optimal efficiency, without wasting resources when the load is low.

- `autocaling` is set to `false` by default.
- The maximum number of workers is controlled by the `parallelism_spec`.
- A pipeline with no outstanding jobs will go into *standby*. A pipeline in a *standby* state consumes no resources. 

## When to Use 

You should consider using the `autoscaling` attribute in a Pachyderm Pipeline Spec when you have a workload that has variable processing requirements or when the processing load of your pipeline is difficult to predict.

Example scenarios:

- **Processing unpredictable workloads**: If you have a workload that has variable processing requirements, it can be difficult to predict the number of worker nodes that will be needed to keep up with the demand. In this case, you could use the `autoscaling` attribute to automatically scale the number of worker nodes up or down based on the processing load.

- **Processing large datasets**: If you have a pipeline that is processing a large dataset, it can be difficult to predict the processing requirements for the pipeline. In this case, you could use the `autoscaling` attribute to automatically scale the number of worker nodes based on the processing load, in order to keep up with the demand.

- **Handling bursty workloads**: If you have a workload that has periods of high demand followed by periods of low demand, it can be difficult to predict the processing requirements for the pipeline. In this case, you could use the `autoscaling` attribute to automatically scale the number of worker nodes up or down based on the processing load, in order to handle the bursty demand.

