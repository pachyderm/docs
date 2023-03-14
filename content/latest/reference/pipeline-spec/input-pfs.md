---
# metadata # 
title:  Input PFS PPS
description: Add data to an input repo. 
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart:
label: Required for PFS Inputs
---

## Spec 


```s

"input": {
"pfs": {
    "project": string,
    "name": string,
    "repo": string,
    "repo_type":string,
    "branch": string,
    "commit":string,
    "glob": string,
    "join_on":string,
    "outer_join": bool,
    "group_by": string,
    "lazy" bool,
    "empty_files": bool,
    "s3": bool,
    "trigger": {
        "branch": string,
        "all": bool,
        "cron_spec": string,
        },
    }
}

```

## Behavior 
`input.pfs.name` is the name of the input. An input with the name `XXX` is
visible under the path `/pfs/XXX` when a job runs. Input names must be unique
if the inputs are crossed, but they may be duplicated between `PFSInput`s that
are combined by using the `union` operator. This is because when
`PFSInput`s are combined, you only ever see a datum from one input
at a time. Overlapping the names of combined inputs allows
you to write simpler code since you no longer need to consider which
input directory a particular datum comes from. If an input's name is not
specified, it defaults to the name of the repo. Therefore, if you have two
crossed inputs from the same repo, you must give at least one of them a
unique name.


