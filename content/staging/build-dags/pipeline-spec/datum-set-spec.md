---
# metadata # 
title:  Datum Set Spec PPS
description: Define how a pipeline should group its datums.
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
"datum_set_spec": {
    "number": 0,
    "size_bytes": 0,
    "per_worker": 0,
}
```

## Attributes 

|Attribute|Description|
|-|-|
|`number`| The desired number of datums in each datum set. If specified, each datum set will contain the specified number of datums. If the total number of input datums is not evenly divisible by the number of datums per set, the last datum set may contain fewer datums than the others.|
|`size_bytes`| The desired target size of each datum set in bytes. If specified, Pachyderm will attempt to create datum sets with the specified size, though the actual size may vary due to the size of the input files.|
|`per_worker`| The desired number of datum sets that each worker should process at a time. This field is similar to number, but specifies the number of sets per worker instead of the number of datums per set. |

## Behavior

The `datum_set_spec` attribute in a Pachyderm Pipeline Spec is used to control how the input data is partitioned into individual datum sets for processing. Datum sets are the unit of work that workers claim, and each worker can claim 1 or more datums. Once done processing, it commits a full datum set.

- `number` if nonzero, specifies that each datum set should contain `number` datums. Sets may contain fewer if the total number of datums don't divide evenly. If you lower the number to 1 it'll update after every datum,the cost is extra load on etcd which can slow other stuff down. Default is `0`.

- `size_bytes` , if nonzero, specifies a target size for each set of datums. Sets may be larger or smaller than `size_bytes`, but will usually be pretty close to `size_bytes` in size. Default is `0`.

- `per_worker`, if nonzero, specifies how many datum sets should be created for each worker. It can't be set with number or size_bytes. Default is `0`.


## When to Use

You should consider using the `datum_set_spec` attribute in your Pachyderm pipeline when you are experiencing stragglers, which are situations where most of the workers are idle but a few are still processing jobs. This can happen when the work is not divided up in a balanced way, which can cause some workers to be overloaded with work while others are idle.