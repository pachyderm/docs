---
# metadata # 
title:  pachctl diff file
description: "Return a diff of two file trees stored in Pachyderm"
date:  2022-10-14T09:34:42-04:00
tags:
  - diff
cliGlossary:  d
---

### Synopsis

Return a diff of two file trees stored in Pachyderm

```
pachctl diff file <new-repo>@<new-branch-or-commit>:<new-path> [<old-repo>@<old-branch-or-commit>:<old-path>] [flags]
```

### Examples

```

# Return the diff of the file "path" of the repo "foo" between the head of the
# "master" branch and its parent.
$ pachctl diff file foo@master:path

# Return the diff between the master branches of repos foo and bar at paths
# path1 and path2, respectively.
$ pachctl diff file foo@master:path1 bar@master:path2
```

### Options

```
      --diff-command string   Use a program other than git to diff files.
      --full-timestamps       Return absolute timestamps (as opposed to the default, relative timestamps).
  -h, --help                  help for file
      --name-only             Show only the names of changed files.
      --no-pager              Don't pipe output into a pager (i.e. less).
  -s, --shallow               Don't descend into sub directories.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

