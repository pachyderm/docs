---
# metadata # 
title:  pachctl mount
description: "Mount pfs locally. This command blocks."
date:  2022-10-14T09:34:42-04:00
tags:
cliGlossary:  m
---

### Synopsis

Mount pfs locally. This command blocks.

```
pachctl mount <path/to/mount/point> [flags]
```

### Options

```
  -d, --debug            Turn on debug messages.
  -h, --help             help for mount
      --project string   Project to mount.
  -r, --repos []string   Repos and branches / commits to mount, arguments should be of the form "repo[@branch=commit][+w]", where the trailing flag "+w" indicates write. You can omit the branch when specifying a commit unless the same commit ID is on multiple branches in the repo. (default [])
  -w, --write            Allow writing to pfs through the mount.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

