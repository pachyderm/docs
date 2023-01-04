---
# metadata # 
title:  pachctl debug dump
description: "Collect a standard set of debugging information."
date:  2022-10-14T09:34:42-04:00
tags:
  - debug
cliGlossary:  d
---

### Synopsis

Collect a standard set of debugging information.

```
pachctl debug dump <file> [flags]
```

### Options

```
      --database          Only collect the dump from pachd's database.
  -h, --help              help for dump
  -l, --limit int         Limit sets the limit for the number of commits / jobs that are returned for each repo / pipeline in the dump.
      --pachd             Only collect the dump from pachd.
  -p, --pipeline string   Only collect the dump from the worker pods for the given pipeline.
  -w, --worker string     Only collect the dump from the given worker pod.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

