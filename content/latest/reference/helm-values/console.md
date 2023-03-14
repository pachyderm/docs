---
# metadata # 
title:  Console HCVs
description:  Configure the Pachyderm UI.
date: 
# taxonomy #
tags: ["helm"]
series: ["helm"]
seriesPart:
weight: 3
label: Recommended
--- 

## About 

Console is the Graphical User Interface (GUI) for Pachyderm. Users that would prefer to navigate and manage through their project resources visually can connect to Console by authenticating against your configured [OIDC](/{{% release %}}/reference/helm-values/oidc). For personal-machine installations of Pachyderm, a user may access Console without authentication via [localhost](http://localhost).

## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 

{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="Enabled No Metrics" state="active" %}}
{{% wizardButton option="Enabled With Metrics" %}}
{{% wizardButton option="Disabled"  %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="options/enabled-no-metrics" %}}

```s
console:
  enabled: true # deploys Console UI
  annotations: {}
  image: # defines which image to use for the console; replicates the --console-image & --registry arguments to pachctl
    repository: "pachyderm/haberdashery" # defines image repo location
    pullPolicy: "IfNotPresent"
    tag: "2.3.3-1" # defines the image repo to pull from
  priorityClassName: ""
  nodeSelector: {}
  tolerations: []
  podLabels: {} # specifies labels to add to the console pod.
  resources: # specifies the resource request and limits; unset by default.
    {}

    #limits:
    #  cpu: "1"
    #  memory: "2G"
    #requests:
    #  cpu: "1"
    #  memory: "2G"
    
  config: # defines primary configuration settings, including authentication.
    reactAppRuntimeIssuerURI: ""  # defines the pachd oauth address accessible to outside clients.
    oauthRedirectURI: "" #  defines the oauth callback address within console that the pachd oauth service would redirect to.
    oauthClientID: "console" # defines the client identifier for the Console with pachd
    oauthClientSecret: "" # defines the secret configured for the client with pachd; if blank, autogenerated.
    oauthClientSecretSecretName: "" # uses the value of an existing k8s secret by pulling from the `OAUTH_CLIENT_SECRET` key.
    graphqlPort: 4000 # defines the http port that the console service will be accessible on.
    pachdAddress: "pachd-peer:30653"
    disableTelemetry: false # disables analytics and error data collection

  service:
    annotations: {}
    labels: {} # specifies labels to add to the console service.
    type: ClusterIP # specifies the Kubernetes type of the console service; default is `ClusterIP`.
```
{{% /wizardResult %}}

{{% wizardResult val1="options/enabled-with-metrics" %}}

```s
console: 
  enabled: true # deploys Console UI
  annotations: {}
  image: # defines which image to use for the console; replicates the --console-image & --registry arguments to pachctl
    repository: "pachyderm/haberdashery" # defines image repo location
    pullPolicy: "IfNotPresent"
    tag: "2.3.3-1" # defines the image repo to pull from
  priorityClassName: ""
  nodeSelector: {}
  tolerations: []
  podLabels: {} # specifies labels to add to the console pod.
  resources: # specifies the resource request and limits; unset by default.
    {}

    #limits:
    #  cpu: "1"
    #  memory: "2G"
    #requests:
    #  cpu: "1"
    #  memory: "2G"

  config: # defines primary configuration settings, including authentication.
    reactAppRuntimeIssuerURI: ""  # defines the pachd oauth address accessible to outside clients.
    oauthRedirectURI: "" #  defines the oauth callback address within console that the pachd oauth service would redirect to.
    oauthClientID: "console" # defines the client identifier for the Console with pachd
    oauthClientSecret: "" # defines the secret configured for the client with pachd; if blank, autogenerated.
    oauthClientSecretSecretName: "" # uses the value of an existing k8s secret by pulling from the `OAUTH_CLIENT_SECRET` key.
    graphqlPort: 4000 # defines the http port that the console service will be accessible on.
    pachdAddress: "pachd-peer:30653"
    disableTelemetry: true # disables analytics and error data collection

  service:
    annotations: {}
    labels: {} # specifies labels to add to the console service.
    type: ClusterIP # specifies the Kubernetes type of the console service; default is `ClusterIP`.
```
{{% /wizardResult %}}

{{% wizardResult val1="options/disabled" %}}

```s
console:
  enabled: false

```
{{% /wizardResult %}}
{{% /wizardResults %}}

{{< /stack >}}

{{% notice note %}}
Looking for a comprehensive list of all attributes and comments? [View a complete values.yml file.](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml)
{{% /notice %}}