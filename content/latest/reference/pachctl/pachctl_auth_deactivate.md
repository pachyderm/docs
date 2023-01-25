---
# metadata # 
title:  pachctl auth deactivate
description: "Deactivate Pachyderm's auth and identity systems, which will delete ALL auth tokens, ACLs and admins, IDP integrations and OIDC clients, and expose all data in the cluster to any user with cluster access. Use with caution."
date:  2022-10-14T09:34:42-04:00
tags:
  - auth
cliGlossary:  a
---

### Synopsis

Deactivate Pachyderm's auth and identity systems, which will delete ALL auth tokens, ACLs and admins, IDP integrations and OIDC clients, and expose all data in the cluster to any user with cluster access. Use with caution.

```
pachctl auth deactivate [flags]
```

### Options

```
      --enterprise   Deactivate auth on the active enterprise context
  -h, --help         help for deactivate
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

