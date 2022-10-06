---
# metadata # 
title: Create a Pipeline
description: Learn how to create a pipeline using the pachctl create command. 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---

To create a [pipeline](../../../concepts/pipeline-concepts/pipeline), you need to define a [pipeline specification](../../../reference/pipeline-spec/) in YAML, JSON, or Jsonnet. 

## Before You Start

A basic pipeline must have all of the following:

- **`pipeline.name`**: The name of your pipeline.
- **`transform.cmd`**: The command that executes your user code.
- **`transform.img`**: The image that contains your user code. 
- **`input.pfs.repo`**: The output repository for the transformed data.
- **`input.pfs.glob`**: The [glob pattern](../../../concepts/pipeline-concepts/datum/glob-pattern) used to identify the shape of [datums](../../../concepts/pipeline-concepts/datum).


## How to Create a Pipeline

### Via Local File 

1. Define a [pipeline specification](../../../reference/pipeline-spec/) in YAML, JSON, or Jsonnet.

2. Pass the pipeline configuration to Pachyderm:

    ```s
    pachctl create pipeline -f <pipeline_spec>
    ```
       
### Via URL 

1. Find a pipeline specification hosted in a public or internal repository.
2. Pass the pipeline configuration to Pachyderm:
  ```s
  pachctl create pipeline -f https://raw.githubusercontent.com/pachyderm/pachyderm/{{< majorMinorVersion >}}/examples/opencv/edges.json
  ```

### Via Jsonnet

[Jsonnet Pipeline specs](../jsonnet-pipeline-specs/) let you create pipelines while passing a set of parameters dynamically, allowing you to reuse the baseline of a given pipeline while changing the values of chosen fields.
You can, for example, create multiple pipelines out of the same jsonnet pipeline spec file while pointing each of them at different input repositories, parameterize a command line in the transform field of your pipelines, or dynamically pass various docker images to train different models on the same dataset. 

For illustration purposes, in the following example, we are creating a pipeline named `edges-1` and pointing its input repository at the repo 'images':
```s
pachctl create pipeline --jsonnet jsonnet/edges.jsonnet --arg suffix=1 --arg src=images
```

{{% notice info %}}

You can define multiple pipeline specifications in one file by separating the specs with the following separator: `---`. This works in both JSON and YAML files.
{{% /notice %}}


## Examples 

### JSON

```json
{
  "pipeline": {
    "name": "edges"
  },
  "description": "A pipeline that performs image edge detection by using the OpenCV library.",
  "transform": {
    "cmd": [ "python3", "/edges.py" ],
    "image": "pachyderm/opencv"
  },
  "input": {
    "pfs": {
      "repo": "images",
      "glob": "/*"
    }
  }
}
```

### YAML 

```yaml
pipeline:
  name: edges
description: A pipeline that performs image edge detection by using the OpenCV library.
transform:
  cmd:
  - python3
  - "/edges.py"
  image: pachyderm/opencv
input:
  pfs:
    repo: images
    glob: "/*"
```

## Considerations

- When you create a pipeline, Pachyderm automatically creates an eponymous output
repository. However, if such a repo already exists, your pipeline will take
over the master branch. The files that were stored in the repo before
will still be in the `HEAD` of the branch.