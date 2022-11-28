---
# metadata # 
title: Upgrade Pachyderm
description: Learn how to upgrade Pachyderm's pachctl and pachd. 
date: 
# taxonomy #
tags: ["management", "upgrades", "pachctl","pachd"]
series:
seriesPart:
---

Upgrading to a minor release (e.g., `2.3.5 > 2.3.6`) is simple and requires little downtime. As a good practice, we recommend that you check the [release notes](https://github.com/pachyderm/pachyderm/blob/master/CHANGELOG.md) before an upgrade to get an understanding of the changes introduced between your current version and your target. 


## Before You Start 

- [Back up your cluster](../backup-restore/) 
- Update your Helm chart values if applicable. 

## How to Upgrade Pachyderm 


1. Run the following brew command:
   ```s  
      brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
      ```  
2. Verify that the installation was successful by running `pachctl version --client-only`:  
  
   ```s  
   pachctl version --client-only  
   ```  

   **System Response:**  

   ```
   COMPONENT           VERSION  
   pachctl             {{% latestPatchNumber %}} 
   ```  

## 4. Helm Upgrade

- Redeploy Pachyderm by running the [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) command with your updated values.yaml:

  ```s
  helm repo add pach https://helm.pachyderm.com
  helm repo update
  helm upgrade pachd -f my_pachyderm_values.yaml pach/pachyderm --version <your_chart_version>
  ```

{{% notice note %}}
Each chart version is associated with a given version of Pachyderm. You will find the list of all available chart versions and their associated version of Pachyderm on [Artifacthub](https://artifacthub.io/packages/helm/pachyderm/pachyderm).
{{% /notice %}}

- The upgrade can take some time. You can run `kubectl get pods` periodically in a separate tab to check the status of the deployment. When Pachyderm is deployed, the command shows all pods as `READY`:

  ```s
  kubectl get pods
  ```
  Once the pods are up, you should see a pod for `pachd` running 
  (alongside etcd, pg-bouncer, postgres, console etc... depending on your installation). 

  **System response:**

  ```s
  NAME                     READY     STATUS    RESTARTS   AGE
  pachd-3677268306-9sqm0   1/1       Running   0          4m
  ...
  ```

- Verify that the new version has been deployed:

  ```s
  pachctl version
  ```

  **System response:**

  ```s
  COMPONENT           VERSION
  pachctl             {{% latestPatchNumber %}}
  pachd               {{% latestPatchNumber %}}
  ```

  The `pachd` and `pachctl` versions must both match the new version.

