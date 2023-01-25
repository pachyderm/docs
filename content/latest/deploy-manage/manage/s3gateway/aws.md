---
# metadata # 
title: AWS CLI
description: Learn how to configure AWS CLI for Pachyderm's S3 Gateway
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

## Before You Start
- You must have the [AWS CLI installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)


## Configuration Steps


1. Install the AWS CLI as described
in the [AWS documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

2. Verify that the AWS CLI is installed:

```s
aws --version
```
3. Configure AWS CLI. Use the `aws configure` command to configure your credentials file:
```s
aws configure --profile <name-your-profile>

# AWS Access Key ID: YOUR-PACHYDERM-AUTH-TOKEN
# AWS Secret Access Key: YOUR-PACHYDERM-AUTH-TOKEN
# Default region name:
# Default output format [None]:
```

{{% notice note %}}
Note that the `--profile` flag ([named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)) is optional. If not used, your access information will be stored in the default profile. 

To reference a given profile when using the S3 client, append `--profile <name-your-profile>` at the end of your command.
{{% /notice %}}

##  Verify Setup
To verify your setup, you can check the list of filesystem objects on the `master` branch of your repository.

```s
aws --endpoint-url http://<localhost_or_externalIP>:30600/ s3 ls s3://master.<repo>.<project>
```
