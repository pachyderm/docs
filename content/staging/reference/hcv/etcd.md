---
# metadata # 
title:  ETCD HCVs
description: 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
--- 

```s
etcd:
  affinity: {}
  annotations: {}
  # dynamicNodes sets the number of nodes in the etcd StatefulSet.  It
  # is analogous to the --dynamic-etcd-nodes argument to pachctl
  # deploy.
  dynamicNodes: 1
  image:
    repository: "pachyderm/etcd"
    tag: "v3.5.1"
    pullPolicy: "IfNotPresent"
  # maxTxnOps sets the --max-txn-ops in the container args
  maxTxnOps: 10000
  priorityClassName: ""
  nodeSelector: {}
  # podLabels specifies labels to add to the etcd pod.
  podLabels: {}
  # resources specifies the resource request and limits
  resources:
    {}
    #limits:
    #  cpu: "1"
    #  memory: "2G"
    #requests:
    #  cpu: "1"
    #  memory: "2G"
  # storageClass indicates the etcd should use an existing
  # StorageClass for its storage.  It is analogous to the
  # --etcd-storage-class argument to pachctl deploy.
  # More info for setting up storage classes on various cloud providers:
  # AWS: https://docs.aws.amazon.com/eks/latest/userguide/storage-classes.html
  # GCP: https://cloud.google.com/compute/docs/disks/performance#disk_types
  # Azure: https://docs.microsoft.com/en-us/azure/aks/concepts-storage#storage-classes
  storageClass: ""
  # storageSize specifies the size of the volume to use for etcd.
  # Recommended Minimum Disk size for Microsoft/Azure: 256Gi  - 1,100 IOPS https://azure.microsoft.com/en-us/pricing/details/managed-disks/
  # Recommended Minimum Disk size for Google/GCP: 50Gi        - 1,500 IOPS https://cloud.google.com/compute/docs/disks/performance
  # Recommended Minimum Disk size for Amazon/AWS: 500Gi (GP2) - 1,500 IOPS https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html
  storageSize: 10Gi
  service:
    # annotations specifies annotations to add to the etcd service.
    annotations: {}
    # labels specifies labels to add to the etcd service.
    labels: {}
    # type specifies the Kubernetes type of the etcd service.
    type: ClusterIP
  tolerations: []
```

### etcd

This section is to configure the etcd cluster in the deployment.

- `etcd.image` sets the image to use for the etcd. This can be left at the defaults unless instructed.

- `etcd.podLabels` specifies labels to add to the etcd pods.

- `etcd.resources` specifies resources and limits in standard kubernetes format. It is left unset by default.

- `etcd.dynamicNodes` sets the number of nodes in the etcd StatefulSet. The default is 1.

- `etcd.storageClass` indicates the etcd should use an existing StorageClass for its storage. If left blank, a storageClass will be created.

- `etcd.storageSize` specifies the size of the volume to use for etcd. Etcd does not require much space. For storage that scales IOPs with size, the size must be set large enought to provide at least 1000 IOPs for performance. If you do not specify, it will default to 256Gi on Azure and 100Gi on GCP/AWS for that reason.

- `etcd.service.labels` specifies labels to add to the console service.
- `etcd.service.annotations` specifies annotations to add to the etcd service.
- `etcd.service.type` specifies the Kubernetes type of the etcd service. The default is `ClusterIP`.