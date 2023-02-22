---
# metadata # 
title:  Datum Tries PPS
description: Define the number of job attempts to run on a datum when a failure occurs.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series:
seriesPart:
label: optional
---


## Spec 

```s

"datum_tries": int,

```

## Behavior 

The `datum_tries` attribute in a Pachyderm pipeline specifies the maximum number of times a datum can be retried if it fails to process. When a datum fails to process, either because of an error in the processing logic or because it exceeds the [`datum_timeout`](../datum-timeout) value, Pachyderm will automatically retry the datum, up to the number of times specified in `datum_tries`.

Each retry of a datum is treated as a new attempt, and the datum is added back to the job queue for processing. The retry process is transparent to the user and happens automatically within the Pachyderm system.

Other considerations:

- Setting to `1` attempts a job once with no retries.
- If the operation succeeds in retry attempts, then the job is marked as successful. Otherwise, the job is marked as failed.


## When to Use 

 You should consider setting a higher `datum_tries` count if your pipeline has a large number of datums that are prone to errors or timeouts, or if the datums you are working with have to be imported or fetched (via data ingress) from an external source.

