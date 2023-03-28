---
# metadata # 
title:  Spout PPS
description: Ingest streaming data into MLDM using a spout pipeline.
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

"spout": {
\\ Optionally, you can combine a spout with a service:
"service": {
  "internal_port": int,
  "external_port": int
  }
},

```

## Attributes 

|Attribute| Description|
|-|-|
|`service`|An optional field that is used to specify how to expose the spout as a Kubernetes service.|
|internal_port| Used for the spout's container.|
|external_port| Used for the Kubernetes service that exposes the spout.|

## Behavior 

- Does not have a PFS input; instead, it consumes data from an outside source.
- Can have a service added to it. See [Service](/{{% release %}}/reference/pipeline-spec/service).

## When to Use 

You should use the `spout` field in a MLDM Pipeline Spec when you want to read data from an external source that is not stored in a MLDM repository. This can be useful in situations where you need to read data from a service that is not integrated with MLDM, such as an external API or a message queue.

Example scenarios:

- **Data ingestion**: If you have an external data source, such as a web service, that you want to read data from and process with MLDM, you can use the spout field to read the data into MLDM.

- **Real-time data processing**: If you need to process data in real-time and want to continuously read data from an external source, you can use the spout field to read the data into MLDM and process it as it arrives.

- **Data integration**: If you have data stored in an external system, such as a message queue or a streaming service, and you want to integrate it with data stored in MLDM, you can use the spout field to read the data from the external system and process it in MLDM.