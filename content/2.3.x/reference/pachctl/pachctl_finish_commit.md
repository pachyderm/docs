---
# metadata # 
title:  pachctl finish commit
description: "Finish a started commit. Commit-id must be a writeable commit."
date:  2022-10-11T16:50:12-04:00
tags:
  - finish
---

### Synopsis

Finish a started commit. Commit-id must be a writeable commit.

```
pachctl finish commit <repo>@<branch-or-commit> [flags]
```

### Options

```
      --description string   A description of this commit's contents (synonym for --message)
  -f, --force                finish the commit even if it has provenance, which could break jobs; prefer 'stop job'
  -h, --help                 help for commit
  -m, --message string       A description of this commit's contents (overwrites any existing commit description)
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

