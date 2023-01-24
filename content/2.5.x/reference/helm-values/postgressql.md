---
# metadata # 
title:  PostgresQL Subchart HCVs
description: 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 10
--- 

## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


```s

# Note: Postgres values control the Bitnami Postgresql Subchart
postgresql:
  # enabled controls whether to install postgres or not.
  # If not using the built in Postgres, you must specify a Postgresql
  # database server to connect to in global.postgresql
  # The enabled value is watched by the 'condition' set on the Postgresql
  # dependency in Chart.yaml
  enabled: true
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
  persistence:
    # Specify the storage class for the postgresql Persistent Volume (PV)
    # See notes in Bitnami chart values.yaml file for more information.
    # More info for setting up storage classes on various cloud providers:
    # AWS: https://docs.aws.amazon.com/eks/latest/userguide/storage-classes.html
    # GCP: https://cloud.google.com/compute/docs/disks/performance#disk_types
    # Azure: https://docs.microsoft.com/en-us/azure/aks/concepts-storage#storage-classes
    storageClass: ""
    # storageSize specifies the size of the volume to use for postgresql
    # Recommended Minimum Disk size for Microsoft/Azure: 256Gi  - 1,100 IOPS https://azure.microsoft.com/en-us/pricing/details/managed-disks/
    # Recommended Minimum Disk size for Google/GCP: 50Gi        - 1,500 IOPS https://cloud.google.com/compute/docs/disks/performance
    # Recommended Minimum Disk size for Amazon/AWS: 500Gi (GP2) - 1,500 IOPS https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html
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

### postgresql

This section is to configure the PostgresQL Subchart, if used.

- `enabled`  controls whether to install postgres or not. If not using the built in Postgres, you must specify a Postgresql database server to connect to in `global.postgresql`. The enabled value is watched by the 'condition' set on the Postgresql dependency in Chart.yaml

- `image.tag` sets the postgres version. Leave at the default unless instructed otherwise.

- `initdbScripts` creates the inital `dex` database that's needed for pachyderm. Leave at the default unless instructed otherwise.

- `persistence.storageClass` specifies the storage class for the postgresql Persistent Volume (PV)

{{% notice note %}}
**More**: See notes in Bitnami chart values.yaml file for more information.
  More info for setting up storage classes on various cloud providers:

- [AWS](https://docs.aws.amazon.com/eks/latest/userguide/storage-classes.html)
- [GCP](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/ssd-pd)
- [Azure](https://docs.microsoft.com/en-us/azure/aks/concepts-storage)
{{% /notice %}}

- `storageSize` specifies the size of the volume to use for postgresql.

{{% notice warning %}}
- Recommended Minimum Disk size for Microsoft/Azure: 256Gi  - 1,100 IOPS https://azure.microsoft.com/en-us/pricing/details/managed-disks/
- Recommended Minimum Disk size for Google/GCP: 50Gi        - 1,500 IOPS https://cloud.google.com/compute/docs/disks/performance
- Recommended Minimum Disk size for Amazon/AWS: 500Gi (GP2) - 1,500 IOPS https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html
{{% /notice %}}


{{% notice note %}}
Looking for a comprehensive list of all attributes and comments? [View a complete values.yml file.](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml)
{{% /notice %}}