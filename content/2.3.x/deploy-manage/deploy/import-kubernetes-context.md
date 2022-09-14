---
# metadata # 
title:  Import a Kubernetes Context
description: 
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

After you have deployed Pachyderm with [Helm](../helm-install/), the Pachyderm context is not created.
Therefore, **you need to manually create a new Pachyderm context with
the embedded current Kubernetes context and activate that context**.

To import a Kubernetes context, complete the following steps:

1. Verify that the cluster was successfully deployed:

   ```s
   kubectl get pods
   ```

   You should see a pod for `pachd` running 
   (alongside etcd, pg-bouncer or postgres, console, depending on your installation). 

   **System Response:**

   ```s
   NAME                                    READY   STATUS    RESTARTS   AGE
   console-6c989c8d56-ftxk7                1/1     Running   0          3d18h
   etcd-0                                  1/1     Running   0          3d18h
   pachd-f9fd5b6fc-8d774                   1/1     Running   0          3d18h
   pg-bouncer-794d8f68f-sjbbh              1/1     Running   0          3d18h
   ```


1. Create a new Pachyderm context with the embedded Kubernetes context:

   ```s
   pachctl config import-kube <new-pachyderm-context-name> -k `kubectl config current-context`
   ```

1. Verify that the context was successfully created and view the context parameters:

   **Example:**

   ```s
   pachctl config get context <new-pachyderm-context-name>
   ```

   **System Response:**

   ```s
   {
     "source": "IMPORTED",
     "cluster_name": "minikube",
     "auth_info": "minikube",
     "namespace": "default"
   }
   ```

1. Activate the new Pachyderm context:

   ```s
   pachctl config set active-context <new-pachyderm-context-name>
   ```

1. Verify that the new context has been activated:

   ```s
   pachctl config get active-context
   ```
