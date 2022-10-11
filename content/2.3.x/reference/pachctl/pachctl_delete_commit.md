---
# metadata # 
title:  pachctl delete commit
description: "Delete the sub-commits of a commit.  The data in the sub-commits will be lost.\nThis operation is only supported if none of the sub-commits have children."
date:  2022-10-11T14:56:32-04:00
---

### Synopsis

Delete the sub-commits of a commit.  The data in the sub-commits will be lost.
This operation is only supported if none of the sub-commits have children.

```
pachctl delete commit <commit-id> [flags]
```

### Options

```
  -h, --help   help for commit
```

### Inherited Options

```
      --no-color   Turn off colors.
  -v, --verbose    Output verbose logs
```

