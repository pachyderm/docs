---
# metadata # 
title: Uninstall MLDM
description: Learn how to uninstall MLDM.
date: 
# taxonomy #
tags: 
series:
seriesPart:
---

## Uninstall MLDM

```s
helm uninstall pachd 
kubectl delete pvc -l suite=MLDM 
```

## Uninstall Pachctl 

```s
brew uninstall @<major>.<minor>
```