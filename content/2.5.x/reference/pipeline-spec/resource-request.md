---
# metadata # 
title:  Resource Requests
description: Set the exact amount of resources that a pipeline worker will consume.
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

## Spec

```s
{
    "resource_requests": {
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

## Behavior 

`resource_requests` describes the amount of resources that the pipeline
workers will consume. Knowing this in advance
enables Pachyderm to schedule big jobs on separate machines, so that they
do not conflict, slow down, or terminate.

This parameter is optional, and if you do not explicitly add it in
the pipeline spec, Pachyderm creates Kubernetes containers with the
following default resources: 

- The user and storage containers request 0 CPU, 0 disk space, and 64MB of memory.
- The init container requests the same amount of CPU, memory, and disk
space that is set for the user container.

The `resource_requests` parameter enables you to overwrite these default
values.

The `memory` field is a string that describes the amount of memory, in bytes,
that each worker needs. Allowed SI suffixes include M, K, G, Mi, Ki, Gi, and
other.

For example, a worker that needs to read a 1GB file into memory might set
`"memory": "1.2G"` with a little extra for the code to use in addition to the
file. Workers for this pipeline will be placed on machines with at least
1.2GB of free memory, and other large workers will be prevented from using it,
if they also set their `resource_requests`.

The `cpu` field is a number that describes the amount of CPU time in `cpu
seconds/real seconds` that each worker needs. Setting `"cpu": 0.5` indicates that
the worker should get 500ms of CPU time per second. Setting `"cpu": 2`
indicates that the worker gets 2000ms of CPU time per second. In other words,
it is using 2 CPUs, though worker threads might spend 500ms on four
physical CPUs instead of one second on two physical CPUs.

The `disk` field is a string that describes the amount of ephemeral disk space,
in bytes, that each worker needs. Allowed SI suffixes include M, K, G, Mi,
Ki, Gi, and other.

In both cases, the resource requests are not upper bounds. If the worker uses
more memory than it is requested, it does not mean that it will be shut down.
However, if the whole node runs out of memory, Kubernetes starts deleting
pods that have been placed on it and exceeded their memory request,
to reclaim memory.
To prevent deletion of your worker node, you must set your `memory` request to
a sufficiently large value. However, if the total memory requested by all
workers in the system is too large, Kubernetes cannot schedule new
workers because no machine has enough unclaimed memory. `cpu` works
similarly, but for CPU time.

For more information about resource requests and limits see the
[Kubernetes docs](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
on the subject.

## When to Use 