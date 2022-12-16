---
# metadata # 
title:  Job Timeout
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

`job_timeout` determines the maximum execution time allowed for a job. It
differs from `datum_timeout` in that the limit is applied across all
workers and all datums. This is the *wall time*, which means that if
you set `job_timeout` to one hour and the job does not finish the work
in one hour, it will be interrupted.
When you set this value, you need to
consider the parallelism, total number of datums, and execution time per
datum. The value must be a string that represents a time value, such as
`1s`, `5m`, or `15h`. In addition, the number of datums might change over
jobs. Some new commits might have more files, and therefore, more datums.
Similarly, other commits might have fewer files and datums. If this
parameter is not set, the job will run indefinitely until it succeeds or fails.
```s
{
    "job_timeout": string,
}
```