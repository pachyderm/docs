---
# metadata # 
title:  Output Branch
description: Define the branch where the pipeline outputs new commits.
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
    "output_branch": string,
}
```

## Behavior 

-  Set to `master` by default. 

## When to Use

Use this setting to output commits to `dev` or `testing` branches. 