---
# metadata # 
title:  pachctl list pipeline
description: "Return info about all pipelines."
date:  2022-10-11T16:50:12-04:00
tags:
  - list
---

### Synopsis

Return info about all pipelines.

```
pachctl list pipeline [<pipeline>] [flags]
```

### Options

```
  -c, --commit string       List the pipelines as they existed at this commit.
      --full-timestamps     Return absolute timestamps (as opposed to the default, relative timestamps).
  -h, --help                help for pipeline
      --history string      Return revision history for pipelines. (default "none")
  -o, --output string       Output format when --raw is set: "json" or "yaml" (default "json")
      --project string      Project containing projects.
      --raw                 Disable pretty printing; serialize data structures to an encoding such as json or yaml
  -s, --spec                Output 'create pipeline' compatibility specs.
      --state stringArray   Return only pipelines with the specified state. Can be repeated to include multiple states
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

