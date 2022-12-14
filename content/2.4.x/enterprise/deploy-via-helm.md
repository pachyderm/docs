---
# metadata # 
title: Deploy Enterprise via Helm
description: Learn how to deploy the Enterprise edition of Pachyderm using Helm.
date: 
# taxonomy #
tags: ["enterprise"]
series:
seriesPart:
---

## Before You Start 

- You must have a Pachyderm [Enterprise Activation Code](https://www.pachyderm.com/trial/).
- You must have pachctl and Pachyderm installed. 

## How to Activate Enterprise Pachyderm via Helm

### Using the License
1. Open your Helm values.yml file. 
2. Find the the `pachd.enterpriseLicenseKey` attribute.
3. Input your enterprise key.

Once deployed, Pachyderm stores your provided Enterprise license as the platform secret `pachyderm-license` in the key `enterprise-license-key`.

### Using a Secret

1. [Create a secret](../../how-tos/advanced-data-operations/secrets/#create-and-manage-secrets-in-pachyderm) for your Enterprise license.
2. Open your Helm values.yml file. 
3. Find the the `pachd.enterpriseLicenseKeySecretName` attribute.
4. Input your license's secret name.

