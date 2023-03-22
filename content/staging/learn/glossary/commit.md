---
# metadata # 
title: Commit
description: Learn about the concept of a commit in Pachyderm. 
glossaryDefinition: An atomic operation that snapshots and preserves the state of files/directories within a repository.
date: 
# taxonomy #
tags: ["concepts", "pachctl", "data-operations"]
series:
seriesPart:
--- 
{{% notice note %}}
Pachyderm uses the term `commit` at two different levels: a global level and commits on a repository's branch.
{{% /notice %}}

In Pachyderm, commits snapshot and preserve the state of files and directories in a repository at a point in time.
Unlike Git, Pachyderm commits are centralized and transactional. You can create a commit with `pachctl start commit` and save it with `pachctl finish commit`.

All commits have an alphanumeric ID, and you can reference a commit with `<repo>@<commitID>`.
Each commit has an origin that indicates why it was produced (USER, AUTO, or ALIAS).

To track provenance, each commit must belong to exactly one branch. You can view commit information with `pachctl list commit` and `pachctl inspect commit`.

You can squash or delete commits with `pachctl squash commit` and `pachctl delete commit`.

## Example 

```s
pachctl list commit images@master

# REPO   BRANCH COMMIT                           FINISHED        SIZE       ORIGIN DESCRIPTION
# images master c6d7be4a13614f2baec2cb52d14310d0 33 minutes ago  5.121MiB    USER
# images master 385b70f90c3247e69e4bdadff12e44b2 2 hours ago     2.561MiB    USER
```

{{% notice warning %}}
`start commit` can only be used on input repos without provenance, and all commits must belong to exactly one branch.
{{% /notice %}}