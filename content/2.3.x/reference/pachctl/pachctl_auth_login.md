---
# metadata # 
title:  pachctl auth login
description: "Login to Pachyderm. Any resources that have been restricted to the account you have with your ID provider (e.g. GitHub, Okta) account will subsequently be accessible."
date:  2022-10-11T14:56:32-04:00
---

### Synopsis

Login to Pachyderm. Any resources that have been restricted to the account you have with your ID provider (e.g. GitHub, Okta) account will subsequently be accessible.

```
pachctl auth login [flags]
```

### Options

```
      --enterprise   Login for the active enterprise context
  -h, --help         help for login
  -t, --id-token     If set, read an ID token on stdin to authenticate the user
  -b, --no-browser   If set, don't try to open a web browser
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

