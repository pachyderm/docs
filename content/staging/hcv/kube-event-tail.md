---
# metadata # 
title:  Kube Event Tail HCVs
description: 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 8
--- 

Kube Event Tail deploys a lightweight app that watches Kubernetes events and echoes them into logs. 

## Values

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 

```s
kubeEventTail:
  enabled: true
  clusterScope: false # if true, watches just events in its namespace 
  image:
    repository: pachyderm/kube-event-tail
    pullPolicy: "IfNotPresent"
    tag: "v0.0.6"
  resources:
    limits:
      cpu: "1"
      memory: 100Mi
    requests:
      cpu: 100m
      memory: 45Mi
```