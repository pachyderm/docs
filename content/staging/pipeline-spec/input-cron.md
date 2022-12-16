---
# metadata # 
title:  Input Cron
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---


Cron inputs allow you to trigger pipelines based on time. A Cron input is
based on the Unix utility called `cron`. When you create a pipeline with
one or more Cron inputs, `pachd` creates a repo for each of them. The start
time for Cron input is specified in its spec.
When a Cron input triggers,
`pachd` commits a single file, named by the current [RFC
3339 timestamp](https://www.ietf.org/rfc/rfc3339.txt) to the repo which
contains the time which satisfied the spec.

```s
{
    "name": string,
    "spec": string,
    "repo": string,
    "start": time,
    "overwrite": bool
}
```

`input.cron.name` is the name for the input. Its semantics is similar to
those of `input.pfs.name`. Except that it is not optional.

`input.cron.spec` is a cron expression which specifies the schedule on
which to trigger the pipeline. To learn more about how to write schedules,
see the [Wikipedia page on cron](https://en.wikipedia.org/wiki/Cron).
Pachyderm supports non-standard schedules, such as `"@daily"`.

`input.cron.repo` is the repo which Pachyderm creates for the input. This
parameter is optional. If you do not specify this parameter, then
`"<pipeline-name>_<input-name>"` is used by default.

`input.cron.start` is the time to start counting from for the input. This
parameter is optional. If you do not specify this parameter, then the
time when the pipeline was created is used by default. Specifying a
time enables you to run on matching times from the past or skip times
from the present and only start running
on matching times in the future. Format the time value according to [RFC
3339](https://www.ietf.org/rfc/rfc3339.txt).

`input.cron.overwrite` is a flag to specify whether you want the timestamp file
to be overwritten on each tick. This parameter is optional, and if you do not
specify it, it defaults to simply writing new files on each tick. By default,
when `"overwrite"` is disabled, ticks accumulate in the cron input repo. When
`"overwrite"` is enabled, Pachyderm erases the old ticks and adds new ticks
with each commit. If you do not add any manual ticks or run
`pachctl run cron`, only one tick file per commit (for the latest tick)
is added to the input repo.

```s
{
  "input": {
  "cron": {
      "project": string,
      "name": string,
      "spec": string,
      "repo": string,
      "start": time,
      "overwrite": bool
  }
}
}
```