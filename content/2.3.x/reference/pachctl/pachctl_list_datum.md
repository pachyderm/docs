---
# metadata # 
title:  pachctl list datum
description: "Return the datums in a job."
date:  2022-10-11T14:56:32-04:00
---

### Synopsis

Return the datums in a job.

```
pachctl list datum <pipeline>@<job> [flags]
```

### Options

```
  -f, --file string      The JSON file containing the pipeline to list datums from, the pipeline need not exist
  -h, --help             help for datum
  -o, --output string    Output format when --raw is set: "json" or "yaml" (default "json")
      --project string   Project containing the job
      --raw              Disable pretty printing; serialize data structures to an encoding such as json or yaml
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

