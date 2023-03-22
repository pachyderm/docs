---
# metadata #
title: Pipeline Inputs
description: Learn about the concept of a pipeline input.
date:
# taxonomy #
tags: 
series: ["glossary"]
seriesPart:
---

In Pachyderm, pipeline inputs are defined as the source of the data that the [pipeline](TBD) reads and processes. The input for a pipeline can be a Pachyderm repository ([input repo](TBD)) or an external data source, such as a file in a cloud storage service.

To define a pipeline input, you need to specify the source of the data and how the data is organized. This is done in the `input` section of the [pipeline specification](TBD) file, which is a YAML or JSON file that defines the configuration of the pipeline.

The input section can contain one or more input sources, each specified as a separate block. There are several types of pipeline inputs available, such as:

- [PFS](TBD)
- [Cron](TBD)
- [Egress (DB)](TBD)
- [Egress (Storage)](TBD)
- [Service](TBD)
- [Spout](TBD)
- [S3](TBD)