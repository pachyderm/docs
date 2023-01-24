---
# metadata # 
title: CloudSQL Auth Proxy HCVs
description: Deploy Pachyderm on GCP with CloudSQL
date: 
# taxonomy #
tags: ["helm", "gcp" ]
series:
seriesPart:
weight: 11
label: Required for GCP
--- 

The CloudSQL Auth Proxy section configures the [CloudSQL Auth Proxy](https://cloud.google.com/sql/docs/mysql/connect-auth-proxy) for deploying Pachyderm on GCP with CloudSQL.


## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 

{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="Enabled" state="active" %}}
{{% wizardButton option="Disabled"  %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="options/enabled" %}}
```s

cloudsqlAuthProxy:
  connectionName: "" # may be found by running `gcloud sql instances describe INSTANCE_NAME --project PROJECT_ID`
  serviceAccount: ""   #  defines the account used to connect to the cloudSql instance
  iamLogin: false
  port: 5432   # the cloudql database port to expose. The default is `5432`
  enabled: true # controls whether to deploy the cloudsqlAuthProxy. Default is false.
  image:
    repository: "gcr.io/cloudsql-docker/gce-proxy" # the image repo to pull from; replicates --registry to pachctl
    pullPolicy: "IfNotPresent"
    tag: "1.23.0" # the image repo to pull from; replicates the --dash-image argument to pachctl deploy.
  priorityClassName: ""
  nodeSelector: {}
  tolerations: []
  podLabels: {}  # specifies labels to add to the dash pod.
  resources: {} # specifies the resource request and limits.

  #  requests:
  #    # The proxy's memory use scales linearly with the number of active
  #    # connections. Fewer open connections will use less memory. Adjust
  #    # this value based on your application's requirements.
  #    memory: ""
  #    # The proxy's CPU use scales linearly with the amount of IO between
  #    # the database and the application. Adjust this value based on your
  #    # application's requirements.
  #    cpu: ""

  service:
    labels: {} #  specifies labels to add to the cloudsql auth proxy service.
    type: ClusterIP # specifies the Kubernetes type of the cloudsql auth proxy service. The default is `ClusterIP`.
```
{{% /wizardResult %}}

{{% wizardResult val1="options/disabled" %}}
```s

cloudsqlAuthProxy:
  enabled: false
  
```
{{% /wizardResult %}}

{{% /wizardResults%}}

{{< /stack >}}

## About