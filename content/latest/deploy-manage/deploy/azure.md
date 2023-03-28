---
# metadata # 
title:  Azure
description: Learn how to deploy a MLDM cluster on Microsoft Azure. 
date: 
# taxonomy #
tags: ["azure",]
series:
seriesPart:
--- 

The following article walks you through deploying a MLDM cluster on Microsoft® Azure® Kubernetes Service environment (AKS). 

## Before You Start

Before you can deploy MLDM on an AKS cluster, verify that you have the following prerequisites installed and configured:

* [Azure CLI 2.0.1 or later](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
* [jq](https://stedolan.github.io/jq/download/)
* [kubectl](https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az_aks_install_cli)
* [pachctl](../../../getting-started/local-deploy/)
 

## 1. Deploy Kubernetes

You can deploy Kubernetes on Azure by following the official [Azure Kubernetes Service documentation](https://docs.microsoft.com/en-us/azure/aks/tutorial-kubernetes-deploy-cluster?tabs=azure-cli), [use the quickstart walkthrough](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough), or follow the steps in this section.


At a minimum, you will need to specify the parameters below:

|Variable|Description|
|--------|-----------|
|RESOURCE_GROUP|A unique name for the resource group where MLDM is deployed. For example, `pach-resource-group`.|
|LOCATION|An Azure availability zone where AKS is available. For example, `centralus`.|
|NODE_SIZE|The size of the Kubernetes virtual machine (VM) instances. To avoid performance issues, MLDM recommends that you set this value to at least `Standard_DS4_v2` which gives you 8 CPUs, 28 Gib of Memory, 56 Gib SSD.<br> <br>In any case, use VMs that support **premium storage**. See [Azure VM sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes)  for details around which sizes support Premium storage.|
|CLUSTER_NAME|A unique name for the MLDM cluster. For example, `pach-aks-cluster`.|

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




## 2. Create an Azure Storage Container For Your Data

1. Set up the following variables:

   * `STORAGE_ACCOUNT`: The name of the storage account where you store your data.
   * `CONTAINER_NAME`:  The name of the Azure blob container where you store your data.

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

    ```json
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
## 3. Persistent Volumes Creation

etcd and PostgreSQL (metadata storage) each claim the creation of a pv. 

If you plan to deploy MLDM with its default bundled PostgreSQL instance, read the warning below and jump to the [deployment section](#5-deploy-pachyderm):

{{% notice warning %}}
The metadata service (Persistent disk) generally requires a small persistent volume size (i.e. 10GB) but **high IOPS (1500)**, therefore, depending on your disk choice, you may need to oversize the volume significantly to ensure enough IOPS.
{{% /notice %}}

If you plan to deploy a managed PostgreSQL instance (Recommended in production), read the following section.

## 4. Create an Azure Managed PostgreSQL Server Database

By default, MLDM runs with a bundled version of PostgreSQL. 
For production environments, we strongly recommend that you disable the bundled version and use a PostgreSQL Server instance.

### Create A PostgreSQL Server Instance

In the Azure console, choose the **Azure Database for PostgreSQL servers** service. You will be asked to pick your server type: `Single Server` or `Hyperscale` (for multi-tenant applications), then configure your DB instance as follows.

| SETTING | Recommended value|
|:----------------|:--------------------------------------------------------|
| *subscription*  and *resource group*| Pick your existing [resource group](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/govern/resource-consistency/resource-access-management#what-is-an-azure-resource-group).<br><br> **Important** Your Cluster and your Database must be deployed in the **same resource group**.|
|*server name*|Name your instance.|
|*location*|Create a database **in the region matching your MLDM cluster**.|
|*compute + storage*|The standard instance size (GP_Gen5_4 = Gen5 VMs with 4 cores) should work. Remember that Pachyderm's metadata services require **high IOPS (1500)**. Oversize the disk accordingly |
| *Master username* | Choose your Admin username. ("postgres")|
| *Master password* | Choose your Admin password.|

You are ready to create your instance. 

#### Example 
```s
az postgres server create \
    --resource-group <your_resource_group> \
    --name <your_server_name>  \
    --location westus \
    --sku-name GP_Gen5_2 \
    --admin-user <server_admin_username> \
    --admin-password <server_admin_password> \
    --ssl-enforcement Disabled \
    --version 11
```

{{% notice info %}}
For detailed steps, see the [official Azure documentation](https://docs.microsoft.com/en-us/azure/postgresql/quickstart-create-server-database-portal). 

{{% /notice %}}

{{% notice warning %}}
- Make sure that your PostgreSQL version is `>= 11`
- Keep the SSL setting `Disabled`.
{{% /notice %}}


Once created, go back to your newly created database, and: 

- Open the access to your instance:

{{% notice note %}}

Azure provides two options for pods running on an AKS worker nodes to access a PostgreSQL DB instance, pick what fit you best:

  - Create a [firewall rule](https://docs.microsoft.com/en-us/azure/mysql/concepts-firewall-rules#connecting-from-azure) on the Azure DB Server with a range of IP addresses that encompasses all IPs of the AKS Cluster nodes (this can be a very large range if using node auto-scaling).
  - Create a [VNet Rule](https://docs.microsoft.com/en-us/azure/mysql/concepts-data-access-and-security-vnet) on the Azure DB Server that allows access from the subnet the AKS nodes are in. This is used in conjunction with the Microsoft.Sql VNet Service Endpoint enabled on the cluster subnet.

You can also choose the more secure option to [deny public access to your PostgreSQL instance](https://docs.microsoft.com/en-us/azure/postgresql/howto-deny-public-network-access) then [Create a private endpoint in the K8s vnet](https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-privatelink-cli). Read more about how to [configure a private link using CLI on Azure's documentation](https://docs.microsoft.com/en-us/azure/postgresql/concepts-data-access-and-security-private-link)


Alternativelly, in the **Connection Security** of your newly created server, *Allow access to Azure services* (This is equivalent to running `az postgres server firewall-rule create --server-name <your_server_name> --resource-group <your_resource_group> --name AllowAllAzureIps --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0`). 
{{% /notice %}}

- In the **Essentials** page of your instance, find the full **server name** and **admin username** that will be required in your [values.yaml](#update-your-yaml-values).

![Instance overview page](/images/azure_postgresql_overview.png)

### Create Your Databases
After your instance is created, you will need to create Pachyderm's database(s).
      
If you plan to deploy a standalone cluster (i.e., if you do not plan to register your cluster with a separate [enterprise server](../../../enterprise/auth/enterprise-server/setup), you will need to create a second database named "dex" in your PostgreSQL Server instance for Pachyderm's authentication service. Note that the database **must be named `dex`**. This second database is not needed when your cluster is managed by an enterprise server.

{{% notice note %}}
Read more about [dex on PostgreSQL in Dex's documentation](https://dexidp.io/docs/storage/#postgres).
{{% /notice %}}

MLDM will use the same user to connect to `pachyderm` as well as to `dex`. 

### Update your yaml values
Once your databases have been created, add the following fields to your Helm values:


```yaml
global:
  postgresql:
    postgresqlUsername: "see admin username above"
    postgresqlPassword: "password"
    # The server name of the instance
    postgresqlDatabase: "pachyderm"
    # The postgresql database host to connect to. 
    postgresqlHost: "see server name above"
    # The postgresql database port to connect to. Defaults to postgres server in subchart
    postgresqlPort: "5432"

postgresql:
  # turns off the install of the bundled postgres.
  # If not using the built in Postgres, you must specify a Postgresql
  # database server to connect to in global.postgresql
  enabled: false
```

## 5. Deploy Pachyderm
You have set up your infrastructure, created your data container and a Managed PostgreSQL instance, and granted your cluster access to both: you can now finalize your values.yaml and deploy Pachyderm.

### Update Your Values.yaml  

{{% notice note %}} 
If you have not created a Managed PostgreSQL Server instance, **replace the Postgresql section below** with `postgresql:enabled: true` in your values.yaml. This setup is **not recommended in production environments**.
{{% /notice %}}

If you have previously tried to run MLDM locally,
make sure that you are using the right Kubernetes context first. 

1. Verify cluster context:

    ```s
    kubectl config current-context
    ```

    This command should return the name of your Kubernetes cluster that
    runs on Azure.

    If you have a different context displayed, configure `kubectl`
    to use your Azure configuration:

    ```s
    az aks get-credentials --resource-group ${RESOURCE_GROUP} --name ${CLUSTER_NAME}
    ```

    **System Response:**

    ```s
    Merged "${CLUSTER_NAME}" as current context in /Users/test-user/.kube/config
    ```

1. Update your values.yaml   

    Update your values.yaml with your container name ([see example of values.yaml here](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/examples/microsoft-values.yaml)) or use our minimal example below.
       
    ```yaml
    deployTarget: "MICROSOFT"
    pachd:
      storage:
        microsoft:
          # storage container name
          container: "container_name"
          # storage account name
          id: "AKIAIOSFODNN7EXAMPLE"
          # storage account key
          secret: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
      externalService:
        enabled: true
    global:
      postgresql:
        postgresqlUsername: "see admin username above"
        postgresqlPassword: "password"
        # The server name of the instance
        postgresqlDatabase: "pachyderm"
        # The postgresql database host to connect to. 
        postgresqlHost: "see server name above"
        # The postgresql database port to connect to. Defaults to postgres server in subchart
        postgresqlPort: "5432"
    postgresql:
      # turns off the install of the bundled postgres.
      # If not using the built in Postgres, you must specify a Postgresql
      # database server to connect to in global.postgresql
      enabled: false
    ```

    Check the [list of all available helm values](../../../reference/helm-values/) at your disposal in our reference documentation or on [Github](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml).

### Deploy MLDM On The Kubernetes Cluster

- Now you can deploy a MLDM cluster by running this command:


    ```s
    helm repo add pach https://helm.pachyderm.com
    helm repo update
    helm install pachd -f values.yaml pach/MLDM --version <version-of-the-chart>
    ```

    **System Response:**

    ```s
    NAME: pachd
    LAST DEPLOYED: Mon Jul 12 18:28:59 2021
    NAMESPACE: default
    STATUS: deployed
    REVISION: 1
    ```
    Refer to our generic [Helm documentation](../helm-install/#install-pachyderms-helm-chart) for more information on how to select your chart version. 

    MLDM pulls containers from DockerHub. It might take some time
    before the `pachd` pods start. You can check the status of the
    deployment by periodically running `kubectl get all`.

    When MLDM is up and running, get the information about the pods:

    ```s
    kubectl get pods
    ```

    Once the pods are up, you should see a pod for `pachd` running 
    (alongside etcd, pg-bouncer, postgres, or console, depending on your installation). 
     
    **System Response:**

    ```s
    NAME                      READY     STATUS    RESTARTS   AGE
    pachd-1971105989-mjn61    1/1       Running   0          54m
    ...
    ```

    **Note:** Sometimes Kubernetes tries to start `pachd` nodes before
    the `etcd` nodes are ready which might result in the `pachd` nodes
    restarting. You can safely ignore those restarts.

- Finally, make sure that [`pachctl` talks with your cluster](#7-have-pachctl-and-your-cluster-communicate).
## 6. Have 'pachctl' And Your Cluster Communicate

Assuming your `pachd` is running as shown above, make sure that `pachctl` can talk to the cluster.

If you are exposing your cluster publicly:
  1. Retrieve the external IP address of your TCP load balancer or your domain name:
  
     ```s
     kubectl get services | grep pachd-lb | awk '{print $4}'
     ```

  1. Update the context of your cluster with their direct url, using the external IP address/domain name above:

      ```s
      pachctl connect grpc://localhost:80 
      ```

  1. Check that your are using the right context: 

      ```s
      pachctl config get active-context
      ```

      Your cluster context name should show up.

If you're not exposing `pachd` publicly, you can run:

```s
# Background this process because it blocks.
pachctl port-forward
``` 

## 7. Check That Your Cluster Is Up And Running

{{% notice warning %}}
If Authentication is activated (When you deploy with an enterprise key already set, for example), you need to run `pachct auth login`, then authenticate to MLDM with your User, before you use `pachctl`. 
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

