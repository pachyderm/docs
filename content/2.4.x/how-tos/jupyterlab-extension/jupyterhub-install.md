---
# metadata # 
title: JupyterHub Installation Guide
description: Learn how to install and use the JupyterLab Mount Extension with Pachyderm using JupyterHub.
date: 
# taxonomy #
tags: ["integrations", "jupyterlab", "notebooks"]
series:
seriesPart:
weight: 2
beta: true 
---


## Before You Start

- You must have a Pachyderm cluster running.
- You must install the Jupyterlab Helm repository:
  ```s
  helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/ 
  helm repo update
  ```


{{% notice info %}}
**Connecting to your cluster**

For each option in this section, you can connect to your cluster using the following steps:

1. Find the **IP address** you used to access the JupyterHub as described in these [Helm installation instructions](https://zero-to-jupyterhub.readthedocs.io/en/latest/jupyterhub#setup-jupyterhub) (Step 5 and 6) and open Jupyterlab.
2. Click on the link provided in the `stdout` of your terminal to run JupyterLab in a browser.
3. Connect to your cluster using the `grpc://<cluster-ip>:<port>` format.
{{% /notice %}}


## Option 1: Notebooks in Privileged Context

### With Pachyderm's Default Chart

1. Open a terminal.
2. Run the following:
   ```s
   helm upgrade --cleanup-on-fail \
   --install jupyter jupyterhub/jupyterhub \
   --values https://raw.githubusercontent.com/pachyderm/pachyderm/{{% majorMinorVersion %}}/etc/helm/examples/jupyterhub-ext-values.yaml
   ```

### With a Custom Chart

1. Add the following to your JupyterHub helm chart `values.YAML` file:
```yaml
singleuser:
     defaultUrl: "/lab"
     cmd:   "start-singleuser.sh"
     image:
         name: pachyderm/notebooks-user
         tag: v{{% extensionJupyterLab %}}
     uid:   0
     fsGid: 0
     extraEnv:
         "GRANT_SUDO": "yes"
         "NOTEBOOK_ARGS": "--allow-root"
         "JUPYTER_ENABLE_LAB": "yes"
         "CHOWN_HOME": "yes"
         "CHOWN_HOME_OPTS": "-R"
 hub:
     extraConfig:
         enableRoot: |
             from kubernetes import client
             def modify_pod_hook(spawner, pod):
                 pod.spec.containers[0].security_context = client.V1SecurityContext(
                     allow_privilege_escalation=True,
                     run_as_user=0,
                     privileged=True,
                     capabilities=client.V1Capabilities(
                         add=['SYS_ADMIN']
                     )
                 )
                 return pod
             c.KubeSpawner.modify_pod_hook = modify_pod_hook
```
2. Open a terminal.
3. Run the following:
  ```s
  helm upgrade --cleanup-on-fail \
  --install jupyter jupyterhub/jupyterhub \
  --values <your-values.yaml-chart-path>
  ```
 

## Option 2: Notebooks in Unprivileged Context & Mount Server in Privileged Context

With this option, you will run a sidecar Docker image called `pachyderm/mount-server` to work in tandem with the `pachyderm/notebooks-user` image. This option is good for those who have security restrictions and can't run notebooks in a privileged manner. 

### Helm Chart 

```yaml
singleuser:
    defaultUrl: "/lab"
    image:
        name: pachyderm/notebooks-user
        tag: v{{% extensionJupyterLab %}}
    extraEnv:
        "SIDECAR_MODE": "True"
    extraContainers:
        - name: mount-server-manager
          image: pachyderm/mount-server:{{% extensionJupyterLab %}}
          command: ["/bin/bash"]
          args: ["-c", "mount-server"]
          volumeMounts:
              - name: shared-pfs
                mountPath: /pfs
                mountPropagation: Bidirectional
          securityContext:
              privileged: true
              runAsUser: 0
    storage:
        extraVolumeMounts:
            - name: shared-pfs
              mountPath: /pfs
              mountPropagation: HostToContainer
        extraVolumes:
            - name: shared-pfs
              emptyDir: {}
```
### Automate Cluster Details

You can specify your `pachd` cluster details in your Helm chart via `extraFiles` to avoid having to provide them every time Jupyter Hub starts. The `mountPath` input is required, however the location does not matter.

```yaml
singleuser:
    defaultUrl: "/lab"
    image:
        name: pachyderm/notebooks-user
        tag: v{{% extensionJupyterLab %}}
    extraEnv:
        "SIDECAR_MODE": "True"
    extraContainers:
        - name: mount-server-manager
          image: pachyderm/mount-server:{{% extensionJupyterLab %}} 
          command: ["/bin/bash"]
          args: ["-c", "mkdir -p ~/.pachyderm && cp /config/config.json ~/.pachyderm && mount-server"]
          volumeMounts:
              - name: shared-pfs
                mountPath: /pfs
                mountPropagation: Bidirectional
              - name: files
                mountPath: /config
          securityContext:
              privileged: true
              runAsUser: 0
    storage:
        extraVolumeMounts:
            - name: shared-pfs
              mountPath: /pfs
              mountPropagation: HostToContainer
        extraVolumes:
            - name: shared-pfs
              emptyDir: {}
    extraFiles:
      config.json:
        mountPath: </any/path/file.json>
        data:
          v2:
            active_context: mount-server
            contexts:
              mount-server:
                source: 2
                pachd_address: <cluster_endpoint>
                server_cas: <b64e_cert_string>
                session_token: <token>
            metrics: true
```