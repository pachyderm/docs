---
# metadata # 
title: Features Overview
description: Learn about the main features unique to Pachyderm's Enterprise edition.
date: 
# taxonomy #
tags: ["enterprise"]
series:
seriesPart:
directory: true 
---

Pachyderm Enterprise helps you scale and manage Pachyderm data pipelines by removing all [scaling limits](../../reference/scaling-limits/) and providing you with additional features not available in the Community Edition.

{{% notice note %}}
Want to try Pachyderm Enterprise, or simply have a few questions? Get in touch with us at [sales@pachyderm.io](mailto:sales@pachyderm.io) or on our [Slack](https://www.pachyderm.com/slack/). 
{{% /notice %}}


## Additional Features

- [**Authentication**](../auth/authentication/idp-dex): Authenticate against your favorite OIDC providers.
- [**Role-Based Access Control (RBAC)**](../auth/authorization/): Use RBAC on pachyderm resources (clusters, projects, repos), silo data, and prevent unintended changes on production pipelines.
- [**Enterprise Server**](../auth/enterprise-server/setup/): Simplify licensing and Identity Provider management by using one Enterprise server to register many Pachyderm clusters.
- Additionally, you have access to a pachctl command that [pauses (`pachctl enterprise pause`) and unpauses (`pachctl enterprise unpause`) your cluster](../../deploy-manage/manage/backup-restore) for a backup and restore.







