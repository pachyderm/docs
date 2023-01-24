---
# metadata # 
title:  Deploy Pachyderm with TSL (SSL, HTTPS)
description: Learn how to deploy a Pachyderm cluster with Transport Layer Security (TLS).
date: 
# taxonomy #
tags: ["deployment"]
series:
seriesPart:
--- 

Secure internet browser connections and transactions via data encryption by deploying Pachyderm with Transport Layer Security ([TLS](https://cert-manager.io/docs/reference/tls-terminology/)).


## Before You Start 
- You must have admin control over the domain you wish to use.
- You must obtain a certificate from a trusted Certificate Authority (CA) such as:
  - [Let's Encrypt](https://letsencrypt.org/)
  - [HashiCorp Vault](https://www.vaultproject.io/)
  - [Venafi](https://www.venafi.com/)
- The `.crt` file you are using must contain the full certificate chain (root, intermediates, and leaf).

{{% notice tip %}}

You can simplify this process by using a tool like [Cert-Manager](https://cert-manager.io/docs/installation/), which is a certificate controller for Kubernetes that obtains certificates from Issuers, ensures the certificates are valid, and attempts to renew certificates at a configured time before expiry.

You can install Cert-Manager using the following command:

```s
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.10.1/cert-manager.yaml
```

{{% /notice %}}

---

## How to Deploy With TLS

### 1. Create a TLS Secret

1. Open a terminal and navigate to the location of your generated `.key` and `.crt` files. 
2. Run the following command:
```s
kubectl create secret tls <name> --key=tls.key --cert=tls.crt
```
3. Verify your certificate:
```s
kubectl get certificate
```
### 2.  Enable TLS in Your Helm Chart Values.

Reference the certificate object in your helm chart by setting your TLS secret name in the proper TLS section. 

{{<stack type="wizard">}}
{{% wizardRow id="Setup Type" %}}
{{% wizardButton option="With Proxy" state="active" %}}
{{% wizardButton option="Without Proxy" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="setup-type/with-proxy" %}}
```yaml
  proxy:
    tls:
      enabled: true
      secretName: "<the-secret-name-in-your-certificate-resource>"
```
{{% /wizardResult %}}
{{% wizardResult val1="setup-type/without-proxy" %}}
```yaml
 pachd:
   tls:
      enabled: true
      secretName: "<the-secret-name-in-your-certificate-resource>"
```

{{% /wizardResult %}}
{{% /wizardResults%}}

{{< /stack >}}


For the Cert Manager users, the secret name should match the name set in your [certificate resource](https://cert-manager.io/docs/usage/certificate/#creating-certificate-resources).


#### Self-Signed & Custom Certificates

When using self signed certificates or custom certificate authority (instead of Lets Encrypt, HashiCorp Vault, or Venafi), you must set `global.customCaCerts` to `true` to add Pachyderm's certificate and CA to the list of trusted authorities for console and enterprise. 

If you are using a custom ca-signed cert, **you must include the full certificate chain in the root.crt file**.

### 3. Connect to Pachyderm via SSL

After you deploy Pachyderm, to connect through `pachctl` by using a
trusted certificate, you will need to set the `pachd_address` in the
Pachyderm context with the cluster IP address that starts with `grpcs://`.
You can do so by running the following command:


{{<stack type="wizard">}}
{{% wizardRow id="Setup Type" %}}
{{% wizardButton option="With Proxy" state="active" %}}
{{% wizardButton option="Without Proxy" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="setup-type/with-proxy" %}}
```s
echo '{"pachd_address": "grpcs://<external-IP-address-or-domain-name>:443"}' | pachctl config set context "grpcs-context" --overwrite
```
```s
pachctl config set active-context "grpcs-context"
```
{{% /wizardResult %}}
{{% wizardResult val1="setup-type/without-proxy" %}}
```yaml
 pachd:
   tls:
      enabled: true
      secretName: "<the-secret-name-in-your-certificate-resource>"
```

{{% /wizardResult %}}
{{% /wizardResults%}}

{{< /stack >}}


