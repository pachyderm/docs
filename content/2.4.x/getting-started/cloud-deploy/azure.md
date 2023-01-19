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

- [Kubectl](https://kubernetes.io/docs/tasks/tools/) 
- Pachctl 
- [Helm](https://helm.sh/docs/intro/install/)
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


Pachyderm needs an [Azure Storage Container](https://docs.microsoft.com/en-us/azure/databricks/data/data-sources/azure/azure-storage) (Object store) to store your data. 

To access your data, Pachyderm uses a [Storage Account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) with permissioned access to your desired container. You can either use an existing account or create a new one in your default subscription, then use the JSON key associated with the account and pass it on to Pachyderm.



1. Set up the following variables:
   - `STORAGE_ACCOUNT`: The name of the storage account where you store your data.
   - `CONTAINER_NAME`: The name of the Azure blob container where you store your data.

2. Create an Azure storage account:

    ```s
    az storage account create \
      --resource-group="${RESOURCE_GROUP}" \
      --location="${LOCATION}" \
      --sku=Premium_LRS \
      --name="${STORAGE_ACCOUNT}" \
      --kind=BlockBlobStorage
    ```
    **System response:**

    ```
    {
      "accessTier": null,
      "creationTime": "2019-06-20T16:05:55.616832+00:00",
      "customDomain": null,
      "enableAzureFilesAadIntegration": null,
      "enableHttpsTrafficOnly": false,
      "encryption": {
        "keySource": "Microsoft.Storage",
        "keyVaultProperties": null,
        "services": {
          "blob": {
            "enabled": true,
      ...
    ```

    Make sure that you set Stock Keeping Unit (SKU) to `Premium_LRS`
    and the `kind` parameter is set to `BlockBlobStorage`. This
    configuration results in a storage that uses SSDs rather than
    standard Hard Disk Drives (HDD).
    If you set this parameter to an HDD-based storage option, your Pachyderm
    cluster will be too slow and might malfunction.

3. Verify that your storage account has been successfully created:

    ```s
    az storage account list
    ```

4. Obtain the key for the storage account (`STORAGE_ACCOUNT`) and the resource group to be used to deploy Pachyderm:

    ```s
    STORAGE_KEY="$(az storage account keys list \
                  --account-name="${STORAGE_ACCOUNT}" \
                  --resource-group="${RESOURCE_GROUP}" \
                  --output=json \
                  | jq '.[0].value' -r
                )"
    ```

{{% notice note %}}
Find the generated key in the **Storage accounts > Access keys**
section in the [Azure Portal](https://portal.azure.com/) or by running the following command `az storage account keys list --account-name=${STORAGE_ACCOUNT}`.
{{% /notice %}}

5. Create a new storage container within your storage account:

    ```s
    az storage container create --name ${CONTAINER_NAME} \
              --account-name ${STORAGE_ACCOUNT} \
              --account-key "${STORAGE_KEY}"
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
 deployTarget: "MICROSOFT"
 proxy:
  enabled: true
  service:
    type: LoadBalancer
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
 proxy:
  enabled: true
  service:
    type: LoadBalancer
    
 ingress:
  host: <insert-external-ip-address-or-dns-name>

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
helm install pachyderm pach/pachyderm -f my_pachyderm_values.yaml 
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
