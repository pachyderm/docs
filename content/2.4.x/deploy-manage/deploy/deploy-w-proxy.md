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

Pachyderm ships with an embedded proxy that exposes one external TCP port for all access, including: GRPCs, HTTP/S, s3 Gateway, OIDC, and Dex. Once enabled, you will be able to access Pachyderm in the following ways:

- **Console**: `http://<external-IP-address-or-domain-name>`
- **Notebooks**: `grpc://<external-IP-address-or-domain-name>:80`
- **s3 Gateway**: `http://<external-IP-address-or-domain-name>:80`

Switching to using the embedded proxy improves your deployment's security posture because the proxy is hardened against malicious traffic and writes out extensive audit logs for all requests to Pachyderm.

## Before You Start 

This guide assumes that:

- You have Pachyderm already set up with [Enterprise Server](../../../enterprise/deployment), [Authentication](../../../enterprise/auth/) and an [IdP Connector](../../../enterprise/auth/authentication/idp-dex/).
- You are currently using `ingress` or `pachd.externalService` to route cluster-external HTTP/HTTPS requests.  


## How to Upgrade to Embedded Proxy

### 1. Update PachD Clusters

1. Update your helm `values.yaml` file to include the following proxy settings:

```yaml
proxy:
  enabled: true
  # host can also be the value of proxy.service.type.loadBalancerIP
  host: "http://<Enterprise-server-external-IP-or-DNS>"
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
   {{% notice tip %}}
   You can pre-create a static IP and then pass this external IP to the `loadBalancerIP` in the `proxy.service` of your values.yaml.

   GCP Example: `gcloud compute addresses create ADDRESS_NAME --global --IP-version IPV4`
   {{% /notice %}}

2. Remove the `pachd.externalService` section. 
3. Remove the `ingress` section.
4. Upgrade your cluster using `helm upgrade pachyderm pachyderm/pachyderm -f values.yml`.

### 2. Update Enterprise Server

1. Update your helm `values.yaml` file to include the following proxy settings:

```yaml
proxy:
  enabled: true
  # host can also be the value of proxy.service.type.loadBalancerIP
  host: "http://<Enterprise-server-external-IP-or-DNS>"
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
3. Remove the `ingress` section.
4. Update the `enterpriseServer` section to match the following:
```yaml
enterpriseServer:
 enabled: true
  affinity: {}
  annotations: {}
  tolerations: []
  priorityClassName: ""
  nodeSelector: {}
  service:
    # type can also be NodePort
    type: LoadBalancer
    # loadBalancerIP can be left blank if you don't know the provisioned IP.
    loadBalancerIP:
    # legacyPorts are only needed for compatibility with your existing configuration. This is not needed for a fresh install where proxy is enabled.
    apiGRPCPort: ??
    prometheusPort: ??
    oidcPort: ??
    identityPort: ??
    s3GatewayPort: ??
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
5. Upgrade your enterprise server using `helm upgrade pachyderm pachyderm/pachyderm -f values.yml`.

<!-- ### Set Up Auth & IdP 

1. Register your cluster with the enterprise server:
```s
pachctl enterprise register --id <my-pachd-config-name> --enterprise-server-address <Enterprise-server-external-IP-or-DNS>:80 --pachd-address <pachd-IP>:80
```
1. Set your IDP Config: 
```s
echo "issuer: http://<Enterprise-server-external-IP-or-DNS>" | pachctl idp set-config --config -
```
1. Enable Auth:
```s
pachctl auth activate --client-id <my-pachd-config-name> --redirect http://<Enterprise-server-external-IP-or-DNS>/authorization-code/callback 
```

### Connect To The Cluster 
You can connect `pachctl` to your cluster by running the following commands:

```s
# Retrieve the external IP address of your TCP load balancer (or use your domain name)
kubectl get services | grep pachyderm-proxy | awk '{print $4}'
# Update the context of your cluster using the external IP address/domain name captured above
echo '{"pachd_address": "grpc://<external-IP-address-or-domain-name>:80"}' | pachctl config set context "<your-cluster-context-name>" --overwrite
pachctl config set active-enterprise-context <my-enterprise-context-name>
``` -->