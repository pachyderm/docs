---
# metadata # 
title:  pachctl restart datum
description: "Restart a stuck datum during a currently running job; does not solve failed datums. Optionally, you can configure a job to skip failed datums via the transform.err_cmd setting of your pipeline spec."
date:  2022-10-11T16:50:12-04:00
tags:
  - restart
---

### Synopsis

Restart a stuck datum during a currently running job; does not solve failed datums. Optionally, you can configure a job to skip failed datums via the transform.err_cmd setting of your pipeline spec.

```
pachctl restart datum <pipeline>@<job> <datum-path1>,<datum-path2>,... [flags]
```

### Options

```
  -h, --help             help for datum
      --project string   Project containing the datum job
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

