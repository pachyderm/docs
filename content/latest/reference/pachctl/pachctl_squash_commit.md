---
# metadata # 
title:  pachctl squash commit
description: "Squash the sub-commits of a commit.  The data in the sub-commits will remain in their child commits.\nThe squash will fail if it includes a commit with no children"
date:  2022-10-14T09:34:42-04:00
tags:
  - squash
cliGlossary:  s
---

### Synopsis

Squash the sub-commits of a commit.  The data in the sub-commits will remain in their child commits.
The squash will fail if it includes a commit with no children

```
pachctl squash commit <commit-id> [flags]
```

### Options

```
  -h, --help   help for commit
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

