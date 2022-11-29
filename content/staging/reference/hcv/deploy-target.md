---
# metadata # 
title:  Deploy Target HCVs
description: Define where you're deploying Pachyderm (Local, Cloud)
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
--- 

`deployTarget` defines where you're deploying pachyderm; this is typically located at the top of your values.yaml file.


{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="Amazon" %}}
{{% wizardButton option="Custom" %}}
{{% wizardButton option="Google" %}}
{{% wizardButton option="Local" state="active" %}}
{{% wizardButton option="Microsoft" %}}
{{% wizardButton option="Minio" %}}

{{% /wizardRow %}}

{{% wizardResults  %}}
{{% wizardResult val1="options/amazon" %}}
```s
# Deploy Target configures the storage backend and cloud provider settings (storage classes, etc). 
# options:  GOOGLE, AMAZON, MINIO, MICROSOFT, CUSTOM or LOCAL.
deployTarget: "AMAZON"
```
{{% /wizardResult %}}
{{% wizardResult val1="options/custom" %}}
```s
# Deploy Target configures the storage backend and cloud provider settings (storage classes, etc). 
# options:  GOOGLE, AMAZON, MINIO, MICROSOFT, CUSTOM or LOCAL.
deployTarget: "CUSTOM"
```
{{% /wizardResult %}}
{{% wizardResult val1="options/google" %}}
```s
# Deploy Target configures the storage backend and cloud provider settings (storage classes, etc). 
# options:  GOOGLE, AMAZON, MINIO, MICROSOFT, CUSTOM or LOCAL.
deployTarget: "GOOGLE"
```
{{% /wizardResult %}}
{{% wizardResult val1="options/local" %}}
```s
# Deploy Target configures the storage backend and cloud provider settings (storage classes, etc). 
# options:  GOOGLE, AMAZON, MINIO, MICROSOFT, CUSTOM or LOCAL.
deployTarget: "LOCAL"
```
{{% /wizardResult %}}
{{% wizardResult val1="options/microsoft" %}}
```s
# Deploy Target configures the storage backend and cloud provider settings (storage classes, etc). 
# options:  GOOGLE, AMAZON, MINIO, MICROSOFT, CUSTOM or LOCAL.
deployTarget: "MICROSOFT"
```
{{% /wizardResult %}}
{{% wizardResult val1="options/minio" %}}
```s
# Deploy Target configures the storage backend and cloud provider settings (storage classes, etc). 
# options:  GOOGLE, AMAZON, MINIO, MICROSOFT, CUSTOM or LOCAL.
deployTarget: "MINIO"
```
{{% /wizardResult %}}
{{% /wizardResults%}}


{{< /stack >}}