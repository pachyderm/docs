---
# metadata # 
title:  s3 Out
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

`s3_out` allows your pipeline code to write results out to an S3 gateway
endpoint instead of the typical `pfs/out` directory. When this parameter
is set to `true`, Pachyderm includes a sidecar S3 gateway instance
container in the same pod as the pipeline container. The address of the
output repository will be `s3://<output_repo>`. 

If you want to expose an input repository through an S3 gateway, see
`input.pfs.s3` in [PFS Input](#pfs-input). 

{{% notice note %}}
**See Also**: [Environment Variables](../../deploy-manage/deploy/environment-variables/)
{{% /notice %}}

```s
{
    "s3_out": bool,
}
```