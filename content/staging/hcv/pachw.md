---
# metadata # 
title:  PachW HCVs
description:  Create a pool of instances that dynamically scale storage task handling. 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 7
label: optional
--- 

The pachw controller creates a pool of pachd instances running in 'pachw' mode which can dynamically scale to handle storage related tasks

## Values 


```s
pachw:
  # inSidecars can be enabled to process storage related tasks in pipeline storage sidecars like version 2.4 or less.
  inSidecars: false
  maxReplicas: 1
  # minReplicas: 0
  # resources defines the kubernetes resource configuration for pachw pods. If not defined, the resource configuration from pachd will be reused. We recommend defining resources when running pachw with a high value of maxReplicas.
  #resources:
  #  limits:
  #    cpu: "1"
  #    memory: "2G"
  #  requests:
  #    cpu: "1"
  #  memory: "2G"
  ```