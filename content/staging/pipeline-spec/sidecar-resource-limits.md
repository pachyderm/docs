---
# metadata # 
title:  Sidecar Resource Limits
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional 

---
`sidecar_resource_limits` determines the upper threshold of resources
allocated to the sidecar containers.

This field can be useful in deployments where Kubernetes automatically
applies resource limits to containers, which might conflict with Pachyderm
pipelines' resource requests. Such a deployment might fail if Pachyderm
requests more than the default Kubernetes limit. The `sidecar_resource_limits`
enables you to explicitly specify these resources to fix the issue.

```s
{
  "sidecar_resource_limits": {
  "cpu": number,
  "memory": string,
  "gpu": {
    "type": string,
    "number": int
    }
  "disk": string,
  },
}
```