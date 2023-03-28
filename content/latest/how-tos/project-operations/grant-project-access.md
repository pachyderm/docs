---
# metadata #
title:  Grant Project Access
description: Learn how to grant a user access to a project in MLDM.
date:
# taxonomy #
tags: ["projects"]
series:
seriesPart:
weight: 4
---
**Cluster Admins** and **Project Owners** can grant or revoke user access to projects within a cluster (in addition to the individual resources within the project).  [View roles and permissions available](../enterprise/auth/authorization/permissions).

## How to Grant Project Access to a User

{{<stack type="wizard">}}
{{% wizardRow id="Tool"%}}
{{% wizardButton option="Pachctl CLI" state="active" %}}
{{% wizardButton option="Console" %}}
{{% /wizardRow %}}

{{% wizardResults  %}}

{{% wizardResult val1="tool/pachctl-cli"%}}
```s
pachctl auth set project foo repoReader,repoWriter user:edna
```
{{% /wizardResult %}}

{{% wizardResult val1="tool/console"%}}

1. Open the Console UI.
2. Navigate to the project you wish to grant user permissions to.
3. Select **Edit Project Permissions**.
4. Search for and select the user or user's group.
5. Choose which permissions to grant from the dropdown.
6. Select **Add**.

{{% /wizardResult %}}
{{% /wizardResults %}}
{{</stack>}}

## How to Check Project Access for a User

{{<stack type="wizard">}}
{{% wizardRow id="Tool"%}}
{{% wizardButton option="Pachctl CLI" state="active" %}}
{{% /wizardRow %}}

{{% wizardResults  %}}

{{% wizardResult val1="tool/pachctl-cli"%}}

```s
pachctl auth check project foo user:bob
```
{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack>}}
