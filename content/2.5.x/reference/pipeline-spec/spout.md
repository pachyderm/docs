---
# metadata # 
title:  Spout PPS
description: Ingest streaming data into Pachyderm using a spout pipeline.
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
  "spout": {
  \\ Optionally, you can combine a spout with a service:
  "service": {
    "internal_port": int,
    "external_port": int
    }
  },
}
```

## Behavior 

- Does not have a PFS input; instead, it consumes data from an outside source.
- Can have a service added to it. See [Service](../service).
