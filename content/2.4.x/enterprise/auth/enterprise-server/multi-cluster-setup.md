---
# metadata # 
title: Activate ES for Multi-Cluster
description: Learn how to set up a Pachyderm enterprise server as a standalone cluster within a multi-cluster deployment.
date: 
# taxonomy #
tags: ["enterprise", "deployment", "helm"]
series:
seriesPart:
---

This guide deploys Enterprise Server as a standalone cluster within a multi-cluster deployment.

## Before You Start 

There are a few minor differences to note when deploying an Enterprise Server when compared to a standard Pachyderm cluster:

- No deployment target is necessary in your Helm chart since there is no object store
- The Enterprise Server cluster contains the `dex` database
- Each registered cluster requires its own PostgresSQL `pachyderm` database
  
##  How to Activate Enterprise for Multi-Cluster 


1. Create a separate Kubernetes namespace dedicated to your enterprise server:
```s
kubectl create namespace enterprise-server
kubectl config set-context --current --namespace=enterprise-server
```
2. Create a Helm chart `enterprise-server-values.yml` file for your enterprise server: 
```s
```
3. Deploy the Enterprise Server cluster:
```s
helm install enterprise-server pachyderm/pachyderm --f enterprise-server-values.yml
```
4. Verify deployment:
```s
kubectl get all --namespace enterprise-server
```

## Reference  Diagram 
The following diagram gives you a quick overview of an organization with multiple Pachyderm clusters behind a single Enterprise Server.
![Enterprise Server General Deployment](/images/enterprise-server.png)
