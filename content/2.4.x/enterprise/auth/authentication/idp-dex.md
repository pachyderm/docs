---
# metadata # 
title: Identity Providers
description: Learn how to enable users to log in to Pachyderm using their preferred identity provider. 
date: 
# taxonomy #
tags: ["identity-providers", "permissions", "management", "integrations"]
series:
seriesPart:
---

You can enable your users to authenticate to Pachyderm using their favorite Identity Providers using the steps in this guide. 

## Before You Start 

- This guide assumes that you have an Enterprise Server set up.
  

## 1. Register With Your IdP

If you do not have an Auth0 account, sign up for one
at https://auth0.com and create your Pool of Users 
(although this step might be done later).

Then, complete the following steps:

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
    http://<insert-external-ip-or-dns-name>:30658/callback
    ```

    The IP address is the address of your Pachyderm host. For example,
    if you are running Pachyderm in Minikube, you can find the IP
    address by running `minikube ip`. 

   {{% notice warning %}} 
   **Attention Proxy users**: 
    Your Callback URL must be set to `http(s)://<insert-external-ip-or-dns-name>/dex/callback`. 
    {{% /notice %}}

9. Scroll down to **Show Advanced Settings**.
10. Select **Grant Types**.
11. Verify that **Authorization Code** and **Refresh Token** are selected.

   ![Auth0 Grant Settings](/images/auth0-grant-settings.png)

{{% notice note %}}
For this Auth0 example, we have created a user in Auth0 in **User Management/Users**.
We will log in to Pachyderm as this user once our IdP connection is completed.
![Auth0 Create User](/images/auth0-create-user.png)
{{% /notice %}}

### 2: Set up and create an Idp-Pachyderm connector

#### Create A Connector Configuration File
To configure your Idp-Pachyderm integration, **create a connector configuration file** corresponding to your IdP. 

{{% notice info %}}
For a list of available connectors and their configuration options, see [Dex documentation](https://dexidp.io/docs/connectors/).
{{% /notice%}}

In the case of our integration with Auth0, we will use an oidc connector with the following parameters:

{{% notice note %}}
Pachyderm supports the JSON and YAML formats for its connector files. 
{{% /notice %}}

See our oidc connector example in JSON and YAML formats below.

#####  oidc-dex-connector.json

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
  "redirectURI": "http://<ip>:30658/callback",
  "insecureEnableGroups": true,
  "insecureSkipEmailVerified": true,
  "insecureSkipIssuerCallbackDomainCheck": false,
  "forwardedLoginParams": ["login_hint"] 
  }
}
```
##### oidc-dex-connector.yaml

``` yaml
  type: oidc
  id: auth0
  name: Auth0
  version: 1
  config:
      issuer: https://dev-k34x5yjn.us.auth0.com/
      clientID: hegmOc5rTotLPu5ByRDXOvBAzgs3wuw5
      clientSecret: 7xk8O71Uhp5T-bJp_aP2Squwlh4zZTJs65URPma-2UT7n1iigDaMUD9ArhUR-2aL
      redirectURI: http://<ip>:30658/callback
      insecureEnableGroups: true
      insecureSkipEmailVerified: true
      insecureSkipIssuerCallbackDomainCheck: false,
      forwardedLoginParams:
      - login_hint
```

You will need to replace the following placeholders with relevant values:

- `id`: The unique identifier of your connector (string).

- `name`: Its full name (string).

- `type`: The type of connector. (oidc, saml).

- `version`:The version of your connector (integer - default to 0 when creating a new connector)

- `issuer` — The domain of your application (here in Auth0). For example,
`https://dev-k34x5yjn.us.auth0.com/`. **Note the trailing slash**.

- `client_id` — The Pachyderm **Client ID** (here in Auth0). The client ID
consists of alphanumeric characters and can be found on the application
settings page.

- `client_secret` - The Pachyderm client secret (here in Auth0) located
on the application settings page.

- `redirect_uri` - This parameter should match what you have added
to **Allowed Callback URLs** when registering Pachyderm on your IdP website.

{{% notice warning %}}
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
{{% /notice %}}

{{% notice warning %}} 
Attention Proxy users
Your `redirect_uri` must be set to `http(s)://<insert-external-ip-or-dns-name>/dex/callback`. 
{{%/notice %}}

{{% notice note %}}
Note that Pachyderm's YAML format is **a simplified version** of Dex's [sample config](https://dexidp.io/docs/connectors/oidc/).
{{% /notice %}}

#### Create Your Idp-Pachyderm Connection

Once your Pachyderm application is registered with your IdP (here Auth0), 
and your IdP-Pachyderm connector config file created (here with the Auth0 parameters), **connect your IdP to Pachyderm** in your Helm values (recommended) or by using `pachctl`:

- Reference your connector in Helm

    Provide your connector info in the [oidc.upstreamIDPs](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml#L774) field of your helm values. Pachyderm will store this value in the platform secret `pachyderm-identity` in the key upstream-idps.

    Alternatively, you can [create a secret](../../../../how-tos/advanced-data-operations/secrets/#generate-your-secret-configuration-file) containing your dex connectors (Key: upstream-idps) and reference its name in the field [oidc.upstreamIDPsSecretName](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml#L805).

##### Example 
Below, a yaml example of the `stringData` section of an IdP generic secret.

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


- Alternatively, use `pachctl`

```s
pachctl idp create-connector --config oidc-dex-connector.json
```
or
```s
pachctl idp create-connector --config oidc-dex-connector.yaml
```
Check your connector's parameters by running:
```s
pachctl idp get-connector <your connector id: auth0>
```

Per default, the `version` field of the connector is set to 0 when created.
However, you can set its value to a different integer.

You will specifically need to increment this value when updating your connector.
```s
pachctl idp update-connector <your connector id: auth0> --version 1
```
or
```s
pachctl idp update-connector --config oidc-dex-connector.yaml
```
{{% notice info %}}
Run `pachctl idp --help` for a full list of commands. In particular, those commands let you create, update, delete, list, or get a specific connector.
{{%/notice%}}

### 3- Login
The users registered with your IdP are now ready to [Log in to Pachyderm](../login)

## User Revocation

Use the `pachctl auth revoke` command to revoke access for an existing Pachyderm user (for example, a robot user accessing your cluster, a team member leaving, etc... ). In particular, you can:

- revoke a given token: `pachctl auth revoke --token=<pach token>`.
- revoke all tokens for a given user `pachctl auth revoke --user=idp:usernamen@pachyderm.io` to log that user out forcibly.

{{% notice note %}}
Note that a user whose Pachyderm token has been revoked can technically log in to Pachyderm again unless **you have removed that user from the user registry of your IdP**.
{{% /notice %}}

For the curious mind: Take a look at the sequence diagram below illustrating the OIDC login flow. It highlights the exchange of the original OIDC ID Token for a Pachyderm Token.

![OIDC Login Flow](/images/pachyderm-oidc-dex-flow.png)

