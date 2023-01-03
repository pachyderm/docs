---
# metadata # 
title:  pachctl delete pipeline
description: "Delete a pipeline."
date:  2022-10-14T09:34:42-04:00
tags:
  - delete
cliGlossary:  d
---

### Synopsis

Delete a pipeline.

```
pachctl delete pipeline (<pipeline>|--all) [flags]
```

### Options

```
      --all              delete all pipelines
  -f, --force            delete the pipeline regardless of errors; use with care
  -h, --help             help for pipeline
      --keep-repo        delete the pipeline, but keep the output repo data around (the pipeline cannot be recreated later with the same name unless the repo is deleted)
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

