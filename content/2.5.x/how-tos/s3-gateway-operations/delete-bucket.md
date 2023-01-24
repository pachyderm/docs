---
# metadata # 
title:  Delete Empty S3 Bucket
description: Learn how to delete an empty S3 bucket through the S3 Gateway.
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

You can call the **delete an empty S3 bucket** command on your S3 client to delete a Pachyderm repository.  For example, let's delete the the repo `foo` in project `bar`.


{{<stack type="wizard" >}}

{{% wizardRow id="Tool" %}}
{{% wizardButton option="AWS S3 CLI" state="active" %}}
{{% wizardButton option="MinIO" %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="tool/aws-s3-cli" %}}

```s
aws --endpoint-url http://localhost:30600/ s3 rb s3://master.foo.bar

# remove_bucket: master.foo.bar
```
{{% /wizardResult %}}

{{% wizardResult val1="tool/minio" %}}

```s
mc rb local/master.foo.bar

# Removed `local/master.foo.bar` successfully.
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}

 