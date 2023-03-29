## pachctl copy file

Copy files between pfs paths.

### Synopsis

Copy files between pfs paths.

```
pachctl copy file <src-repo>@<src-branch-or-commit>:<src-path> <dst-repo>@<dst-branch-or-commit>:<dst-path> [flags]
```

### Examples

```

# copy between repos within the current project defined by the MLDM context
# defaults to the "default" project
$ pachctl copy file srcRepo@master:/file destRepo@master:/file

# copy within a specified project
$ pachctl copy file srcRepo@master:/file destRepo@master:/file --project myProject

# copy from the current project to a different project
# here, srcRepo is in the current project, while destRepo is in myProject
$ pachctl copy file srcRepo@master:/file destRepo@master:/file --dest-project myProject

# copy from a different project to the current project
# here, srcRepo is in myProject, while destRepo is in the current project
$ pachctl copy file srcRepo@master:/file destRepo@master:/file --src-project myProject

# copy between repos across two different projects
# here, srcRepo is in project1, while destRepo is in project2
$ pachctl copy file srcRepo@master:/file destRepo@master:/file --src-project project1 --dest-project project2
```

### Options

```
  -a, --append                Append to the existing content of the file, either from previous commits or previous calls to 'put file' within this commit.
      --dest-project string   Project in which the destination repo is located. This overrides --project.
  -h, --help                  help for file
      --project string        Project in which both source and destination repos are located. (default "joins")
      --src-project string    Project in which the source repo is located. This overrides --project.
```

### Options inherited from parent commands

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

