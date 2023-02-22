---
# metadata # 
title:  Input Cross PPS
description: Create a cross product of other inputs. 
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series:
seriesPart:
label: Required for Cross Inputs
---

## Spec 

```s

"input": {
  "cross": [
  {
    "pfs": {
      "name": string,
      "repo": string,
      "branch": string,
      "glob": string,
      "lazy" bool,
      "empty_files": bool,
      "s3": bool
    }
  },
  {
    "pfs": {
      "name": string,
      "repo": string,
      "branch": string,
      "glob": string,
      "lazy" bool,
      "empty_files": bool,
      "s3": bool
    }
  }
  ...
]
}

```

## Attributes

|Attribute|Description|
|-|-|
|`name`|The name of the PFS input that appears in the `INPUT` field when you run the `pachctl list pipeline` command. If an input name is not specified, it defaults to the name of the repo.|
|`repo`|Specifies the name of the Pachyderm repository that contains the input data.|
|`branch`| The branch to watch for commits. If left blank, Pachyderm sets this value to master. |
| `glob`| A wildcard pattern that defines how a dataset is broken up into datums for further processing. When you use a glob pattern in a group input, it creates a naming convention that Pachyderm uses to group the files.|
|`lazy`| Controls how the data is exposed to jobs. The default is `false` which means the job eagerly downloads the data it needs to process and exposes it as normal files on disk. If lazy is set to `true`, data is exposed as named pipes instead, and no data is downloaded until the job opens the pipe and reads it. If the pipe is never opened, then no data is downloaded.|
|`empty_files`| Controls how files are exposed to jobs. If set to `true`, it causes files from this PFS to be presented as empty files. This is useful in shuffle pipelines where you want to read the names of files and reorganize them by using symlinks.|
|`s3`| Indicates whether the input data is stored in an S3 object store.|


## Behavior 

`input.cross` is an array of inputs to cross.
The inputs do not have to be `pfs` inputs. They can also be
`union` and `cross` inputs.

A cross input creates tuples of the datums in the inputs. In the example
below, each input includes individual datums, such as if  `foo` and `bar`
were in the same repository with the glob pattern set to `/*`.
Alternatively, each of these datums might have come from separate repositories
with the glob pattern set to `/` and being the only file system objects in these
repositories.

```s
| inputA | inputB | inputA ⨯ inputB |
| ------ | ------ | --------------- |
| foo    | fizz   | (foo, fizz)     |
| bar    | buzz   | (foo, buzz)     |
|        |        | (bar, fizz)     |
|        |        | (bar, buzz)     |
```

The cross inputs above do not take a name and maintain
the names of the sub-inputs.
In the example above, you would see files under `/pfs/inputA/...`
and `/pfs/inputB/...`.

## When to Use

You should use a `cross` input in a Pachyderm Pipeline Spec when you need to perform operations on combinations of data from multiple Pachyderm repositories. The `cross` input allows you to generate a set of combinations of files between two or more repositories, which can be used as the input to your pipeline.

Example scenarios:

- **Data analysis**: If you have data from multiple sources that you need to combine and analyze, a cross input can be used to generate a set of combinations of data that can be used as the input to your analysis.

- **Machine learning**: If you need to train a machine learning model on combinations of data from multiple sources, a cross input can be used to generate a set of combinations of data that can be used as the input to your model.

- **Report generation**: If you need to generate reports that combine data from multiple sources, a cross input can be used to generate a set of combinations of data that can be used as the input to your report generation process.



