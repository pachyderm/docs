---
# metadata # 
title:  Deploy
description: Learn all the ways you can deploy a Pachyderm cluster, be it locally, on-premise, or in the cloud. 
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

Pachyderm runs on [Kubernetes](https://kubernetes.io/),
is backed by an object store of your choice, and comes with a bundled version of [PostgreSQL](https://www.postgresql.org/) (metadata storage) by default. 
We recommended disabling the bundled PostgreSQL and using a **managed database instance** (such as RDS, CloudSQL, or PostgreSQL Server) for production environments.

This section covers common
deployment options and related topics:
 