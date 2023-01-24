---
# metadata # 
title:  Scheduling Spec
description:  Define how the pipeline pods should be scheduled.
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
    "scheduling_spec": {
        "node_selector": {string: string},
        "priority_class_name": string
    },
}
```

## Attributes 

|Attribute| Description|
|-|-|
|`node_selector`|Allows you to select which nodes your pipeline will run on. Refer to the [Kubernetes docs](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) on node selectors for more information about how this works.|
|`priority_class_name`|Allows you to select the priority class for the pipeline, which is how Kubernetes chooses to schedule and deschedule the pipeline. Refer to the [Kubernetes docs](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass) on priority and preemption for more information about how this works.|


## When to Use 