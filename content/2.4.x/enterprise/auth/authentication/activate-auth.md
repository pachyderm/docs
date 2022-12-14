---
# metadata # 
title: Activate Authorization
description: Learn how to activate Authorization (User Access Management) in Pachyderm.
date: 
# taxonomy #
tags: 
series:
seriesPart:
weight: 1
---
## Before You Start 

- You must be using [Pachyderm Enterprise](../../enterprise/) to set up authentication and authorization. 

## Activate User Access Management

1. Activate authentication using the following command:

```s
pachctl auth activate 

# Pachyderm root token:
# 54778a770c554d0fb84563033c9cb808
```
2. Save the root token value in a secure place.

You can use this token in the future to log in to the initial root admin user by entering the following comand: 

```s
pachctl auth use-auth-token

# Please paste your Pachyderm auth token:
```

As a *Root User* (or initial admin), 
you can now configure Pachyderm to work with
the identity management provider (IdP) of your choice.

## License Expiration 
When an Enterprise License expires, a
Pachyderm cluster with enabled User Access Management goes into an
`admin-only` state. In this state, only `ClusterAdmins` have
access to the data stored in Pachyderm. This safety measure keeps sensitive data protected, even when an enterprise subscription becomes stale. To return the cluster to its previous state, run `pachctl license activate` and submit your new code.

