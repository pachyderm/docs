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

{{% notice warning %}}
Do not use these steps to upgrade between major versions as it might result in data corruption.
{{% /notice %}}

Complete the following steps to upgrade Pachyderm from one minor release to another.
## 1. Backup Your Cluster

As a general good practice, start with the backup of your cluster as described in the [Backup and Restore](../backup-restore/) section of this documentation.

## 2. Update Your Helm Values

This phase depends on whether you need to modify your existing configuration (for example, enter an enterprise key, plug an identity provider, reference an enterprise server, etc...).

In the case of a simple upgrade of version on a cluster, and provided that you do not need to change any additional configuration, no change in the values.yaml should be required. The new version of Pachyderm will be directly set in the `helm upgrade` command.

## 3. Upgrade `pachctl` Version
  {{% notice warning %}}
  Upgrading from a **pachd** version older than 2.3.0? Do not skip this step.
  {{% /notice %}}
 
 - To update to the latest version of Pachyderm, run the steps below depending on your operating system:
  
      * For macOS, run:  
  
      ```s  
      brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
      ```  
  
      * For a Debian-based Linux 64-bit or Windows 10 or later running on  
      WSL:  
  
      ```s  
      curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_amd64.deb && sudo dpkg -i /tmp/pachctl.deb  
      ```  
  
      * For all other Linux flavors:  
  
      ```s  
      curl -o /tmp/pachctl.tar.gz -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_linux_amd64.tar.gz && tar -xvf /tmp/pachctl.tar.gz -C /tmp && sudo cp /tmp/pachctl_{{% latestPatchNumber %}}_linux_amd64/pachctl /usr/local/bin  
      ```  

{{% notice note %}}
For a specific target release, specify the targeted major/minor version of `pachctl` for brew and major/minor/patch release for curl in the commands above.
{{% /notice %}}


 - Verify that the installation was successful by running `pachctl version --client-only`:  
  
      ```s  
      pachctl version --client-only  
      ```  
  
      **System Response:**  
  
      ```s  
      COMPONENT           VERSION  
      pachctl             {{% latestPatchNumber %}} 
      ```  

## 4. Helm Upgrade

- Redeploy Pachyderm by running the [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) command with your updated values.yaml:

{{< stack type="wizard" >}}
{{% wizardRow id="Deploy Method"%}}
{{% wizardButton option="Production" state="active" %}}
{{% wizardButton option="Testing" %}}
{{% /wizardRow %}}


{{% wizardResults  %}}
{{% wizardResult val1="deploy-method/production"%}}
  ```s
  helm repo add pach https://helm.pachyderm.com
  helm repo update
  helm upgrade pachd -f my_pachyderm_values.yaml pach/pachyderm --version <your_chart_version> --set proxy.enabled=true --set proxy.service.type=LoadBalancer 
  ```
{{% /wizardResult %}}

{{% wizardResult val1="deploy-method/testing"%}}
  ```s
  helm repo add pach https://helm.pachyderm.com
  helm repo update
  helm upgrade pachd --set deployTarget=LOCAL --set proxy.enabled=true --set proxy.service.type=LoadBalancer 
  ```
{{% /wizardResult %}}
{{% /wizardResults %}}
{{< /stack >}}



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

