---
# metadata # 
title:  Write an S3 Object
description: Learn how to write an S3 object through the S3 Gateway.
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

You can write an S3 object to a MLDM repo within a project by performing the following commands: 

{{<stack type="wizard" >}}

{{% wizardRow id="Tool" %}}
{{% wizardButton option="AWS S3 CLI" state="active" %}}
{{% wizardButton option="MinIO" %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="tool/aws-s3-cli" %}}


1. Create the object: 
```s
aws --endpoint-url http://localhost:30600/ s3 cp test.csv s3://master.foo.bar

# upload: ./test.csv to s3://master.foo.bar/test.csv
```
2. Check that the object was added:
```s
aws --endpoint-url http://localhost:30600/ s3 ls s3://master.foo.bar/

# 2021-04-26 12:11:37  2685061 github_issues_medium.csv
# 2021-04-26 12:11:37  62 test.csv
```

{{% /wizardResult %}}

{{% wizardResult val1="tool/minio" %}}

1. Create the object: 
```s
mc cp test.csv local/master.foo.bar/test.csv

# test.csv:                  62 B / 62 B  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100.00% 206 B/s 0s

```
2. Check that the object was added:
   
```s
mc ls local/master.foo.bar

# [2021-04-26 12:11:37 PDT]  2.6MiB github_issues_medium.csv
# [2021-04-26 12:11:37 PDT]  62B test.csv
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}

 
{{% notice note %}}
Not all the repositories that you see in the results of the `ls` command are repositories that can be written to.  Some of them might be read-only.  Note that you should have writing access to the input repo in order to be able to add files to it.
{{% /notice %}}
