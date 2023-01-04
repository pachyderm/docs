---
# metadata # 
title:  GCP + Pachyderm 
description: Learn how to deploy to Pachyderm to the cloud with GCP.
date: 
# taxonomy #
tags: ["gcp", "cloud-deploy"]
series:
seriesPart:
weight: 
---
## Before You Start 

This guide assumes that:
-  You have already tried [Pachyderm locally](../../local-deploy/) and have some familiarity with [Kubectl](https://kubernetes.io/docs/tasks/tools/), [Helm](https://helm.sh/docs/intro/install/), [Google Cloud SDK](https://cloud.google.com/sdk/) and [jq](https://stedolan.github.io/jq/download/).
- You have access to a Google Cloud account linked to an active billing account.

{{% notice warning %}}
This is not a production-level setup guide; see the [Google Cloud Platform deploy guide](http://localhost:1313/2.4.x/deploy-manage/deploy/google-cloud-platform/) for in-depth setup. 
{{% /notice %}}

---

## 1. Create a New Project 

1. Log in to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g.,`pachyderm-quickstart-project`).
3. Enable the Compute Engine API.

You are now ready to create a GKE Cluster.

## 2. Run Setup Script

You can run [this setup script](https://github.com/pachyderm/pachyderm/blob/master/etc/deploy/gcp/gcp-doco-script.sh) either through the **Cloud Shell** or in a local terminal via the `gcloud` cli. Running this script creates all of the following:

- One GKE cluster
- Workload identity service accounts
- Permissions
- A static IP address 
- The cloud SQL instance and databases
- One cloud storage bucket
- One file called `${NAME}.values.yaml` in the current directory

It also installs Pachyderm into the cluster.

## 3. Connect to Cluster

1. Run the following:
```s
pachctl config import-kube local --overwrite
pachctl config set active-context local
pachctl port-forward
```
2. Open your browser at [localhost:4000](https://localhost:4000).

{{% notice tip %}}

You can also connect to Console via Google's Cloud Shell: 

![console-in-browser](/images/gcp/console-in-browser.gif)

{{% /notice %}}