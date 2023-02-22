---
title: "Basic Concepts"
description: Discover how Pachyderm provides a secure, scalable, and version-controlled solution for storing and processing large amounts of data through its most basic concepts.
date: 2023-01-30T16:17:44-06:00
series: #[""]
seriesPart:
tags: 
weight: 030
layout: 
directory: true 
---

## Pachyderm File System
The Pachyderm File System (PFS) is the backbone of the Pachyderm data platform, providing a secure, scalable, and efficient way to store and manage large amounts of data. It is a version-controlled data management system that enables users to store any type of data in any format and scale, from a single file to a directory of files. The PFS is built on top of Postgres and S3, ensuring that your data is secure, consistent, and easily accessible. With PFS, users can version their data and work collaboratively with their teams, using branches and commits to manage and track changes over time.

### Repositories (Repo)
Pachyderm repositories are version controlled, meaning that they keep track of changes to the data stored within them. Each repository can contain any type of data, including individual files or directories of files, and can handle data of any scale.

[Learn more about Repositories](../../concepts/data-concepts/repository)

### Branches
Branches in Pachyderm are similar to branches in Git. They are pointers to commits that move along a growing chain of commits. This allows you to work with different versions of your data within the same repository.

[Learn more about Branches](../../concepts/data-concepts/branches)

### Commits
A commit in Pachyderm is created automatically whenever data is added to or deleted from a repository. Each commit preserves the state of all files in the repository at the time of the commit, similar to a snapshot. Each commit is uniquely identifiable by a UUID and is immutable, meaning that the source data can never change.

[Learn more about Commits](../../concepts/data-concepts/commit)

## Pachyderm Pipeline System
The Pachyderm Pipeline System (PPS) is a core component of the Pachyderm platform, designed to run robust data pipelines in a scalable and reproducible manner. With PPS, you can define, execute, and monitor complex data transformations using code that is run in Docker containers. The output of each pipeline is version-controlled in a Pachyderm data repository, providing a complete, auditable history of all processing steps. In this way, PPS provides a flexible, data-driven solution for managing your data processing needs, while keeping data and processing results secure, reproducible, and scalable.

[Learn more about the PPS](../../reference/pipeline-spec)

### Pipelines
Pachyderm pipelines are used to transform data from Pachyderm repositories. The output data is versioned in a Pachyderm data repository, and the code for the transformation is run in Docker containers. Pipelines are triggered by new commits to a branch, making them data-driven.

[Learn more about Pipelines](../../concepts/pipeline-concepts/pipeline)

### Jobs
A job in Pachyderm is the execution of a pipeline with a new commit. The data is distributed and parallelized computation is performed across a cluster. Each job is uniquely identified, making it possible to reproduce the results of a specific job.

[Learn more about Jobs](../../concepts/pipeline-concepts/job)

### Datum
A datum in Pachyderm is a unit of computation for a job. It is used to distribute the processing workloads and to define how data can be split for parallel processing.

[Learn more about Datums](../../concepts/pipeline-concepts/datum)
