---
# metadata # 
title:  Input Group PPS
description: Group files stored in one or multiple repos.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series:
seriesPart:
label: Required for Group Inputs
---

## Spec 

```s
"input": {
  "group": [
    {
      "pfs": {
        "name": string,
        "repo": string,
        "branch": string,
        "glob": string,
        "group_by": string,
        "lazy": bool,
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
        "group_by": string,
        "lazy": bool,
        "empty_files": bool,
        "s3": bool
      }
    }
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
|`group_by`|A parameter that is used to group input files by a specific field or pattern. (e.g., `group_by: /path/to/grouping_field`) |
|`lazy`| Controls how the data is exposed to jobs. The default is `false` which means the job eagerly downloads the data it needs to process and exposes it as normal files on disk. If lazy is set to `true`, data is exposed as named pipes instead, and no data is downloaded until the job opens the pipe and reads it. If the pipe is never opened, then no data is downloaded.|
|`empty_files`| Controls how files are exposed to jobs. If set to `true`, it causes files from this PFS to be presented as empty files. This is useful in shuffle pipelines where you want to read the names of files and reorganize them by using symlinks.|
|`s3`| Indicates whether the input data is stored in an S3 object store.|


## Behavior 

The `group` input in a Pachyderm Pipeline Spec allows you to group input files by a specific field or pattern. 

To use the `group` input, you specify one or more PFS inputs with a `group_by` parameter. This parameter specifies a pattern or field to use for grouping the input files. The resulting groups are then passed to your pipeline as a series of grouped datums, where each datum is a single group of files.

You can specify multiple group input fields in a Pachyderm Pipeline Spec, each with their own group_by parameter. This allows you to group files by multiple fields or patterns, and pass each group to your pipeline as a separate datum.

The `glob` and `group_by` parameters must be configured. 


## When to Use 

You should consider using the `group` input in a Pachyderm Pipeline Spec when you have large datasets with multiple files that you want to partition or group by a specific field or pattern. This can be useful in a variety of scenarios, such as when you need to perform complex data analysis on a large dataset, or when you need to group files by some attribute or characteristic in order to facilitate further processing.

Example scenarios:

- **Partitioning data by time**: If you have a large dataset that spans a long period of time, you might want to partition it by day, week, or month in order to perform time-based analysis or modeling. In this case, you could use the group input field to group files by date or time, and then process each group separately.

- **Grouping data by user or account**: If you have a dataset that includes data from multiple users or accounts, you might want to group the data by user or account in order to perform user-based analysis or modeling. In this case, you could use the group input field to group files by user or account, and then process each group separately.

- **Partitioning data by geography**: If you have a dataset that includes data from multiple geographic regions, you might want to partition it by region in order to perform location-based analysis or modeling. In this case, you could use the group input field to group files by region, and then process each group separately.