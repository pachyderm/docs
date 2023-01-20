---
# metadata # 
title:  Pachyderm JupyterLab Mount Extension
description: Learn how to install and use the JupyterLab Mount Extension with Pachyderm.
date: 
# taxonomy #
tags: ["integrations", "jupyterlab", "notebooks"]
series:
seriesPart:
weight: 
beta: true 
---

Use the [JupyterLab extension](https://pypi.org/project/jupyterlab-pachyderm/) to:

- Connect your Notebook to a Pachyderm cluster
- Browse, explore, and analyze data stored in Pachyderm directly from your Notebook
- Run and test out your pipeline code before creating a Docker image

{{% notice danger %}}
The JupyterLab Mount Extension is an [experimental feature](../../reference/supported-releases/#experimental). We hope you'll try it out (and work with us to improve it! [Get in touch](https://www.pachyderm.com/slack/)), but it's not ready for self-service usage in production, as it may make sudden, breaking changes.
{{% /notice %}}

![Mount extension in action](../images/mount-extension.gif)

## Before You Start 

- You must have a Pachyderm cluster running.

## Install the Extension 

There are three main ways to install the Jupyter Lab extension:

- 🧪 [Locally](#local-installation): Great for development and testing
- ⭐ [Via Docker](#install-to-existing-docker-image): Fastest implementation!

### Local Installation 

#### Pre-requisites 

- Install [Jupyter Lab](https://jupyterlab.readthedocs.io/en/stable/getting_started/installation.html) (`pip install jupyterlab`)
- Install [FUSE](https://osxfuse.github.io/)
  {{% notice warning %}}
  Local installation of FUSE requires a reboot to access your [Startup Security Utility](https://support.apple.com/en-us/HT208198) and [enable kernel extensions (kexts)](https://support.apple.com/guide/security/kernel-extensions-sec8e454101b) after you have downloaded all of the necessary pre-requisites.
  {{% /notice %}}
- Install [jupyterlab pachyderm](https://pypi.org/search/?q=jupyterlab+pachyderm) (`pip install jupyterlab-pachyderm`)
- Download [mount-server binary](https://github.com/pachyderm/pachyderm/releases/tag/v{{% latestPatchVersion %}}) 

#### Local Installation Steps

1. Open your terminal.
2. Navigate to your downloads folder. 
3. Copy the `mount-server` binary you downloaded from the pre-requisites into a folder included within your `$PATH` so that your `jupyterlab-pachyderm` extension can find it:
   ```s 
   sudo cp mount-server /usr/local/bin
   ```
4. Open your `zshrc` profile:
   ```s
   vim ~/.zshrc
   ```
5. Create a `/pfs` directory to mount your data to. This is the default directory used; alternatively, you can define an empty output folder that PFS should mount by adding `export PFS_MOUNT_DIR=/<directory>/<path>` to your bash/zshrc profile.
6. Update the source by restarting your computer or executing the following command:
   ```s
   source ~/.zshrc
   ```
7. Run `jupyter lab`. 

If you have an existing pachyderm config file at `~/.pachyderm/config.json`, the extension automatically connects to the active context. Otherwise, you must enter the cluster address manually in the extension UI.


### Install to Existing Docker Image 

You can choose between Pachyderm's pre-built image (a custom version of [`jupyter/scipy-notebook`](https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-scipy-notebook)) or add the extension to your own image. Pachyderm's image includes:

- The extension jupyterlab-pachyderm
- [FUSE](https://osxfuse.github.io/)
- A pre-created `/pfs` directory that mounts to and grants ownership to the JupyterLab User
- A `mount-server` binary 

#### Option 1: Pre-Built Image

1. Open your terminal.
2. Run the following:
 ```s
 docker run -it -p 8888:8888 -e GRANT_SUDO=yes --user root --device /dev/fuse --privileged --entrypoint /opt/conda/bin/jupyter pachyderm/notebooks-user:v{{% extensionJupyterLab %}}  lab --allow-root
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


#### Option 2: Custom Dockerfile 

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

--- 

## How to Use 

### Mount a Branch

1. Open the Jupyterlab UI.
2. Open a **Terminal** from the launcher.
3. Navigate to the **Mounted Repositories** tab.
4. Input the following to see a demo repo appear:
 ```s
 pachctl create repo demo
 pachctl create branch demo@master
 ```
5. Scroll to the **Unmounted Repositories** section.
6. Select **Mount** next to the **Demo** repository. 
7. Input the following to create a simple text file:
 ```s
 echo "Version 1 of file" | pachctl put file demo@master:/myfile.txt
 ```
8. Unmount and re-mount your repo to attach to the latest commit containing the new file.
   ![re-mount repo](/images/jupyterlab-extension/mount-repo.gif)
9.  Read the file using the following:
 ```s
 cat /pfs/demo/myfile.txt
 ```

### Explore Directories & Files

At the bottom of the **Mounted Repositories** tab, you'll find the file browser. 

- Mounted repositories are nested within the root `/pfs` (Pachyderm's File System)
- These repositories are **read-only**
- Mounted repositories have a `/` glob pattern applied to their directories and files
- Files only downloaded locally when you access them (saving you time)

Using the previous example, while the **Demo** repository is mounted, you can select the **demo** folder to reveal the example `myfile.txt`. 

### Examples 

Make sure to check our [data science notebook examples](https://github.com/pachyderm/examples) running on Pachyderm, from a market sentiment NLP implementation using a FinBERT model to pipelines training a regression model on the Boston Housing Dataset. You will also find integration examples with open-source products, such as labeling or model serving applications. 

--- 

## Troubleshooting 

 Restarting your server should resolve most issues. To restart your server, run the following command from the terminal window in Jupyterlab:

```s
pkill -f "mount-server"
```
The server restarts by itself.

### M1 Users With Docker Desktop < `4.6`

A [documented issue between qemu and Docker Desktop](https://gitlab.com/qemu-project/qemu/-/issues/340) prevents you from running our pre-built Mount Extension Image in Docker Desktop.

We recommend the following:

  - Use [Podman](https://podman.io) (See installation instructions)
  ```s
  brew install podman
  podman machine init --disk-size 50
  podman machine start
  podman machine ssh
  sudo rpm-ostree install qemu-user-static && sudo systemctl reboot THEN
  ```
   then replace the keyword `docker` with `podman` in all the commands above. 
  - Or make sure that your qemu version is > `6.2`
