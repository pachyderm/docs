---
# metadata # 
title:  pachctl wait job
description: "Wait for a job to finish then return info about the job."
date:  2022-10-14T09:34:42-04:00
tags:
  - wait
cliGlossary:  w
---

### Synopsis

Wait for a job to finish then return info about the job.

```
pachctl wait job <job>|<pipeline>@<job> [flags]
```

### Options

```
      --full-timestamps   Return absolute timestamps (as opposed to the default, relative timestamps).
  -h, --help              help for job
  -o, --output string     Output format when --raw is set: "json" or "yaml" (default "json")
      --raw               Disable pretty printing; serialize data structures to an encoding such as json or yaml
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

