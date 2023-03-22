---
# metadata # 
title:  OpenID Connect HCVs
description: Set up your OIDC authentication and connect to IDPs. 
date: 
# taxonomy #
tags: ["helm"]
series: ["helm"]
seriesPart:
weight: 12
label: Required for Production
--- 

{{% notice note %}}
Looking for a comprehensive list of all attributes and comments? [View a complete values.yml file.](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml) or the [Helm Series page](/series/helm).
{{% /notice %}}
## About 

The OIDC section of the helm chart enables you to set up authentication through upstream IDPs. To use authentication, you must have an Enterprise license. 

We recommend setting up this section alongside the [Enterprise Server section](/{{% release %}}/reference/helm-values/enterprise-server) of your Helm chart so that you can easily scale multiple clusters using the same authentication configurations.

## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 

{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="Mock IDP" state="active" %}}
{{% wizardButton option="Upstream IDP" %}}
{{% wizardButton option="Additional Clients" %}}

{{% /wizardRow %}}

{{% wizardResults  %}}
{{% wizardResult val1="options/mock-idp" %}}

```s
oidc:
  issuerURI: "" # inferred if running locally or using ingress
  requireVerifiedEmail: false # if true, email verification is required to authenticate
  IDTokenExpiry: 24h # if set, specifies the duration where OIDC ID Tokens are valid; parsed into golang's time.Duration: https://pkg.go.dev/time#example-ParseDuration
  RotationTokenExpiry: 48h # If set, enables OIDC rotation tokens, and specifies the duration where they are valid.
  userAccessibleOauthIssuerHost: "" # (Optional) Only set in cases where the issuerURI is not user accessible (ie. localhost install)
  mockIDP: true # if true, ignores upstreamIDPs in favor of a placeholder IDP with the username/password of "admin"/"password"
```
{{% /wizardResult %}}

{{% wizardResult val1="options/upstream-idp" %}}

```s
oidc:
  issuerURI: "" # inferred if running locally or using ingress
  requireVerifiedEmail: false # if true, email verification is required to authenticate
  IDTokenExpiry: 24h # if set, specifies the duration where OIDC ID Tokens are valid; parsed into golang's time.Duration: https://pkg.go.dev/time#example-ParseDuration
  RotationTokenExpiry: 48h # If set, enables OIDC rotation tokens, and specifies the duration where they are valid.
  userAccessibleOauthIssuerHost: "" # (Optional) Only set in cases where the issuerURI is not user accessible (ie. localhost install)
  upstreamIDPs: # defines a list of Identity Providers to use for authentication.  https://dexidp.io/docs/connectors/
    - id: idpConnector
      config:
        issuer: ""
        clientID: ""
        clientSecret: ""
        redirectURI: "http://localhost:30658/callback"
        insecureEnableGroups: true
        insecureSkipEmailVerified: true
        insecureSkipIssuerCallbackDomainCheck: true
        forwardedLoginParams:
        - login_hint
      name: idpConnector
      type: oidc
  
    - id: okta
      config:
        issuer: "https://dev-84362674.okta.com"
        clientID: "client_id"
        clientSecret: "notsecret"
        redirectURI: "http://localhost:30658/callback"
        insecureEnableGroups: true
        insecureSkipEmailVerified: true
        insecureSkipIssuerCallbackDomainCheck: true
        forwardedLoginParams:
        - login_hint
      name: okta
      type: oidc
  upstreamIDPsSecretName: "" # passes the upstreamIDPs value via an existing k8s secret (key: `upstream-idps`)
  dexCredentialSecretName: "" # mounts a credential file to the pachd pod at /dexcreds/ (e.g., serviceAccountFilePath: /dexcreds/googleAuth.json); required for some dex configs like Google.
  mockIDP: false # if true, ignores upstreamIDPs in favor of a placeholder IDP with the username/password of "admin"/"password"
```
{{% /wizardResult %}}

{{% wizardResult val1="options/additional-clients" %}}

```s
oidc:
  issuerURI: "" # inferred if running locally or using ingress
  requireVerifiedEmail: false # if true, email verification is required to authenticate
  IDTokenExpiry: 24h # if set, specifies the duration where OIDC ID Tokens are valid; parsed into golang's time.Duration: https://pkg.go.dev/time#example-ParseDuration
  RotationTokenExpiry: 48h # If set, enables OIDC rotation tokens, and specifies the duration where they are valid.
  userAccessibleOauthIssuerHost: "" # (Optional) Only set in cases where the issuerURI is not user accessible (ie. localhost install)
  upstreamIDPs: # defines a list of Identity Providers to use for authentication.  https://dexidp.io/docs/connectors/
    - id: idpConnector
      config:
        issuer: ""
        clientID: ""
        clientSecret: ""
        redirectURI: "http://localhost:30658/callback"
        insecureEnableGroups: true
        insecureSkipEmailVerified: true
        insecureSkipIssuerCallbackDomainCheck: true
        forwardedLoginParams:
        - login_hint
      name: idpConnector
      type: oidc
  
    - id: okta
      config:
        issuer: "https://dev-84362674.okta.com"
        clientID: "client_id"
        clientSecret: "notsecret"
        redirectURI: "http://localhost:30658/callback"
        insecureEnableGroups: true
        insecureSkipEmailVerified: true
        insecureSkipIssuerCallbackDomainCheck: true
        forwardedLoginParams:
        - login_hint
      name: okta
      type: oidc
  upstreamIDPsSecretName: "" # passes the upstreamIDPs value via an existing k8s secret (key: `upstream-idps`)
  dexCredentialSecretName: "" # mounts a credential file to the pachd pod at /dexcreds/ (e.g., serviceAccountFilePath: /dexcreds/googleAuth.json); required for some dex configs like Google.
  mockIDP: false # if true, ignores upstreamIDPs in favor of a placeholder IDP with the username/password of "admin"/"password"
  additionalOIDCClient:
    - id: example-app
      secret: example-app-secret
      name: 'Example App'
      redirectURIs:
      - 'http://127.0.0.1:5555/callback'
  additionalClientsSecretName: ""
```
{{% /wizardResult %}}

{{% /wizardResults  %}}

{{< /stack >}}

