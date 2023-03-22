---
# metadata # 
title:  Local Setup 
description: Learn how to install Pachyderm locally using your favorite container solution.
date: 
# taxonomy #
tags:  ["deployment"]
series:
seriesPart: 
weight:
---

## What is a Local Installation? 

A local installation means that you will allocate resources from your local machine (e.g., your laptop) to spin up a Kubernetes cluster to run Pachyderm. This installation method is not for a production setup, but is great for personal use, testing, and product exploration.

## Which Guide Should I Use?

Both the Docker Desktop and Minikube installation guides support **MacOS**, **Windows**, and **Linux**. If this is your first time using Kubernetes, try [Docker Desktop](./docker) --- if you are experienced with Kubernetes, you can deploy using a variety of solutions not listed here ([KinD](https://kind.sigs.k8s.io/docs/user/quick-start/), [Rancher Desktop](https://docs.rancherdesktop.io/getting-started/installation/), [Podman](https://podman.io/getting-started/installation), etc.).


{{% notice tip %}}
**Binary Files** (Advanced Users)

You can download the [latest binary files](https://github.com/pachyderm/pachyderm/releases/latest) from GitHub for a direct installation of `pachctl` and the `mount-server`.
{{% /notice %}}


