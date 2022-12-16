---
# metadata # 
title:  Spout
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

`spout` is a type of pipeline
that ingests streaming data.
Unlike a union or cross pipeline,
a spout pipeline does not have
a PFS input.
Instead, it consumes data from an outside source.

{{% notice note %}}
A service pipeline cannot be configured as a spout, but **a spout can have a service added to it**
by adding the `service` attribute to the `spout` field. In that case, Kubernetes creates a service endpoint that you can expose externally. You can get the information about the service by running `kubectl get services`.
{{% /notice %}}

For more information, see [Spouts](../../concepts/pipeline-concepts/pipeline/spout).

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