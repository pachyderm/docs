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

This guide assumes that you have already tried [Pachyderm locally](../../local-deploy/) and have all of the following installed:

- Kubectl 
- Pachctl 
- Helm
- AWS CLI
- [Google Cloud SDK](https://cloud.google.com/sdk/)
- [jq](https://stedolan.github.io/jq/download/)

---

## 1. Create a GKE Cluster 

1. Run the following:
```s
CLUSTER_NAME=<any unique name, e.g. "pach-cluster">

GCP_ZONE=<a GCP availability zone. e.g. "us-west1-a">

gcloud config set compute/zone ${GCP_ZONE}

gcloud config set container/cluster ${CLUSTER_NAME}

MACHINE_TYPE=<machine type for the k8s nodes, we recommend "n1-standard-4" or larger>
```
2. Spin up a cluster:
```s
# By default the following command spins up a 3-node cluster. You can change the default with `--num-nodes VAL`.

gcloud container clusters create ${CLUSTER_NAME} \
 --machine-type=${MACHINE_TYPE} \
 --workload-pool=${PROJECT_ID}.svc.id.goog \
 --enable-ip-alias \
 --create-subnetwork="" \
 --enable-stackdriver-kubernetes \
 --enable-dataplane-v2 \
 --enable-shielded-nodes \
 --release-channel="regular" \
 --workload-metadata="GKE_METADATA" \
 --enable-autorepair \
 --enable-autoupgrade \
 --disk-type="pd-ssd" \
 --image-type="COS_CONTAINERD"
```
3. Assign permissions:
```s
# By default, GKE clusters have RBAC enabled. To allow the 'helm install' to give the 'pachyderm' service account
# the requisite privileges via clusterrolebindings, you will need to grant *your user account* the privileges
# needed to create those clusterrolebindings.
#
# Note that this command is simple and concise, but gives your user account more privileges than necessary. See
# https://docs.pachyderm.io/en/latest/deploy-manage/deploy/rbac/ for the complete list of privileges that the
# pachyderm serviceaccount needs.
kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)
```
{{% notice tip %}}
This might take a few minutes to start up. You can check the status on
the [GCP Console](https://console.cloud.google.com/compute/instances).
A `kubeconfig` entry is automatically generated and set as the current
context. 
{{% /notice %}}


## 2. Create a GCS Bucket

Pachyderm needs a [GCS bucket](https://cloud.google.com/storage/docs/) (Object store) to store your data. You can create the bucket by running the following commands:

1. Set up the following system variables:

   |Variable|Description|
   |-|-|
   |`BUCKET_NAME`| A globally unique GCP bucket name where your data will be stored.|
   | `GCP_REGION`|The GCP region of your Kubernetes cluster e.g. "us-west1".|

2. Create the bucket:
```s
gsutil mb -l ${GCP_REGION}  gs://${BUCKET_NAME} 
```

3. Check that everything has been set up correctly:

```s
gsutil ls
# You should see the bucket you created.
```

### Set Up Your GCP Service Account
To access your GCP resources, Pachyderm uses a GCP Project Service Account with permissioned access to your desired resources. For more information about the creation and management of a Service account, see the official [GCP documentation](https://cloud.google.com/iam/docs/creating-managing-service-accounts).

#### Via Google Cloud Console

1. Log in to Google Cloud Console.
2. Navigate to **IAM & Admin** > **Service Accounts**.
3. Select **Create Service Account**.
4. Fill in all of the following:
   - Name
   - ID
   - Description
5. Select **Create**.

Keep the full name of your service account handy, you will need it soon.

#### Via CLI

```s
GSA_NAME=<Your Google Service Account Name>

gcloud iam service-accounts create ${GSA_NAME}
```


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

## 3. Create a Values.yaml

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

## 4. Configure Helm

Run the following to add the Pachyderm repo to Helm:
```s
helm repo add pach https://helm.pachyderm.com
helm repo update
helm install pachd pach/pachyderm -f my_pachyderm_values.yaml 
```
## 5. Verify Installation 

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

## 6. Connect to Cluster

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
