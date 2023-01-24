---
# metadata # 
title:  Pod Patch PPS
description: Patch a Pod Spec.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series:
seriesPart:
label: optional
---

## Spec 

```s
{
    "pod_patch": string,
}
```

## Behavior 

`pod_patch` is similar to `pod_spec` but is applied as a [JSON
Patch](https://tools.ietf.org/html/rfc6902). Note, this means that the
process outlined above of modifying an existing pod spec and then manually
blanking unchanged fields won't work, you'll need to create a correctly
formatted patch by diffing the two pod specs.

##  When to Use 