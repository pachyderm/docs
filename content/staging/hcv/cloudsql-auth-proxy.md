---
# metadata # 
title: CloudSQL Auth Proxy HCVs
description: Deploy Pachyderm on GCP with CloudSQL
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 11
--- 

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
  # connectionName may be found by running `gcloud sql instances describe INSTANCE_NAME --project PROJECT_ID`
  connectionName: ""
  #  the account used to connect to the cloudSql instance
  serviceAccount: ""
  iamLogin: false
  # the cloudql database port to expose. The default is `5432`
  port: 5432
  # controls whether to deploy the cloudsqlAuthProxy. Default is false.
  enabled: true
  image:
    # repository is the image repo to pull from; together with tag it
    # replicates the --dash-image & --registry arguments to pachctl
    # deploy.
    repository: "gcr.io/cloudsql-docker/gce-proxy"
    pullPolicy: "IfNotPresent"
    # tag is the image repo to pull from; together with repository it
    # replicates the --dash-image argument to pachctl deploy.
    tag: "1.23.0"
  priorityClassName: ""
  nodeSelector: {}
  tolerations: []
  # podLabels specifies labels to add to the dash pod.
  podLabels: {}
  # resources specifies the resource request and limits.
  resources: {}
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
    # labels specifies labels to add to the cloudsql auth proxy service.
    labels: {}
    # type specifies the Kubernetes type of the cloudsql auth proxy service. The default is `ClusterIP`.
    type: ClusterIP
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