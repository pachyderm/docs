---
# metadata # 
title:  pachctl inspect datum
description: "Display detailed info about a single datum. Requires the pipeline to have stats enabled."
date:  2022-10-14T09:34:42-04:00
tags:
  - inspect
cliGlossary:  i
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
      --raw              Disable pretty printing; serialize data structures to an encoding such as json or yaml
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

