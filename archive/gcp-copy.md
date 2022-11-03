---
# metadata # 
title:  GCP + Pachyderm 
description: Learn how to deploy to Pachyderm to the cloud with GCP.
date: 
# taxonomy #
tags: ["gcp", "cloud-deploy"]
series:
seriesPart:
weight: 
---
## Before You Start 

This guide assumes that you have already tried [Pachyderm locally](../../local-deploy/) and have all of the following tools installed:

- [Kubectl](https://kubernetes.io/docs/tasks/tools/) 
- Pachctl 
- [Helm](https://helm.sh/docs/intro/install/)
- [Google Cloud SDK](https://cloud.google.com/sdk/)
- [jq](https://stedolan.github.io/jq/download/)
- [Gcloud CLI](https://cloud.google.com/sdk/docs/install)

---

## 1. Create a New Project 

1. Log in to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g.,`pachyderm-project`).
3. Enable the Compute Engine API (this requires an active Linked Billing Account).

You are now ready to create a GKE Cluster.

## 2. Create a GKE Cluster 

1. Navigate to the [Kubernetes Engine tab](https://console.cloud.google.com/kubernetes/list) in GCP Console.
2. Select **Create**.
3. Choose **Autopilot** and select **Configure**.
4. Name your Cluster (e.g., `pachyderm-cluster`).
5. Choose a region.
6. Select **Create**.

It may take up to 10 minutes for the GKE Cluster to deploy. You can monitor the status of your new cluster from the Kubernetes Engine tab.

## 3. Connect to the Cluster

You can connect to your cluster via the CLI in terminal or in the GCP Console's Cloud Shell.

{{< stack type="wizard">}}

{{% wizardRow id="Connection Method"%}}
{{% wizardButton option="CLI" state="active" %}}
{{% wizardButton option="Console Cloud Shell" %}}
{{% /wizardRow %}}

{{% wizardResults  %}}
{{% wizardResult val1="connection-method/cli"%}}
```s
gcloud container clusters get-credentials <cluster-name> --region <region> --project <project-name>
```
{{% /wizardResult %}}

{{% wizardResult val1="connection-method/console-cloud-shell"%}}
1. Log in to GCP Console.
2. Switch to your Pachyderm project.
3. Navigate to the [Kubernetes Engine](https://console.cloud.google.com/kubernetes/list) tab.
4. Select the **Actions** icon > **Connect** > **Run in Cloud Shell**.
{{% /wizardResult %}}
{{% /wizardResults %}}
{{< /stack >}}

## 4. Install Pachctl 

```s
curl -o /tmp/pachctl.tar.gz -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_linux_amd64.tar.gz && tar -xvf /tmp/pachctl.tar.gz -C /tmp && sudo cp /tmp/pachctl_{{% latestPatchNumber %}}_linux_amd64/pachctl /usr/local/bin 
```
 
## 5. Create a GCS Bucket

Pachyderm needs a [GCS bucket](https://cloud.google.com/storage/docs/creating-buckets) (Object store) to store your data.

1. Navigate to [Buckets](https://console.cloud.google.com/storage/) in GCP Console.
2. Select **Create**.  
3. Name and configure the bucket.
4. Select **Create**.

{{% notice tip %}}
You  can use the `gsutil ls` command to confirm your bucket has been created.
{{% /notice %}}


### Set Up Your GCP Service Account
To access your GCP resources, Pachyderm uses a GCP Project Service Account with permissioned access to your desired resources. For more information about the creation and management of a Service account, see the official [GCP documentation](https://cloud.google.com/iam/docs/creating-managing-service-accounts).


{{< stack type="wizard">}}

{{% wizardRow id="Setup Method"%}}
{{% wizardButton option="CLI" state="active" %}}
{{% wizardButton option="Console Cloud Shell" %}}
{{% /wizardRow %}}

{{% wizardResults  %}}
{{% wizardResult val1="setup-method/cli"%}}
```s
GSA_NAME=<Your Google Service Account Name>

gcloud iam service-accounts create ${GSA_NAME}
```
{{% /wizardResult %}}

{{% wizardResult val1="setup-method/console-cloud-shell"%}}
1. Log in to Google Cloud Console.
2. Navigate to **IAM & Admin** > **Service Accounts**.
3. Select **Create Service Account**.
4. Fill in all of the following:
   - Name
   - ID
   - Description
5. Select **Create**.

Keep the full name of your service account handy, you will need it soon.
{{% /wizardResult %}}
{{% /wizardResults %}}
{{< /stack >}}

### Configure Your Service Account Permissions

For Pachyderm to access your Google Cloud Resources, run the following:

1. Create the following set of variables:

```s
SERVICE_ACCOUNT="${GSA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

# "default" or the namespace in which your cluster was deployed
K8S_NAMESPACE="default" 

PACH_WI="serviceAccount:${PROJECT_ID}.svc.id.goog[${K8S_NAMESPACE}/pachyderm]"
SIDECAR_WI="serviceAccount:${PROJECT_ID}.svc.id.goog[${K8S_NAMESPACE}/pachyderm-worker]"
CLOUDSQLAUTHPROXY_WI="serviceAccount:${PROJECT_ID}.svc.id.goog[${K8S_NAMESPACE}/k8s-cloudsql-auth-proxy]"
```

2. Grant access to cloudSQL and your bucket to the Service Account:

```s
# Grant access to cloudSQL to the Service Account
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/cloudsql.client"

# Grant access to storage (bucket + volumes) to the Service Account
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/storage.admin"
```

3. Use [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) to run Pachyderm Services as the Service Account.

    Workload Identity is the recommended way to access Google Cloud services from applications running within GKE. 

```s
gcloud iam service-accounts add-iam-policy-binding ${SERVICE_ACCOUNT} \
    --role roles/iam.workloadIdentityUser \
    --member "${PACH_WI}"

gcloud iam service-accounts add-iam-policy-binding ${SERVICE_ACCOUNT} \
    --role roles/iam.workloadIdentityUser \
    --member "${SIDECAR_WI}"

gcloud iam service-accounts add-iam-policy-binding ${SERVICE_ACCOUNT} \
    --role roles/iam.workloadIdentityUser \
    --member "${CLOUDSQLAUTHPROXY_WI}"
```

For a set of standard roles, read the [GCP IAM permissions documentation](https://cloud.google.com/storage/docs/access-control/iam-permissions#bucket_permissions).

## 6. Create a Values.yaml

{{< stack type="wizard" >}}
{{% wizardRow id="version" %}}
{{% wizardButton option="Community Edition" state="active" %}}
{{% wizardButton option="Enterprise" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="version/community-edition" %}}
```yaml
 deployTarget: "GOOGLE"
 pachd:
   storage:
     google:
       bucket: "bucket_name"
       cred: |
         INSERT JSON CONTENT HERE
   externalService:
     enabled: true
 console:
   enabled: true
```
{{% /wizardResult %}}
{{% wizardResult val1="version/enterprise" %}}
```yaml
 deployTarget: "GOOGLE"
 pachd:
   storage:
     google:
       bucket: "bucket_name"
       cred: |
         INSERT JSON CONTENT HERE
   # pachyderm enterprise key
   enterpriseLicenseKey: "YOUR_ENTERPRISE_TOKEN"
 console:
   enabled: true
```
{{% /wizardResult %}}
{{% /wizardResults %}}
{{< /stack>}}

## 7. Configure Helm

Run the following to add the Pachyderm repo to Helm:
```s
helm repo add pach https://helm.pachyderm.com
helm repo update
helm install pachd pach/pachyderm -f my_pachyderm_values.yaml 
```
## 8. Verify Installation 

1. In a new terminal, run the following command to check the status of your pods:
 ```s
 kubectl get pods
 ```
 ```
 NAME                                           READY   STATUS      RESTARTS   AGE
pod/console-5b67678df6-s4d8c                   1/1     Running     0          2m8s
pod/etcd-0                                     1/1     Running     0          2m8s
pod/pachd-c5848b5c7-zwb8p                      1/1     Running     0          2m8s
pod/pg-bouncer-7b855cb797-jqqpx                1/1     Running     0          2m8s
pod/postgres-0                                 1/1     Running     0          2m8s
 ```
2. Re-run this command after a few minutes if `pachd` is not ready.

## 9. Connect to Cluster

```s
pachctl config import-kube local --overwrite
pachctl config set active-context local
pachctl port-forward
```
{{% notice note %}}
If the connection commands did not work together, run each separately.
{{%/notice %}}

Optionally open your browser and navigate to the [Console UI](http://localhost:4000).

{{% notice tip %}}
You can check your Pachyderm version and connection to `pachd` at any time with the following command:
   ```s
   pachctl version
   ```
   ```
   COMPONENT           VERSION  

   pachctl             {{% latestPatchNumber %}}  
   pachd               {{% latestPatchNumber %}}  
   ```
{{% /notice %}}

