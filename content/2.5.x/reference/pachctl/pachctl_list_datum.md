---
# metadata # 
title:  pachctl list datum
description: "Return the datums in a job."
date:  2022-10-14T09:34:42-04:00
tags:
  - list
cliGlossary:  l
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
      --raw              Disable pretty printing; serialize data structures to an encoding such as json or yaml
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

