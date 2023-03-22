---
# metadata # 
title: Uninstall Pachyderm
description: Learn how to uninstall Pachyderm.
date: 
# taxonomy #
tags: 
series:
seriesPart:
directory: true
---

## Uninstall Pachyderm

```s
helm uninstall pachd 
kubectl delete pvc -l suite=pachyderm 
```

## Uninstall Pachctl 

```s
brew uninstall @<major>.<minor>
```