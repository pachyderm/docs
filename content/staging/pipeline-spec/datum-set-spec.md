---
# metadata # 
title:  Datum Set Spec
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---


`datum_set_spec` specifies how a pipeline should group its datums.
 A datum set is the unit of work that workers claim. Each worker claims 1 or more
 datums and it commits a full set once it's done processing it. Generally you
 should set this if your pipeline is experiencing "stragglers." I.e. situations
 where most of the workers are idle but a few are still processing jobs. It can
 fix this problem by spreading the datums out in to more granular chunks for
 the workers to process.

`datum_set_spec.number` if nonzero, specifies that each datum set should contain `number`
 datums. Sets may contain fewer if the total number of datums don't
 divide evenly. If you lower the number to 1 it'll update after every datum,
 the cost is extra load on etcd which can slow other stuff down.
 The default value is 2.

`datum_set_spec.size_bytes` , if nonzero, specifies a target size for each set of datums.
 Sets may be larger or smaller than `size_bytes`, but will usually be
 pretty close to `size_bytes` in size.

`datum_set_spec.chunks_per_worker`, if nonzero, specifies how many datum sets should be
 created for each worker. It can't be set with number or size_bytes.

```s
{
    "datum_set_spec": {
        "number": int,
        "size_bytes": int,
        "per_worker": int,
    }
}
```