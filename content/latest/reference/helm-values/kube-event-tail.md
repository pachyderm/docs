---
# metadata # 
title:  Kube Event Tail HCVs
description: Deploy lightweight logging for Kubernetes events.
date: 
# taxonomy #
tags: ["helm"]
series: ["helm"]
seriesPart:
weight: 8
label: optional
--- 

{{% notice note %}}
Looking for a comprehensive list of all attributes and comments? [View a complete values.yml file.](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml) or the [Helm Series page](/series/helm).
{{% /notice %}}
## About

Kube Event Tail deploys a lightweight app that watches Kubernetes events and echoes them into logs. 

## Values

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 

{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="All Events" state="active" %}}
{{% wizardButton option="Namespace Events" %}}
{{% wizardButton option="Disabled" %}}

{{% /wizardRow %}}

{{% wizardResults  %}}
{{% wizardResult val1="options/all-events" %}}

```s
kubeEventTail:
  enabled: true
  clusterScope: false # if true, watches just events in its namespace 
  image:
    repository: pachyderm/kube-event-tail
    pullPolicy: "IfNotPresent"
    tag: "v0.0.6"
  resources:
    limits:
      cpu: "1"
      memory: 100Mi
    requests:
      cpu: 100m
      memory: 45Mi 
```
{{% /wizardResult %}}

{{% wizardResult val1="options/namespace-events" %}}

```s
kubeEventTail:
  enabled: true
  clusterScope: true # if true, watches just events in its namespace 
  image:
    repository: pachyderm/kube-event-tail
    pullPolicy: "IfNotPresent"
    tag: "v0.0.6"
  resources:
    limits:
      cpu: "1"
      memory: 100Mi
    requests:
      cpu: 100m
      memory: 45Mi
```

{{% /wizardResult %}}

{{% wizardResult val1="options/disabled" %}}

```s
kubeEventTail:
  enabled: false
```
{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}

