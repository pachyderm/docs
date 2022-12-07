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

1. Install the AWS CLI as described
in the [AWS documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

1. Verify that the AWS CLI is installed:

      ```s
      aws --version
      ```

1. Configure AWS CLI. Use the `aws configure` command to configure your credentials file:
      ```s
      aws configure --profile <name-your-profile>
      ```
      Both the access key and secret key 
      should be set as mentioned in the [# Set Your Credentails](#set-your-credentials) section of this page.

      **System Response:**
      ```
      AWS Access Key ID: YOUR-PACHYDERM-AUTH-TOKEN
      AWS Secret Access Key: YOUR-PACHYDERM-AUTH-TOKEN
      Default region name:
      Default output format [None]:
      ```
{{% notice note %}}
Note that the `--profile` flag ([named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)) is optional. If not used, your access information will be stored in the default profile. 

To reference a given profile when using the S3 client, append `--profile <name-your-profile>` at the end of your command.
{{% /notice %}}

###  Example
 Check the list of filesystem objects on the `master` branch of the repository `raw_data`.

```s
aws --endpoint-url http://<localhost_or_externalIP>:30600/ s3 ls s3://master.raw_data
```

{{% notice info %}}
Find **AWS S3 CLI** full documentation [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html).
{{% /notice %}}