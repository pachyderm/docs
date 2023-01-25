---
# metadata # 
title:  pachctl glob file
description: "Return files that match a glob pattern in a commit (that is, match a glob pattern in a repo at the state represented by a commit). Glob patterns are documented [here](https://golang.org/pkg/path/filepath/#Match)."
date:  2022-10-14T09:34:42-04:00
tags:
  - glob
cliGlossary:  g
---

### Synopsis

Return files that match a glob pattern in a commit (that is, match a glob pattern in a repo at the state represented by a commit). Glob patterns are documented [here](https://golang.org/pkg/path/filepath/#Match).

```
pachctl glob file "<repo>@<branch-or-commit>:<pattern>" [flags]
```

### Examples

```

# Return files in repo "foo" on branch "master" that start
# with the character "A".  Note how the double quotation marks around the
# parameter are necessary because otherwise your shell might interpret the "*".
$ pachctl glob file "foo@master:A*"

# Return files in repo "foo" on branch "master" under directory "data".
$ pachctl glob file "foo@master:data/*"

# If you only want to view all files on a given repo branch, use "list file -f <repo>@<branch>" instead.
```

### Options

```
      --full-timestamps   Return absolute timestamps (as opposed to the default, relative timestamps).
  -h, --help              help for file
  -o, --output string     Output format when --raw is set: "json" or "yaml" (default "json")
      --raw               Disable pretty printing; serialize data structures to an encoding such as json or yaml
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

