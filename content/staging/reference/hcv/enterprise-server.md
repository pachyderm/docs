---
# metadata # 
title:  Enterprise Server HCVs
description: 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
--- 

```s

enterpriseServer:
  enabled: false
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
  # There are three options for TLS:
  # 1. Disabled
  # 2. Enabled, existingSecret, specify secret name
  # 3. Enabled, newSecret, must specify cert, key and name
  tls:
    enabled: false
    secretName: ""
    newSecret:
      create: false
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

This section is to configure the Enterprise Server deployment (if desired).

- `enterpriseServer.enabled` turns on the deployment of the Enterprise Server. It is disabled by default.

- `enterpriseServer.service.type` specifies the Kubernetes type of the console service. The default is `ClusterIP`.

- `enterpriseServer.resources` specifies resources and limits in standard kubernetes format. It is left unset by default.

- `enterpriseServer.podLabels` specifies labels to add to the enterpriseServer pod.

- `enterpriseServer.image` sets the image to use for the etcd. This can be left at the defaults unless instructed.

#### enterpriseServer.tls

There are three options for configuring TLS on the Enterprise Server under `enterpriseServer.tls`.

1. `disabled`. TLS is not used.
1. `enabled`, using an existing secret. You must set enabled to true and provide a secret name where the exiting cert and key are stored.
1. `enabled`, using a new secret. You must set enabled to true and `newSecret.create` to true and specify a secret name, and a cert and key in string format