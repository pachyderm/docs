---
# metadata #
title: DAG
description: Learn about the concept of a DAG in Pachyderm. 
date:
# taxonomy #
tags: 
series: ["glossary"]
seriesPart:
mermaid: true
---

In Pachyderm, a Directed Acyclic Graph (DAG) is a collection of [pipelines](TBD) connected by data dependencies. The DAG defines the order in which pipelines are executed and how data flows between them.

Each pipeline in a DAG processes data from its input repositories and produces output data that can be used as input by downstream pipelines. The input repositories of a pipeline can be the output repositories of other pipelines, allowing data to flow through the DAG.

To create a DAG in Pachyderm, you create multiple [pipeline specifications](TBD) and define the dependencies between them. You can define dependencies between pipelines using the `input` parameter in the pipeline specification. For example, if you have two pipelines named `A` and `B`, and `B` depends on the output of `A`, you would set the `input` parameter of `B` to the name of the output repository of `A`.


<!-- ```s
// Pipeline Specification A
{
  "pipeline": {
    "name": "pipeline_A"
  },
  "transform": {
    "cmd": ["echo", "This is pipeline A"],
    "image": "alpine:3.12.0"
  },
  "output": {
    "pfs": {
      "repo": "pipeline_A_output"
    }
  }
}

// Pipeline Specification B 

{
  "pipeline": {
    "name": "pipeline_B"
  },
  "input": {
    "pfs": {
      "repo": "pipeline_A_output"
    }
  },
  "transform": {
    "cmd": ["echo", "This is pipeline B"],
    "image": "alpine:3.12.0"
  },
  "output": {
    "pfs": {
      "repo": "pipeline_B_output"
    }
  }
}
``` -->