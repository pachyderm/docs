---
# metadata #
title: Pipeline
description: 
date:
# taxonomy #
tags: 
series:
seriesPart:
---

A pipeline is a Pachyderm primitive responsible for reading data from a specified source, such as a Pachyderm repo, transforming it according to the [pipeline specification](PPS), and writing the result to an output repo. 

Pipelines subscribe to a branch in one or more input repositories, and every time the branch has a new [commit](TBD), the pipeline executes a job that runs [user code](TBD) to completion and writes the results to a commit in the output repository.

Pipelines are defined declaratively using a JSON or YAML file (the pipeline specification), which must include the `name`, `input`, and `transform` parameters at a minimum. Pipelines can be chained together to create a directed acyclic graph (DAG).