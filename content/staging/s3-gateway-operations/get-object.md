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
You can call the **get an S3 object** command on your S3 client to download a file by specifying the `branch.repo.project` it lives in.  For example, let's get the `test.csv` file from `master.foo.bar`.

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
mc cp local/master.foo.bar/test.csv .

# test.csv:  2.56 MiB / 2.56 MiB  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100.00% 1.26 MiB/s 2s
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}

 
 ## Versioning
Most operations act on the `HEAD` of the given branch. However, if your object
store library or tool supports versioning, you can get objects in non-`HEAD`
commits by using the commit ID as the S3 object version ID or use the following syntax `--bucket <commit>.<branch>.<repo>.<project>`

To retrieve the file `file.txt` in the commit `a5984442ce6b4b998879513ff3da17da` on the master branch of the repo `foo` in project `bar`:


{{< stack type="wizard" >}}
{{% wizardRow id="Get Object By" %}}
{{% wizardButton option="path" state="active" %}}
{{% wizardButton option="id" %}}
{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="get-object-by/path" %}}

```s
aws s3api get-object --bucket a5984442ce6b4b998879513ff3da17da.master.foo.bar  --profile gcp-pf --endpoint http://localhost:30600 --key file.txt export.txt
```
{{% /wizardResult %}}

{{% wizardResult val1="get-object-by/id" %}}
```s
aws s3api get-object --bucket master.foo.bar --profile gcp-pf --endpoint http://localhost:30600 --key file.txt --version-id a5984442ce6b4b998879513ff3da17da export.txt
```
```s
{
    "AcceptRanges": "bytes",
    "LastModified": "2021-06-03T01:31:36+00:00",
    "ContentLength": 5,
    "ETag": "\"b5fdc0b3557bd4de47045f9c69fa8e54102bcecc36f8743ab88df90f727ff899\"",
    "VersionId": "a5984442ce6b4b998879513ff3da17da",
    "ContentType": "text/plain; charset=utf-8",
    "Metadata": {}
}
```
{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}