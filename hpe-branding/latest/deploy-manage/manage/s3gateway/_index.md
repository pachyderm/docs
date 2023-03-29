---
# metadata # 
title: S3 Gateway
description: Learn about MLDM's embedded S3 gateway, which is compatible with MinIO, AWS S3 CLI, and boto3. 
date: 
# taxonomy #
tags: 
series:
seriesPart:
---

Use the embedded S3 Gateway to send or receive data through the S3 protocol using object storage tooling such as Minio, boto3, or AWS s3 CLI. Operations available are similar to those [officially documented for S3](https://docs.aws.amazon.com/cli/latest/reference/s3/).


## S3 Gateway Syntax

The S3 gateway presents each branch from every MLDM repository as an S3 bucket. Buckets are represented via `[<commit>.]<branch>.<repo>.<project>`, with the commit being optional. 

- The `master.foo.bar` bucket corresponds to the `master` branch of the repo `foo` within the `bar` project.
- The `be97b64f110643389f171eb64697d4e1.master.foo.bar` bucket corresponds to the commit `be97b64f110643389f171eb64697d4e1` on the `master` branch of the `foo` repo within the `bar` project.

If [auth is enabled](../../../enterprise/auth/), credentials must be passed with
each S3 gateway endpoint as mentioned in the [**S3 Client configuration steps**](./configure-s3client/#set-your-credentials).

### Command Examples 

The following command examples assume that you have upgraded to use the [embedded proxy](../../deploy/deploy-w-proxy), which will become mandatory in future releases.

#### Put Data Into MLDM Repo

{{<stack type="wizard">}}

{{% wizardRow id="Tool"%}}
{{% wizardButton option="S3 Client" state="active" %}}
{{% wizardButton option="Pachctl CLI" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="tool/s3-client" %}}
```s
aws --endpoint-url <pachyderm-address> s3 cp myfile.csv s3://master.foo.bar
```
{{% /wizardResult %}}
{{% wizardResult val1="tool/pachctl-cli" %}}
```s
pachctl put file data@master:/ -f myfile.csv --project bar
```
{{% /wizardResult %}}

{{% /wizardResults%}}

{{</stack>}}

#### Retrieve Data From MLDM Repo

{{<stack type="wizard">}}

{{% wizardRow id="Tool"%}}
{{% wizardButton option="S3 Client" state="active" %}}
{{% wizardButton option="Pachctl CLI" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="tool/s3-client" %}}
```s
aws --endpoint-url <pachyderm-address> s3 cp s3://master.foo.bar/myfile.csv
```
{{% /wizardResult %}}
{{% wizardResult val1="tool/pachctl-cli" %}}
```s
pachctl get file data@master:/myfile.csv --project bar
```
{{% /wizardResult %}}

{{% /wizardResults%}}

{{</stack>}}


## Port Forwarding
You can  `pachctl port-forward` to access the s3 gateway through the `localhost:30600` endpoint, however, the Kubernetes port forwarder incurs substantial overhead and does not recover well from broken connections.


