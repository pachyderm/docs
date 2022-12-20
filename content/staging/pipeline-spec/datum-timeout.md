---
# metadata # 
title:  Datum Timeout
description:  Determines the maximum execution time allowed for each datum.
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
    "datum_timeout": string,
}
```

## Behavior 

- Not set by default, allowing a datum to process for as long as needed.
- Takes precedence over the parallelism or number of datums; no single datum is allowed to exceed this value.
- The value must be a string that represents a time value, such as `1s`, `5m`, or `15h`. 

## When to Use 
