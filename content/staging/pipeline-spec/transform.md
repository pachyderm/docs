---
# metadata # 
title:  Transform
description: Set the name of the Docker image that your jobs use.
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: required 
weight: 1
---




`transform.cmd` is the command passed to the Docker run invocation. Similarly
to Docker, `cmd` is not run inside a shell which means that
wildcard globbing (`*`), pipes (`|`), and file redirects (`>` and `>>`) do
not work. To specify these settings, you can set `cmd` to be a shell of your
choice, such as `sh` and pass a shell script to `stdin`.

`transform.stdin` is an array of lines that are sent to your command on
`stdin`.
Lines do not have to end in newline characters.

`transform.err_cmd` is an optional command that is executed on failed datums.
If the `err_cmd` is successful and returns 0 error code, it does not prevent
the job from succeeding.
This behavior means that `transform.err_cmd` can be used to ignore
failed datums while still writing successful datums to the output repo,
instead of failing the whole job when some datums fail. The `transform.err_cmd`
command has the same limitations as `transform.cmd`.

`transform.err_stdin` is an array of lines that are sent to your error command
on `stdin`.
Lines do not have to end in newline characters.

`transform.env` is a key-value map of environment variables that
Pachyderm injects into the container. There are also environment variables
that are automatically injected into the container, such as:

* `PACH_JOB_ID` – the ID of the current job.
* `PACH_OUTPUT_COMMIT_ID` – the ID of the commit in the output repo for 
the current job.
* `<input>_COMMIT` - the ID of the input commit. For example, if your
input is the `images` repo, this will be `images_COMMIT`.

For a complete list of variables and
descriptions see: [Configure Environment Variables](../../deploy-manage/deploy/environment-variables/).

`transform.secrets` is an array of secrets. You can use the secrets to
embed sensitive data, such as credentials. The secrets reference
Kubernetes secrets by name and specify a path to map the secrets or
an environment variable (`env_var`) that the value should be bound to. Secrets
must set `name` which should be the name of a secret in Kubernetes. Secrets
must also specify either `mount_path` or `env_var` and `key`. See more
information about Kubernetes secrets [here](https://kubernetes.io/docs/concepts/configuration/secret/).

`transform.image_pull_secrets` is an array of image pull secrets, image pull
secrets are similar to secrets except that they are mounted before the
containers are created so they can be used to provide credentials for image
pulling. For example, if you are using a private Docker registry for your
images, you can specify it by running the following command:

```s
kubectl create secret docker-registry myregistrykey --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL
```

And then, notify your pipeline about it by using
`"image_pull_secrets": [ "myregistrykey" ]`. Read more about image pull secrets
[here](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod).

`transform.accept_return_code` is an array of return codes, such as exit codes
from your Docker command that are considered acceptable.
If your Docker command exits with one of the codes in this array, it is
considered a successful run to set job status. `0`
is always considered a successful exit code.

`transform.debug` turns on added debug logging for the pipeline.

`transform.user` sets the user that your code runs as, this can also be
accomplished with a `USER` directive in your `Dockerfile`.

`transform.working_dir` sets the directory that your command runs from. You
can also specify the `WORKDIR` directive in your `Dockerfile`.

`transform.memory_volume` sets pachyderm-worker's `emptyDir.Medium` to `Memory`, allowing Kubernetes to mount a memory-backed volume. Depending on your environment, `emptyDir` volumes are stored on the medium that backs the node (such as disk, SSD, or network storage). However, if you set the `emptyDir.medium` field to `Memory`, Kubernetes mounts a `tmpfs` (RAM-backed filesystem) for you instead. 

{{% notice tip %}}
While `tmpfs` is very fast, be aware that unlike disks, `tmpfs` is cleared on node reboot and any files you write count against your container's memory limit. This may be useful for workloads that are IO heavy or use memory caches.
{{% /notice %}}

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

## Behavior 

## When to Use 