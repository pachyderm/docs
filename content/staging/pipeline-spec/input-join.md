---
# metadata # 
title:  Input Join
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---


A join input enables you to join files that are stored in separate
Pachyderm repositories and that match a configured glob
pattern. A join input must have the `glob` and `join_on` parameters configured
to work properly. A join can combine multiple PFS inputs.

You can optionally add `"outer_join": true` to your PFS input. 
In that case, you will alter the join's behavior from a default "inner-join" (creates a datum if there is a match only) to a "outer-join" (the repos marked as `"outer_join": true` will see a datum even if there is no match).
You can set 0 to many PFS input to `"outer_join": true` within your `join`.

You can specify the following parameters for the `join` input.

* `input.pfs.name` — the name of the PFS input that appears in the
`INPUT` field when you run the `pachctl list pipeline` command.
If an input name is not specified, it defaults to the name of the repo.

* `input.pfs.repo` — see the description in [PFS Input](#pfs-input).
the name of the Pachyderm repository with the data that
you want to join with other data.

* `input.pfs.branch` — see the description in [PFS Input](#pfs-input).

* `input.pfs.glob` — a wildcard pattern that defines how a dataset is **broken
  up into datums** for further processing. When you use a glob pattern in joins,
  it creates a naming convention that Pachyderm uses to join files. In other
  words, Pachyderm joins the files that are named according to the glob
  pattern and skips those that are not.

    You can specify the glob pattern for joins in a parenthesis to create
    one or multiple capture groups. A capture group can include one or multiple
    characters. Use standard UNIX globbing characters to create capture,
    groups, including the following:

    - `?` — matches a single character in a filepath. For example, you
    have files named `file000.txt`, `file001.txt`, `file002.txt`, and so on.
    You can set the glob pattern to `/file(?)(?)(?)` and the `join_on` key to
    `$2`, so that Pachyderm matches only the files that have same second
    character.

    - `*` — any number of characters in the filepath. For example, if you set
    your capture group to `/(*)`, Pachyderm matches all files in the root
    directory.

    If you do not specify a correct `glob` pattern, Pachyderm performs the
    `cross` input operation instead of `join`.

* `input.pfs.outer_join`- Set to `true`, your PFS input will see datums even if there is no match. 
  Defaults to false.

* `input.pfs.lazy` — see the description in [PFS Input](#pfs-input).
* `input.pfs.empty_files` — see the description in [PFS Input](#pfs-input).

```s
{
  "input": {
  "join": [
    {
      "pfs": {
        "name": string,
        "repo": string,
        "branch": string,
        "glob": string,
        "join_on": string,
        "outer_join": bool,
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
        "join_on": string,
        "outer_join": bool,
        "lazy": bool,
        "empty_files": bool,
        "s3": bool
      }
    }
  ]
}
}
```