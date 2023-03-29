---
# metadata # 
title:  pachctl fsck
description: "Run a file system consistency check on the pachyderm file system, ensuring the correct provenance relationships are satisfied."
date:  2022-10-14T09:34:42-04:00
tags:
cliGlossary:  f
---

### Synopsis

Run a file system consistency check on the pachyderm file system, ensuring the correct provenance relationships are satisfied.

```
pachctl fsck [flags]
```

### Options

```
  -f, --fix             Attempt to fix as many issues as possible.
  -h, --help            help for fsck
      --zombie string   A single commit to check for zombie files
      --zombie-all      Check all pipelines for zombie files: files corresponding to old inputs that were not properly deleted
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

