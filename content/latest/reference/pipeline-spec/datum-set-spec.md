---
# metadata # 
title:  Datum Set Spec PPS
description: Define how a pipeline should group its datums.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series:
seriesPart:
label: optional
---
## Spec 

```s
"datum_set_spec": {
    "number": int,
    "size_bytes": int,
    "per_worker": int,
}
```

## Attributes 

|Attribute|Description|
|-|-|
|`number`|Determines how many datums are in a set; default is 2.|
|`size_bytes`|Defines a target size for each set of datums.|
|`chunks_per_worker`|Determines the number of datum sets that should be created for each worker.|

## Behavior

A datum set is the unit of work that workers claim. Each worker claims 1 or more
datums and it commits a full set once it's done processing it. 

- `number` if nonzero, specifies that each datum set should contain `number` datums. Sets may contain fewer if the total number of datums don't
 divide evenly. If you lower the number to 1 it'll update after every datum,
 the cost is extra load on etcd which can slow other stuff down.
 The default value is 2.

- `size_bytes` , if nonzero, specifies a target size for each set of datums. Sets may be larger or smaller than `size_bytes`, but will usually be
 pretty close to `size_bytes` in size.

- `per_worker`, if nonzero, specifies how many datum sets should be
 created for each worker. It can't be set with number or size_bytes.


## When to Use

You should set this if your pipeline is experiencing "stragglers." i.e., situations
where most of the workers are idle but a few are still processing jobs. It can
fix this problem by spreading the datums out in to more granular chunks for
the workers to process.

