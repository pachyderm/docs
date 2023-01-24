---
# metadata # 
title:  Test Connection HCVs
description: Used by certain orgs to test connection during installation of Pachyderm.
date: 
# taxonomy #
tags: ["configuration", "helm"]
series:
seriesPart:
weight: 13
label: situational
---

## About 

The Test Connection section is used by Pachyderm to test the connection during installation. This config is used by organizations that do not have permission to pull Docker images directly from the Internet, and instead need to mirror locally. 

## Values

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


```s
testConnection:
  image:
    repository: alpine
    tag: latest
```

{{% notice note %}}
Looking for a comprehensive list of all attributes and comments? [View a complete values.yml file.](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml)
{{% /notice %}}