---
# metadata # 
title:  Production Recommendations 
description: Learn which pieces of networking infrastructure Pachyderm recommends setting up for production use. 
date: 
# taxonomy #
tags: ["deployment"]
series:
seriesPart:
--- 

To deploy in production, we recommend setting up the following pieces of networking infrastructure: A load balancer, a kubernetes ingress controller, and a DNS pointing to the load balancer. In addition we recommend using a managed database instance (such as RDS for AWS). 

{{% notice warning %}}

Interested in deploying with an embedded proxy and expose one single external port?

We are now shipping Pachyderm with an **optional embedded proxy** 
allowing your cluster to expose one single port externally. This deployment setup is optional.

If you choose to deploy Pachyderm with a Proxy, check out our new recommended architecture and [deployment instructions](../deploy-w-proxy/). 

Deploying with a proxy presents a couple of advantages:

- You only need to set up one TCP Load Balancer (No more Ingress in front of Console).
- You will need one DNS only.
- It simplifies the deployment of Console.
- No more port-forward.
{{% /notice %}}

Once you have your networking infrastructure set up, apply a helm values file such as the one specified in the example file below to wire up routing through an Ingress, and set up TLS. We recommend using a certificate manager such as [cert-manager](https://cert-manager.io/docs/) to refresh certificates and inject them as kubernetes secrets into your cluster for the ingress and load balancer to use.

{{% notice note %}}
This example uses [Traefik](../ingress/pach-ui-ingress/) as an Ingress controller. To configure other ingress controllers, apply their annotations in `.Values.console.annotations`.
{{% /notice %}}

##  values.yaml with enterprise license &  authentication

```yaml
ingress:
    enabled: true
    host: <DNS-ENTRY>
    tls:
        enabled: true
        secretName: "pach-tls"
pachd:
    tls:
        enabled: true
        secretName: "pach-tls"
    externalService:
        enabled: true
        loadBalancerIP: <LOAD-BALANCER-IP>
console:
    enabled: true
    annotations:
        ## annotations specific to integrate with your ingress-controller
        ## the example below is a provided configuration specific to traefik as an ingress-controller
        traefik.ingress.kubernetes.io/router.tls: "true"
        kubernetes.io/ingress.class: "traefik"
```




