---
# metadata # 
title: Pachyderm's JupyterLab Extension
description: Learn how to install and use Pachyderm's JupyterLab Extension.
date: 
# taxonomy #
tags: ["integrations", "jupyterlab", "notebooks"]
series:
seriesPart:
weight: 
beta: true 
---

Use our [JupyterLab extension](https://pypi.org/project/jupyterlab-pachyderm/) ("JupyterLab-Pachyderm") to:

- Connect your Notebook to a Pachyderm cluster
- Browse, open, and analyze data stored in Pachyderm directly from your Notebook
- Run and test out your pipeline code before creating a Docker image

![Mount extension in action](/images/mount-extension.gif)

---

## Try it Out

To try JupyterLab-Pachyderm right away, run our [JupyterLab Docker image](./docker-install), which contains JupyterLab and JupyterLab-Pachyderm pre-installed. If you have a running Pachyderm cluster, you can run the image, connect it to your cluster and explore your Pachyderm data in a notebook.

---

## Install the Extension 

If you have your own Jupyter notebook runner (such as JupyterHub or Kubeflow), or you're simply running JupyterLab on your local machine, check out our [JupyterLab-Pachyderm walkthrough](./extension-walkthrough) to learn about the components of JupyterLab-Pachyderm and how to get the pieces installed, running, and connected.

---

## Examples 

Make sure to check our [data science notebook examples](https://github.com/pachyderm/examples) running on Pachyderm, from a market sentiment NLP implementation using a FinBERT model to pipelines training a regression model on the Boston Housing Dataset. You will also find integration examples with open-source products, such as labeling or model serving applications. 

---
