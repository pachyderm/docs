---
# metadata # 
title:  Get Started
description: New to using Pachyderm? Start Here.
date: 
# taxonomy #
tags: 
series:
seriesPart:
weight: 1
---
## What is Pachyderm? 

Pachyderm is a data-centric pipeline and data versioning application written in [go](https://go.dev/) that runs on top of a Kubernetes cluster.

## Local vs Cloud Installation

| Local | Cloud |
|---|---|
|Used for learning & testing. |Used in production environments.|
| Allocates your local machine's resources to spin up a K8s cluster. | Uses a cloud provider (AWS, Azure, GCP) to to spin up K8s clusters. |
| Uses **Docker Desktop**, **Minikube**, or **Kind**.  | Uses **EKS**, **GKE**, or **AKS** |
|Free.|Metered by cloud provider.|