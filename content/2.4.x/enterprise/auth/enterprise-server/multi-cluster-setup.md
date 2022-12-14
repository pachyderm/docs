---
# metadata # 
title: Set Up Enterprise for Multi-Cluster
description: Learn how to set up a Pachyderm enterprise server.
date: 
# taxonomy #
tags: ["enterprise", "deployment", "helm"]
series:
seriesPart:
---

This guide deploys Enterprise Server as a standalone cluster within a multi-cluster deployment.

## Before You Start 

There are a few minor differences to note when deploying an Enterprise Server when compared to a standard Pachyderm cluster:

- No deployment target is necessary in your Helm chart since there is no object store
- The Enterprise Server cluster contains the `dex` database
- Each registered cluster requires its own PostgresSQL `pachyderm` database

### Diagram 
The following diagram gives you a quick overview of an organization with multiple Pachyderm clusters behind a single Enterprise Server.
![Enterprise Server General Deployment](/images/enterprise-server.png)

##  How to Set Up Enterprise for Multi-Cluster

1. Create a Kubernetes namespace dedicated to your enterprise server:
```s
kubectl create namespace enterprise-server
```
2. Create a Helm `values.yml` file for your Enterprise Server cluster.
```s
enterpriseServer:
  enabled: true

pachd:
  enabled: false

externalService:
 enabled: false

proxy:
  enabled: true
  service:
    type: LoadBalancer

oidc:
  issuerURI: "http:localhost/dex"
   ## userAccessibleOauthIssuerHost is necessary in localhost settings or anytime the registered Issuer address isn't accessible outside the cluster
   # userAccessibleOauthIssuerHost: "localhost:30658"
   ## if `mockIDP` is set to true, `pachd.upstreamIDPs` will be ignored in favor of a testing placeholder IDP with username/password: admin/password
  mockIDP: false
   ## to set up upstream IDPs, set pachd.mockIDP to false,
   ## and populate the pachd.upstreamIDPs with an array of Dex Connector configurations.
   ## See the example below or https://dexidp.io/docs/connectors/
  upstreamIDPs:
  - id: idpConnector
    jsonConfig: >-
        {
            "issuer": "<ISSUER>",
            "clientID": "<CLIENT-ID>",
            "clientSecret": "<CLIENT-SECRET>",
            "redirectURI": "http://<PACHD-IP>:30658/callback",
            "insecureEnableGroups": true,
            "insecureSkipEmailVerified": true,
            "insecureSkipIssuerCallbackDomainCheck": true,
            "forwardedLoginParams": ["login_hint"]
        }
    name: idpConnector
    type: oidc
```
3. Deploy the Enterprise Server cluster:
```s
helm install enterprise-server pachyderm/pachyderm -f enterprise-server-values.yml --namespace enterprise-server
```

