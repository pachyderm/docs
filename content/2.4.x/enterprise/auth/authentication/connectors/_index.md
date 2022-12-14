---
# metadata # 
title: Set Up IdP Connectors
description: Learn how to enable users to log in to Pachyderm using their preferred identity provider. 
date: 
# taxonomy #
tags: 
series:
seriesPart:
weight: 2
---


You can enable your users to authenticate to Pachyderm using their favorite Identity Providers using the steps in this guide. 

## Before You Start 

- You must have an Enterprise Server set up.
- This guide assumes you are using the embedded proxy.
- This guide uses Auth0 as an example; if you do not have an Auth0 account, [sign up for one](https://auth0.com) and create your Pool of Users.
  

## 1. Register With Your IdP

1. Log in to your Auth0 account.
2. In **Applications**, click **Create Application**.
3. Type the name of your application, such as **Pachyderm**.
4. In the application type, select **Regular Web Application**.
5. Click **Create**.
6. Go to the application settings.
7. Scroll down to **Application URIs**.
8. In the **Allowed Callback URLs**, add the Pachyderm callback link in the
   following format:
 ```s
 # Dex's issuer URL + "/callback"
 http(s)://<insert-external-ip-or-dns-name>/dex/callback
 ```
9. Scroll down to **Show Advanced Settings**.
10.  Select **Grant Types**.
11.  Verify that **Authorization Code** and **Refresh Token** are selected.

   ![Auth0 Grant Settings](/images/auth0-grant-settings.png)



## 2. Set Up Connector

1. Create a JSON or YAML connector config file that matches your [IdP](https://dexidp.io/docs/connectors/).

{{< stack type="wizard" >}}
{{% wizardRow id="Syntax" %}}
 {{% wizardButton option="json" state="active" %}}
 {{% wizardButton option="yaml" %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="syntax/json" %}}
``` json
{
"type": "oidc",
"id": "auth0",
"name": "Auth0",
"version": 1,
"config":{
  "issuer": "https://dev-k34x5yjn.us.auth0.com/",
  "clientID": "hegmOc5rTotLPu5ByRDXOvBAzgs3wuw5",
  "clientSecret": "7xk8O71Uhp5T-bJp_aP2Squwlh4zZTJs65URPma-2UT7n1iigDaMUD9ArhUR-2aL",
  "redirectURI": "http(s)://<insert-external-ip-or-dns-name>/dex/callback",
  "insecureEnableGroups": true,
  "insecureSkipEmailVerified": true,
  "insecureSkipIssuerCallbackDomainCheck": false,
  "forwardedLoginParams": ["login_hint"] 
  }
}
```
{{% /wizardResult %}}

{{% wizardResult val1="syntax/yaml" %}}

``` yaml
  type: oidc
  id: auth0
  name: Auth0
  version: 1
  config:
      issuer: https://dev-k34x5yjn.us.auth0.com/
      clientID: hegmOc5rTotLPu5ByRDXOvBAzgs3wuw5
      clientSecret: 7xk8O71Uhp5T-bJp_aP2Squwlh4zZTJs65URPma-2UT7n1iigDaMUD9ArhUR-2aL
      redirectURI: http(s)://<insert-external-ip-or-dns-name>/dex/callback
      insecureEnableGroups: true
      insecureSkipEmailVerified: true
      insecureSkipIssuerCallbackDomainCheck: false,
      forwardedLoginParams:
      - login_hint
```
{{% notice note %}}
Note that Pachyderm's YAML format is **a simplified version** of Dex's [sample config](https://dexidp.io/docs/connectors/oidc/).
{{% /notice %}}
{{% /wizardResult %}}


{{% /wizardResults %}}

{{</stack>}}

2. Update the following attributes:

|Attribute|Description|
|-|-|
|id|The unique identifier of your connector (string).|
|name| Its full name (string).|
|type|The type of connector. (oidc, saml).|
|version| The version of your connector (integer - default to 0 when creating a new connector)|
|issuer| The domain of your application (here in Auth0). For example, `https://dev-k34x5yjn.us.auth0.com/`. **Note the trailing slash**.|
|client_id| The Pachyderm **Client ID** (here in Auth0). The client ID consists of alphanumeric characters and can be found on the application
settings page.|
|client_secret| The Pachyderm client secret (here in Auth0) located on the application settings page.
|redirect_uri|This parameter should match what you have added to **Allowed Callback URLs** when registering Pachyderm on your IdP website.|

3. Open your Helm `values.yml` file.
4. Find the [oidc.upstreamIDPs](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml#L774) section.
5. Input your connector info; Pachyderm stores this value in the platform secret `pachyderm-identity` in the key `upstream-idps`.
```yaml
stringData:
upstream-idps: |
    - type: github
    id: github
    name: GitHub
    jsonConfig: >-
        {
        "clientID": "xxx",
        "clientSecret": "xxx",
        "redirectURI": "https://pach.pachdemo.cloud/dex/callback",
        "loadAllGroups": true
        }
```



Alternatively, you can [create a secret](../../../../how-tos/advanced-data-operations/secrets/#generate-your-secret-configuration-file) containing your dex connectors (Key: upstream-idps) and reference its name in the field [oidc.upstreamIDPsSecretName](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml#L805).

 
### 3. Login
The users registered with your IdP are now ready to [Log in to Pachyderm](../login)

## Considerations 

### Ingress 

**When using an [ingress](../../../../deploy-manage/deploy/ingress/#ingress)**:

- `redirect_uri` must be changed to point to `https://domain-name/dex/callback`. (Note the additional **/dex/**) 
- TLS requires all non-localhost redirectURIs to be **HTTPS**.
- AZURE USERS: 
    - You must use TLS when deploying on Azure.
    - When using Azure Active Directory, add the following to the oidc config:
    ``` yaml
    "config":{
        "claimMapping": {
            "email": "preferred_username"
        } 
    }      
 
    ```