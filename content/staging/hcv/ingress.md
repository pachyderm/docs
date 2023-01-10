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

## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


```s
ingress:
  enabled: false
  annotations: {}
  host: ""
  # when set to true, uriHttpsProtoOverride will add the https protocol to the ingress URI routes without configuring certs
  uriHttpsProtoOverride: false
  # There are three options for TLS:
  # 1. Disabled
  # 2. Enabled, existingSecret, specify secret name
  # 3. Enabled, newSecret, must specify cert, key, secretName and set newSecret.create to true
  tls:
    enabled: false
    secretName: ""
    newSecret:
      create: false
      crt: ""
      key: ""

```

## About

{{% notice warning %}}
`ingress` will be removed from the helm chart once the deployment of Pachyderm with a proxy becomes mandatory.
{{% /notice %}}
