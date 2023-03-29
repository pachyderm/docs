---
# metadata # 
title:  List S3 Objects
description: Learn how to list S3 objects through the S3 Gateway.
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

You can list the contents of a given MLDM repository using the following commands.

{{<stack type="wizard" >}}

{{% wizardRow id="Tool" %}}
{{% wizardButton option="AWS S3 CLI" state="active" %}}
{{% wizardButton option="MinIO" %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="tool/aws-s3-cli" %}}

```s
aws --endpoint-url http://localhost:30600/ s3 ls s3://master.raw_data.myproject

# 2021-04-26  11:22:23    2685061 github_issues_medium.csv
```

{{% /wizardResult %}}

{{% wizardResult val1="tool/minio" %}}

```s
mc ls local/master.raw_data.myproject

# [2021-04-26 12:11:37 PDT]  2.6MiB github_issues_medium.csv
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}

 