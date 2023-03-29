---
# metadata # 
title:  ETCD HCVs
description: Configure your ETCD key-value storage cluster.  
date: 
# taxonomy #
tags: ["helm"]
series: ["helm"]
seriesPart:
weight: 4
label: required
---

{{% notice note %}}
Looking for a comprehensive list of all attributes and comments? [View a complete values.yml file.](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml) or the [Helm Series page](/series/helm).
{{% /notice %}}
## About 
The ETCD section configures the ETCD cluster in the deployment.

## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


```s
etcd:
  affinity: {}
  annotations: {}
  dynamicNodes: 1 # sets the number of nodes in the etcd StatefulSet;  analogous to the --dynamic-etcd-nodes argument to pachctl
  image:
    repository: "pachyderm/etcd"
    tag: "v3.5.1"
    pullPolicy: "IfNotPresent"
  maxTxnOps: 10000 # sets the --max-txn-ops in the container args
  priorityClassName: ""
  nodeSelector: {}
  podLabels: {} # specifies labels to add to the etcd pod.
  
  resources: # specifies the resource request and limits
    {}

    #limits:
    #  cpu: "1"
    #  memory: "2G"
    #requests:
    #  cpu: "1"
    #  memory: "2G"

  storageClass: "" #  defines what existing storage class to use; analogous to --etcd-storage-class argument to pachctl 
  storageSize: 10Gi # specifies the size of the volume to use for etcd.
  service:
    annotations: {} # specifies annotations to add to the etcd service.
    labels: {} # specifies labels to add to the etcd service.
    type: ClusterIP # specifies the Kubernetes type of the etcd service.
  tolerations: []
```
