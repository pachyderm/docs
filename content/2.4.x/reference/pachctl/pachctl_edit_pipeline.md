---
# metadata # 
title:  pachctl edit pipeline
description: "Edit the manifest for a pipeline in your text editor."
date:  2022-10-14T09:34:42-04:00
tags:
  - edit
cliGlossary:  e
---

### Synopsis

Edit the manifest for a pipeline in your text editor.

```
pachctl edit pipeline <pipeline> [flags]
```

### Options

```
      --editor string    Editor to use for modifying the manifest.
  -h, --help             help for pipeline
  -o, --output string    Output format: "json" or "yaml" (default "json")

      --reprocess        If true, reprocess datums that were already processed by previous version of the pipeline.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

