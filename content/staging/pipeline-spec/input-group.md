---
# metadata # 
title:  Input Group
description: Group files stored in one or multiple repos.
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: Required for Group Inputs
---

## Spec 

```s
{
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
}
```

## Behavior 

- Must have the `glob` and `group_by` parameters configured. 
- Can combine multiple inputs as long as all the base inputs are PFS inputs.

|Attribute|Description|
|-|-|
|`name`|the name of the PFS input that appears in the `INPUT` field when you run the `pachctl list pipeline` command. If an input name is not specified, it defaults to the name of the repo.|
|`branch`| |
| `glob`| a wildcard pattern that defines how a dataset is broken up into datums for further processing. When you use a glob pattern in a group input, it creates a naming convention that Pachyderm uses to group the files.|
|`lazy`||
|`empty_files`||


## When to Use 
