---
# metadata # 
title:  Sidecar Resource Limits PPS
description: Set the upper threshold of resources allocated to sidecar containers.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart: 
label: optional 

---

## Spec

```s

"sidecar_resource_limits": {
  "cpu": number,
  "memory": string,
  "gpu": {
    "type": string,
    "number": int
    }
  "disk": string,
},

```
## Attributes

| Attribute | Description   |
| - | - |
| `cpu`       | The maximum number of CPU cores that the sidecar container can use.                                                     |
| `memory`    | The maximum amount of memory that the sidecar container can use. This can be specified in bytes, or with a unit such as "Mi" or "Gi". |
| `gpu`       | An optional field that specifies the number and type of GPUs that the sidecar container can use.                          |
| `type`      | The type of GPU to use, such as "nvidia" or "amd".                                                                        |
| `number`    | The number of GPUs that the sidecar container can use.                                                                    |
| `disk`      | The maximum amount of disk space that the sidecar container can use. This can be specified in bytes, or with a unit such as "Mi" or "Gi". |


## Behavior 
The `sidecar_resource_limits` field in a Pachyderm Pipeline Spec is used to specify the resource limits for any sidecar containers that are run alongside the main pipeline container.

In a Pachyderm Pipeline, sidecar containers can be used to perform additional tasks alongside the main pipeline container, such as logging, monitoring, or handling external dependencies. By specifying resource limits for these sidecar containers, you can ensure that they don't consume too many resources and impact the performance of the main pipeline container.

This field can also be useful in deployments where Kubernetes automatically applies resource limits to containers, which might conflict with Pachyderm pipelines' resource requests. Such a deployment might fail if Pachyderm requests more than the default Kubernetes limit. The `sidecar_resource_limits` enables you to explicitly specify these resources to fix the issue.



## When to Use 

You should use the `sidecar_resource_limits` field in a Pachyderm Pipeline Spec when you have sidecar containers that perform additional tasks alongside the main pipeline container, and you want to set resource limits for those sidecar containers.

Example scenarios:

- **Logging**: If you have a sidecar container that is responsible for logging, you may want to limit its CPU and memory usage to prevent it from consuming too many resources and impacting the performance of the main pipeline container.

- **Monitoring**: If you have a sidecar container that is responsible for monitoring the pipeline, you may want to limit its CPU and memory usage to prevent it from competing with the main pipeline container for resources.

- **External dependencies**: If you have a sidecar container that provides external dependencies, such as a database, you may want to limit its CPU and memory usage to ensure that the main pipeline container has sufficient resources to perform its task.

