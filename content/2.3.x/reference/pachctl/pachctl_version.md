---
# metadata # 
title:  pachctl version
description: "Print Pachyderm version information."
date:  2022-10-11T16:50:12-04:00
tags:
---

### Synopsis

Print Pachyderm version information.

```
pachctl version [flags]
```

### Options

```
      --client-only      If set, only print pachctl's version, but don't make any RPCs to pachd. Useful if pachd is unavailable
      --enterprise       If set, 'pachctl version' will run on the active enterprise context.
  -h, --help             help for version
  -o, --output string    Output format when --raw is set: "json" or "yaml" (default "json")
      --raw              Disable pretty printing; serialize data structures to an encoding such as json or yaml
      --timeout string   If set, 'pachctl version' will timeout after the given duration (formatted as a golang time duration--a number followed by ns, us, ms, s, m, or h). If --client-only is set, this flag is ignored. If unset, pachctl will use a default timeout; if set to 0s, the call will never time out. (default "default")
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

