---
# metadata # 
title:  Job Timeout PPS
description: Set the maximum execution time allowed for a job.
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

"job_timeout": string,

```

## Behavior 

- Work that is not complete by set timeout is interrupted.
- Value must be a string that represents a time value, such as `1s`, `5m`, or `15h`. 
- Differs from `datum_timeout` in that the limit is applied across all workers and all datums. 
- If not set, a job will run indefinitely until it succeeds or fails.



