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

Make sure you have already installed all of the following: **kubectl**, **pachctl**, **Helm**, and **AWS CLI**.

### Install Kubectl 

See the official Kubernetes installation guides for the most up-to-date steps:

- [MacOS](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
- [Linux](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
- [Windows](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)

### Install Pachctl CLI
 
{{< stack type="wizard" >}}
 {{% wizardRow id="operating-system" %}}
  {{% wizardButton option="macOS" state="active" %}}
  {{% wizardButton option="Windows" %}}
  {{% wizardButton option="Debian" %}}
  {{% wizardButton option="Other Linux" %}}
 {{% /wizardRow %}}
 {{% wizardRow id="architecture" %}}
  {{% wizardButton option="ARM" %}}
  {{% wizardButton option="AMD" state="active" %}}
 {{% /wizardRow %}}
 

 <!-- Results  -->
 {{% wizardResults %}}
 <!-- MacOS  -->
 {{% wizardResult val1="operating-system/macos" val2="architecture/amd" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
 {{% /wizardResult %}}

 {{% wizardResult val1="operating-system/macos" val2="architecture/arm" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
 {{% /wizardResult %}}

 <!-- Windows  -->
 
 {{% wizardResult val1="operating-system/windows" val2="architecture/amd"  %}}

 ```s
 curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_amd64.deb && sudo dpkg -i /tmp/pachctl.deb  
 ```
 {{% /wizardResult %}}

 {{% wizardResult val1="operating-system/windows" val2="architecture/arm"  %}}

 ```s
 curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_arm64.deb && sudo dpkg -i /tmp/pachctl.deb  
 ```
 {{% /wizardResult %}}

 <!-- Linux  -->
 {{% wizardResult val1="operating-system/debian" val2="architecture/arm"  %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
 {{% /wizardResult %}}

 {{% wizardResult val1="operating-system/debian" val2="architecture/amd" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
 {{% /wizardResult %}}

 {{% wizardResult val1="operating-system/debian" val2="architecture/amd"  %}}
 ```s
  curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_amd64.deb && sudo dpkg -i /tmp/pachctl.deb  
 ```
 {{% /wizardResult %}}

 {{% wizardResult val1="operating-system/debian" val2="architecture/arm"  %}}
 ```s
 curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_arm64.deb && sudo dpkg -i /tmp/pachctl.deb  
 ```
 {{% /wizardResult %}}

 <!-- Other Linux  -->
 {{% wizardResult val1="operating-system/other-linux" val2="architecture/arm" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
 {{% /wizardResult %}}

 {{% wizardResult val1="operating-system/other-linux" val2="architecture/amd" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
 {{% /wizardResult %}}

 {{% wizardResult val1="operating-system/other-linux" val2="architecture/amd" %}}
 ```s
  curl -o /tmp/pachctl.tar.gz -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_linux_amd64.tar.gz && tar -xvf /tmp/pachctl.tar.gz -C /tmp && sudo cp /tmp/pachctl_{{% latestPatchNumber %}}_linux_amd64/pachctl /usr/local/bin 
 ```
 {{% /wizardResult %}}

 {{% wizardResult val1="operating-system/other-linux" val2="architecture/arm" %}}
 ```s
   curl -o /tmp/pachctl.tar.gz -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_linux_arm64.tar.gz && tar -xvf /tmp/pachctl.tar.gz -C /tmp && sudo cp /tmp/pachctl_{{% latestPatchNumber %}}_linux_arm64/pachctl /usr/local/bin 
 ```
 {{% /wizardResult %}}
 
 {{% /wizardResults %}}

 {{< /stack >}}

### Install & Configure Helm

1. [Install Helm](https://helm.sh/docs/intro/install/).
2. Run the following to add the Pachyderm repo to Helm:
    ```s
    helm repo add pach https://helm.pachyderm.com  
    helm repo update 
    ```
3. Run the following to install Pachyderm:
    ```s
    helm install --wait --timeout 10m pachd pach/pachyderm --set deployTarget=LOCAL  

### Install AWS CLI 

See the [official AWS CLI installation guide](https://aws.amazon.com/cli/) for the most up-to-date steps.

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