---
# metadata # 
title:  AWS Deployment
description: Learn how to deploy a Pachyderm cluster on AWS. 
date: 
# taxonomy #
tags: ["aws", "deployment"]
series:
seriesPart:

--- 

This article walks you through deploying a Pachyderm cluster on [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/) (EKS).

 ## Architecture Diagram 

![AWS Arch](/images/arch-diagram-high-level-aws.svg) 

## Before You Start
Before you can deploy Pachyderm on an EKS cluster, verify that
you have the following prerequisites installed and configured:

* [kubectl](https://kubernetes.io/docs/tasks/tools/)
* [AWS CLI](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html)
* [eksctl](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html)
* [aws-iam-authenticator](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html).
* [pachctl](../../../getting-started/local-deploy)

## 1. Deploy Kubernetes by using `eksctl`

{{% notice warning %}}
Pachyderm requires running your cluster on Kubernetes 1.19.0 and above.
{{%/notice%}}

Use the `eksctl` tool to deploy an EKS cluster in your
Amazon AWS environment. The `eksctl create cluster` command
creates a virtual private cloud (VPC), a security group,
and an IAM role for Kubernetes to create resources.
For detailed instructions, see [Amazon documentation](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html).

To deploy an EKS cluster, complete the following steps:

1. Deploy an EKS cluster:

      ```s
      eksctl create cluster --name <name> --version <version> \
      --nodegroup-name <name> --node-type <vm-flavor> \
      --nodes <number-of-nodes> --nodes-min <min-number-nodes> \
      --nodes-max <max-number-nodes> --node-ami auto
      ```

      **Example**

      ```s
      eksctl create cluster --name pachyderm-cluster --region us-east-2 --profile <your named profile>
      ```

1. Verify the deployment:

   ```s
   kubectl get all
   ```

   **System Response:**

   ```s
   NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
   service/kubernetes   ClusterIP   10.100.0.1   <none>        443/TCP   23h
   ```

Once your Kubernetes cluster is up, and your infrastructure is configured, 
you are ready to prepare for the installation of Pachyderm.
Some of the steps below will require you to keep updating the values.yaml started during the setup of the recommended infrastructure. 

{{% notice note %}}
Pachyderm recommends securing and managing your secrets in a Secret Manager. Learn about the [set up and configuration of your EKS cluster to retrieve the relevant secrets from AWS Secrets Manager](../aws-secret-manager) then resume the following installation steps.
{{% /notice %}}

## 2. Create an S3 bucket
### Create an S3 object store bucket for data

Pachyderm needs an S3 bucket (Object store) to store your data. You can create the bucket by running the following commands:

{{% notice warning %}}
The S3 bucket name must be globally unique across the entire Amazon region. 
{{% /notice %}}

* Set up the following system variables:

  * `BUCKET_NAME` — A globally unique S3 bucket name.
  * `AWS_REGION` — The AWS region of your Kubernetes cluster. For example,
  `us-west-2` and not `us-west-2a`.

* If you are creating an S3 bucket in the `us-east-1` region, run the following command:

  ```s
  aws s3api create-bucket --bucket ${BUCKET_NAME} --region ${AWS_REGION}
  ```

* If you are creating an S3 bucket in any region but the `us-east-1` region, run the following command:

  ```s
  aws s3api create-bucket --bucket ${BUCKET_NAME} --region ${AWS_REGION} --create-bucket-configuration LocationConstraint=${AWS_REGION}
  ```

* Verify that the S3 bucket was created:

  ```s   
  aws s3 ls
  ```

You now need to **give Pachyderm access to your bucket** either by:

- [Adding a policy to your service account IAM Role](#add-an-iam-role-and-policy-to-your-service-account) (Recommended)
OR
- Passing your AWS credentials (account ID and KEY) to your values.yaml when installing

{{% notice info %}}
IAM roles provide finer grained user management and security
capabilities than access keys. Pachyderm recommends the use of IAM roles for production
deployments.
{{%/notice%}}

### Add An IAM Role And Policy To Your Service Account

Before you can make sure that **the containers in your pods have the right permissions to access your S3 bucket**, you will need to [Create an IAM OIDC provider for your cluster](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).

Then follow the steps detailled in **[Create an IAM Role And Policy for your Service Account](https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html)**.

In short, you will:

1. Retrieve your **OpenID Connect provider URL**:
      1. Go to the AWS Management console.
      1. Select your cluster instance in **Amazon EKS**.
      1. In the **Configuration** tab of your EKS cluster, find your **OpenID Connect provider URL** and save it. You will need it when creating your IAM Role.

1. Create an **IAM policy** that gives access to your bucket:
      1. Create a new **Policy** from your IAM Console.
      1. Select the **JSON** tab.
      1. Copy/Paste the following text in the JSON tab:

      ```json
      {
            "Version": "2012-10-17",
            "Statement": [
                  {
            "Effect": "Allow",
                  "Action": [
                        "s3:ListBucket"
                  ],
                  "Resource": [
                        "arn:aws:s3:::<your-bucket>"
                  ]},{
            "Effect": "Allow",
                  "Action": [
                        "s3:PutObject",
                        "s3:GetObject",
                        "s3:DeleteObject"
                  ],
                  "Resource": [
                        "arn:aws:s3:::<your-bucket>/*"
                  ]}
            ]
      }
      ``` 

      Replace `<your-bucket>` with the name of your S3 bucket.

1. Create an **IAM role as a Web Identity** using the cluster OIDC procider as the identity provider.
      1. Create a new **Role** from your IAM Console.
      1. Select the **Web identity** Tab.
      1. In the **Identity Provider** drop down, select the *OpenID Connect provider URL* of your EKS and `sts.amazonaws.com` as the Audience.
      1. Attach the newly created permission to the Role.
      1. Name it.
      1. Retrieve the **Role arn**. You will need it in your values.yaml annotations when deploying Pachyderm.

### (Optional) Set Up Bucket Encryption

To set up bucket encryption, see [Amazon S3 Default Encryption for S3 Buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html).

## 3. Enable Your Persistent Volumes Creation

etcd and PostgreSQL (metadata storage) each claim the creation of a persistent volume. **We strongly recommend using SSD gp3 in production.**

### For Production

1. [Create an IAM OIDC provider for your cluster](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html). You might already have completed this step if you chose to create an IAM Role and Policy to give your containers permission to access your S3 bucket.
2. Create a CSI Driver service account whose IAM Role will be granted the permission (policy) to make calls to AWS APIs. 
3. Install Amazon EBS Container Storage Interface (CSI) driver on your cluster configured with your created service account.

See the [official AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) for more details.

 
### For Non-Production

For non production deployments, use the default bundled version of PostgreSQL: [Go to the deployment of Pachyderm](#5-deploy-pachyderm)  

## 4. Create an AWS Managed PostgreSQL Database

By default, Pachyderm runs with a bundled version of PostgreSQL. 
For production environments, it is **strongly recommended that you disable the bundled version and use an RDS PostgreSQL instance**. 

{{% notice warning %}}
Note that [Aurora Serverless PostgreSQL](https://aws.amazon.com/rds/aurora/serverless/) is not supported and will not work.
{{% /notice %}}

### Create An RDS Instance

{{% notice info%}}
Find the details of all the steps highlighted below in [AWS Documentation: "Getting Started" hands-on tutorial](https://aws.amazon.com/getting-started/hands-on/create-connect-postgresql-db/).
{{% /notice %}}
 
1. In the RDS console, create a database **in the region matching your Pachyderm cluster**. 
2. Choose the **PostgreSQL** engine.
3. Select a PostgreSQL version >= 13.3.
4. Configure your DB instance as follows:

| SETTING | Recommended value|
|:----------------|:--------------------------------------------------------|
| *DB instance identifier* | Fill in with a unique name across all of your DB instances in the current region.|
| *Master username* | Choose your Admin username.|
| *Master password* | Choose your Admin password.|
| *DB instance class* | The standard default should work. You can change the instance type later on to optimize your performances and costs. |
| *Storage type* and *Allocated storage*| If you select **io1**, keep the 100 GiB default size. <br> Read more [information on Storage for RDS on Amazon's website](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html). |
| *Storage autoscaling* | If your workload is cyclical or unpredictable, enable storage autoscaling to allow RDS to scale up your storage when needed. |
| *Standby instance* | We highly recommend creating a standby instance for production environments.|
| *VPC* | **Select the VPC of your Kubernetes cluster**. Attention: After a database is created, you can't change its VPC. <br> Read more on [VPCs and RDS on Amazon documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.html).| 
| *Subnet group* | Pick a Subnet group or Create a new one. <br> Read more about [DB Subnet Groups on Amazon documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html#USER_VPC.Subnets). |
| *Public access* | Set the Public access to `No` for production environments. |
| *VPC security group* | Create a new VPC security group and open the postgreSQL port or use an existing one. |
| *Password authentication* or *Password and IAM database authentication* | Choose one or the other. |
| *Database name* | In the *Database options* section, enter Pachyderm's Database name (We are using `pachyderm` in this example.) and click *Create database* to create your PostgreSQL service. Your instance is running. <br>Warning: If you do not specify a database name, Amazon RDS does not create a database.|


1. If you plan to deploy a standalone cluster (i.e., if you do not plan to register your cluster with a separate [enterprise server](../../../enterprise/auth/enterprise-server/setup), you must create a second database named `dex` in your RDS instance for Pachyderm's authentication service.  Read more about [dex on PostgreSQL in Dex's documentation](https://dexidp.io/docs/storage/#postgres). 
   
2. Additionally, create a new user account and **grant it full CRUD permissions to both `pachyderm` and (when applicable) `dex` databases**. Read about managing PostgreSQL users and roles in this [blog](https://aws.amazon.com/blogs/database/managing-postgresql-users-and-roles/). Pachyderm will use the same username to connect to `pachyderm` as well as to `dex`. 


### Update your values.yaml 
Once your databases have been created, add the following fields to your Helm values:

```yaml
global:
  postgresql:
    postgresqlUsername: "username"
    postgresqlPassword: "password" 
    # The name of the database should be Pachyderm's ("pachyderm" in the example above), not "dex" 
    # See also 
    # postgresqlExistingSecretName: "<yoursecretname>"
    postgresqlDatabase: "databasename"
    # The postgresql database host to connect to. Defaults to postgres service in subchart
    postgresqlHost: "RDS CNAME"
    # The postgresql database port to connect to. Defaults to postgres server in subchart
    postgresqlPort: "5432"

postgresql:
  # turns off the install of the bundled postgres.
  # If not using the built in Postgres, you must specify a Postgresql
  # database server to connect to in global.postgresql
  enabled: false
```
## 5. Deploy Pachyderm

You have set up your infrastructure, created your S3 bucket and an AWS Managed PostgreSQL instance, and granted your cluster access to both: you can now finalize your values.yaml and deploy Pachyderm.

### Update Your Values.yaml  

{{% notice note %}}
If you have not created a Managed PostgreSQL RDS instance, **replace the Postgresql section below** with `postgresql:enabled: true` in your values.yaml. This setup is **not recommended in production environments**.
{{% /notice %}}

{{< stack type="wizard" >}}
{{% wizardRow id="Volume Type" %}}
{{% wizardButton option="gp3" state="active" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="volume-type/gp3" %}}

#### For gp3 EBS Volumes
[Check out our example of values.yaml for gp3](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/examples/aws-gp3-values.yaml) or use our minimal example below.

#####  Gp3 + Service account annotations

```yaml
deployTarget: AMAZON
# This uses GP3 which requires the CSI Driver https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
# And a storageclass configured named gp3
etcd:
  storageClass: gp3

proxy:
  enabled: true
  service:
    type: LoadBalancer

pachd:
  storage:
    amazon:
      bucket: your-bucket-name
      region: us-east-2
  serviceAccount:
    additionalAnnotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::<ACCOUNT_ID>:role/pachyderm-bucket-access
  worker:
    serviceAccount:
      additionalAnnotations:
        eks.amazonaws.com/role-arn: arn:aws:iam::<ACCOUNT_ID>:role/pachyderm-bucket-access
global:
  postgresql:
    postgresqlUsername: "username"
    postgresqlPassword: "password" 
    # The name of the database should be Pachyderm's ("pachyderm" in the example above), not "dex" 
    postgresqlDatabase: "databasename"
    # The postgresql database host to connect to. Defaults to postgres service in subchart
    postgresqlHost: "RDS CNAME"
    # The postgresql database port to connect to. Defaults to postgres server in subchart
    postgresqlPort: "5432"

postgresql:
  # turns off the install of the bundled postgres.
  # If not using the built in Postgres, you must specify a Postgresql
  # database server to connect to in global.postgresql
  enabled: false
```

##### Gp3 + AWS Credentials

```yaml
deployTarget: AMAZON
# This uses GP3 which requires the CSI Driver https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
# And a storageclass configured named gp3
etcd:
  storageClass: gp3

proxy:
  enabled: true
  service:
    type: LoadBalancer

pachd:
  storage:
    amazon:
      bucket: blah
      region: us-east-2
      # this is an example access key ID taken from https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
      id: AKIAIOSFODNN7EXAMPLE
      # this is an example secret access key taken from https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
      secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY        
global:
  postgresql:
    postgresqlUsername: "username"
    postgresqlPassword: "password" 
    # The name of the database should be Pachyderm's ("pachyderm" in the example above), not "dex" 
    postgresqlDatabase: "databasename"
    # The postgresql database host to connect to. Defaults to postgres service in subchart
    postgresqlHost: "RDS CNAME"
    # The postgresql database port to connect to. Defaults to postgres server in subchart
    postgresqlPort: "5432"

postgresql:
  # turns off the install of the bundled postgres.
  # If not using the built in Postgres, you must specify a Postgresql
  # database server to connect to in global.postgresql
  enabled: false
```
{{% /wizardResult%}}
{{% /wizardResults %}}
{{< /stack >}}

 
 



{{% notice tip %}}
Retain (ideally in version control) a copy of the Helm values used to deploy your cluster. It might be useful if you need to [restore a cluster from a backup](../../manage/backup-restore).
{{% /notice %}}

### Deploy Pachyderm On The Kubernetes Cluster

- You can now deploy a Pachyderm cluster by running this command:

  ```s
  helm repo add pach https://helm.pachyderm.com
  helm repo update
  helm install pachyderm -f values.yaml pach/pachyderm --version <version-of-the-chart>
  ```

  **System Response:**

  ```s
  NAME: pachd
  LAST DEPLOYED: Mon Jul 12 18:28:59 2021
  NAMESPACE: default
  STATUS: deployed
  REVISION: 1
  ```

  The deployment takes some time. You can run `kubectl get pods` periodically
  to check the status of deployment. When Pachyderm is deployed, the command
  shows all pods as `READY`:

  ```s
  kubectl wait --for=condition=ready pod -l app=pachd --timeout=5m
  ```

  **System Response**

  ```s
  pod/pachd-74c5766c4d-ctj82 condition met
  ```

  **Note:** If you see a few restarts on the `pachd` nodes, it means that
  Kubernetes tried to bring up those pods before `etcd` was ready. Therefore,
  Kubernetes restarted those pods. You can safely ignore this message.

- Finally, make sure that [`pachctl` talks with your cluster](#7-have-pachctl-and-your-cluster-communicate).

## 6. Have 'pachctl' And Your Cluster Communicate

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

{{% notice warning %}}
If Authentication is activated (When you deploy with an enterprise key already set, for example), you need to run `pachct auth login`, then authenticate to Pachyderm with your User, before you use `pachctl`. 
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
 