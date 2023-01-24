---
# metadata # 
title:  Metadata
description: Add metadata to your pipeline pods using Kubernetes' labels and annotations.
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: Optional
---

## Spec 

```s
{
    "metadata": {
      "annotations": {
          "annotation": string
      },
      "labels": {
          "label": string
      }
    },
}
```

## Behavior 

- Labels help organize and track cluster objects by creating groups of pods based on a given dimension. 

- Annotations enable you to specify any arbitrary metadata. 


Both parameters require a key-value pair.  Do not confuse this parameter with `pod_patch`, which adds metadata to the user container of the pipeline pod. For more information, see [Labels and Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) and [Kubernetes Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation.


## When to Use 

Use metadata for operation ergonomics and to simplify the querying of Kubernetes objects.