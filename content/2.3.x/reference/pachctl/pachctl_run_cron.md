---
# metadata # 
title:  pachctl run cron
description: "Run an existing Pachyderm cron pipeline now"
date:  2022-10-11T16:50:12-04:00
tags:
  - run
---

### Synopsis

Run an existing Pachyderm cron pipeline now

```
pachctl run cron <pipeline> [flags]
```

### Examples

```

		# Run a cron pipeline "clock" now
		$ pachctl run cron clock
```

### Options

```
  -h, --help             help for cron
      --project string   Project containing pipeline.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

