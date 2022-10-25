---
# metadata # 
title:  Minikube 
description: Learn how to install Pachyderm locally with Minikube.
date: 
# taxonomy #
tags:  ["minikube", "getting-started", "local-deploy", "linux", "mac","windows"]
series: 
seriesPart: 
weight: 1
label: recommended 
---

Minikube is a tool that quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows. It's a great solution for trying out Pachyderm locally.

## Before You Start

- You should be familiar with using the terminal
- **Windows Users**: You should be familiar with [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

## 1. Install Minikube 

See the [official Minikube getting started guide](https://minikube.sigs.k8s.io/docs/start/) for the most up-to-date installation steps. Make sure to also install `kubectl` (mentioned in Step 3: Interact with your cluster).

## 2. Install Pachctl CLI 

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

## 3. Install & Configure Helm

1. [Install Helm](https://helm.sh/docs/intro/install/).
2. Run the following to add the Pachyderm repo to Helm:
    ```s
    helm repo add pach https://helm.pachyderm.com  
    helm repo update 
    ```
3. Run the following to install Pachyderm:
    ```s
    helm install --wait --timeout 10m pachd pach/pachyderm --set deployTarget=LOCAL  
    ```

## 4. Verify Installation 

1. Run the following command to check the status of your pods:
    ```s
    kubectl get pods
    ```
    ```s
    NAME                                           READY   STATUS      RESTARTS   AGE
   pod/console-5b67678df6-s4d8c                   1/1     Running     0          2m8s
   pod/etcd-0                                     1/1     Running     0          2m8s
   pod/pachd-c5848b5c7-zwb8p                      1/1     Running     0          2m8s
   pod/pg-bouncer-7b855cb797-jqqpx                1/1     Running     0          2m8s
   pod/postgres-0                                 1/1     Running     0          2m8s
    ```
2. Re-run this command after a few minutes if `pachd` is not ready.

## 5. Connect to Cluster

1. Run the following command:
    ```s
    pachctl config import-kube local --overwrite
    pachctl config set active-context local
    pachctl port-forward
    ```
2. Optionally open your browser and navigate to the [Console UI](http://localhost:4000).

{{% notice tip %}}
You can check your Pachyderm version and connection to `pachd` at any time with the following command:
   ```s
   pachctl version
   ```
   ```s
   COMPONENT           VERSION  
   pachctl             {{% latestPatchNumber %}}  
   pachd               {{% latestPatchNumber %}}  
   ```
{{% /notice %}}