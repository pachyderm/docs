---
# metadata # 
title:  Enterprise Server HCVs
description: 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 4
label: Optional
--- 


{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="TLS Disabled" state="active" %}}
{{% wizardButton option="TLS New Secret" %}}
{{% wizardButton option="TLS Existing Secret" %}}

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
  # podLabels specifies labels to add to the pachd pod.
  podLabels: {}
  clusterDeploymentID: ""
  image:
    repository: "pachyderm/pachd"
    pullPolicy: "IfNotPresent"
    # tag defaults to the chart’s specified appVersion.
    tag: ""
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
  # podLabels specifies labels to add to the pachd pod.
  podLabels: {}
  clusterDeploymentID: ""
  image:
    repository: "pachyderm/pachd"
    pullPolicy: "IfNotPresent"
    # tag defaults to the chart’s specified appVersion.
    tag: ""
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
  # podLabels specifies labels to add to the pachd pod.
  podLabels: {}
  clusterDeploymentID: ""
  image:
    repository: "pachyderm/pachd"
    pullPolicy: "IfNotPresent"
    # tag defaults to the chart’s specified appVersion.
    tag: ""
```
{{% /wizardResult %}}
{{% /wizardResults  %}}
{{< /stack >}}

