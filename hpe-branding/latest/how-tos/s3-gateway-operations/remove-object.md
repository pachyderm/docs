---
# metadata # 
title:  Delete an S3 Object
description: Learn how to delete an S3 object through the S3 Gateway.
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

You can call the **delete an S3 Object** command on your S3 client to delete a file from a MLDM repository.  For example, let's delete the file `test.csv` from the `master` branch of the `foo` repo within the `bar` project.

{{<stack type="wizard" >}}

{{% wizardRow id="Tool" %}}
{{% wizardButton option="AWS S3 CLI" state="active" %}}
{{% wizardButton option="MinIO" %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="tool/aws-s3-cli" %}}

```s
aws --endpoint-url http://localhost:30600/ s3 rm s3://master.foo.bar/test.csv

# delete: s3://master.foo.bar/test.csv
```

{{% /wizardResult %}}

{{% wizardResult val1="tool/minio" %}}

```s
mc rm local/master.foo.bar/test.csv

# Removing `local/master.foo.bar/test.csv`.
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}

 