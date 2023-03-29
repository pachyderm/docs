---
# metadata # 
title:  Non-Default Namespaces
description: Learn how to deploy MLDM to a non-default namespace for easier admin management.
date: 
# taxonomy #
tags: ["deployment"]
series:
seriesPart:
--- 

Often, production deploys of MLDM involve deploying MLDM to a non-default namespace. This helps administrators of the cluster more easily manage MLDM components alongside other things that might be running inside of Kubernetes (DataDog, TensorFlow Serving, etc.).

* To deploy MLDM to a non-default namespace, 
you need to add the `-n` or `--namespace` flag when deploying. 
    If the namespace does not already exist, 
    you can have [Helm](../helm-install/) create it with `--create-namespace`.


    ```s
    helm install <args> --namespace MLDM --create-namespace
    ```

* To talk to your MLDM cluster:

    - You can either modify an existing pachctl context
        ```s
        pachctl config update context --namespace pachyderm
        ```

    - or [import one from Kubernetes](../import-kubernetes-context/):
