---
# metadata # 
title: Extension Walkthrough
description: Learn about the components of Pachyderm's JupyterLab extension, how they work, and how to install and use them.
date: 
# taxonomy #
tags: ["integrations", "jupyterlab", "notebooks"]
series:
seriesPart:
weight: 3
beta: true 
---

Every user's Jupyter notebook environment is unique: some users run notebooks natively on their machine, while others use managed notebooks in the cloud. Rather than provide yet another notebook environment or support one specific notebook runner when many users have their own already, this page provides the information you need to run our extension in your own environment.

Below, we describe the components of our JupyterLab extension, JupyterLab-Pachyderm, and how each is installed and run. We also offer a practical application of this information in [our examples repo](https://github.com/pachyderm/examples/tree/master/jupyterhub), where we have an example `values.yaml` file for the JupyterHub helm chart that launches notebooks with our extension pre-installed and configured.

## The components

"JupyterLab-Pachyderm" consists of two components. They're both necessary for the extension to work, but they can be run inside or outside Kubernetes, in the same container or different containers, or directly on your laptop.
Those components are:
1. The Mount server (called `mount-server` below)
  - This is a standalone, statically-linked Go-based binary, available at https://github.com/pachyderm/pachyderm/releases/latest as "mount-server"
  - This serves a REST API and also functions as a FUSE backend process.

2. The JupyterLab extension itself (called `jupyterlab-pachyderm` below)
  - This is a Python API server and a typescript web frontend combined into one JupyterLab extension, available on PyPI at https://pypi.org/project/jupyterlab-pachyderm/
    - Typically, this is installed via `pip install jupyterlab-pachyderm==<pachyderm version>`

## Normal operation

During normal operation, the Python API server (in `jupyterlab-pachyderm`) receives requests from the typescript frontend (also in `jupyterlab-pachyderm`) and forwards them to a separate running instance of the `mount-server`. We chose this split architecture because, as described below, the `mount-server` requires elevated privileges to work correctly, which some notebook environments don't allow. Because the `mount-server` and the Python API are separate, the `mount-server` can be isolated in a privileged container while the Python API runs in an unprivileged container. While this makes our extension usable in may cloud notebook environments, it does complicate local setups slightly.

The `mount-server` communicates with the user's notebook in two ways. The first is that it receives requests from the Python API server (as described above), but the second is that it backs a FUSE mount where the notebook may read files. This allows you to not just preview data in pachyderm, but interact with it in notebook code, loading it into dataframes and such. Code written in notebooks can, in most cases, run equally well in a Pachyderm pipeline without modification.

# An Example Installation

Most users will need to modify these steps for their own environment, but this section aims to give a complete picture of the installation process.

Before you start, you must have:
- A running Pachyderm cluster
- A working FUSE installation
  - On Linux, FUSE is available in most distros' package repositories (`apt-get install -y fuse3` on Ubuntu)
  - On MacOS, you'll need to install [OSXFuse](https://osxfuse.github.io/)

{{% notice warning %}}
Local installation of FUSE requires a reboot to access your [Startup Security Utility](https://support.apple.com/en-us/HT208198) and [enable kernel extensions (kexts)](https://support.apple.com/guide/security/kernel-extensions-sec8e454101b) after you have downloaded all of the necessary pre-requisites.
{{% /notice %}}

1. Download the `mount-server` binary from [the GitHub link above](https://github.com/pachyderm/examples/tree/master/jupyterhub) and copy it somewhere on your `$PATH`, such as `/usr/local/bin` or `${HOME}/.local/bin`
1. Install `jupyterlab-pachyderm` from PyPI: `pip install jupyterlab-pachyderm==<pachyderm version>`
1. Create the directory `/pfs`, but leave it empty
  - If you're installing the extension locally and don't want to pollute your root directory, or you don't have permission to create `/pfs`, you can set the environment variable `PFS_MOUNT_DIR` to any empty directory where you'd like your data mounted before running the `mount-server`. However, note code that reads Pachyderm data from a directory other than `/pfs` will need to be modified before it can be run in a Pachyderm pipeline.
  - If you're running JupyterLab locally and would like `PFS_MOUNT_DIR` to be set for every session, we recommend adding `export PFS_MOUNT_DIR=<your preferred directory>` to your `~/.zshrc` (MacOS) or `~/.profile` (Linux) file.
1. Run `jupyter lab`. 

If you have an existing pachyderm config file at `~/.pachyderm/config.json`, the extension automatically connects to the active context. Otherwise, you must enter the cluster address manually in the extension UI.

## Common Modifications to the Installation Instructions

### Running the Mount Server Manually
In the instructions above, the Python API server starts the `mount-server` as a background process automatically. However, because the `mount-server` needs filesystem privileges to provide the FUSE mount, some users need to prevent this so that they can start the `mount-server` from a privileged process (which the Python API server, as part of the JupyterLab process, may not be).

<TODO>

### Providing your Pachyderm Address on Startup

The `mount-server` binary shares the `pachctl config file` (TODO: link) with pachctl, so that it's always connected to your active Pachyderm cluster. If you'd like JupyterLab-Pachyderm to connect to a well-known Pachyderm cluster on startup, you must populate this file before starting the `mount-server`

(TODO: more detail needed?)
