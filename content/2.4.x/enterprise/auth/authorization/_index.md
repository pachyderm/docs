---
# metadata # 
title:  Authorization
description: Learn how to set up and manage Role-Based Access Control (RBAC) for Pachyderm.
date: 
# taxonomy #
tags: 
series:
seriesPart:
---

You can use Pachyderm's Role-Based Access Control (RBAC) model to configure authorization for your users. Users can be assigned roles that grant certain permissions for interacting with Pachyderm's resources. 


## Users Types
Pachyderm has 5 user types:

|User Type| Description|
|-|-|
[`clusterAdmin`](#role-types)
|IdP User| Any user or group of users authenticated by your Identity Provider to access Pachyderm.|
|Robot User|A Service account used for third party applications/systems integrating with Pachyderm APIs/Clients.|
|Pipeline User| An internal Service Account used for Pipelines when interacting with Pachyderm resources.|
|All Cluster Users|A general subject that represents **everyone who has logged in to a cluster**.|

  Pachyderm defines 4 prefixes depending on the type of user:

  - robot
  - user
  - group
  - pipeline (as mentioned above, this prefix will not be used in the context of granting privileges to users. However, it does exist. We are listing it here to give an exhauxtive list of all prefixes.)

  Aditionnally, the "everyone" user `allClusterUsers` has no specific prefix. See the example below to learn how to assign repoReader access to `allClusterUsers` on a repo.

## Resource Types
Pachyderm has 3 resource types:

|Resource Type| Description|
|-|-|
|Cluster| A set of nodes for running containerized applications. Containers allow users to run repeatable and standardized code. |
|Project| A project is a container of 1 or more DAGs that allows for users to organize their repos. Projects allow multiple teams to work in a cluster.|
|Repo| A repository is where data is stored and contains both files and folders. Repos tracks all changes to the data and creates a history of data changes.|

## Role Types 
Pachyderm has 3 role  types:

|Role Type| Description|
|-|-|
|Cluster Roles| Granted at the cluster level.|
|Project Roles| Granted at the project level.|
|Repo Roles|  Granted at the repo level or at the cluster level.|
