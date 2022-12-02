---
# metadata # 
title:  Grant Project Access
description: Learn how to gran a user access to a project in Pachyderm.
date: 
# taxonomy #
tags: ["projects"]
series:
seriesPart:
weight: 4
---
**Cluster Admins** and **Project Owners** can grant or revoke user access to projects within a cluster (in addition to the individual resources within the project). 

## How to Grant Project Access to a User
For a list of roles and permissions available, [see this article](../enterprise/auth/authorization/permisisons).

```s
pachctl auth set project foo repoReader,repoWriter user:edna
```