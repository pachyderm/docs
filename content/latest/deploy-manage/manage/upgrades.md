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

Learn how to upgrade MLDM to access new features and performance enhancements.

## Before You Start 

- Check the [release notes](https://github.com/pachyderm/pachyderm/blob/master/CHANGELOG.md) before ugprading
- [Back up your cluster](../backup-restore/) 
- Update your Helm chart values if applicable

## How to Upgrade MLDM 

1. Run the following brew command or [download & install the latest release assets](https://github.com/pachyderm/pachyderm/releases/latest):
```s  
brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
```  
2. Upgrade Helm.

{{< stack type="wizard" >}}
{{% wizardRow id="Deploy Method"%}}
{{% wizardButton option="Production" state="active" %}}
{{% wizardButton option="Local (Personal Machine)" %}} 
{{% /wizardRow %}}

{{% wizardResults %}} 
{{% wizardResult val1="deploy-method/production"%}}
Note that the repo name input (`pachyderm`) must match the name you provided upon first install.
```s
helm repo update
helm upgrade MLDM pachyderm/MLDM -f my_pachyderm_values.yaml  --set proxy.enabled=true --set proxy.service.type=LoadBalancer 
```
{{% /wizardResult %}}

{{% wizardResult val1="deploy-method/local-personal-machine"%}}
Note that the repo name input (`pachyderm`) must match the name you provided upon first install.
```s
helm repo update
helm upgrade MLDM pachyderm/MLDM --set deployTarget=LOCAL --set proxy.enabled=true --set proxy.service.type=LoadBalancer 
```
{{% /wizardResult %}} 
{{% /wizardResults %}} 
{{< /stack >}}

3. Verify that the installation was successful by running `pachctl version`:  
  
```s  
pachctl version 

# COMPONENT           VERSION  
# pachctl             {{% latestPatchNumber %}} 
# pachd               {{% latestPatchNumber %}} 
```  