---
# metadata # 
title:  Global HCVs
description:  Configure the postgresql database connection.
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 2
label: required
--- 

## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="With Secrets" state="active" %}}
{{% wizardButton option="Without Secrets" %}}

{{% /wizardRow %}}

{{% wizardResults  %}}
{{% wizardResult val1="options/with-secrets" %}}
```s
global:
  postgresql:
    # The auth type to use with postgres and pg-bouncer; md5 is the default.
    postgresqlAuthType: "md5" 
    # postgresqlUsername is the username to access the pachyderm and dex databases
    postgresqlUsername: "pachyderm"
    postgresqlPostgresPassword: "insecure-root-password"
    # If you want to supply the postgresql password in an existing secret, leave Password blank and
    # Supply the name of the existing secret in the namespace and the key in that secret with the password
    postgresqlExistingSecretName: ""
    postgresqlExistingSecretKey: ""
    # postgresqlDatabase is the database name where pachyderm data will be stored
    postgresqlDatabase: "pachyderm"
    # The postgresql database host to connect to. Defaults to postgres service in subchart
    postgresqlHost: "postgres"
    # The postgresql database port to connect to. Defaults to postgres server in subchart
    postgresqlPort: "5432"
    # postgresqlSSL is the SSL mode to use for pg-bouncer connecting to Postgres, for the default local postgres it is disabled
    postgresqlSSL: "disable"
    # CA Certificate required to connect to Postgres
    postgresqlSSLCACert: ""
    # TLS Secret with cert/key to connect to Postgres
    postgresqlSSLSecret: ""
    # Indicates the DB name that dex connects to
    # Indicates the DB name that dex connects to. Defaults to "Dex" if not set.
    identityDatabaseFullNameOverride: ""
  # imagePullSecrets allow you to pull images from private repositories, these will also be added to pipeline workers
  # https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  # Example:
  # imagePullSecrets:
  #   - regcred
  imagePullSecrets: []
  # Set security context runAs users. If running on openshift, set enabled to false as openshift creates its own contexts.
  securityContexts:
    enabled: true

```
{{% /wizardResult %}}
{{% wizardResult val1="options/without-secrets" %}}

```s
global:
  postgresql:
    # The auth type to use with postgres and pg-bouncer; md5 is the default.
    postgresqlAuthType: "md5" 
    # postgresqlUsername is the username to access the pachyderm and dex databases
    postgresqlUsername: "pachyderm"
    # postgresqlPassword to access the postgresql database.  We set a default well-known password to
    # facilitate easy upgrades when testing locally.  Any sort of install that needs to be secure
    # must specify a secure password here, or provide the postgresqlExistingSecretName and
    # postgresqlExistingSecretKey secret.  If using an external Postgres instance (CloudSQL / RDS /
    # etc.), this is the password that Pachyderm will use to connect to it.
    postgresqlPassword: "insecure-user-password"
    # When installing a local Postgres instance, postgresqlPostgresPassword defines the root
    # ('postgres') user's password.  It must remain consistent between upgrades, and must be
    # explicitly set to a value if security is desired.  Pachyderm does not use this account; this
    # password is only required so that administrators can manually perform administrative tasks.
    postgresqlPostgresPassword: "insecure-root-password"

    # postgresqlDatabase is the database name where pachyderm data will be stored
    postgresqlDatabase: "pachyderm"
    # The postgresql database host to connect to. Defaults to postgres service in subchart
    postgresqlHost: "postgres"
    # The postgresql database port to connect to. Defaults to postgres server in subchart
    postgresqlPort: "5432"
    # postgresqlSSL is the SSL mode to use for pg-bouncer connecting to Postgres, for the default local postgres it is disabled
    postgresqlSSL: "disable"
    # CA Certificate required to connect to Postgres
    postgresqlSSLCACert: ""
    # TLS Secret with cert/key to connect to Postgres
    postgresqlSSLSecret: ""
    # Indicates the DB name that dex connects to
    # Indicates the DB name that dex connects to. Defaults to "Dex" if not set.
    identityDatabaseFullNameOverride: ""
  # when set, the certificate file in pachd-tls-cert will be loaded as the root certificate for pachd, console, and enterprise-server pods
  customCaCerts: false
  # Sets the HTTP/S proxy server address for console, pachd, and enterprise server.  (This is for
  # traffic leaving the cluster, not traffic coming into the cluster.)
  proxy: ""
  # If proxy is set, this allows you to set a comma-separated list of destinations that bypass the proxy
  noProxy: ""
  # Set security context runAs users. If running on openshift, set enabled to false as openshift creates its own contexts.
  securityContexts:
    enabled: true

```
{{% /wizardResult %}}
{{% /wizardResults  %}}
{{< /stack >}}
 
 