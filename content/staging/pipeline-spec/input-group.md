---
# metadata # 
title:  Input Group
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---


A group input lets you group files that are stored in one or multiple
Pachyderm repositories by a configured glob
pattern. A group input must have the `glob` and `group_by` parameters configured
to work properly. A group can combine multiple inputs, as long as all the base inputs are PFS inputs.

You can specify the following parameters for the `group` input.

* `input.pfs.name` — the name of the PFS input that appears in the
`INPUT` field when you run the `pachctl list pipeline` command.
If an input name is not specified, it defaults to the name of the repo.

* `input.pfs.repo` — see the description in [PFS Input](#pfs-input).
the name of the Pachyderm repository with the data that
you want to join with other data.

* `input.pfs.branch` — see the description in [PFS Input](#pfs-input).

* `input.pfs.glob` — a wildcard pattern that defines how a dataset is broken
  up into datums for further processing. When you use a glob pattern in a group input,
  it creates a naming convention that Pachyderm uses to group the files.
  

    You need specify in the glob pattern parenthesis to create
    one or multiple capture groups. A capture group can include one or multiple
    characters. Use standard UNIX globbing characters to create capture,
    groups, including the following:

    * `?` — matches a single character in a filepath. For example, you
    have files named `file000.txt`, `file001.txt`, `file002.txt`, and so on.
   You can set the glob pattern to `/file(?)(?)(?)` and the `group_by` key to
    `$2`, so that Pachyderm groups the files by just their second
    characters.

    * `*` — any number of characters in the filepath. For example, if you set
    your capture group to `/(*)`, Pachyderm will group the files by their filenames.

    If you do not specify a correct `glob` pattern, Pachyderm will place all of the files in a single group.

  Joins and groups can be used simultaneously; generally, you would use the join inside the group.
  The join will then essentially filter the files, and then the group will group by the remaining files (but will lose the join structure).

* `input.pfs.lazy` — see the description in [PFS Input](#pfs-input).
* `input.pfs.empty_files` — see the description in [PFS Input](#pfs-input).

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