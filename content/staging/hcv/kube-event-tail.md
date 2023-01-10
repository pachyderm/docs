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

## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


```s
kubeEventTail:
  # Deploys a lightweight app that watches kubernetes events and echos them to logs.
  enabled: true
  # clusterScope determines whether kube-event-tail should watch all events or just events in its namespace.
  clusterScope: false
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