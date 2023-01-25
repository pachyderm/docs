---
# metadata # 
title:  Pod Spec PPS
description: Set fields in the Pod Spec that aren't explicitly exposed.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series:
seriesPart:
label: optional
---

##  Spec

```s
{
    "pod_spec": string,
}
```

## Behavior 

`pod_spec` is an advanced option that allows you to set fields in the pod spec
that haven't been explicitly exposed in the rest of the pipeline spec. A good
way to figure out what JSON you should pass is to create a pod in Kubernetes
with the proper settings, then do:

```s
kubectl get po/<pod-name> -o json | jq .spec
```

this will give you a correctly formated piece of JSON, you should then remove
the extraneous fields that Kubernetes injects or that can be set else where.

The JSON is applied after the other parameters for the `pod_spec` have already
been set as a [JSON Merge Patch](https://tools.ietf.org/html/rfc7386). This
means that you can modify things such as the storage and user containers.

