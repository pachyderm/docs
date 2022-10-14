---
# metadata # 
title:  pachctl config import-kube
description: "Import a kubernetes context as a Pachyderm context. By default the current kubernetes context is used."
date:  2022-10-14T09:34:42-04:00
tags:
  - config
cliGlossary:  c
---

### Synopsis

Import a kubernetes context as a Pachyderm context. By default the current kubernetes context is used.

```
pachctl config import-kube <context> [flags]
```

### Options

```
  -e, --enterprise          Configure an enterprise server context.
  -h, --help                help for import-kube
  -k, --kubernetes string   Specify the kubernetes context's values to import.
  -n, --namespace string    Specify a namespace where Pachyderm is deployed.
  -o, --overwrite           Overwrite a context if it already exists.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

