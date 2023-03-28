---
# metadata # 
title:  Google Cloud Platform
description: Learn how to deploy a MLDM cluster on Google's GKE. 
date: 
# taxonomy #
tags: ["gcp"]
series:
seriesPart:
--- 


This article  walks you through deploying a MLDM cluster on [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) (GKE). 
 
## Before You Start

1. Install the following clients:
   - [Google Cloud SDK](https://cloud.google.com/sdk/) >= 124.0.0
   - [kubectl](https://kubernetes.io/docs/tasks/tools/)
   - [pachctl](../../../getting-started/local-deploy)
   - [jq](https://stedolan.github.io/jq/download/)
2. [Create a new Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) or retrieve the ID of an existing Project you want to deploy your cluster on. 
3. Set your gcloud config to automatically select your project:
    ```s
    PROJECT_ID=<your project ID>

    gcloud config set project ${PROJECT_ID}
    ```

4. [Enable the GKE API on your project](https://console.cloud.google.com/apis/library/container.googleapis.com?q=kubernetes%20engine) if you have not done so already.

5. Enable the [CloudSQL Admin API](https://cloud.google.com/sql/docs/postgres/admin-api) to administer your instance. 


## 1. Deploy Kubernetes

{{% notice warning %}}
MLDM recommends running your cluster on Kubernetes 1.19.0 and above.
{{%/notice%}}

To create a new Kubernetes cluster by using GKE, run:

```s
CLUSTER_NAME=<any unique name, e.g. "pach-cluster">

GCP_ZONE=<a GCP availability zone. e.g. "us-west1-a">

gcloud config set compute/zone ${GCP_ZONE}

gcloud config set container/cluster ${CLUSTER_NAME}

MACHINE_TYPE=<machine type for the k8s nodes, we recommend "n1-standard-4" or larger>
```

{{% notice note %}}
Adding `--scopes storage-rw` to the `gcloud container clusters create ${CLUSTER_NAME} --machine-type ${MACHINE_TYPE}` command below will grant the rw scope to whatever service account is on the cluster, which, if you don’t provide it, is the default compute service account for the project with Editor permissions. While this is **not recommended in any production settings**, this option can be useful for a quick setup in development. In that scenario, you do not need any service account or additional GCP Bucket permission (see below).
{{% /notice %}}


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
```s
# By default, GKE clusters have RBAC enabled. To allow the 'helm install' to give the 'pachyderm' service account
# the requisite privileges via clusterrolebindings, you will need to grant *your user account* the privileges
# needed to create those clusterrolebindings.
#
# Note that this command is simple and concise, but gives your user account more privileges than necessary. See
# https://docs.MLDM.io/en/latest/deploy-manage/deploy/rbac/ for the complete list of privileges that the
# MLDM serviceaccount needs.
kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)
```

This might take a few minutes to start up. You can check the status on
the [GCP Console](https://console.cloud.google.com/compute/instances).
A `kubeconfig` entry is automatically generated and set as the current
context. As a sanity check, make sure your cluster is up and running
by running the following `kubectl` command:

```s
# List all pods in the kube-system namespace.
kubectl get pods -n kube-system
```

**System Response:**

```s
NAME                                                        READY   STATUS    RESTARTS   AGE
event-exporter-gke-67986489c8-j4jr8                         2/2     Running   0          3m21s
fluentbit-gke-499hn                                         2/2     Running   0          3m6s
fluentbit-gke-7xp2f                                         2/2     Running   0          3m6s
fluentbit-gke-jx7wt                                         2/2     Running   0          3m6s
gke-metrics-agent-jmqsl                                     1/1     Running   0          3m6s
gke-metrics-agent-rd5pr                                     1/1     Running   0          3m6s
gke-metrics-agent-xxl52                                     1/1     Running   0          3m6s
kube-dns-6c7b8dc9f9-ff4bz                                   4/4     Running   0          3m16s
kube-dns-6c7b8dc9f9-mfjrt                                   4/4     Running   0          2m27s
kube-dns-autoscaler-58cbd4f75c-rl2br                        1/1     Running   0          3m16s
kube-proxy-gke-nad-cluster-default-pool-2e5710dd-38wz       1/1     Running   0          105s
kube-proxy-gke-nad-cluster-default-pool-2e5710dd-4b7j       1/1     Running   0          3m6s
kube-proxy-gke-nad-cluster-default-pool-2e5710dd-zmzh       1/1     Running   0          3m5s
l7-default-backend-66579f5d7-2q64d                          1/1     Running   0          3m21s
metrics-server-v0.3.6-6c47ffd7d7-k2hmc                      2/2     Running   0          2m38s
pdcsi-node-7dtbc                                            2/2     Running   0          3m6s
pdcsi-node-bcbcl                                            2/2     Running   0          3m6s
pdcsi-node-jl8hl                                            2/2     Running   0          3m6s
stackdriver-metadata-agent-cluster-level-85d6d797b4-4l457   2/2     Running   0          2m14s
```

If you *don't* see something similar to the above output,
you can point `kubectl` to the new cluster manually by running
the following command:

```s
# Update your kubeconfig to point at your newly created cluster.
gcloud container clusters get-credentials ${CLUSTER_NAME}
```
Once your Kubernetes cluster is up, and your infrastructure configured, you are ready to prepare for the installation of MLDM. Some of the steps below will require you to keep updating the values.yaml started during the setup of the recommended infrastructure:
## 2. Create a GCS Bucket

### Create an GCS object store bucket for your data

MLDM needs a [GCS bucket](https://cloud.google.com/storage/docs/) (Object store) to store your data. You can create the bucket by running the following commands:

1. Set up the following system variables:
   * `BUCKET_NAME` — A globally unique GCP bucket name where your data will be stored.
   * `GCP_REGION` — The GCP region of your Kubernetes cluster e.g. "us-west1".

2. Create the bucket:
     ```s
     gsutil mb -l ${GCP_REGION}  gs://${BUCKET_NAME} 
     ```

3. Check that everything has been set up correctly:

     ```s
     gsutil ls
     # You should see the bucket you created.
     ```

You now need to **give MLDM access to your GCP resources**.

### Set Up Your GCP Service Account
To access your GCP resources, MLDM uses a GCP Project Service Account with permissioned access to your desired resources. 

You can create a Service Account with Google Cloud Console:
   
```s
GSA_NAME=<Your Google Service Account Name>

gcloud iam service-accounts create ${GSA_NAME}
```
    
More information about the creation and management of a Service account on [GCP documentation](https://cloud.google.com/iam/docs/creating-managing-service-accounts).

### Configure Your Service Account Permissions

For MLDM to access your Google Cloud Resources, run the following:

1. Create the following set of variables

    ```s
    SERVICE_ACCOUNT="${GSA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

    # "default" or the namespace in which your cluster was deployed
    K8S_NAMESPACE="default" 

    PACH_WI="serviceAccount:${PROJECT_ID}.svc.id.goog[${K8S_NAMESPACE}/pachyderm]"
    SIDECAR_WI="serviceAccount:${PROJECT_ID}.svc.id.goog[${K8S_NAMESPACE}/pachyderm-worker]"
    CLOUDSQLAUTHPROXY_WI="serviceAccount:${PROJECT_ID}.svc.id.goog[${K8S_NAMESPACE}/k8s-cloudsql-auth-proxy]"
    ```

2. Grant access to cloudSQL and your bucket to the Service Account

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

3. Use [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) to run MLDM Services as the Service Account 

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

## 3. Persistent Volumes Creation

etcd and PostgreSQL (metadata storage) each claim the creation of a [persistent disk](https://cloud.google.com/compute/docs/disks/). 

If you plan to deploy MLDM with its default bundled PostgreSQL instance, read the warning below, and jump to the [deployment section](#6-deploy-pachyderm): 

{{% notice info %}}   
When deploying MLDM on GCP, your persistent volumes are automatically created and assigned the **default disk size of 50 GBs**. Note that StatefulSets is a default as well.
{{%/notice%}}

{{% notice warning %}} 
Each persistent disk generally requires a small persistent volume size but **high IOPS (1500)**. If you choose to overwrite the default disk size, depending on your disk choice, you may need to oversize the volume significantly to ensure enough IOPS. For reference, 1GB should work fine for 1000 commits on 1000 files. 10GB is often a sufficient starting size, though we recommend provisioning at least 1500 write IOPS, which requires at least 50GB of space on SSD-based PDs and 1TB of space on Standard PDs. 
{{% /notice %}}

If you plan to deploy a managed PostgreSQL instance (CloudSQL), read the following section. Note that this is the **recommended setup in production**. 
## 4. Create a GCP Managed PostgreSQL Database

By default, MLDM runs with a bundled version of PostgreSQL. 
For production environments, it is **strongly recommended that you disable the bundled version and use a CloudSQL instance**. 

 

### Create A CloudSQL Instance

{{% notice tip %}}
Find the details of the steps and available parameters to create a CloudSQL instance in [GCP  Documentation: "Create instances: CloudSQL for PostgreSQL"](https://cloud.google.com/sql/docs/postgres/create-instance#gcloud).
{{% /notice %}}

1. Set up the following system variable:

   - `INSTANCE_NAME` — Your Cloud SQL instance name.

2. See the illustrative example below:
```s
gcloud sql instances create ${INSTANCE_NAME} \
--database-version=POSTGRES_13 \
--cpu=2 \
--memory=7680MB \
--zone=${GCP_ZONE} \
--availability-type=ZONAL \
--storage-size=50GB \
--storage-type=SSD \
--storage-auto-increase \
--root-password="<InstanceRootPassword>"
```

When you create a new Cloud SQL for PostgreSQL instance, a [default admin user](https://cloud.google.com/sql/docs/postgres/users#default-users) `Username: "postgres"` is created. It will later be used by MLDM to access its databases. Note that the `--root-password` flag above sets the password for this user.

Check out Google documentation for more information on how to [Create and Manage PostgreSQL Users](https://cloud.google.com/sql/docs/postgres/create-manage-users).

### Create Your Databases

After your instance is created, you will need to create MLDM's database(s).
      
If you plan to deploy a standalone cluster (i.e., if you do not plan to register your cluster with a separate [enterprise server](../../../enterprise/auth/enterprise-server/setup)), you will need to create a second database named "dex" in your Cloud SQL instance for MLDM's authentication service. Note that the database **must be named `dex`**. This second database is not needed when your cluster is managed by an enterprise server.

{{% notice note %}}

Read more about [dex on PostgreSQL in Dex's documentation](https://dexidp.io/docs/storage/#postgres).
{{% /notice %}}

Run the first or both commands depending on your use case.

```s
gcloud sql databases create MLDM -i ${INSTANCE_NAME}
gcloud sql databases create dex -i ${INSTANCE_NAME}
```
MLDM will use the same user "postgres" to connect to `pachyderm` as well as to `dex`. 

### Update your values.yaml 
Once your databases have been created, add the following fields to your Helm values:

{{% notice note %}}
To identify a Cloud SQL instance, you can find the INSTANCE_NAME on the Overview page for your instance in the Google Cloud Console, or by running the following command: 
`gcloud sql instances describe INSTANCE_NAME`
For example: myproject:myregion:myinstance.
{{% /notice %}}

You will need to retrieve the name of your Cloud SQL connection: 

```s
CLOUDSQL_CONNECTION_NAME=$(gcloud sql instances describe ${INSTANCE_NAME} --format=json | jq ."connectionName")
```


```yaml
cloudsqlAuthProxy:
  enabled: true
  connectionName: "<CLOUDSQL_CONNECTION_NAME>"
  serviceAccount: "<SERVICE_ACCOUNT>"
  resources:
    requests:
      memory: "500Mi"
      cpu:    "250m"

postgresql:
  # turns off the install of the bundled postgres.
  # If not using the built in Postgres, you must specify a Postgresql
  # database server to connect to in global.postgresql
  enabled: false

global:
  postgresql:
    # The postgresql database host to connect to. Defaults to postgres service in subchart
    postgresqlHost: "cloudsql-auth-proxy.default.svc.cluster.local."
    # The postgresql database port to connect to. Defaults to postgres server in subchart
    postgresqlPort: "5432"
    postgresqlSSL: "disable"
    postgresqlUsername: "postgres"
    postgresqlPassword: "<InstanceRootPassword>"
```

## 5. Deploy MLDM
You have set up your infrastructure, created your GCP bucket and a CloudSQL instance, and granted your cluster access to both: you can now finalize your values.yaml and deploy MLDM.

### Update Your Values.yaml   

[See an example of values.yaml here](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/examples/gcp-values.yaml). 
 
You might want to create a static IP address to access your cluster externally. Refer to our [infrastructure documentation](../ingress/#loadbalancer) for more details or check the example below:

```s
STATIC_IP_NAME=<your address name>

gcloud compute addresses create ${STATIC_IP_NAME} --region=${GCP_REGION}

STATIC_IP_ADDR=$(gcloud compute addresses describe ${STATIC_IP_NAME} --region=${GCP_REGION} --format=json --flatten=address | jq '.[]' )
```

{{% notice note %}}
If you have not created a Managed CloudSQL instance, **replace the Postgresql section below** with `postgresql:enabled: true` in your values.yaml and remove the `cloudsqlAuthProxy` fields. This setup is **not recommended in production environments**.
{{% /notice %}}

Retrieve these additional variables, then fill in their values in the YAML file below:

```s
echo $BUCKET_NAME
echo $SERVICE_ACCOUNT
echo $CLOUDSQL_CONNECTION_NAME
```

```yaml
deployTarget: GOOGLE

proxy:
  enabled: true
  service:
    type: LoadBalancer

pachd:
  enabled: true
  storage:
    google:
      bucket: "<BUCKET_NAME"
  serviceAccount:
    additionalAnnotations:
      iam.gke.io/gcp-service-account: "<SERVICE_ACCOUNT>"
    name:   "pachyderm"
  worker:
    serviceAccount:
      additionalAnnotations:
        iam.gke.io/gcp-service-account: "<SERVICE_ACCOUNT>"
    name:   "pachyderm-worker"

cloudsqlAuthProxy:
  enabled: true
  connectionName: "<CLOUDSQL_CONNECTION_NAME>"
  serviceAccount: "<SERVICE_ACCOUNT>"
  resources:
    requests:
      memory: "500Mi"
      cpu:    "250m" 

postgresql:
  enabled: false

global:
  postgresql:
    postgresqlHost: "cloudsql-auth-proxy.default.svc.cluster.local."
    postgresqlPort: "5432"
    postgresqlSSL: "disable"
    postgresqlUsername: "postgres"
    postgresqlPassword: "<InstanceRootPassword>"
```

### Deploy MLDM on the Kubernetes cluster

- You can now deploy a MLDM cluster by running this command:

  ```s
  helm repo add pach https://helm.MLDM.com
  helm repo update
  helm install MLDM -f my_values.yaml pach/pachyderm
  ```

  **System Response:**

  ```s
  NAME: pachyderm
  LAST DEPLOYED: Mon Nov  8 16:48:49 2021
  NAMESPACE: default
  STATUS: deployed
  REVISION: 1
  ```

  {{% notice warning %}}
  If RBAC authorization is a requirement or you run into any RBAC errors see [Configure RBAC](../rbac).
  {{% /notice %}}

  It may take a few minutes for the pachd nodes to be running because MLDM
  pulls containers from DockerHub. You can see the cluster status with
  `kubectl`, which should output the following when MLDM is up and running:

  ```s
  kubectl get pods
  ```
  Once the pods are up, you should see a pod for `pachd` running 
  (alongside etcd, pg-bouncer or postgres, console, depending on your installation). 

  **System Response:**

  ```s
  NAME                     READY   STATUS    RESTARTS   AGE
  etcd-0                   1/1     Running   0          4m50s
  pachd-5db79fb9dd-b2gdq   1/1     Running   2          4m49s
  postgres-0               1/1     Running   0          4m50s
  ```

  If you see a few restarts on the `pachd` pod, you can safely ignore them.
  That simply means that Kubernetes tried to bring up those containers
  before other components were ready, so it restarted them.

- Finally, make sure that [`pachctl` talks with your cluster](#7-have-pachctl-and-your-cluster-communicate)

## 6. Have 'pachctl' and your Cluster Communicate
Assuming your `pachd` is running as shown above, make sure that `pachctl` can talk to the cluster.

{{< stack type="wizard" >}}
{{% wizardRow id="exposed publicly?" %}}
{{% wizardButton option="yes" state="active" %}}
{{% wizardButton option="no" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="exposed-publicly/yes" %}}
1. Retrieve the external IP address of your TCP load balancer or your domain name:
    ```s
    kubectl get services | grep pachd-lb | awk '{print $4}'
    ```

  2. Update the context of your cluster with their direct url, using the external IP address/domain name above:

      ```s
      pachctl connect grpc://localhost:80 
      ```

  3. Check that your are using the right context: 

      ```s
      pachctl config get active-context
      ```

      Your cluster context name should show up.
{{% /wizardResult%}}
{{% wizardResult val1="exposed-publicly/no" %}}
Run the following:

```s
# Background this process because it blocks.
pachctl port-forward
``` 
{{% /wizardResult%}}
{{% /wizardResults %}}

{{< /stack>}}

 

## 7. Check That Your Cluster Is Up And Running
You are done! You can make sure that your cluster is working
by running `pachctl version` or creating a new repo.

{{% notice warning %}}
If Authentication is activated (When you deploy with an enterprise key, for example), you will need to run `pachct auth login`, then authenticate to MLDM with your User, before you use `pachctl`. 
{{% /notice %}}

```s
pachctl version
```

**System Response:**

```s
COMPONENT           VERSION
pachctl             {{% latestPatchNumber %}}
pachd               {{% latestPatchNumber %}}
```

 