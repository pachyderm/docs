---
# metadata # 
title:  AWS + Pachyderm
description: Learn how to deploy to Pachyderm to the cloud with AWS.
date: 
# taxonomy #
tags: ["aws", "cloud-deploy"]
series:
seriesPart:
weight: 
---

## Before You Start 

This guide assumes that you have already tried [Pachyderm locally](../../local-deploy/) and have all of the following installed:

- [Kubectl](https://kubernetes.io/docs/tasks/tools/) 
- Pachctl 
- [Helm](https://helm.sh/docs/intro/install/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Eksctl](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html)

---

## 1. Create an EKS Cluster 

1. Use the eksctl tool to deploy an EKS Cluster:
```s
eksctl create cluster --name pachyderm-cluster --region <region> -profile <your named profile>
```
2. Verify deployment: 
```s
kubectl get all
```

## 2. Create an S3 Bucket

1. Run the following command:
```s
aws s3api create-bucket --bucket ${BUCKET_NAME} --region ${AWS_REGION}
```
2. Verify. 
```s
aws s3 ls
```

## 3. Create a Values.yaml

{{< stack type="wizard" >}}
{{% wizardRow id="version" %}}
{{% wizardButton option="Community Edition" state="active" %}}
{{% wizardButton option="Enterprise" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="version/community-edition" %}}
```yaml
 deployTarget: "AMAZON"
 proxy:
  enabled: true
  service:
    type: LoadBalancer
 pachd:
   storage:
     amazon:
       bucket: "bucket_name"      
       # this is an example access key ID taken from https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html (AWS Credentials)
       id: "AKIAIOSFODNN7EXAMPLE"                
       # this is an example secret access key taken from https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html  (AWS Credentials)          
       secret: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
       region: "us-east-2"
   externalService:
     enabled: true
 console:
   enabled: true
```
{{% /wizardResult %}}
{{% wizardResult val1="version/enterprise" %}}
```yaml
 deployTarget: "AMAZON"
 proxy:
  enabled: true
  service:
    type: LoadBalancer
 pachd:
   storage:
     amazon:
       bucket: "bucket_name"                
       # this is an example access key ID taken from https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html (AWS Credentials)
       id: "AKIAIOSFODNN7EXAMPLE"                
       # this is an example secret access key taken from https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html  (AWS Credentials)          
       secret: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
       region: "us-east-2"
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
