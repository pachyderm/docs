---
# metadata # 
title:  pachctl create branch
description: "Create a new branch, or update an existing branch, on a repo, starting a commit on the branch will also create it, so there's often no need to call this."
date:  2022-10-14T09:34:42-04:00
tags:
  - create
cliGlossary:  c
---

### Synopsis

Create a new branch, or update an existing branch, on a repo, starting a commit on the branch will also create it, so there's often no need to call this.

```
pachctl create branch <repo>@<branch> [flags]
```

### Options

```
      --head string           The head of the newly created branch. Either pass the commit with format: <branch-or-commit>, or fully-qualified as <repo>@<branch>=<id>
  -h, --help                  help for branch
  -p, --provenance []string   The provenance for the branch. format: <repo>@<branch> (default [])
  -t, --trigger string        The branch to trigger this branch on.
      --trigger-all           Only trigger when all conditions are met, rather than when any are met.
      --trigger-commits int   The number of commits to use in triggering.
      --trigger-cron string   The cron spec to use in triggering.
      --trigger-size string   The data size to use in triggering.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

