## pachctl copy file

Copy files between pfs paths.

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

### Options inherited from parent commands

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

