---
# metadata # 
title:  Transform PPS
description: Set the name of the Docker image that your jobs use.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series:
seriesPart:
label: required 
---

## Spec 

```s
{
    "transform": {
    "image": string,
    "cmd": [ string ],
    "err_cmd": [ string ],
    "env": {
        string: string
    },

      "secrets": [ {
          "name": string,
          "mount_path": string
      },
      {
          "name": string,
          "env_var": string,
          "key": string
      } ],
      "image_pull_secrets": [ string ],
      "stdin": [ string ],
      "err_stdin": [ string ],
      "accept_return_code": [ int ],
      "debug": bool,
      "user": string,
      "working_dir": string,
      "dockerfile": string,
      "memory_volume": bool,
    },
}
```

## Attributes

|Attribute|Description|
|-|-|
|cmd| Passes a command to the Docker run invocation.|
|stdin| Passes an array of lines to your command on `stdin`.|
|err_cmd| Passes a command executed on failed datums.|
|err_stdin| Passes an array of lines to your error command on `stdin`.|
|env| Enables a key-value map of [environment variables](../../deploy-manage/deploy/environment-variables/) that Pachyderm injects into the container. |
|secrets| Passes an array of secrets to embed sensitive data. |
|image_pull_secrets| Passes an array of secrets that are mounted before the containers are created.|
|accept_return_code| Passes an array of return codes that are considered acceptable when your Docker command exits.|
|debug| Enables debug logging for the pipeline|
|user| Sets the user that your code runs as.|
|working_dir| Sets the directory that your command runs from.|
|memory_volume| Sets pachyderm-worker's `emptyDir.Medium` to `Memory`, allowing Kubernetes to mount a memory-backed volume (`tmpfs`).|


## Behavior 

- `cmd` is not run inside a shell which means that wildcard globbing (`*`), pipes (`|`), and file redirects (`>` and `>>`) do not work. To specify these settings, you can set `cmd` to be a shell of your choice, such as `sh` and pass a shell script to `stdin`.
-  `err_cmd` can be used to ignore failed datums while still writing successful datums to the output repo, instead of failing the whole job when some datums fail. The `transform.err_cmd` command has the same limitations as `transform.cmd`.
-  `stdin` lines do not have to end in newline characters.
-  The following environment variables are automatically injected into the container:
   * `PACH_JOB_ID` – the ID of the current job.
   * `PACH_OUTPUT_COMMIT_ID` – the ID of the commit in the output repo for 
   the current job.
   * `<input>_COMMIT` - the ID of the input commit. For example, if your
   input is the `images` repo, this will be `images_COMMIT`.
- `secrets` reference Kubernetes secrets by name and specify a path to map the secrets or
an environment variable (`env_var`) that the value should be bound to.
-  `0` is always considered a successful exit code.
-  `tmpfs` is cleared on node reboot and any files you write count against your container's memory limit. This may be useful for workloads that are IO heavy or use memory caches.


## When to Use 

You must always use the transform attribute when making a pipeline. 