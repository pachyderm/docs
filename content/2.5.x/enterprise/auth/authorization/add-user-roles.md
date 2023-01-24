---
# metadata # 
title: Add Roles to User
description: Learn how to grant and modify permissions on given resources for a user.
date: 
# taxonomy #
tags: ["permissions", "management"]
series:
seriesPart:
weight: 1
---

## Before You Start 

- Review the permissions assigned to each role.
- Confirm you have the right role(s) to grant a user access to a given resource.
- This guide assumes resources (projects, repositories) have already been created in your cluster.

## How to Assign Roles to a User 

1. Open your terminal.
2. Connect as the root user using the following command:
```s
pachctl auth use-auth-token
```
3. Input your root token. 

4. Run one of the following commands to assign a role:

{{< stack type="wizard" >}}
{{% wizardRow id="Resource Type" %}}
{{% wizardButton option="Project" state="active" %}}
{{% wizardButton option="Repo" %}}
{{% wizardButton option="Other" %}}
{{% wizardButton option="All" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="resource-type/project" %}}
```s
pachctl auth set project <project-name> <role-name> user:<username@email.com>
```
{{% /wizardResult %}}

{{% wizardResult val1="resource-type/repo" %}}
```s
pachctl auth set repo <repo-name> <role-name> user:<username@email.com>
```
{{% /wizardResult %}}

{{% wizardResult val1="resource-type/all" %}}
```s
pachctl auth set enterprise clusterAdmin user:<email>
```
{{% /wizardResult %}}

{{% wizardResult val1="resource-type/other" %}}
```s
pachctl auth set <resource> <resource-name> [role1,role2 | none ] <prefix:subject>
```
{{% /wizardResult %}}
{{% /wizardResults %}}
{{</stack >}}

1. Confirm access by running the following command:

{{< stack type="wizard" >}}
{{% wizardRow id="Resource Type" %}}
{{% wizardButton option="Project" state="active" %}}
{{% wizardButton option="Repo" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="resource-type/project" %}}
```s
pachctl auth get project <project-name>
```
{{% /wizardResult %}}

{{% wizardResult val1="resource-type/repo" %}}
```s
pachctl auth get repo <repo-name>
```
{{% /wizardResult %}}

{{% /wizardResults %}}
{{</stack >}}

You can also use these steps to update a users permissions.
 