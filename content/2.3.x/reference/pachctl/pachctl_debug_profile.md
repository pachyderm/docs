---
# metadata # 
title:  pachctl debug profile
description: "Collect a set of pprof profiles."
date:  2022-10-11T16:50:12-04:00
tags:
  - debug
---

### Synopsis

Collect a set of pprof profiles.

```
pachctl debug profile <profile> <file> [flags]
```

### Options

```
  -d, --duration duration   Duration to run a CPU profile for. (default 1m0s)
  -h, --help                help for profile
      --pachd               Only collect the profile from pachd.
  -p, --pipeline string     Only collect the profile from the worker pods for the given pipeline.
  -w, --worker string       Only collect the profile from the given worker pod.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

