---
# metadata # 
title:  Ingress HCVs
description: 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 5
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

### ingress

{{% notice warning %}}
`ingress` will be removed from the helm chart once the deployment of Pachyderm with a proxy becomes mandatory.
{{% /notice %}}

This section is to configure an ingress resource for an existing ingress controller.

- `ingress.enabled` turns on the creation of the ingress for the UI.

- `ingress.annotations` specifies annotations to add to the ingress resource.

- `host` your domain name, external IP address, or localhost.

- `uriHttpsProtoOverride` when set to true, uriHttpsProtoOverride will add the https protocol to the ingress URI routes without configuring certs
  

#### ingress.tls

There are three options for configuring TLS on the ingress under `ingress.tls`.

1. `disabled`. TLS is not used.
1. `enabled`, using an existing secret. You must set enabled to true and provide a secret name where the exiting cert and key are stored.
1. `enabled`, using a new secret. You must set enabled to true and `newSecret.create` to true and specify a secret name, and a cert and key in string format