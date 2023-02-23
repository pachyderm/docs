---
# metadata # 
title:  Enterprise Server HCVs
description: Configure the Enterprise Server for production deployments.
date: 
# taxonomy #
tags: ["helm"]
series: ["helm"]
seriesPart:
weight: 4
label: Optional
--- 

## About

[Enterprise Server](../../../enterprise/auth/enterprise-server) is a production management layer that centralizes  the licensing registration of multiple Pachyderm clusters for Enterprise use and the setup of user authorization/authentication via [OIDC](../oidc).

## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="TLS Disabled" state="active" %}}
{{% wizardButton option="TLS New Secret" %}}
{{% wizardButton option="TLS Existing Secret" %}}
{{% wizardButton option="ES Disabled" %}}

{{% /wizardRow %}}

{{% wizardResults  %}}
{{% wizardResult val1="options/tls-disabled" %}}

```s

enterpriseServer:
  enabled: true
  affinity: {}
  annotations: {}
  tolerations: []
  priorityClassName: ""
  nodeSelector: {}
  service:
    type: ClusterIP
    apiGRPCPort: 31650
    prometheusPort: 31656
    oidcPort: 31657
    identityPort: 31658
    s3GatewayPort: 31600
  tls:
    enabled: false
  resources:
    {}
    
    #limits:
    #  cpu: "1"
    #  memory: "2G"
    #requests:
    #  cpu: "1"
    #  memory: "2G"

  podLabels: {} # specifies labels to add to the pachd pod.
  clusterDeploymentID: ""
  image:
    repository: "pachyderm/pachd"
    pullPolicy: "IfNotPresent"
    tag: "" #  defaults to the chart’s specified appVersion.
```

{{% /wizardResult %}}
{{% wizardResult val1="options/tls-new-secret" %}}
```s

enterpriseServer:
  enabled: true
  affinity: {}
  annotations: {}
  tolerations: []
  priorityClassName: ""
  nodeSelector: {}
  service:
    type: ClusterIP
    apiGRPCPort: 31650
    prometheusPort: 31656
    oidcPort: 31657
    identityPort: 31658
    s3GatewayPort: 31600
  tls:
    enabled: true
    newSecret:
      create: true
      crt: ""
      key: ""
  resources:
    {}
    #limits:
    #  cpu: "1"
    #  memory: "2G"
    #requests:
    #  cpu: "1"
    #  memory: "2G"
  podLabels: {} #  specifies labels to add to the pachd pod.
  clusterDeploymentID: ""
  image:
    repository: "pachyderm/pachd"
    pullPolicy: "IfNotPresent"
    tag: "" # defaults to the chart’s specified appVersion.
```
{{% /wizardResult %}}
{{% wizardResult val1="options/tls-existing-secret" %}}
```s

enterpriseServer:
  enabled: true
  affinity: {}
  annotations: {}
  tolerations: []
  priorityClassName: ""
  nodeSelector: {}
  service:
    type: ClusterIP
    apiGRPCPort: 31650
    prometheusPort: 31656
    oidcPort: 31657
    identityPort: 31658
    s3GatewayPort: 31600
  tls:
    enabled: true
    secretName: ""
  resources:
    {}

    #limits:
    #  cpu: "1"
    #  memory: "2G"
    #requests:
    #  cpu: "1"
    #  memory: "2G"

  podLabels: {} # specifies labels to add to the pachd pod.
  clusterDeploymentID: ""
  image:
    repository: "pachyderm/pachd"
    pullPolicy: "IfNotPresent"
    tag: "" # defaults to the chart’s specified appVersion.
```
{{% /wizardResult %}}

{{% wizardResult val1="options/es-disabled" %}}
```s

enterpriseServer:
  enabled: false
```
{{% /wizardResult %}}
{{% /wizardResults  %}}
{{< /stack >}}

{{% notice note %}}
Looking for a comprehensive list of all attributes and comments? [View a complete values.yml file.](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml)
{{% /notice %}}