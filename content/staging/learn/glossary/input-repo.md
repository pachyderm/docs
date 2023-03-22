---
# metadata # 
title: Input Repository 
description: Learn about the concept of an input repository in Pachyderm.
glossaryDefinition: 
date: 
# taxonomy #
tags:  
series:
seriesPart:
--- 

In Pachyderm, an input repository is a location where data resides that is used as input for a Pachyderm [pipeline](TBD). To define an input repository, you need to fill out the `input` attribute in [pipeline's specification](TBD) file.

There are several types of inputs available, such as:

- [PFS](TBD)
- [Cron](TBD)
- [Egress (DB)](TBD)
- [Egress (Storage)](TBD)
- [Service](TBD)
- [Spout](TBD)
- [S3](TBD)

Once you have defined an input repository, you can use it as the input source for a Pachyderm pipeline. The pipeline will automatically subscribe to the branch of the input repository and process any new data that is added to the branch according to the pipeline configuration.