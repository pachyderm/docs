---
# metadata # 
title:  Resource Limits PPS
description: Set the upper threshold of allowed resources a given worker can consume.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart:
label: optional
---

## Spec

```s

"resource_limits": {
"cpu": number,
"memory": string,
"gpu": {
  "type": string,
  "number": int
  }
"disk": string,
},

```

## Behavior 

`resource_limits` describes the upper threshold of allowed resources a given
worker can consume. If a worker exceeds this value, it will be evicted.

The `gpu` field is a number that describes how many GPUs each worker needs.
Only whole number are supported, Kubernetes does not allow multiplexing of
GPUs. Unlike the other resource fields, GPUs only have meaning in Limits, by
requesting a GPU the worker will have sole access to that GPU while it is
running. It's recommended to enable `autoscaling` if you are using GPUs so other
processes in the cluster will have access to the GPUs while the pipeline has
nothing to process. For more information about scheduling GPUs see the
[Kubernetes docs](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/)
on the subject.

