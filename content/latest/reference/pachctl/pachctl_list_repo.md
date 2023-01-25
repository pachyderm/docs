---
# metadata # 
title:  pachctl list repo
description: "Return a list of repos. By default, hide system repos like pipeline metadata"
date:  2022-10-14T09:34:42-04:00
tags:
  - list
cliGlossary:  l
---

### Synopsis

Return a list of repos. By default, hide system repos like pipeline metadata

```
pachctl list repo [flags]
```

### Options

```
      --all               include system repos of all types
      --full-timestamps   Return absolute timestamps (as opposed to the default, relative timestamps).
  -h, --help              help for repo
  -o, --output string     Output format when --raw is set: "json" or "yaml" (default "json")
      --raw               Disable pretty printing; serialize data structures to an encoding such as json or yaml
      --type string       only include repos of the given type
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

