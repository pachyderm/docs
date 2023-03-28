---
# metadata # 
title:  Scheduling Spec PPS
description:  Define how the pipeline pods should be scheduled.
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

"scheduling_spec": {
    "node_selector": {string: string},
    "priority_class_name": string
},

```

## Attributes 

|Attribute| Description|
|-|-|
|`node_selector`|Allows you to select which nodes your pipeline will run on. Refer to the [Kubernetes docs](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) on node selectors for more information about how this works.|
|`priority_class_name`|Allows you to select the priority class for the pipeline, which is how Kubernetes chooses to schedule and de-schedule the pipeline. Refer to the [Kubernetes docs](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/#priorityclass) on priority and preemption for more information about how this works.|

## Behavior 

- When you include a `node_selector` in the `scheduling_spec`, it tells Kubernetes to schedule the pipeline's Pods on nodes that match the specified key-value pairs. For example, if you specify `{"gpu": "true"}` in the `node_selector`, Kubernetes will only schedule the pipeline's Pods on nodes that have a label `gpu=true`. This is useful when you have specific hardware or other node-specific requirements for your pipeline.

- When you specify a `priority_class_name` in the `scheduling_spec`, it tells Kubernetes to assign the specified priority class to the pipeline's Pods. The priority class determines the priority of the Pods relative to other Pods in the cluster, and can affect the order in which Pods are scheduled and the resources they are allocated. For example, if you have a high-priority pipeline that needs to complete as quickly as possible, you can assign it a higher priority class than other Pods in the cluster to ensure that it gets scheduled and allocated resources first.

## When to Use

You should use the `scheduling_spec` field in a MLDM Pipeline Spec when you have specific requirements for where and when your pipeline runs. This can include requirements related to hardware, node labels, scheduling priority, and other factors.

Example requirements:

- **Hardware requirements**: If your pipeline requires specific hardware, such as GPUs, you can use the node_selector field to ensure that your pipeline runs on nodes that have the necessary hardware.

- **Node labels**: If you have specific requirements for node labels, such as data locality, you can use the node_selector field to schedule your pipeline on nodes with the appropriate labels.

- **Priority**: If you have a high-priority pipeline that needs to complete as quickly as possible, you can use the priority_class_name field to assign a higher priority class to your pipeline's Pods.

- **Resource constraints**: If your pipeline requires a large amount of resources, such as CPU or memory, you can use the node_selector field to ensure that your pipeline runs on nodes with sufficient resources.