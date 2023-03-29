---
# metadata # 
title:  Cloud Deployment 
description: Learn how to deploy the Console UI from the cloud (AWS, GCP, Azure).
date: 
# taxonomy #
tags: ["console", "cloud-deploy"]
series:
seriesPart:
--- 

## Before You Start 

{{% notice tip %}}
Taking MLDM for a test drive? Try our [Quick Cloud Installation](../../quickstart/) for non-production deployment testing.
{{% /notice %}}

- You must have MLDM installed following one of these guides:
  - [AWS](../../aws-deploy-pachyderm/)
  - [GCP](../../google-cloud-platform/)
  - [Azure](../../azure/)

## Deploy 

1. Set up your [Ingress](../../ingress#ingress) and DNS and point your browser to:  
   - `http://<external-IP-address-or-domain-name>:80` or,
   - `https://<external-IP-address-or-domain-name>:443` if TLS is enabled
2. Set up your IDP during deployment.
   {{% notice note %}}
   You can use the mock user (username:`admin`, password: `password`) to login to Console when authentication is enabled but no Identity provider was wired (Enterprise).
   {{%/notice %}}
3. Configure your Identity Provider
    - **As Part of Helm**: To configure your Identity Provider as a part of `helm install`, see examples for the `oidc.upstreamIDPs` value in the [helm chart values specification](https://github.com/pachyderm/pachyderm/blob/42462ba37f23452a5ea764543221bf8946cebf4f/etc/helm/pachyderm/values.yaml#L461) and read [our IDP Configuration page](../../../../enterprise/auth/authentication/idp-dex) for a better understanding of each field. 
    - **Manually via Values.yaml:** You can manually update your values.yaml with `oidc.mockIDP = false` then [set up an Identity Provider by using `pachctl`](../../../../enterprise/auth/authentication/idp-dex).

You are all set! 
You should land on the Projects page of Console.


### Enterprise + Helm

When Enterprise is enabled through Helm, Auth is automatically activated. This means that you do not need to run `pachctl auth activate`; a `pachyderm-auth` Kubernetes secret is created which contains a [rootToken](../../../../enterprise/auth#activate-user-access-management) key. Use `{{"kubectl get secret pachyderm-auth -o go-template='{{.data.rootToken | base64decode }}'"}}` to retrieve it and save it where you see fit.


## Considerations 

- If you run `pachctl auth activate`, the secret is not updated. Instead, the rootToken is printed in your STDOUT for you to save; the same behavior applies if you [activate enterprise manually](../../../../enterprise/deployment/) (`pachctl license activate`) then [activate authentication](../../../../enterprise/auth/) (`pachctl auth activate`).
- You can set the helm value `pachd.activateAuth` to false to prevent the automatic bootstrap of auth on the cluster.


