---
# metadata # 
title:  Service PPS
description: Enable a pipeline to be treated as a long-running service.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart:
label: optional
---

{{% notice note %}}
For a single-page view of all PPS options, go to the [PPS series page](/series/pps).
{{% /notice %}}

## Spec 

```s

"service": {
  "internal_port": int,
  "external_port": int
},

```

### Attributes 

|Attribute|Description|
|-|-|
|`internal_port`| The port that the user code binds to inside the container. |
|`external_port`| The port on which it is exposed through the `NodePorts` functionality of Kubernetes services.|

## Behavior 

- When enabled, `transform.cmd` is not expected to exit and will restart if it does.
- The service becomes exposed outside the container using a Kubernetes service.
- You can access the service at `http://<kubernetes-host>:<external_port>`.

## When to Use

You should use the `service` field in a Pachyderm Pipeline Spec when you want to expose your pipeline as a Kubernetes service, and allow other Kubernetes services or external clients to connect to it.

Example scenarios: 

- **Microservices architecture**: If you are building a microservices architecture, you may want to expose individual pipelines as services that can be accessed by other services in the cluster. By using the service field to expose your pipeline as a Kubernetes service, you can easily connect it to other services in the cluster.

- **Client access**: If you want to allow external clients to access the output of your pipeline, you can use the service field to expose your pipeline as a Kubernetes service and provide clients with the service's IP address and `external_port`.

- **Load balancing**: By exposing your pipeline as a Kubernetes service, you can take advantage of Kubernetes' built-in load balancing capabilities. Kubernetes automatically load balances traffic to the service's IP address and `external_port` across all the replicas of the pipeline's container.