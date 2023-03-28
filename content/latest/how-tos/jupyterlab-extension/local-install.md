---
# metadata # 
title: Local Installation Guide
description: Learn how to locally install and use the JupyterLab Mount Extension with Pachyderm.
date: 
# taxonomy #
tags: ["integrations", "jupyterlab", "notebooks"]
series:
seriesPart:
weight: 3
beta: true 
---

## Before You Start

- You must have a MLDM cluster running.
- Install [Jupyter Lab](https://jupyterlab.readthedocs.io/en/stable/getting_started/installation.html) (`pip install jupyterlab`)
- Install [FUSE](https://osxfuse.github.io/)
  {{% notice warning %}}
  Local installation of FUSE requires a reboot to access your [Startup Security Utility](https://support.apple.com/en-us/HT208198) and [enable kernel extensions (kexts)](https://support.apple.com/guide/security/kernel-extensions-sec8e454101b) after you have downloaded all of the necessary pre-requisites.
  {{% /notice %}}
- Install [jupyterlab pachyderm](https://pypi.org/search/?q=jupyterlab+pachyderm) (`pip install jupyterlab-pachyderm`)
- Download [mount-server binary](https://github.com/pachyderm/pachyderm/releases/tag/v{{% latestPatchVersion %}}) 

## Local Installation Steps

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

If you have an existing MLDM config file at `~/.pachyderm/config.json`, the extension automatically connects to the active context. Otherwise, you must enter the cluster address manually in the extension UI.