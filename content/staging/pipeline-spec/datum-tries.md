---
# metadata # 
title:  Datum Tries
description: Define the number of job attempts to run on a datum when a failure occurs.
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
    "datum_tries": int,
}
```

## Behavior 

`datum_tries` is an integer, such as `1`, `2`, or `3`, that determines the
number of times a job attempts to run on a datum when a failure occurs. 


- Setting to `1` attempts a job once with no retries.
- If the operation succeeds in retry attempts, then the job is marked as successful. Otherwise, the job is marked as failed.


## When to Use 

You should consider setting a higher `datum_tries` count if the datums you are working have to be imported or fetched (via data ingress) from an external source.