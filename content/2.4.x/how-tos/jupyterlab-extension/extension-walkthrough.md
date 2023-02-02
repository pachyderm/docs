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

Every user's Jupyter notebook environment is unique: some users run notebooks natively on their machine, while others use managed notebooks in the cloud. This page describes the general architecture of the extension components and how they fit together. 

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

During normal operation, the Python API server (in `jupyterlab-pachyderm`) receives requests from the typescript frontend (also in `jupyterlab-pachyderm`) and forwards them to a separate running instance of the `mount-server`. We chose this split architecture because the `mount-server` requires elevated privileges to work correctly, which some notebook environments don't allow. Because the `mount-server` and the Python API are separate, the `mount-server` can be isolated in a privileged container while the Python API runs in an unprivileged container. While this makes our extension usable in may cloud notebook environments, it does complicate local setups slightly.

The `mount-server` communicates with the user's notebook in two ways. The first is that it receives requests from the Python API server (as described above), but the second is that it backs a FUSE mount where the notebook may read files. This allows you to not just preview data in Pachyderm, but interact with it in notebook code, loading it into dataframes and such. Code written in notebooks can, in most cases, run equally well in a Pachyderm pipeline without modification.

[Our examples repo](https://github.com/pachyderm/examples/tree/master/jupyterhub) has a practical example of how these components fit together.
