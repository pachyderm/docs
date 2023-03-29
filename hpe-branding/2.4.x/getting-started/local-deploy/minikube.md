---
# metadata # 
title:  Minikube 
description: Learn how to install Pachyderm locally with Minikube.
date: 
# taxonomy #
tags:  ["minikube", "getting-started", "local-deploy", "linux", "mac","windows"]
series: 
seriesPart: 
weight: 2
---

Minikube is a tool that quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows. It's a great solution for trying out Pachyderm locally.

## Before You Start

{{< stack type="wizard" >}}
 {{% wizardRow id="operating-system" %}}
  {{% wizardButton option="macOS" state="active" %}}
  {{% wizardButton option="Windows" %}}
  {{% wizardButton option="Linux" %}}
 {{% /wizardRow %}}

{{% wizardResults %}}
 {{% wizardResult val1="operating-system/macos" %}}
  - You must have [Homebrew](https://brew.sh/) installed. 
```s
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
  - You must have [Docker Desktop](https://www.docker.com/) installed with [Kubernetes enabled](https://docs.docker.com/desktop/kubernetes/).
 {{% /wizardResult %}}
 {{% wizardResult val1="operating-system/windows" %}}

 - You must have [Docker Desktop](https://www.docker.com/) installed with [Kubernetes enabled](https://docs.docker.com/desktop/kubernetes/). 
 - You must have [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) enabled (`wsl --install`) and a Linux distribution installed; if Linux does not boot in your WSL terminal after downloading from the Microsoft store, see the [manual installation guide](https://learn.microsoft.com/en-us/windows/wsl/install-manual).


**Manual Step Summary**:

1. Open a Powershell terminal.
2. Run each of the following:

```s
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
2. Download the latest [WSL2 Linux Kernel for x64 machines](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi).
3. Run each the following:
```s
wsl --set-default-version 2

wsl --install -d Ubuntu 
```
4. Restart your machine.
5. Start a WSL terminal and set up your first Ubuntu user.
6. Update Ubuntu.
```s
sudo apt update
sudo apt upgrade -y
```
7. Install Homebrew in Ubuntu so you can complete the rest of this guide:
```s
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
All installation steps after this point must be run through the WSL terminal (Ubuntu) and not in Powershell. 

You are now ready to continue to Step 1.

 {{% /wizardResult %}}
 {{% wizardResult val1="operating-system/linux" %}}
  - You must have [Homebrew](https://brew.sh/) installed. 
```s
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
  - You must have [Docker Desktop](https://www.docker.com/) installed.
 {{% /wizardResult %}}
{{% /wizardResults %}}
{{< /stack >}}

## 1. Install Docker 

```s
brew install docker
```
See the [official Docker getting started guide](https://docs.docker.com/get-started/) for the most up-to-date installation steps.

## 2. Install & Start Minikube 


### Install


```s
brew install minikube
```
See the [official Minikube getting started guide](https://minikube.sigs.k8s.io/docs/start/) for the most up-to-date installation steps.

### Start 

1. Launch Docker Desktop.
2. Start Minikube: 
```s
minikube start
```

## 3. Install Pachctl CLI 

```s
brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
```

## 4. Install & Configure Helm

1. Install [Helm](https://helm.sh/docs/intro/install/):
```s
brew install helm
```
2. Add the Pachyderm repo to Helm:
```s
helm repo add pachyderm https://helm.pachyderm.com  
helm repo update  
```
3. Install PachD: 

{{< stack type="wizard" >}}
 {{% wizardRow id="version" %}}
  {{% wizardButton option="Community Edition" state="active" %}}
  {{% wizardButton option="Enterprise" %}}
 {{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="version/community-edition" %}}
```s
helm install pachyderm pachyderm/pachyderm --set deployTarget=LOCAL --set proxy.enabled=true --set proxy.service.type=LoadBalancer 
```
{{% /wizardResult %}}
{{% wizardResult val1="version/enterprise" %}}
Are you using an [Enterprise](../../../enterprise) trial key? If so, you can set up Enterprise Pachyderm locally by storing your trial key in a `license.txt` file and passing it into the following Helm command: 

```s  
helm install pachyderm pachyderm/pachyderm --set deployTarget=LOCAL --set proxy.enabled=true --set proxy.service.type=LoadBalancer --set pachd.enterpriseLicenseKey=$(cat license.txt) --set ingress.host=localhost
``` 
This unlocks Enterprise features but also [requires user authentication](../../../deploy-manage/deploy/console/#connect-to-console) to access Console. A mock user is created by default to get you started, with the **username**: `admin` and **password**: `password`.
{{% /wizardResult %}}
{{% /wizardResults %}}
{{< /stack >}}
   This may take several minutes to complete. 

## 5. Verify Installation 

1. Run the following command in a new terminal to check the status of your pods:
 ```s
 kubectl get po -A
 ```
 ```
 NAMESPACE              NAME                                         READY   STATUS    RESTARTS        AGE
default                console-6b9bb8766d-f2gm4                     1/1     Running   0             41m
default                etcd-0                                       1/1     Running   0             41m
default                pachd-76896d6b5d-kmfvw                       1/1     Running   0             41m
default                pachd-loki-0                                 1/1     Running   0             41m
default                pachd-promtail-rm5ss                         1/1     Running   0             41m
default                pachyderm-kube-event-tail-b9b554fb6-dpcsr    1/1     Running   0             41m
default                pg-bouncer-5c9494c678-z57qh                  1/1     Running   0             41m
default                postgres-0                                   1/1     Running   0             41m
kube-system            coredns-6d4b75cb6d-jnl5f                     1/1     Running   3 (42m ago)   97d
kube-system            etcd-minikube                                1/1     Running   4 (42m ago)   97d
kube-system            kube-apiserver-minikube                      1/1     Running   3 (42m ago)   97d
kube-system            kube-controller-manager-minikube             1/1     Running   4 (42m ago)   97d
kube-system            kube-proxy-bngzv                             1/1     Running   3 (42m ago)   97d
kube-system            kube-scheduler-minikube                      1/1     Running   3 (42m ago)   97d
kube-system            storage-provisioner                          1/1     Running   5 (42m ago)   97d
kubernetes-dashboard   dashboard-metrics-scraper-78dbd9dbf5-swttf   1/1     Running   3 (42m ago)   97d
kubernetes-dashboard   kubernetes-dashboard-5fd5574d9f-c7ptx        1/1     Running   4 (42m ago)   97d
 ```
2. Re-run this command after a few minutes if `pachd` is not ready.

## 6. Connect to Cluster

```s
echo '{"pachd_address":"grpc://127.0.0.1:80"}' | pachctl config set context local --overwrite && pachctl config set active-context local
```
{{% notice note %}}
If the connection commands did not work together, run each separately.
{{%/notice %}}

Optionally open your browser and navigate to the [Console UI](http://localhost).

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


