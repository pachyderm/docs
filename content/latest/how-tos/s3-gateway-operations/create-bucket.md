---
# metadata # 
title:  Create S3 Bucket
description: Learn how to create an S3 bucket through the S3 Gateway.
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 
 
Call the **create an S3 bucket** command on your S3 client to create a branch in a Pachyderm repository. For example, let's create the `master` branch of the repo `foo` in project `bar`.

{{<stack type="wizard" >}}

{{% wizardRow id="Tool" %}}
{{% wizardButton option="AWS S3 CLI" state="active" %}}
{{% wizardButton option="MinIO" %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="tool/aws-s3-cli" %}}

1. Create a bucket named `foo` in project `bar`.
```s
aws --endpoint-url http://localhost:30600/ s3 mb s3://master.foo.bar

# make_bucket: master.foo.bar
```
2. verify that the S3 bucket has been created:
```s
aws --endpoint-url http://localhost:30600/ s3 ls

# 2022-12-7 22:46:08 master.foo.bar
```

{{% /wizardResult %}}

{{% wizardResult val1="tool/minio" %}}

1. Create a bucket named `foo` in project `bar`.
```s
mc mb local/master.foo.bar

# Bucket created successfully `local/master.foo.bar`.
```

2. Verify that the S3 bucket has been created:
```s
mc ls local

# [2021-04-26 22:46:08]   0B master.foo.bar/
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}

 

 