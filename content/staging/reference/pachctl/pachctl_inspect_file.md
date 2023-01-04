---
# metadata # 
title:  pachctl inspect file
description: "Return info about a file."
date:  2022-10-14T09:34:42-04:00
tags:
  - inspect
cliGlossary:  i
---

### Synopsis

Return info about a file.

```
pachctl inspect file <repo>@<branch-or-commit>:<path/in/pfs> [flags]
```

### Options

```
  -h, --help            help for file
  -o, --output string   Output format when --raw is set: "json" or "yaml" (default "json")
      --raw             Disable pretty printing; serialize data structures to an encoding such as json or yaml
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

