---
# metadata # 
title:  Parallelism Spec PPS
description: Define the number of workers used in parallel. 
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart:
label: Optional
---

{{% notice note %}}
For a single-page view of all PPS options, go to the [PPS series page](/series/pps).
{{% /notice %}}

## Spec

```s

"parallelism_spec": {
  "constant": int
},

```

## Behavior 


Pachyderm starts the number of workers that you specify. For example, set
`"constant":10` to use 10 workers.

- The default value is `1`

## When to Use 

{{% notice warning  %}}
Because spouts and services are designed to be single instances, do not
modify the default `parallism_spec` value for these pipelines.

{{% /notice %}}