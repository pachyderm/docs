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

If you'd like to see how we build this image, it's located here: https://github.com/pachyderm/pachyderm/blob/master/jupyter-extension/Dockerfile
