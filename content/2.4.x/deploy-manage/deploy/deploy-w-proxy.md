---
# metadata # 
title: Migrate to Embedded Proxy (One Port)
description: Learn how to update your Enterprise Server to use the embedded proxy, exposing only one external port. 
date: 
# taxonomy #
tags: ["deployment"]
series:
seriesPart:
--- 

Pachyderm ships with an embedded proxy that exposes one external TCP port for all access, including: GRPCs, HTTP/S, s3 Gateway, OIDC, and Dex. Once enabled, you will be able to access Pachyderm in the following ways:

- **Console**: `http://<external-IP-address-or-domain-name>`
- **Notebooks**: `grpc://<external-IP-address-or-domain-name>:80`

## Before You Start 

- This guide assumes you have already set up an [Enterprise Server](../../../enterprise/deployment) with [Authentication](../../../enterprise/auth/) and an [Identity Provider](../../../enterprise/auth/authentication/idp-dex/).


## How to Enable Proxy for Enterprise Server

### Update Helm Values

1. Update your helm `values.yaml` file to include the following proxy settings:

```yaml
proxy:
  enabled: true
  # host can also be the value of proxy.service.type.loadBalancerIP
  host: "http://<Enterprise-server-external-IP-or-DNS>"
  service:
    # type can also be NodePort
    type: LoadBalancer
    annotations: {see examples below}
```
2. Remove the `pachd.externalService` section. 
3. Replace all instances of the port numbers `30657` and `30658` with one of the following:
   - `http://<Enterprise-server-external-IP-or-DNS>:80/`
   - `https://<Enterprise-server-external-IP-or-DNS>:443/`
4. Set `redirect_uri`'s value to `http(s)://<insert-external-ip-or-dns-name>/dex/callback`.


### Set Up Auth & IdP 

1. Register your cluster with the enterprise server:
```s
pachctl enterprise register --id <my-pachd-config-name> --enterprise-server-address <Enterprise-server-external-IP-or-DNS>:80 --pachd-address <pachd-IP>:80
```
2. Set your IDP Config: 
```s
echo "issuer: http://<Enterprise-server-external-IP-or-DNS>" | pachctl idp set-config --config -
```
3. Enable Auth:
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
```