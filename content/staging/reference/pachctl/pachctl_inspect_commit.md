---
# metadata # 
title:  pachctl inspect commit
description: "Return info about a commit."
date:  2022-10-14T09:34:42-04:00
tags:
  - inspect
cliGlossary:  i
---

### Synopsis

Return info about a commit.

```
pachctl inspect commit <repo>@<branch-or-commit> [flags]
```

### Options

```
      --full-timestamps   Return absolute timestamps (as opposed to the default, relative timestamps).
  -h, --help              help for commit
  -o, --output string     Output format when --raw is set: "json" or "yaml" (default "json")
      --raw               Disable pretty printing; serialize data structures to an encoding such as json or yaml
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

