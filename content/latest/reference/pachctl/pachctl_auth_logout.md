---
# metadata # 
title:  pachctl auth logout
description: "Log out of Pachyderm by deleting your local credential. Note that it's not necessary to log out before logging in with another account (simply run 'pachctl auth login' twice) but 'logout' can be useful on shared workstations."
date:  2022-10-14T09:34:42-04:00
tags:
  - auth
cliGlossary:  a
---

### Synopsis

Log out of Pachyderm by deleting your local credential. Note that it's not necessary to log out before logging in with another account (simply run 'pachctl auth login' twice) but 'logout' can be useful on shared workstations.

```
pachctl auth logout [flags]
```

### Options

```
      --enterprise   Log out of the active enterprise context
  -h, --help         help for logout
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

