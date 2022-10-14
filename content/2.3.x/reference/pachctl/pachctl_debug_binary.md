---
# metadata # 
title:  pachctl debug binary
description: "Collect a set of binaries."
date:  2022-10-14T09:34:42-04:00
tags:
  - debug
cliGlossary:  d
---

### Synopsis

Collect a set of binaries.

```
pachctl debug binary <file> [flags]
```

### Options

```
  -h, --help              help for binary
      --pachd             Only collect the binary from pachd.
  -p, --pipeline string   Only collect the binary from the worker pods for the given pipeline.
  -w, --worker string     Only collect the binary from the given worker pod.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

