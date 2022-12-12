---
# metadata # 
title:  Deploy Pachyderm via Proxy (One Port)
description: Learn how to deploy Pachyderm using an embedded proxy, exposing only one external port. 
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

- Review the full default [helm reference values.yaml](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml#L827) for all available configurable fields of the proxy.
- For production use, you must:
  - Activate [Authentication](../../../enterprise/auth/)
  - Configure an [Identity Provider](/enterprise/auth/authentication/idp-dex/) (`oidc.upstreamIDPs`) 

The diagram below gives a quick overview of the layout of services and pods when using a proxy. In particular, it details how Pachyderm listens to all inbound traffic on one port, then routes each call to the appropriate backend:![Infrastruture Recommendation](/images/infra-recommendations-with-proxy.png)


## How to Enable Proxy for Enterprise Server

### Update Helm Values

1. Update your helm `values.yaml` file to include the following proxy settings:

```yaml
proxy:
  enabled: true
  service:
    type: LoadBalancer
    annotations: {see examples below}
```
2. Remove the `pachd.externalService` section. 
3. Replace the port numbers `30657` and `30658` with one of the following:
   - `http://<Enterprise-server-external-IP-or-DNS>:80/`
   - `https://<Enterprise-server-external-IP-or-DNS>:443/`
4. Set `redirect_uri`'s value to `http(s)://<insert-external-ip-or-dns-name>/dex/callback`.


### Set Up Auth & IDP 

1. Register your cluster with the enterprise server:
```s
pachctl enterprise register --id <my-pachd-config-name> --enterprise-server-address <pach-enterprise-IP>:80 --pachd-address <pachd-IP>:80
```
2. Set your IDP Config: 
```s
echo "issuer: http://<enterprise-external-IP-or-dns>" | pachctl idp set-config --config -
```
3. Enable Auth:
```s
pachctl auth activate --client-id <my-pachd-config-name> --redirect http://<pachd-external-IP-or-DNS>/authorization-code/callback 
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



## Changes to the Enterprise Server Setup

Your enterprise server is [deployed in the same way as any regular cluster](#deploy-pachyderm-in-production-with-a-proxy) with a few differences (no object-store and two PostgreSQL databases required: `dex` and `pachyderm`). The same applies when deploying an enterprise server with a proxy. 

Note that the enterprise server will be deployed behind its proxy, as will each cluster registered to this enterprise server.

{{% notice warning %}}
Enabling an embedded enterprise server with your pachd as part of the same helm installation will not work with the proxy. 

You can use a standalone enterprise server instead.
{{% /notice %}}

Follow your regular [enterprise server deployment and configuration instructions](../../../enterprise/auth/enterprise-server/setup), except for those few steps:

- [Section 1: Deploy an enterprise server](../../../enterprise/auth/enterprise-server/setup#1-deploy-an-enterprise-server)):
   
    In the values.yaml provided as examples:

    - Remove the `pachd.externalService` section and replace it with `proxy`:

        ```yaml
        proxy:
          enabled: true
          service:
            type: LoadBalancer
        ```

    - Update all mentions of `http://<PACHD-IP>:30657/` and `http://<PACHD-IP>:30658/` with `http://<Enterprise-server-external-IP-or-DNS>:80/` or `https://<Enterprise-server-external-IP-or-DNS>:443/`

    - Your `redirect_uri` must be set to `http(s)://<insert-external-ip-or-dns-name>/dex/callback` in your IdP connector as mentioned in the [IdP section of the documentation](../../../enterprise/auth/authentication/idp-dex/#pachyderm-integration-with-identity-providers)


- [Section 3: Register your cluster with the enterprise server](../../../enterprise/auth/enterprise-server/setup#3-register-your-cluster-with-the-enterprise-server):

    If you chose to [register a cluster to an enterprise server using pachctl](../../../enterprise/auth/enterprise-server/setup#register-clusters-with-pachctl), change all the port numbers to 80(http)/443(https) in the `pachctl enterprise register` command:

    ```s
    pachctl enterprise register --id <my-pachd-config-name> --enterprise-server-address <pach-enterprise-IP>:80 --pachd-address <pachd-IP>:80
    ```

- [Section 4: Enable auth on each cluster](../../../enterprise/auth/enterprise-server/setup#4-enable-auth-on-each-cluster), use these instructions to:

    - Set up the issuer in the idp config between the enterprise server and your cluster:
    
    ```s
    echo "issuer: http://<enterprise-external-IP-or-dns>" | pachctl idp set-config --config -
    ```

    - For each registered cluster, enable auth:

        ```s
        pachctl auth activate --client-id <my-pachd-config-name> --redirect http://<pachd-external-IP-or-DNS>/authorization-code/callback 
        ```

    - Then resume the last part of instructions:

        - Make sure than your enterprise context is set up properly:

        ```s
        pachctl config get active-enterprise-context
        ```

        If not:

        ```s
        pachctl config set active-enterprise-context <my-enterprise-context-name>
        ```





