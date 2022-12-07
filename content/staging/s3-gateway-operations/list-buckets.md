---
# metadata # 
title:  List S3 Buckets
description: Learn how to list S3 buckets through the S3 Gateway.
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 
 
You can check the list of filesystem objects in your Pachyderm repository by running an S3 client `ls` command.

{{<stack type="wizard" >}}

{{% wizardRow id="Tool" %}}
{{% wizardButton option="AWS S3 CLI" state="active" %}}
{{% wizardButton option="MinIO" %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="tool/aws-s3-cli" %}}

 ```s
aws --endpoint-url http://localhost:30600 s3 ls

# 2021-04-26 15:09:50 master.train.myproject
# 2021-04-26 14:58:50 master.pre_process.myproject
# 2021-04-26 14:58:09 master.split.myproject
# 2021-04-26 14:58:09 stats.split.myproject
```

{{% /wizardResult %}}

{{% wizardResult val1="tool/minio" %}}


```s
mc ls local

# [2021-04-26 15:09:50 PDT]      0B master.train.myproject/
# [2021-04-26 14:58:50 PDT]      0B master.pre_process.myproject/
# [2021-04-26 14:58:09 PDT]      0B master.split.myproject/
# [2021-04-26 14:58:09 PDT]      0B stats.split.myproject/
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}

 