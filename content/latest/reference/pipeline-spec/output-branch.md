---
# metadata # 
title:  Output Branch PPS
description: Define the branch where the pipeline outputs new commits.
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

"output_branch": string,

```

## Behavior 

-  Set to `master` by default. 

## When to Use

Use this setting to output commits to `dev` or `testing` branches. 