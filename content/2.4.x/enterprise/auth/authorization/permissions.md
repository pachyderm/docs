---
# metadata # 
title: Permissions by Role 
description: 
date: 
# taxonomy #
tags: ["permissions", "management"]
series:
seriesPart:
weight: 3
---

Use this article to reference permissions granted to each role when assigning them to your team/resources.

You can also use the command `pachctl auth roles-for-permission <permission>` to look up which roles provide a given permission.

## Role Behavior

- A **clusterAdmin** can grant admin privileges on a cluster or any lower level resources to other users.     
- A **projectOwner** of a given project can set any level of access to their project
- A **repoOwner** of a given repository can set any level of access to their repo
- A user or group can have one or more roles on a specific Resource.
- Roles are inherited; if a user has a role on a cluster, they have that role for all projects and repos in that cluster.
- The creator of a repo becomes its `repoOwner`.
- To update a pipeline, you must have at least `repoReader`-level access to all pipeline inputs
    and `repoWriter`-level access to the pipeline output. 
    This is because pipelines read from their input repos and write
    to their output repos.
- When a user subscribes a pipeline to a repo, Pachyderm sets
    that user as an `repoOwner` of that pipeline's output repo.
    If additional users need access to the output repository,
    the initial `repoOwner` of a pipeline's output repo, or a `clusterAdmin`,
    needs to grant that user access to the repo.


## Cluster Roles 

### oidcAppAdminRole

| Permission |
|---|
| CLUSTER_IDENTITY_DELETE_OIDC_CLIENT |
| CLUSTER_IDENTITY_CREATE_OIDC_CLIENT |
| CLUSTER_IDENTITY_UPDATE_OIDC_CLIENT |
| CLUSTER_IDENTITY_LIST_OIDC_CLIENTS |
| CLUSTER_IDENTITY_GET_OIDC_CLIENT |


### idpAdminRole

| Permission |
|---|
| CLUSTER_IDENTITY_CREATE_IDP |
| CLUSTER_IDENTITY_UPDATE_IDP |
| CLUSTER_IDENTITY_LIST_IDPS |
| CLUSTER_IDENTITY_GET_IDP |
| CLUSTER_IDENTITY_DELETE_IDP |

### identityAdminRole

| Permission |
|---|
| CLUSTER_IDENTITY_SET_CONFIG |
| CLUSTER_IDENTITY_GET_CONFIG |

### debuggerRole

| Permission |
|---|
| CLUSTER_DEBUG_DUMP |
| CLUSTER_GET_PACHD_LOGS |

### robotUserRole

| Permission |
|---|
| CLUSTER_AUTH_GET_ROBOT_TOKEN |

### licenseAdminRole

| Permission |
|---|
| CLUSTER_LICENSE_ACTIVATE |
| CLUSTER_LICENSE_GET_CODE |
| CLUSTER_LICENSE_ADD_CLUSTER |
| CLUSTER_LICENSE_UPDATE_CLUSTER |
| CLUSTER_LICENSE_DELETE_CLUSTER |
| CLUSTER_LICENSE_LIST_CLUSTERS |

### secretAdminRole

| Permission |
|---|
| CLUSTER_CREATE_SECRET |
| CLUSTER_LIST_SECRETS |
| SECRET_INSPECT |
| SECRET_DELETE |

### pachdLogReaderRole

| Permission |
|---|
| CLUSTER_GET_PACHD_LOGS |

### clusterAdminRole

The ClusterAdminRole includes all of the previous permissions, plus the following:
 
 | Permission |
|---|
| CLUSTER_MODIFY_BINDINGS |
| CLUSTER_GET_BINDINGS |
| CLUSTER_AUTH_ACTIVATE |
| CLUSTER_AUTH_DEACTIVATE |
| CLUSTER_AUTH_GET_CONFIG |
| CLUSTER_AUTH_SET_CONFIG |
| CLUSTER_AUTH_MODIFY_GROUP_MEMBERS |
| CLUSTER_AUTH_GET_GROUPS |
| CLUSTER_AUTH_GET_GROUP_USERS |
| CLUSTER_AUTH_EXTRACT_TOKENS |
| CLUSTER_AUTH_RESTORE_TOKEN |
| CLUSTER_AUTH_ROTATE_ROOT_TOKEN |
| CLUSTER_AUTH_DELETE_EXPIRED_TOKENS |
| CLUSTER_AUTH_GET_PERMISSIONS_FOR_PRINCIPAL |
| CLUSTER_AUTH_REVOKE_USER_TOKENS |
| CLUSTER_ENTERPRISE_ACTIVATE |
| CLUSTER_ENTERPRISE_HEARTBEAT |
| CLUSTER_ENTERPRISE_GET_CODE |
| CLUSTER_ENTERPRISE_DEACTIVATE |
| CLUSTER_DELETE_ALL |
| CLUSTER_ENTERPRISE_PAUSE |

## Repo Roles 

### RepoReaderRole 

| Permission |
|---|
| REPO_READ |
| REPO_INSPECT_COMMIT |
| REPO_LIST_COMMIT |
| REPO_LIST_BRANCH |
| REPO_LIST_FILE |
| REPO_INSPECT_FILE |
| REPO_ADD_PIPELINE_READER |
| REPO_REMOVE_PIPELINE_READER |
| PIPELINE_LIST_JOB |

### RepoWriterRole 

The `RepoWriterRole` includes all of the `RepoReaderRole` permissions, plus the following:

| Permission |
|---|
| REPO_WRITE |
| REPO_DELETE_COMMIT |
| REPO_CREATE_BRANCH |
| REPO_DELETE_BRANCH |
| REPO_ADD_PIPELINE_WRITER |

### RepoOwnerRole

The `RepoOwnerRole` includes all of the `RepoWriterRole` and  `RepoReaderRole` permissions, plus the following:

| Permission |
|---|
| REPO_MODIFY_BINDINGS |
| REPO_DELETE |

