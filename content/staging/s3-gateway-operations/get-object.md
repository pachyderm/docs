---
# metadata # 
title:  Get an S3 Object
description: Learn how to get an S3 object through the S3 Gateway.
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

You can download a file by specifying the `branch.repo.project` it lives in:

{{<stack type="wizard" >}}

{{% wizardRow id="Tool" %}}
{{% wizardButton option="AWS S3 CLI" state="active" %}}
{{% wizardButton option="MinIO" %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="tool/aws-s3-cli" %}}

```s
aws --endpoint-url http://localhost:30600/ s3 cp s3://master.foo.bar/test.csv .

# download: s3://master.foo.bar/test.csv to ./test.csv
```

{{% /wizardResult %}}

{{% wizardResult val1="tool/minio" %}}

```s
mc cp local/master.foo.bar/github_issues_medium.csv .

# github_issues_medium.csv:  2.56 MiB / 2.56 MiB  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100.00% 1.26 MiB/s 2s
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}

 