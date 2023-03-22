---
# metadata # 
title:  PostgreSQL Subchart HCVs
description: Use the bundled version of PostgreSQL (metadata storage) for testing on your personal machine.
date: 
# taxonomy #
tags: ["helm"]
series: ["helm"]
seriesPart:
weight: 10
label: Not For Production
--- 

{{% notice note %}}
Looking for a comprehensive list of all attributes and comments? [View a complete values.yml file.](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml) or the [Helm Series page](/series/helm).
{{% /notice %}}
## About

The PostgresQL section controls the Bitnami PostgreSQL subchart. Pachyderm runs on Kubernetes, is backed by an object store of your choice, and comes with a bundled version of PostgreSQL (metadata storage) by default.

**We recommended disabling this bundled PostgreSQL** and using a managed database instance (such as RDS, CloudSQL, or PostgreSQL Server) for production environments. 

See storage class details for your provider:

- [AWS](https://docs.aws.amazon.com/eks/latest/userguide/storage-classes.html) | Min: 500Gi (GP2) / 1,500 IOP
- [GCP](https://cloud.google.com/compute/docs/disks/performance#disk_types) | Min: 50Gi / 1,500 IOPS
- [Azure](https://docs.microsoft.com/en-us/azure/aks/concepts-storage#storage-classes) | Min: 256Gi / 1,100 IOPS

## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 

{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="Production" state="active" %}}
{{% wizardButton option="Personal Machine" %}}

{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="options/production" %}}
```s
postgresql:
  enabled: false # if false, you must specify a PostgreSQL database server connection @ global.postgresql
```
{{% /wizardResult %}}

{{% wizardResult val1="options/personal-machine" %}}


```s
postgresql:
  enabled: true # if false, you must specify a PostgreSQL database server connection @ global.postgresql
  image:
    tag: "13.3.0"
  # DEPRECATED from pachyderm 2.1.5
  initdbScripts:
    dex.sh: |
      #!/bin/bash
      set -e
      psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE DATABASE dex;
        GRANT ALL PRIVILEGES ON DATABASE dex TO "$POSTGRES_USER";
      EOSQL
  fullnameOverride: postgres
  persistence: # Specify the storage class for the postgresql Persistent Volume (PV)
    storageClass: "" #  specifies the size of the volume to use for postgresql
    size: 10Gi
    labels:
      suite: pachyderm
  primary:
    priorityClassName: ""
    nodeSelector: {}
    tolerations: []
  readReplicas:
    priorityClassName: ""
    nodeSelector: {}
    tolerations: []
```
{{% /wizardResult %}}

{{% /wizardResults %}}
{{</stack>}}

