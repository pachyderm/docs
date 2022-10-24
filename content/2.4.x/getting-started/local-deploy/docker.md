---
# metadata # 
title:  ⭐ Docker Desktop(Fastest)
description: Learn how to install Pachyderm locally with Docker for any operating system.
date: 
# taxonomy #
tags:  ["docker","linux", "mac","windows", "getting-started", "local-deploy"]
series: 
seriesPart: 
weight: 1
---

## Before You Start

- You should be familiar with using the terminal

## 1. Install Docker Desktop

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your machine.
2. Register and log in to Docker Desktop.
3. Navigate to **Settings** for [Mac](https://docs.docker.com/desktop/settings/mac/), [Windows](https://docs.docker.com/desktop/settings/windows/), or [Linux](https://docs.docker.com/desktop/settings/linux/). 
   - Adjust your resources (~4 CPUs and ~12GB Memory) 
   - [Enable Kubernetes](https://docs.docker.com/desktop/kubernetes/)
4. Select **Apply & Restart**.


## 2. Install Pachctl CLI

### Brew

 ```s  
brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}} 
```

### By Architecture 

```s
## Debian 
### AMD Architectures (amd64):
curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_amd64.deb && sudo dpkg -i /tmp/pachctl.deb  

### ARM Architectures (arm64):
curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_arm64.deb && sudo dpkg -i /tmp/pachctl.deb  

## Other 
### AMD Architectures (amd64):
curl -o /tmp/pachctl.tar.gz -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_linux_amd64.tar.gz && tar -xvf /tmp/pachctl.tar.gz -C /tmp && sudo cp /tmp/pachctl_{{% latestPatchNumber %}}_linux_amd64/pachctl /usr/local/bin 

### ARM Architectures (arm64):
curl -o /tmp/pachctl.tar.gz -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_linux_arm64.tar.gz && tar -xvf /tmp/pachctl.tar.gz -C /tmp && sudo cp /tmp/pachctl_{{% latestPatchNumber %}}_linux_arm64/pachctl /usr/local/bin 
```

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