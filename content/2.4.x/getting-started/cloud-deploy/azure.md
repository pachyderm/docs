---
# metadata # 
title:  Azure + Pachyderm
description: Learn how to deploy to Pachyderm to the cloud with Azure.
date: 
# taxonomy #
tags: ["azure", "cloud-deploy"]
series:
seriesPart:
weight: 
---
## Before You Start 

This guide assumes that you have already tried [Pachyderm locally](../../local-deploy/) and have all of the following installed:

- Kubectl 
- Pachctl 
- Helm
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

---

## 1. Create an AKS Cluster 

 
You can deploy Kubernetes on Azure by following the official [Azure Kubernetes Service documentation](https://docs.microsoft.com/en-us/azure/aks/tutorial-kubernetes-deploy-cluster?tabs=azure-cli), [use the quickstart walkthrough](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough), or follow the steps in this section.


At a minimum, you will need to specify the parameters below:

|Variable|Description|
|--------|-----------|
|RESOURCE_GROUP|A unique name for the resource group where Pachyderm is deployed. For example, `pach-resource-group`.|
|LOCATION|An Azure availability zone where AKS is available. For example, `centralus`.|
|NODE_SIZE|The size of the Kubernetes virtual machine (VM) instances. To avoid performance issues, Pachyderm recommends that you set this value to at least `Standard_DS4_v2` which gives you 8 CPUs, 28 Gib of Memory, 56 Gib SSD.<br> <br>In any case, use VMs that support **premium storage**. See [Azure VM sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes)  for details around which sizes support Premium storage.|
|CLUSTER_NAME|A unique name for the Pachyderm cluster. For example, `pach-aks-cluster`.|

You can choose to follow the guided steps in [Azure Service Portal's Kubernetes Services](https://portal.azure.com/) or use Azure CLI.


1. [Log in](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli) to Azure:

    ```s
    az login
    ```

    This command opens a browser window. Log in with your Azure credentials.
    Resources can now be provisioned on the Azure subscription linked to your account.
    
    
2. Create an [Azure resource group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal#what-is-a-resource-group) or retrieve an existing group.

    ```s
    az group create --name ${RESOURCE_GROUP} --location ${LOCATION}
    ```

    **Example:**

    ```s
    az group create --name test-group --location centralus
    ```

    **System Response:**

    ```json
    {
      "id": "/subscriptions/6c9f2e1e-0eba-4421-b4cc-172f959ee110/resourceGroups/pach-resource-group",
      "location": "centralus",
      "managedBy": null,
      "name": "pach-resource-group",
      "properties": {
        "provisioningState": "Succeeded"
      },
      "tags": null,
      "type": null
    }
    ```

3. Create an AKS cluster in the resource group/location:

    For more configuration options: Find the list of [all available flags of the `az aks create` command](https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az_aks_create).

      ```s
      az aks create --resource-group ${RESOURCE_GROUP} --name ${CLUSTER_NAME} --node-vm-size ${NODE_SIZE} --node-count <node_pool_count> --location ${LOCATION}
      ```

      **Example:**

      ```s
      az aks create --resource-group test-group --name test-cluster --generate-ssh-keys --node-vm-size Standard_DS4_v2 --location centralus
      ```

4. Confirm the version of the Kubernetes server by running  `kubectl version`.

{{% notice note %}}
 "See Also:"
    - [Azure Virtual Machine sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-general)
{{% /notice %}}

Once your Kubernetes cluster is up, and your infrastructure configured, you are ready to prepare for the installation of Pachyderm. Some of the steps below will require you to keep updating the values.yaml started during the setup of the recommended infrastructure:



## 2. Create a Storage Container 

 
## 3. Create a Values.yaml

{{< stack type="wizard" >}}
{{% wizardRow id="version" %}}
{{% wizardButton option="Community Edition" state="active" %}}
{{% wizardButton option="Enterprise" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="version/community-edition" %}}
```yaml
 deployTarget: "MICROSOFT"
 pachd:
   storage:
     microsoft:
       # storage container name
       container: "blah"
       # storage account name
       id: "AKIAIOSFODNN7EXAMPLE"
       # storage account key
       secret: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
   externalService:
     enabled: true
 console:
   enabled: true
```
{{% /wizardResult %}}
{{% wizardResult val1="version/enterprise" %}}
```yaml    
 deployTarget: "MICROSOFT"
 pachd:
   storage:
     microsoft:
       # storage container name
       container: "blah"
       # storage account name
       id: "AKIAIOSFODNN7EXAMPLE"
       # storage account key
       secret: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
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
