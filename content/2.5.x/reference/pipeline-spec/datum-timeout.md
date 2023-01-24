---
# metadata # 
title:  Datum Timeout PPS
description:  Set the maximum execution time allowed for each datum.
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
    "datum_timeout": string,
}
```

## Behavior 

- Not set by default, allowing a datum to process for as long as needed.
- Takes precedence over the parallelism or number of datums; no single datum is allowed to exceed this value.
- The value must be a string that represents a time value, such as `1s`, `5m`, or `15h`. 

## When to Use 

You should consider setting a `datum_timeout` if the datums you are processing have a constant (expected) processing time. For example, if you know that 99% of your datums should complete in 5 minutes, a datum taking 20 minutes to process might be an indicator that something is wrong and it should be allowed to fail. 
