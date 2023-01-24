---
# metadata # 
title:  Ingress HCVs
description: This section is being deprecated; use proxy instead.
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 5
label: Being Deprecated
--- 

## About

{{% notice warning %}}
`ingress` will be removed from the helm chart once the deployment of Pachyderm with a proxy becomes mandatory.
{{% /notice %}}


## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="TLS Existing Secret" state="active" %}}
{{% wizardButton option="TLS New Secret" %}}
{{% wizardButton option="TLS Disabled" %}}

{{% /wizardRow %}}

{{% wizardResults  %}}
{{% wizardResult val1="options/tls-existing-secret" %}}

```s
ingress:
  enabled: true
  annotations: {}
  host: ""
  uriHttpsProtoOverride: false # if true, adds the https protocol to the ingress URI routes without configuring certs
  tls:
    enabled: true
    secretName: ""
```
{{% /wizardResult %}}

{{% wizardResult val1="options/tls-new-secret" %}}
```s
ingress:
  enabled: true
  annotations: {}
  host: ""
  uriHttpsProtoOverride: false # if true, adds the https protocol to the ingress URI routes without configuring certs
  tls:
    enabled: true
    newSecret:
      create: true
      crt: ""
      key: ""
```
{{% /wizardResult %}}

{{% wizardResult val1="options/tls-disabled" %}}
```s
ingress:
  enabled: true
  annotations: {}
  host: ""
  uriHttpsProtoOverride: false # if true, adds the https protocol to the ingress URI routes without configuring certs
  tls:
    enabled: false
```
{{% /wizardResult %}}

{{% /wizardResults %}}

{{< /stack >}}
