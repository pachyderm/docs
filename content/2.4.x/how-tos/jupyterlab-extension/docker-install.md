---
# metadata # 
title: Docker Installation Guide
description: Learn how to install and use the JupyterLab Mount Extension with Pachyderm using a Docker image.
date: 
# taxonomy #
tags: ["integrations", "jupyterlab", "notebooks", "docker"]
series:
seriesPart:
weight: 1
beta: true 
---
{{% notice danger %}}
The JupyterLab Mount Extension is an [experimental feature](../../../reference/supported-releases/#experimental). We hope you'll try it out (and work with us to improve it! [Get in touch](https://www.pachyderm.com/slack/)), but it's not ready for self-service usage in production, as it may make sudden, breaking changes.
{{% /notice %}}

## Install to Existing Docker Image 

You can choose between Pachyderm's pre-built image (a custom version of [`jupyter/scipy-notebook`](https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-scipy-notebook)) or add the extension to your own image. Pachyderm's image includes:

- The extension jupyterlab-pachyderm
- [FUSE](https://osxfuse.github.io/)
- A pre-created `/pfs` directory that mounts to and grants ownership to the JupyterLab User
- A `mount-server` binary 

### Option 1: Pre-Built Image

1. Open your terminal.
2. Run the following:
 ```s
 docker run -it -p 8888:8888 -e GRANT_SUDO=yes --user root --device /dev/fuse --privileged --entrypoint /opt/conda/bin/jupyter pachyderm/notebooks-user:{{% extensionJupyterLab %}}  lab --allow-root
 ```
3. Open the UI using the link provided in the terminal following:
 ```s
 Jupyter Server [...] is running at:
 ```
4. Navigate to the connection tab. You will need to provide a link formatted like the following:
 ```s
 grpc://<cluster-ip>:<port>
 ```
5. Open another terminal and run the following to get the IP address and port number:
  ```s
  kubectl get services | grep -w "pachd "
  ```
6. Find the `servic/pachd` line item and copy the **IP address** and first **port number**.
    
 ```s
    NAME                          TYPE           CLUSTER-IP       EXTERNAL-IP   PORT
    pachd                         ClusterIP      10.106.225.116   <none>        30650/TCP,30657/TCP,30658/TCP,30600/TCP,30656/TCP
 ```
7. Input the full connection URL (`grpc://10.106.225.116:30650`).
8. Navigate to the **Launcher** view in Jupyter and select **Terminal**.
9. Input the following command:
 ```s
 pachctl version
 ```
10. If you see a `pachctl` and `pachd` version, you are good to go.


### Option 2: Custom Dockerfile 

Replace the following `${PACHCTL_VERSION}` with the version of `pachctl` that matches your cluster's, and update `<version>` with the release number of the extension.

You can find the latest available version of our Pachyderm Mount Extension in [PyPi](https://pypi.org/project/jupyterlab-pachyderm/). 

```s
# This runs the following section as root; if adding to an existing Dockerfile, set the user back to whatever you need. 
USER root

# This is the directory files will be mounted to, mirroring how pipelines are run. 
RUN mkdir -p /pfs 

# If you are not using "jovyan" as your notebook user, replace the user here. 
RUN chown $NB_USER /pfs

# Fuse is a requirement for the mount extension 
RUN apt-get clean && RUN apt-get update && apt-get -y install curl fuse 

# Install the mount-server binary
RUN curl -f -o mount-server.deb -L https://github.com/pachyderm/pachyderm/releases/download/v${PACHCTL_VERSION}/mount-server_${PACHCTL_VERSION}_amd64.deb
RUN dpkg -i mount-server.deb

# Optionally Install Pachctl - Set the version of Pachctl that matches your cluster deployment. 
RUN curl -f -o pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v${PACHCTL_VERSION}/pachctl_${PACHCTL_VERSION}_amd64.deb 
RUN dpkg -i pachctl.deb

# This sets the user back to the notebook user account (i.e., Jovyan) 
USER $NB_UID

# Replace the version here with the version of the extension you would like to install from https://pypi.org/project/jupyterlab-pachyderm/ 
RUN pip install jupyterlab-pachyderm==<version> 
```

Then, [build, tag, and push your image](../developer-workflow/working-with-pipelines/#step-2-build-your-docker-image).