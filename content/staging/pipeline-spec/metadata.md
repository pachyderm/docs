---
# metadata # 
title:  Metadata
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---

This parameter enables you to add metadata to your pipeline pods by using Kubernetes' `labels` and `annotations`. Labels help you to organize and keep track of your cluster objects by creating groups of pods based on the application they run, resources they use, or other parameters. Labels simplify the querying of Kubernetes objects and are handy in operations.

Similarly to labels, you can add metadata through annotations. The difference is that you can specify any arbitrary metadata through annotations.

Both parameters require a key-value pair.  Do not confuse this parameter with `pod_patch` which adds metadata to the user container of the pipeline pod. For more information, see [Labels and Selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) and [Kubernetes Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation.

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