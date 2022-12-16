---
# metadata # 
title:  Pod Patch
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

`pod_patch` is similar to `pod_spec` above but is applied as a [JSON
Patch](https://tools.ietf.org/html/rfc6902). Note, this means that the
process outlined above of modifying an existing pod spec and then manually
blanking unchanged fields won't work, you'll need to create a correctly
formatted patch by diffing the two pod specs.

```s
{
    "pod_patch": string,
}
```