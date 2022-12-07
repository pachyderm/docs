---
# metadata # 
title: MinIO 
description: Learn how to configure MinIO for Pachyderm's S3 Gateway
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

1. Install the MinIO client as described on the [MinIO download page](https://min.io/download).
1. Verify that MinIO components are successfully installed by running
the following command:

   ```s
   minio version
   mc version
   ```
   **System Response:**
   ```
   Version: 2019-07-11T19:31:28Z
   Release-tag: RELEASE.2019-07-11T19-31-28Z
   Commit-id: 31e5ac02bdbdbaf20a87683925041f406307cfb9
   ```
1. Set up the MinIO configuration file to use the S3 Gateway port `30600` for your host:

   ```s
   vi ~/.mc/config.json
   ```
   You should see a configuration similar to the following.
   For a minikube deployment, verify the
   `local` configuration:
   ```
   "local": {
               "url": "http://localhost:30600",
               "accessKey": "YOUR-PACHYDERM-AUTH-TOKEN",
               "secretKey": "YOUR-PACHYDERM-AUTH-TOKEN",
               "api": "S3v4",
               "lookup": "auto"
            },
      ```

   Both the access key and secret key 
   should be set as mentioned in the [# Set Your Credentails](#set-your-credentials) section of this page. 

### Example 
Check the list of filesystem objects on the `master` branch of the repository `raw_data`.

```s
mc ls local/master.raw_data
```

{{% notice info %}}
Find **MinIO** full documentation [here](https://docs.min.io/docs/minio-client-complete-guide).
{{% /notice %}}