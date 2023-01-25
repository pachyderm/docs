---
# metadata # 
title:  pachctl run pps-load-test
description: "Run a PPS load test."
date:  2022-10-14T09:34:42-04:00
tags:
  - run
cliGlossary:  r
---

### Synopsis

Run a PPS load test.

```
pachctl run pps-load-test <spec-file>  [flags]
```

### Options

```
  -d, --dag string         The DAG specification file to use for the load test
  -h, --help               help for pps-load-test
  -p, --parallelism int    The parallelism to use for the pipelines.
      --pod-patch string   The pod patch file to use for the pipelines.
  -s, --seed int           The seed to use for generating the load.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

