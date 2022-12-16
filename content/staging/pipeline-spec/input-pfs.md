---
# metadata # 
title:  Input PFS
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---


`input.pfs.name` is the name of the input. An input with the name `XXX` is
visible under the path `/pfs/XXX` when a job runs. Input names must be unique
if the inputs are crossed, but they may be duplicated between `PFSInput`s that
are combined by using the `union` operator. This is because when
`PFSInput`s are combined, you only ever see a datum from one input
at a time. Overlapping the names of combined inputs allows
you to write simpler code since you no longer need to consider which
input directory a particular datum comes from. If an input's name is not
specified, it defaults to the name of the repo. Therefore, if you have two
crossed inputs from the same repo, you must give at least one of them a
unique name.

`input.pfs.repo` is the name of the Pachyderm repository with the data that
you want to join with other data.

`input.pfs.branch` is the `branch` to watch for commits. If left blank,
Pachyderm sets this value to `master`.

`input.pfs.glob` is a glob pattern that is used to determine how the
input data is partitioned.

`input.pfs.lazy` controls how the data is exposed to jobs. The default is
`false` which means the job eagerly downloads the data it needs to process and
exposes it as normal files on disk. If lazy is set to `true`, data is
exposed as named pipes instead, and no data is downloaded until the job
opens the pipe and reads it. If the pipe is never opened, then no data is
downloaded.

Some applications do not work with pipes. For example, pipes do not support
applications that makes `syscalls` such as `Seek`. Applications that can work
with pipes must use them since they are more performant. The difference will
be especially notable if the job only reads a subset of the files that are
available to it.

{{% notice note %}}
`lazy` does not support datums that contain more than 10000 files.
{{% /notice %}}

`input.pfs.empty_files` controls how files are exposed to jobs. If
set to `true`, it causes files from this PFS to be presented as empty files.
This is useful in shuffle pipelines where you want to read the names of
files and reorganize them by using symlinks.

`input.pfs.s3` sets whether the sidecar in the pipeline worker pod
should include a sidecar S3 gateway instance. This option enables an S3 gateway
to serve on a pipeline-level basis and, therefore, ensure provenance tracking
for pipelines that integrate with external systems, such as Kubeflow. When
this option is set to `true`, Pachyderm deploys an S3 gateway instance
alongside the pipeline container and creates an S3 bucket for the pipeline
input repo. The address of the
input repository will be `s3://<input_repo>`. When you enable this
parameter, you cannot use glob patterns. All files will be processed
as one datum.

Another limitation for S3-enabled pipelines is that you can only use
either a single input or a cross input. Join and union inputs are not
supported.

If you want to expose an output repository through an S3
gateway, see [S3 Output Repository](#s3-output-repository).

`input.pfs.trigger`
Specifies a trigger that must be met for the pipeline to trigger on this input.
To learn more about triggers read the
[deferred process docs](../../concepts/advanced-concepts/deferred-processing).

```s
{
    "input": {
    "pfs": {
        "project": string,
        "name": string,
        "repo": string,
        "repo_type":string,
        "branch": string,
        "commit":string,
        "glob": string,
        "join_on":string,
        "outer_join": bool,
        "group_by": string,
        "lazy" bool,
        "empty_files": bool,
        "s3": bool,
        "trigger": {
            "branch": string,
            "all": bool,
            "cron_spec": string,
            },
        }
    }
}
```