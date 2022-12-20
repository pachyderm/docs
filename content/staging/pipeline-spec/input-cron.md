---
# metadata # 
title:  Input Cron
description: Trigger pipelines based on time
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---


## Spec 

```s
{
  "input": {
    "cron": {
      {
          "name": string,
          "spec": string,
          "repo": string,
          "start": time,
          "overwrite": bool
      }
    }
  }
}
```

## Behavior 
A repo is created for each cron input. When a Cron input triggers, `pachd` commits a single file, named by the current [RFC3339 timestamp](https://www.ietf.org/rfc/rfc3339.txt) to the repo which contains the time which satisfied the spec.


- **`name` (required)** defines the input's name (similar to `input.pfs.name`). 

- **`spec` (required)** defines the scheduled cadence for triggering the pipeline. [See schedule macros](https://en.wikipedia.org/wiki/Cron) for examples. Pachyderm supports non-standard schedules, such as `"@daily"`.

- `repo` defines the Pachyderm input repo. `"<pipeline-name>_<input-name>"` is used by default if not specified.

- `start` defines when to start the count. If not specified, starts immediately.  Specifying a time enables you to run on matching times from the past or skip times
from the present and only start running on matching times in the future. Format the time value according to [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).

- `overwrite` defines whether you want the timestamp file
to be overwritten on each tick; defaults to simply writing new files on each tick. By default,
when `"overwrite"` is disabled, ticks accumulate in the cron input repo. When
`"overwrite"` is enabled, Pachyderm erases the old ticks and adds new ticks
with each commit. If you do not add any manual ticks or run
`pachctl run cron`, only one tick file per commit (for the latest tick)
is added to the input repo.

## When to Use