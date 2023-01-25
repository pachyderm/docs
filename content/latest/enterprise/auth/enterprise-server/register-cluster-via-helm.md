---
# metadata # 
title: Register a Cluster via Helm
description: Learn how to register a pachd cluster to your Enterprise Server using Helm.
date: 
# taxonomy #
tags: ["enterprise", "deployment", "helm"]
series:
seriesPart:
---

## Before You Start 

- You must have an [Enterprise license key](../../../)
- You must have the Pachyderm Helm repo downloaded.


## How to Register a Cluster 

1. Open your Helm `values.yml` file.
2. Update the `pachd` section with the following attributes:
```yaml
pachd:
  activateEnterpriseMember: true
	enterpriseServerAddress: "grpc://<ENTERPRISE_SERVER_ADDRESS>"
	enterpriseCallbackAddress: "grpc://<PACHD_ADDRESS>"
	enterpriseServerToken: "<ENTERPRISE-SERVER-TOKEN>" # the same root token of the enterprise cluster
# Alternatively, use a secret
enterpriseServerTokenSecretName: "<Name of you secret containing enterpriseServerToken>" 

```
3. Upgrade the cluster:
```s
helm upgrade pachyderm pachyderm/pachyderm -f values.yml
```