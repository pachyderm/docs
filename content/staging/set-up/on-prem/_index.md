---
# metadata # 
title:  On-Prem Setup 
description: Learn how to install Pachyderm on your premises. 
date: 
# taxonomy #
tags:  ["deployment"]
series:
seriesPart: 
weight: 3
---
## Before you start 

Before you can deploy Pachyderm, you will need to perform the following actions:

1. [Install kubectl](https://kubernetes.io/docs/tasks/tools/)
2. [Install Helm]()
3. [Deploy Kubernetes on-premises](https://kubernetes.io/docs/setup/).
4. [Deploy two Kubernetes persistent volumes for Pachyderm metadata storage](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#class-1). 
5. Deploy an on-premises object store  using a storage provider like [MinIO](https://min.io), [EMC's ECS](https://www.delltechnologies.com/en-us/storage/ecs/index.htm), or [SwiftStack](https://www.swiftstack.com/) to provide S3-compatible access to your data storage.

## How to Deploy Pachyderm On-Premises

### 1. Install Pachyderm via Helm

```s
helm repo add pach https://helm.pachyderm.com
helm repo update
```

### 2. Add Storage classes to Helm Values

Update your Helm values file to include the storage classes you are going to use:

```yaml
etcd:
  storageClass: MyStorageClass
  size: 10Gi

postgresql:
  persistence:
    storageClass: MyStorageClass
    size: 10Gi
```

### 3. Size & Configure Object Store

1. Determine the endpoint of your object store, for example `minio-server:9000`.
2. Choose a unique name for the bucket you will dedicate to Pachyderm.
3. Create a new access key ID and secret key for Pachyderm to use when accessing the object store.
4. Update the Pachyderm Helm values file with the endpoint, bucket name, access key ID, and secret key.

```s
pachd:
  storage:
    backend: minio
    minio:
      endpoint: minio-server:9000
      bucket: pachyderm-bucket
      id: pachyderm-access-key
      secret: pachyderm-secret-key
      secure: false

```

{{% notice tip %}}
You can update your Helm values file using the following command:

```s
helm upgrade pachyderm pachyderm/pachyderm -f values.yml
```
{{% /notice %}}

### 4. Install PachCTL

Install [PachCTL](TBD) and [PachCTL Auto-completion](../install-pachctl-completion).
   