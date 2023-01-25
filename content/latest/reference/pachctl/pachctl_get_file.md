---
# metadata # 
title:  pachctl get file
description: "Return the contents of a file."
date:  2022-10-14T09:34:42-04:00
tags:
  - get
cliGlossary:  g
---

### Synopsis

Return the contents of a file.

```
pachctl get file <repo>@<branch-or-commit>:<path/in/pfs> [flags]
```

### Examples

```

# get a single file "XXX" on branch "master" in repo "foo"
$ pachctl get file foo@master:XXX

# get file "XXX" in the parent of the current head of branch "master"
# in repo "foo"
$ pachctl get file foo@master^:XXX

# get file "XXX" in the grandparent of the current head of branch "master"
# in repo "foo"
$ pachctl get file foo@master^2:XXX

# get file "test[].txt" on branch "master" in repo "foo"
# the path is interpreted as a glob pattern: quote and protect regex characters
$ pachctl get file 'foo@master:/test\[\].txt'

# get all files under the directory "XXX" on branch "master" in repo "foo"
$ pachctl get file foo@master:XXX -r

```

### Options

```
  -h, --help            help for file
      --offset int      The number of bytes in the file to skip ahead when reading.
  -o, --output string   The path where data will be downloaded.
      --progress        {true|false} Whether or not to print the progress bars. (default true)
  -r, --recursive       Download multiple files, or recursively download a directory.
      --retry           {true|false} Whether to append the missing bytes to an existing file. No-op if the file doesn't exist.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

