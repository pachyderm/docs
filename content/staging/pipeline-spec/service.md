---
# metadata # 
title:  Service
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

{{% notice warning %}}
Service Pipelines are an [experimental feature](../../reference/supported-releases/#experimental).
{{% /notice %}}

`service` specifies that the pipeline should be treated as a long running
service rather than a data transformation. This means that `transform.cmd` is
not expected to exit, if it does it will be restarted. Furthermore, the service
is exposed outside the container using a Kubernetes service.
`"internal_port"` should be a port that the user code binds to inside the
container, `"external_port"` is the port on which it is exposed through the
`NodePorts` functionality of Kubernetes services. After a service has been
created, you should be able to access it at
`http://<kubernetes-host>:<external_port>`.

```s
{
    "service": {
      "internal_port": int,
      "external_port": int
    },
}
```