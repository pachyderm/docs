---
# metadata # 
title: Upgrade to Embedded Proxy
description: Learn how to upgrade your pachd clusters and Enterprise Server to use the embedded proxy, exposing only one external port. 
date: 
# taxonomy #
tags: ["deployment"]
series:
seriesPart:
--- 

Pachyderm ships with an embedded proxy that exposes one external TCP port (`:80`) for all access, including: GRPCs, HTTP/S, s3 Gateway, OIDC, and Dex. Switching to using the embedded proxy improves your deployment's security posture because the proxy is hardened against malicious traffic and writes out extensive audit logs for all requests to Pachyderm.

## Before You Start 

This guide assumes that:

- You have Pachyderm already set up with [Enterprise Server](../../../enterprise/deployment), [Authentication](../../../enterprise/auth/) and an [IdP Connector](../../../enterprise/auth/authentication/idp-dex/).
- You are upgrading to from < **2.5.0** to **2.5.0** or newer.
- You are currently using `pachd.externalService`.
- You have a DNS set up or Load Balance IP Address for the `proxy.host` attribute.

## How to Upgrade to Embedded Proxy

1. Update your helm `values.yaml` file to include the following proxy settings:

```yaml
proxy:
  enabled: true
  # host can be "http://<Enterprise-server-external-IP-or-DNS>" or the value of proxy.service.type.loadBalancerIP
  host: 192.168.1.70 
  service:
    # type can also be NodePort
    type: LoadBalancer
    # loadBalancerIP can be left blank if you don't know the provisioned IP.
    loadBalancerIP:
    # legacyPorts are only needed for compatibility with your existing configuration. This is not needed for a fresh install where proxy is enabled.
    legacyPorts:
     grpc: 30650
     s3gateway: 30650
     oidcPort: 0
     identityPort: 0
    
```

2. Remove the `pachd.externalService` section. 
3. Upgrade your cluster: 
```s
helm repo update
helm upgrade pachyderm pachyderm/pachyderm -f values.yml
```
4. Connect to your cluster:
```s
echo '{"pachd_address":"grpc://192.168.1.70:80"}' | pachctl config set context pachyderm --overwrite && pachctl config set active-context pachyderm
```

 