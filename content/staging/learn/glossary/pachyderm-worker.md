---
# metadata # 
title: Pachyderm Worker
description: Learn about the concept of a Pachyderm worker.
date: 
# taxonomy #
tags:  
series: ["glossary"]
seriesPart:
--- 

Pachyderm workers are kubernetes pods that run the docker image (your user code) specified in the pipeline specification. When you create a pipeline, Pachyderm spins up workers that continuously run in the cluster, waiting for new data to process. 

Each datum goes through the following processing phases inside a Pachyderm
worker pod:

| Phase       | Description |
| ----------- | ----------- |
| Downloading | The Pachyderm worker pod downloads the datum contents <br>into Pachyderm. |
| Processing  | The Pachyderm worker pod runs the contents of the datum <br>against your code. |
| Uploading   | The Pachyderm worker pod uploads the results of processing <br>into an output repository. |

![Distributed processing internals](/images/distributed-computing102.gif) 