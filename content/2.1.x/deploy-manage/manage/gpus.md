---
# metadata # 
title:  Use GPUs
description: Learn how to access GPUs on a Kubernetes cluster for Pachyderm data transformations. 
date: 
# taxonomy #
tags: ["management", "deployment"]
series:
seriesPart:
--- 

- To install Pachyderm on an **NVIDIA DGX A100** box, skip to [Pachyderm on NVIDIA DGX A100](#pachyderm-on-nvidia-dgx-a100).
- If you already have a GPU enabled Kubernetes cluster,
skip to [Configure GPUs in Pipelines](#configure-gpus-in-pipelines).
- Otherwise, read the following section.
## Set up a GPU enabled Kubernetes Cluster

Pachyderm leverages [Kubernetes Device Plugins](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/) to let Kubernetes Pods access specialized hardware such as GPUs.
For instructions on how to set up a GPU-enabled Kubernetes cluster
through device plugins, see the [Kubernetes documentation](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/).

## Pachyderm on NVIDIA DGX A100

Let’s walk through the main steps allowing Pachyderm to leverage the AI performance of your [DGX A100](https://www.nvidia.com/en-in/data-center/dgx-a100/) GPUs.

{{% notice info %}}
Read about NVIDIA DGX A100's full [userguide](https://docs.nvidia.com/dgx/pdf/dgxa100-user-guide.pdf).
{{% /notice %}}

{{% notice note %}}
TL;DR

Support for scheduling GPU workloads in Kubernetes requires a fair amount of trial and effort. To ease the process:

- This [setup page](https://docs.nvidia.com/datacenter/cloud-native/kubernetes/install-k8s.html) will **walk you through very detailed installation steps** to prepare your Kubernetes cluster.
- Take advantage of a user's past experience in [this blog](https://discuss.kubernetes.io/t/my-adventures-with-microk8s-to-enable-gpu-and-use-mig-on-a-dgx-a100/15366).
{{% /notice %}}

Here is a quick recap of what will be needed:

- Have a working Kubernetes control plane and worker nodes attached to your cluster. 
- Install the DGX system in a hosting environment.
- Add the DGX to your K8s API server as a worker node.

Now that the DGX is added to your API server, you can then proceed to:
 
1. Enable the GPU worker node in the Kubernetes cluster by installing [NVIDIA's dependencies](https://docs.nvidia.com/datacenter/cloud-native/kubernetes/install-k8s.html#install-nvidia-dependencies):

 Dependencies packages and deployment methods may vary. The following list is not exhaustive and is intended to serve as a general guideline.

 - **NVIDIA drivers**

     For complete instructions on setting up NVIDIA drivers, visit this [quickstart guide](https://docs.nvidia.com/datacenter/tesla/tesla-installation-notes/index.html) or check this [summary of the steps](https://docs.nvidia.com/datacenter/cloud-native/kubernetes/install-k8s.html#install-nvidia-drivers). 

 - **NVIDIA [Container Toolkit (nvidia-docker2)](https://docs.nvidia.com/datacenter/cloud-native/kubernetes/install-k8s.html#install-nvidia-container-toolkit-nvidia-docker2)**

     You may need to use different packages depending on your container engine.
   
 - **NVIDIA Kubernetes Device Plugin**

     To use GPUs in Kubernetes, the [NVIDIA Device Plugin](https://github.com/NVIDIA/k8s-device-plugin/) is required. The NVIDIA Device Plugin is a daemonset that enumerates the number of GPUs on each node of the cluster and allows pods to be run on GPUs. Follow those [steps](https://docs.nvidia.com/datacenter/cloud-native/kubernetes/install-k8s.html#install-nvidia-device-plugin) to deploy the device plugin as a daemonset using helm. 

 Checkpoint: Run [NVIDIA System Management Interface](https://developer.nvidia.com/nvidia-system-management-interface#:~:text=The%20NVIDIA%20System%20Management%20Interface,monitoring%20of%20NVIDIA%20GPU%20devices.&text=Nvidia-smi%20can%20report%20query,standard%20output%20or%20a%20file.) (nvidia-smi) on the CLI. It should return the list of NVIDIA GPUs.

1. Test a sample container with GPU:

 To test whether CUDA jobs can be deployed, run a sample CUDA (vectorAdd) application.

 For reference, find the pod spec below:

 ```yaml
 apiVersion: v1
 kind: Pod
 metadata:
   name: gpu-test
 spec:
   restartPolicy: OnFailure
   containers:
   - name: cuda-vector-add
     image: "nvidia/samples:vectoradd-cuda10.2"
     resources:
       limits:
         nvidia.com/gpu: 1
 ```

 Save it as gpu-pod.yaml then deploy the application:
 ```shell
 kubectl apply -f gpu-pod.yaml
 ```
 Check the logs to make sure that the app completed successfully:
 ```shell
 kubectl get pods gpu-test
 ```

1. If the container above is scheduled successfully: install Pachyderm. You are ready to [start leveraging NVIDIA's GPUs in your Pachyderm pipelines](#configure-gpus-in-pipelines).

{{% notice note %}}
Note that you have the option to use GPUs for compute-intensive workloads on:

- [Google Container Engine (GKE)](https://cloud.google.com/kubernetes-engine/docs/how-to/gpus).
- [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/blogs/containers/utilizing-nvidia-multi-instance-gpu-mig-in-amazon-ec2-p4d-instances-on-amazon-elastic-kubernetes-service-eks/).
- [Azure Kubermnetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/gpu-cluster).
{{% /notice %}}

## Configure GPUs in Pipelines

Once your GPU-enabled Kubernetes cluster is set, 
you can request a GPU tier in your pipeline specifications
by [setting up GPU resource limits](../../../reference/pipeline-spec/#resource-requests-optional), along with its type and number of GPUs. 

{{% notice note %}}
By default, Pachyderm workers are spun up and wait for new input. That works great for pipelines that are processing a lot of new incoming commits. However, for lower volume of input commits, you could have your pipeline workers 'taking' the GPU resource as far as k8s is concerned, but 'idling' as far as you are concerned. 

- Make sure to set the `autoscaling` field to `true` so that if your pipeline is not getting used, the worker pods get spun down and the GPU resource freed.
- Additionally, specify how much of GPU your pipeline worker will need via the `resource_requests` fields in your [pipeline specification](../../../reference/pipeline-spec/#resource-requests-optional) with `ressource_requests` <= `resource_limits`.
{{% /notice %}}

Below is an example of a pipeline spec for a GPU-enabled pipeline from our [market sentiment analysis example](https://github.com/pachyderm/examples/tree/master/market-sentiment):

```yaml
{{ gitsnippet('pachyderm/examples', 'market-sentiment/pachyderm/train_model.json') }}
```


