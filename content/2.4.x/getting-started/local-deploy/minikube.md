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

{{< stack type="wizard" >}}
 {{% wizardRow id="operating-system" %}}
  {{% wizardButton option="macOS" state="active" %}}
  {{% wizardButton option="Windows" %}}
  {{% wizardButton option="Linux" %}}
 {{% /wizardRow %}}

{{% wizardResults %}}
 {{% wizardResult val1="operating-system/macos" %}}
  No pre-requisites. 
 {{% /wizardResult %}}
 {{% wizardResult val1="operating-system/windows" %}}
 You must have [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) enabled (`wsl --install`) and a Linux distribution installed; if that does not work, see the [manual installation guide](https://learn.microsoft.com/en-us/windows/wsl/install-manual).

{{% notice tip %}}
**Quickstart**:
1. Open a Powershell terminal.
2.  Run each of the following:

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
4. Restart your machine
5. Start WSL and set up your first Ubuntu user.

You are now ready to use WSL + Linux with other setup steps.
{{%/notice%}}
 {{% /wizardResult %}}
 {{% wizardResult val1="operating-system/linux" %}}
  No pre-requisites. 
 {{% /wizardResult %}}
{{% /wizardResults %}}
{{< /stack >}}

## 1. Install & Start Minikube 

### Install

See the [official Minikube getting started guide](https://minikube.sigs.k8s.io/docs/start/) for the most up-to-date installation steps. Make sure to also install `kubectl` (mentioned in Step 3: Interact with your cluster) if it is not automatically included.

### Start 

{{< stack type="wizard" >}}
 {{% wizardRow id="Driver" %}}
  {{% wizardButton option="Auto" state="active" %}}
  {{% wizardButton option="Docker" %}}
  {{% wizardButton option="VirtualBox" %}}
  {{% wizardButton option="KMV2" %}}
 {{% /wizardRow %}}

 <!-- Results  -->
{{% wizardResults %}}

{{% wizardResult val1="driver/auto" %}}
Discovers the available [minikube drivers](https://minikube.sigs.k8s.io/docs/drivers/) (if any); requires at least one; [Docker](https://minikube.sigs.k8s.io/docs/drivers/docker/) is preferred by Minikube for Mac, Windows, and Linux.
 ```s
 minikube start 
 ```
{{% /wizardResult %}}

{{% wizardResult val1="driver/docker" %}}
Requires [Docker Desktop](https://www.docker.com/)
 ```s
 minikube start --driver=docker
 ```
{{% /wizardResult %}}

{{% wizardResult val1="driver/virtualbox" %}}
Requires [Virtualbox](https://www.virtualbox.org/wiki/Downloads).
 ```s
 minikube start --driver=virtualbox
 ```
{{% /wizardResult %}}

{{% wizardResult val1="driver/kmv2" %}}
Requires [KVM2](https://minikube.sigs.k8s.io/docs/drivers/kvm2/).
 ```s
 minikube start --driver=kvm2
 ```
{{% /wizardResult %}}
{{% /wizardResults%}}
{{< /stack >}}

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
2. Run the following to add the Pachyderm repo to Helm and begin installation:
    ```s
    helm repo add pach https://helm.pachyderm.com  
    helm repo update 
    helm install --wait --timeout 10m pachd pach/pachyderm --set deployTarget=LOCAL  
    ```

## 4. Verify Installation 

1. Run the following command to check the status of your pods:
    ```s
    kubectl get po -A
    ```
    ```s
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