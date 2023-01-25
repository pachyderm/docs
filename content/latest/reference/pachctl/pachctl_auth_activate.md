---
# metadata # 
title:  pachctl auth activate
description: "Activate Pachyderm's auth system, and restrict access to existing data to the root user"
date:  2022-10-14T09:34:42-04:00
tags:
  - auth
cliGlossary:  a
---

### Synopsis

Activate Pachyderm's auth system, and restrict access to existing data to the root user

```
pachctl auth activate [flags]
```

### Options

```
      --client-id string        The client ID for this pachd (default "pachd")
      --enterprise              Activate auth on the active enterprise context
  -h, --help                    help for activate
      --issuer string           The issuer for the OIDC service (default "http://pachd:1658/")
      --only-activate           Activate auth without configuring the OIDC service
      --redirect string         The redirect URL for the OIDC service (default "http://localhost:30657/authorization-code/callback")
      --scopes strings          Comma-separated list of scopes to request (default [email,profile,groups,openid])
      --supply-root-token       Prompt the user to input a root token on stdin, rather than generating a random one.
      --trusted-peers strings   Comma-separated list of OIDC client IDs to trust
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

