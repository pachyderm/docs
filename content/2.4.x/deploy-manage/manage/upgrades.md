---
# metadata # 
title: Upgrade Pachyderm
description: Learn how to upgrade Pachyderm's pachctl and pachd. 
date: 
# taxonomy #
tags: ["management", "upgrades", "pachctl","pachd"]
series:
seriesPart:
---

Learn how to upgrade Pachyderm to access new features and performance enhancements.

## Before You Start 

- Check the [release notes](https://github.com/pachyderm/pachyderm/blob/master/CHANGELOG.md) before ugprading
- [Back up your cluster](../backup-restore/) 
- Update your Helm chart values if applicable



## How to Upgrade Pachyderm 


1. Run the following brew command or [download & install the latest release assets](https://github.com/pachyderm/pachyderm/releases/latest):
   ```s  
   brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
   ```  
2. Upgrade Helm.
   {{< stack type="wizard" >}}
   {{% wizardRow id="Deploy Method"%}}
   {{% wizardButton option="Production" state="active" %}}
   {{% wizardButton option="Testing" %}} 
   {{% /wizardRow %}}

   {{% wizardResults %}} 
   {{% wizardResult val1="deploy-method/production"%}}
   ```s
   helm repo add pach https://helm.pachyderm.com
   helm repo update
   helm upgrade pachd -f my_pachyderm_values.yaml pach/pachyderm --version <your_chart_version> --set proxy.enabled=true --set proxy.service.type=LoadBalancer 
   ```
   {{% /wizardResult %}}

   {{% wizardResult val1="deploy-method/testing"%}}
   ```s
   helm repo add pach https://helm.pachyderm.com
   helm repo update
   helm upgrade pachd --set deployTarget=LOCAL --set proxy.enabled=true --set proxy.service.type=LoadBalancer 
   ```
   {{% /wizardResult %}} 
   {{% /wizardResults %}} 
   {{< /stack >}}
3. Verify that the installation was successful by running `pachctl version`:  
  
   ```s  
   pachctl version 
   ```  

   **System Response:**  

   ```
   COMPONENT           VERSION  
   pachctl             {{% latestPatchNumber %}} 
   pachd               {{% latestPatchNumber %}} 
   ```  