---
# metadata # 
title:  Docker Desktop
description: Learn how to install Pachyderm locally with Docker Desktop.
date: 
# taxonomy #
tags:  ["docker","linux", "mac","windows", "getting-started", "local-deploy"]
series: 
seriesPart: 
weight: 1
label: recommended
---

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
 {{% /wizardResult %}}
 {{% wizardResult val1="operating-system/windows" %}}
 - You must have [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) enabled (`wsl --install`) and a Linux distribution installed; if that does not work, see the [manual installation guide](https://learn.microsoft.com/en-us/windows/wsl/install-manual).


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
 {{% /wizardResult %}}
{{% /wizardResults %}}
{{< /stack >}}

## 1. Install Docker Desktop

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your machine.
2. Register and log in to Docker Desktop.
3. Navigate to **Settings** for [Mac](https://docs.docker.com/desktop/settings/mac/), [Windows](https://docs.docker.com/desktop/settings/windows/), or [Linux](https://docs.docker.com/desktop/settings/linux/). 
   - Adjust your resources (~4 CPUs and ~12GB Memory) 
   - [Enable Kubernetes](https://docs.docker.com/desktop/kubernetes/)
4. Select **Apply & Restart**.


## 2. Install Pachctl CLI
 
 ```s
  brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```

## 3. Install & Configure Helm

1. Install [Helm](https://helm.sh/docs/intro/install/):
   ```s
   brew install helm
   ```
2. Add the Pachyderm repo to Helm:
   ```s
   helm repo add pach https://helm.pachyderm.com  
   helm repo update  
   ```
3. Install PachD: 
   ```s
   helm install --wait --timeout 10m pachd pach/pachyderm --set deployTarget=LOCAL 
   ```
   This may take several minutes to complete. 

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

Run the following commands :
1. ```s
    pachctl config import-kube local --overwrite
    ```
2. ```s
    pachctl config set active-context local
    ```
3.  ```s
    pachctl port-forward
    ```
4. Optionally open your browser and navigate to the [Console UI](http://localhost:4000).

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

