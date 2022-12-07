---
# metadata # 
title: Global S3 Gateway
description: Learn about Pachyderm's embedded S3 gateway, which is compatible with MinIO, AWS S3 CLI, and boto3. 
date: 
# taxonomy #
tags: 
series:
seriesPart:
---

Use the embedded S3 Gateway to send or receive data through the S3 protocol using object storage tooling such as Minio, boto3, or AWS s3 CLI. Operations available are similar to those [officially documented for S3](https://docs.aws.amazon.com/cli/latest/reference/s3/).


## Before You Start 

- You must [install and configure](./configure-s3client) the S3 client of your choice.

---

## S3 Gateway Syntax

The S3 gateway presents each branch from every Pachyderm repository as an S3 bucket. Buckets are represented via `<commit>.<branch>.<repo>.<project>` 

- The `master.foo.bar` bucket corresponds to the `master` branch of the repo `foo` within the `bar` project.
- The `be97b64f110643389f171eb64697d4e1.master.foo.bar` bucket corresponds to the commit `be97b64f110643389f171eb64697d4e1` on the `master` branch of the `foo` repo within the `bar` project.


## Command Examples 

### Put Data Into Pachyderm Repo

{{<stack type="wizard">}}

{{% wizardRow id="Tool"%}}
{{% wizardButton option="S3 Client" state="active" %}}
{{% wizardButton option="Pachctl CLI" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="tool/s3-client" %}}
```s
aws --endpoint-url <pachyderm-address>:30600/ s3 cp myfile.csv s3://master.foo.bar
```
{{% /wizardResult %}}
{{% wizardResult val1="tool/pachctl-cli" %}}
```s
pachctl put file data@master:/ -f myfile.csv --project bar
```
{{% /wizardResult %}}

{{% /wizardResults%}}

{{</stack>}}

### Retrieve Data From Pachyderm Repo

{{<stack type="wizard">}}

{{% wizardRow id="Tool"%}}
{{% wizardButton option="S3 Client" state="active" %}}
{{% wizardButton option="Pachctl CLI" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="tool/s3-client" %}}
```s
aws --endpoint-url <pachyderm-address>:30600/ s3 cp s3://master.foo.bar/myfile.csv
```
{{% /wizardResult %}}
{{% wizardResult val1="tool/pachctl-cli" %}}
```s
pachctl get file data@master:/myfile.csv --project bar
```
{{% /wizardResult %}}

{{% /wizardResults%}}

{{</stack>}}

{{% notice note %}}

View all [supported S3 commands](./supported-operations) and [unsupported commands](./unsupported-operations).

{{% /notice %}}


## Authentication Requirements

If [auth is enabled](../../../enterprise/auth/), credentials must be passed with
each S3 gateway endpoint as mentioned in the [**S3 Client configuration steps**](./configure-s3client/#set-your-credentials).

## Port Forwarding
You can  `pachctl port-forward` to access the s3 gateway through the `localhost:30600` endpoint, however, the Kubernetes port forwarder incurs substantial overhead and does not recover well from broken connections.

## Versioning
Most operations act on the `HEAD` of the given branch. However, if your object
store library or tool supports versioning, you can get objects in non-`HEAD`
commits by using the commit ID as the S3 object version ID or use the following syntax `--bucket <commit>.<branch>.<repo>.<project>`


### Example
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


