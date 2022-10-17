---
# metadata # 
title:  pachctl copy file
description: "Copy files between pfs paths."
date:  2022-10-14T09:34:42-04:00
tags:
  - copy
cliGlossary:  c
---

### Synopsis

Copy files between pfs paths.

```
pachctl copy file <src-repo>@<src-branch-or-commit>:<src-path> <dst-repo>@<dst-branch-or-commit>:<dst-path> [flags]
```

### Options

```
  -a, --append   Append to the existing content of the file, either from previous commits or previous calls to 'put file' within this commit.
  -h, --help     help for file
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

