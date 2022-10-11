---
# metadata # 
title:  pachctl inspect datum
description: "Display detailed info about a single datum. Requires the pipeline to have stats enabled."
date:  2022-10-11T16:50:12-04:00
tags:
  - inspect
---

### Synopsis

Display detailed info about a single datum. Requires the pipeline to have stats enabled.

```
pachctl inspect datum <pipeline>@<job> <datum> [flags]
```

### Options

```
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

