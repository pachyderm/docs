---
# metadata # 
title:  Scheduling Spec
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

`scheduling_spec` specifies how the pods for a pipeline should be scheduled.

`scheduling_spec.node_selector` allows you to select which nodes your pipeline
will run on. Refer to the [Kubernetes docs](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector)
on node selectors for more information about how this works.

`scheduling_spec.priority_class_name` allows you to select the prioriy class
for the pipeline, which will how Kubernetes chooses to schedule and deschedule
the pipeline. Refer to the [Kubernetes docs](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass)
on priority and preemption for more information about how this works.

```s
{
    "scheduling_spec": {
    "node_selector": {string: string},
    "priority_class_name": string
    },
}
```