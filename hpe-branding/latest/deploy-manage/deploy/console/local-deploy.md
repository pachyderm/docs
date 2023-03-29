---
# metadata # 
title:  Local Deployment
description: Learn how to deploy the Console UI locally.
date: 
# taxonomy #
tags: ["console", "local-deploy"]
series:
seriesPart:
--- 

## Before You Start 

{{% notice info %}}
A local installation helps you learn some of the MLDM basics and experiment with the product. It is not designed to be a production environment.
{{%/notice %}}

- You must have MLDM installed locally (`pachd` and `pachctl`)
- You must have a local Kubernetes cluster running.

## Deploy

1. Open the terminal.
2. Verify your Kubernetes cluster is running via `pachctl version`.
   - If your cluster is up but the context is stale, run the following:
   ```s
   pachctl config import-kube local --overwrite
   pachctl config set active-context local
   ```
3. Connect to Console by running the following command:
   ```s
   pachctl port-forward
   ```
4. Open your browser and navigate to the localhost `console service port` number; typically [4000](http://localhost:4000/).
