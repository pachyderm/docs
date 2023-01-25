---
# metadata # 
title:  Service PPS
description: Enable a pipeline to be treated as a long-running service.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series:
seriesPart:
label: optional
---

## Spec 

```s
{
    "service": {
      "internal_port": int,
      "external_port": int
    },
}
```

## Behavior 

- When enabled, `transform.cmd` is not expected to exit and will restart if it does.
- The service becomes exposed outside the container using a Kubernetes service.
- You can access the service at `http://<kubernetes-host>:<external_port>`.

### Attributes 

|Attribute|Description|
|-|-|
|`internal_port`| The port that the user code binds to inside the container. |
|`external_port`| The port on which it is exposed through the `NodePorts` functionality of Kubernetes services.|
