---
# metadata # 
title:  pachctl config update context
description: "Updates an existing context config from a given name (or the currently-active context, if no name is given)."
date:  2022-10-14T09:34:42-04:00
tags:
  - config-update
cliGlossary:  c
---

### Synopsis

Updates an existing context config from a given name (or the currently-active context, if no name is given).

```
pachctl config update context [<context>] [flags]
```

### Options

```
      --auth-info string               Set a new k8s auth info.
      --cluster-name string            Set a new cluster name.
  -h, --help                           help for context
      --namespace string               Set a new namespace.
      --pachd-address string           Set a new name pachd address.
      --project string                 Set a new project.
      --remove-cluster-deployment-id   Remove the cluster deployment ID field, which will be repopulated on the next 'pachctl' call using this context.
      --server-cas string              Set new trusted CA certs.
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

