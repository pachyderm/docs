---
# metadata # 
title: Credentials
description: Learn how to configure an S3 client.
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

## Before You Start 

- You must configure an S3 Client (Boto3, AWS, MinIO)
- You must have [authentication](../../../../enterprise/auth/) enabled.


## How to Set Your Credentials

1. Run the following command: 

```s
more ~/.pachyderm/config.json
```
2. Search for your session token: `"session_token": "your-session-token-value"`.
3. Make sure to fill both fields `Access Key ID` and `Secret Access Key` with that same value.

## Robot Users
Depending on your use case, it might make sense to pass the credentials of a robot-user or another type of user altogether. Refer to the [authentication section of the documentation](../../../../enterprise/auth/authorization/) for more RBAC information.

