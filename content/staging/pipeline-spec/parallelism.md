---
# metadata # 
title:  Parallelism Spec
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---

`parallelism_spec` describes how Pachyderm parallelizes your pipeline.

Pachyderm starts the number of workers that you specify. For example, set
`"constant":10` to use 10 workers.

The default value is "constant=1".

Because spouts and services are designed to be single instances, do not
modify the default `parallism_spec` value for these pipelines.

```s
{
    "parallelism_spec": {
      "constant": int
    },
}
```