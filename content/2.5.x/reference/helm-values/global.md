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
    postgresqlAuthType: "md5" # sets the auth type used with postgres & pg-bounder; options include "md5" and "scram-sha-256"
    postgresqlUsername: "pachyderm" # defines the username to access the pachyderm and dex databases
    postgresqlExistingSecretName: "" # leave blank if using password
    postgresqlExistingSecretKey: "" # leave blank if using password
    postgresqlDatabase: "pachyderm" # defines the database name where pachyderm data will be stored
    postgresqlHost: "postgres" # defines the postgresql database host to connect to
    postgresqlPort: "5432"  # defines he postgresql database port to connect to
    postgresqlSSL: "disable" # defines the SSL mode used to connect pg-bouncer to postgrs
    postgresqlSSLCACert: "" # defines the CA Certificate required to connect to Postgres
    postgresqlSSLSecret: "" # defines the TLS Secret with cert/key to connect to Postgres
    identityDatabaseFullNameOverride: "" # defines the DB name that dex connects to; defaults to "Dex"
  imagePullSecrets: [] # allows you to pull images from private repositories; also added to pipeline workers

  # Example:
  # imagePullSecrets:
  #   - regcred

  customCaCerts: false # loads the cert file in pachd-tls-cert as the root cert for pachd, console, and enterprise-server 
  proxy: "" # sets server address for outbound cluster traffic
  noProxy: "" # if proxy is set, allows a comma-separated list of desintations that bypass the proxy
  securityContexts: # set security context runAs users. If running on openshift, set enabled to false as openshift creates its own contexts.
    enabled: true

```
{{% /wizardResult %}}
{{% wizardResult val1="options/without-secrets" %}}

```s
global:
  postgresql:
    postgresqlAuthType: "md5" # sets the auth type used with postgres & pg-bounder; options include "md5" and "scram-sha-256"
    postgresqlUsername: "pachyderm" # defines the username to access the pachyderm and dex databases
    postgresqlPostgresPassword: "insecure-root-password" # leave blank if using a secret
    postgresqlDatabase: "pachyderm" # defines the database name where pachyderm data will be stored
    postgresqlHost: "postgres" # defines the postgresql database host to connect to
    postgresqlPort: "5432"  # defines he postgresql database port to connect to
    postgresqlSSL: "disable" # defines the SSL mode used to connect pg-bouncer to postgrs
    postgresqlSSLCACert: "" # defines the CA Certificate required to connect to Postgres
    postgresqlSSLSecret: "" # defines the TLS Secret with cert/key to connect to Postgres
    identityDatabaseFullNameOverride: "" # defines the DB name that dex connects to; defaults to "Dex"
  imagePullSecrets: [] # allows you to pull images from private repositories; also added to pipeline workers
  customCaCerts: false # loads the cert file in pachd-tls-cert as the root cert for pachd, console, and enterprise-server 
  proxy: "" # sets server address for outbound cluster traffic
  noProxy: "" # if proxy is set, allows a comma-separated list of desintations that bypass the proxy
  # Set security context runAs users. If running on openshift, set enabled to false as openshift creates its own contexts
  securityContexts:
    enabled: true

```
{{% /wizardResult %}}
{{% /wizardResults  %}}
{{< /stack >}}