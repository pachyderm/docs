---
# metadata # 
title:  Pipeline Specification
description:  Learn about the different attributes of a pipeline spec. 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---


This document discusses each of the fields present in a pipeline specification.
To see how to use a pipeline spec to create a pipeline, refer to the [create pipeline](../../how-tos/pipeline-operations/create-pipeline/#create-a-pipeline) section.

## Before You Start 
- Pachyderm's pipeline specifications can be written in JSON or YAML.
- Pachyderm uses its json parser if the first character is `{`.
- A pipeline specification file can contain multiple pipeline declarations at once.

<!-- 
## Manifest Format

### JSON Full Specifications

  ```s 
  {
    "pipeline": {
      "project": {
        "option": false,
        "name:" string
      },
      "name": string
    },
    "tf_job": {
      "tf_job": string,
    }
    "update": bool,
    [
      {
        "worker_id": string,
        "job_id": string,
        "datum_status" : {
          "started": timestamp,
          "data": []
        }
      }
    ],
    "reprocess": bool,
    "salt": string,
  }
 

  ```
## YAML Sample
  ```yaml
  pipeline:
    name: edges
  description: A pipeline that performs image edge detection by using the OpenCV library.
  input:
    pfs:
      glob: /*
      repo: images
  transform:
    cmd:
      - python3
      - /edges.py
    image: pachyderm/opencv
  ``` -->
 
## Minimal Spec 
In practice, you rarely need to specify all the fields.
Most fields either come with sensible defaults or can be empty.
The following text is an example of a minimum spec:

```json
{
  "pipeline": {
    "project": 1,
    "name": "wordcount"
  },
  "transform": {
    "image": "wordcount-image",
    "cmd": ["/binary", "/pfs/data", "/pfs/out"]
  },
  "input": {
        "pfs": {
            "repo": "data",
            "glob": "/*"
        }
    }
}
```
<!-- 
## Attributes 

### Project (optional)

`pipeline.project` is the namespace that your pipeline belongs to. Pachyderm ships with a default project named `Default`; however, you can create your own using `pachctl create project foo`. See [Project Operations](/tbd) for more details. 

### Name (required)

`pipeline.name` is the name of the pipeline that you are creating. Each
pipeline needs to have a unique name. Pipeline names must meet the following
requirements:

- Include only alphanumeric characters, `_` and `-`.
- Begin or end with only alphanumeric characters (not `_` or `-`).
- Not exceed 63 characters in length.


## PPS Mounts and File Access

### Mount Paths

The root mount point is at `/pfs`, which contains:

- `/pfs/input_name` which is where you would find the datum.
  - Each input will be found here by its name, which defaults to the repo
  name if not specified.
- `/pfs/out` which is where you write any output. -->
