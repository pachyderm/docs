---
# metadata # 
title:  Datum Tries
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

`datum_tries` is an integer, such as `1`, `2`, or `3`, that determines the
number of times a job attempts to run on a datum when a failure occurs. 
Setting `datum_tries` to `1` will attempt a job once with no retries. 
Only failed datums are retried in a retry attempt. If the operation succeeds
in retry attempts, then the job is marked as successful. Otherwise, the job
is marked as failed.

```s
{
    "datum_tries": int,
}
```