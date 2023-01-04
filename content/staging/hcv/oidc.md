---
# metadata # 
title:  OpenID Connect HCVs
description: 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
--- 


```s

oidc:
  issuerURI: "" #Inferred if running locally or using ingress
  requireVerifiedEmail: false
  # IDTokenExpiry is parsed into golang's time.Duration: https://pkg.go.dev/time#example-ParseDuration
  IDTokenExpiry: 24h
  # (Optional) If set, enables OIDC rotation tokens, and specifies the duration where they are valid.
  # RotationTokenExpiry is parsed into golang's time.Duration: https://pkg.go.dev/time#example-ParseDuration
  RotationTokenExpiry: 48h
  # (Optional) Only set in cases where the issuerURI is not user accessible (ie. localhost install)
  userAccessibleOauthIssuerHost: ""
  ## to set up upstream IDPs, set pachd.mockIDP to false,
  ## and populate the pachd.upstreamIDPs with an array of Dex Connector configurations.
  ## See the example below or https://dexidp.io/docs/connectors/
  # upstreamIDPs:
  #   - id: idpConnector
  #     config:
  #       issuer: ""
  #       clientID: ""
  #       clientSecret: ""
  #       redirectURI: "http://localhost:30658/callback"
  #       insecureEnableGroups: true
  #       insecureSkipEmailVerified: true
  #       insecureSkipIssuerCallbackDomainCheck: true
  #       forwardedLoginParams:
  #       - login_hint
  #     name: idpConnector
  #     type: oidc
  #
  #   - id: okta
  #     config:
  #       issuer: "https://dev-84362674.okta.com"
  #       clientID: "client_id"
  #       clientSecret: "notsecret"
  #       redirectURI: "http://localhost:30658/callback"
  #       insecureEnableGroups: true
  #       insecureSkipEmailVerified: true
  #       insecureSkipIssuerCallbackDomainCheck: true
  #       forwardedLoginParams:
  #       - login_hint
  #     name: okta
  #     type: oidc
  upstreamIDPs: []
  # upstreamIDPsSecretName is used to pass the upstreamIDPs value via an existing k8s secret.
  # The value is pulled from the secret key, "upstream-idps".
  upstreamIDPsSecretName: ""
  # Some dex configurations (like Google) require a credential file. Whatever secret is included in this
  # below secret will be mounted to the pachd pod at /dexcreds/ so for example serviceAccountFilePath: /dexcreds/googleAuth.json
  dexCredentialSecretName: ""
  mockIDP: true
  # additionalClients specifies a list of clients for the cluster to recognize
  # See the ecample below or the dex docs (https://dexidp.io/docs/using-dex/#configuring-your-app).
  # additionalOIDCClient:
  #   - id: example-app
  #     secret: example-app-secret
  #     name: 'Example App'
  #     redirectURIs:
  #     - 'http://127.0.0.1:5555/callback'
  additionalClients: []
  additionalClientsSecretName: ""
  #TODO scopes:
```

- `oidc.issuerURI` specifies the Oauth Issuer. Inferred if running locally or using ingress.

- `oidc.requireVerifiedEmail` specifies whether email verification is required for authentication.

- `oidc.IDTokenExpiry` specifies the duration where OIDC ID Tokens are valid.

- `oidc.RotationTokenExpiry` if set, enables OIDC Rotation Tokens and specifies the duration where they are valid.

- `oidc.upstreamIDPs` specifies a list of Identity Providers to use for authentication.
- `oidc.upstreamIDPsSecretName` specifies the secret name of the secret containing `upstreamIDPs` (key: `upstream-idps`)

- `oidc.mockIDP` when set to `true`, specifes to ignore `upstreamIDPs` in favor of a placeholder IDP with a username/password preset to "admin" and "password".

- `oidc.userAccessibleOauthIssuerHost` specifies the Oauth issuer's address host that's used in the Oauth authorization redirect URI. This value is only necessary in local settings or anytime the registered Issuer address isn't accessible outside the cluster.
