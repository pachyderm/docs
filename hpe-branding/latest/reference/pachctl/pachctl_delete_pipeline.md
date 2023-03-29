## pachctl delete pipeline

Delete a pipeline.

### Synopsis

Delete a pipeline.

```
pachctl delete pipeline (<pipeline>|--all) [flags]
```

### Options

```
      --all              delete all pipelines
      --all-projects     delete pipelines from all projects; only valid with --all
  -f, --force            delete the pipeline regardless of errors; use with care
  -h, --help             help for pipeline
      --keep-repo        delete the pipeline, but keep the output repo data around (the pipeline cannot be recreated later with the same name unless the repo is deleted)
      --project string   project containing project (default "joins")
```

### Options inherited from parent commands

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

