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

<!-- There are many ways to deploy Pachyderm locally on a Mac. While we recommend using the [Docker](./docker) installation, you can also use **Minikube** or **Kind**.

## 1. Install Kubectl CLI

See the [official Kubectl installation guide](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/) for MacOS.

## 2. Install Minikube 

See the [official Minikube installation guide](https://minikube.sigs.k8s.io/docs/start/) for MacOS. -->

TEST 


{{< stack type="wizard" >}}
 {{% wizardRow id="operating-system" %}}
  {{% wizardButton option="macOS" state="active" %}}
  {{% wizardButton option="Windows" %}}
  {{% wizardButton option="Debian" %}}
  {{% wizardButton option="Other Linux" %}}
 {{% /wizardRow %}}
 {{% wizardRow id="architecture" %}}
  {{% wizardButton option="ARM" %}}
  {{% wizardButton option="AMD" state="active" %}}
 {{% /wizardRow %}}
 {{% wizardRow id="install-method" %}}
  {{% wizardButton option="Brew" state="active"  %}}
  {{% wizardButton option="Binary" %}}
 {{% /wizardRow %}}

<!-- Results  -->
{{% wizardResults %}}
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
 
{{% wizardResult val1="operating-system/windows" val2="architecture/amd" val3="install-method/binary" %}}
 ```s
 curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_amd64.deb && sudo dpkg -i /tmp/pachctl.deb  
 ```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/windows" val2="architecture/arm" val3="install-method/binary" %}}
 ```s
 curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_arm64.deb && sudo dpkg -i /tmp/pachctl.deb  
 ```
{{% /wizardResult %}}

<!-- Linux  -->
{{% wizardResult val1="operating-system/debian" val2="architecture/arm" val3="install-method/brew" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/debian" val2="architecture/amd" val3="install-method/brew" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/debian" val2="architecture/amd" val3="install-method/binary" %}}
 ```s
  curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_amd64.deb && sudo dpkg -i /tmp/pachctl.deb  
 ```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/debian" val2="architecture/arm" val3="install-method/binary" %}}
 ```s
 curl -o /tmp/pachctl.deb -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_arm64.deb && sudo dpkg -i /tmp/pachctl.deb  
 ```
{{% /wizardResult %}}

<!-- Other Linux  -->
{{% wizardResult val1="operating-system/other-linux" val2="architecture/arm" val3="install-method/brew" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/other-linux" val2="architecture/amd" val3="install-method/brew" %}}
 ```s
 brew tap pachyderm/tap && brew install pachyderm/tap/pachctl@{{% majorMinorNumber %}}  
 ```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/other-linux" val2="architecture/amd" val3="install-method/binary" %}}
 ```s
  curl -o /tmp/pachctl.tar.gz -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_linux_amd64.tar.gz && tar -xvf /tmp/pachctl.tar.gz -C /tmp && sudo cp /tmp/pachctl_{{% latestPatchNumber %}}_linux_amd64/pachctl /usr/local/bin 
 ```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/other-linux" val2="architecture/arm" val3="install-method/binary" %}}
```s
curl -o /tmp/pachctl.tar.gz -L https://github.com/pachyderm/pachyderm/releases/download/v{{% latestPatchNumber %}}/pachctl_{{% latestPatchNumber %}}_linux_arm64.tar.gz && tar -xvf /tmp/pachctl.tar.gz -C /tmp && sudo cp /tmp/pachctl_{{% latestPatchNumber %}}_linux_arm64/pachctl /usr/local/bin 
```
{{% /wizardResult %}}

{{% /wizardResults %}}

{{< /stack >}}