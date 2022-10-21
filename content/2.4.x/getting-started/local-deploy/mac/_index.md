---
# metadata # 
title:  macOS 
description: Learn how to install Pachyderm locally with macOS.
date: 
# taxonomy #
tags:  ["macOS", "getting-started", "local-deploy"]
series: 
seriesPart: 
weight: 2
---

There are many ways to deploy Pachyderm locally on a Mac. While we recommend using the [Docker](./docker) installation, you can also use **Minikube** or **Kind**.

## 1. Install Kubectl CLI

See the [official Kubectl installation guide](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/) for MacOS.

## 2. Install Minikube 

See the [official Minikube installation guide](https://minikube.sigs.k8s.io/docs/start/) for MacOS.

{{< stack type="wizard" >}}
 {{% wizardRow id="operating-system" %}}
  {{% wizardButton option="macOS" %}}
  {{% wizardButton option="Windows" %}}
  {{% wizardButton option="Linux" %}}
 {{% /wizardRow %}}
 {{% wizardRow id="architecture" %}}
  {{% wizardButton option="ARM" %}}
  {{% wizardButton option="AMD" %}}
 {{% /wizardRow %}}
 {{% wizardRow id="install-method" %}}
  {{% wizardButton option="Brew" %}}
  {{% wizardButton option="Binary" %}}
 {{% /wizardRow %}}

<!-- Results  -->
<!-- MacOS  -->
{{% wizardResult val1="operating-system/macos" val2="architecture/arm" val3="install-method/brew" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/macos" val2="architecture/amd" val3="install-method/brew" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/macos" val2="architecture/amd" val3="install-method/binary" %}}
 ```s
 curl -o [...]
 ```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/macos" val2="architecture/arm" val3="install-method/binary" %}}
 ```s
 curl -o [...]
 ```
{{% /wizardResult %}}

<!-- Windows  -->
{{% wizardResult val1="operating-system/windows" val2="architecture/arm" val3="install-method/brew" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}} 
 ```
 {{% /wizardResult %}}

<!-- Linux  -->
{{% wizardResult val1="operating-system/linux" val2="architecture/arm" val3="install-method/brew" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
 {{% /wizardResult %}}
{{< /stack >}}