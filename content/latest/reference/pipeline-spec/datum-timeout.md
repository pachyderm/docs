---
# metadata # 
title:  Datum Timeout PPS
description:  Set the maximum execution time allowed for each datum.
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

"datum_timeout": string,

```

## Behavior 

The `datum_timeout` attribute in a Pachyderm pipeline is used to specify the maximum amount of time that a worker is allowed to process a single datum in the pipeline.

When a worker begins processing a datum, Pachyderm starts a timer that tracks the elapsed time since the datum was first assigned to the worker. If the worker has not finished processing the datum before the `datum_timeout` period has elapsed, Pachyderm will automatically mark the datum as failed and reassign it to another worker to [retry](../datum-tries). This helps to ensure that slow or problematic datums do not hold up the processing of the entire pipeline.

Other considerations:

- Not set by default, allowing a datum to process for as long as needed.
- Takes precedence over the parallelism or number of datums; no single datum is allowed to exceed this value.
- The value must be a string that represents a time value, such as `1s`, `5m`, or `15h`. 

## When to Use 

You should consider using the `datum_timeout` attribute in your Pachyderm pipeline when you are processing large or complex datums that may take a long time to process, and you want to avoid having individual datums hold up the processing of the entire pipeline.

For example, if you are processing images or videos that are particularly large, or if your pipeline is doing complex machine learning or deep learning operations that can take a long time to run on individual datums, setting a reasonable `datum_timeout` can help ensure that your pipeline continues to make progress even if some datums are slow or problematic.

