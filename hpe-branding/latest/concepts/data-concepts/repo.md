---
# metadata # 
title: Repository
description: Learn about the concept of a repository in MLDM. 
glossaryDefinition: A top-level data object inside MLDM that behaves as a location where data is stored.
date: 
# taxonomy #
tags: ["concepts", "pachctl", "data-operations"]
series:
seriesPart:
--- 

## Definition

A MLDM repository is a location where you store your data inside MLDM. It is a top-level data object that contains files and folders. 

Similar to Git, a **MLDM repository tracks all changes to the data and creates a history of data modifications that you can access and review**. 

{{% notice info %}}
You can store any type of file in a MLDM repo, including binary and plain text files.
{{%/notice%}}

Unlike a Git repository that stores history in a `.git` file in your copy
of a Git repo, **MLDM stores the history of your commits in a centralized
location**. Because of that, you do not run into
merge conflicts as you often do with Git commits when you try to merge
your `.git` history with the master copy of the repo. With large datatsets
resolving a merge conflict might not be possible.

A MLDM repository is **the first entity that you configure when you want
to add data to MLDM**. You can create a repository with the `pachctl create repo`
command, or by using one of [MLDM's client API](../../../reference/clients/). 
After creating the repository, add your data by using the `pachctl put file` command.

{{% notice warning %}}
A MLDM repo name can include alphanumeric characters, dashes, and underscores, and should be no more than 63 characters long.
{{% /notice %}}


MLDM's repositories are divided into two categories:

1. **User repositories**

    User repositories keep track of your data one commit at a time. 
    They further split into:

    - **Source** repositories

        Users or external applications outside of MLDM can add data to
        the source repositories for further processing.

    - **Output** repositories

        MLDM automatically creates an output repository at the end of a pipeline for
        the pipeline to write the results of its transformations into. An output repository
        might serve as input for another pipeline.

1. **System repositories**

    System repositories hold certain auxiliary information about pipelines. They are hidden by default
    in the output of most commands.
    Along with an output repo, the creation of a pipeline also creates one `spec` and one `meta` repo.

    - `spec` repositories hold pipeline specification files
    - `meta` repositories hold metadata related to datum processing (also called "stats" in this documentation)

    Pipelines generally manage their own system repos, but if necessary, the system repos
    for a pipeline named `edges` can be referenced using `edges.meta` and `edges.spec` wherever
    you would usually put a repo name.
    Deleting a user repo deletes any associated system repos.


## List Your Repos
You can view the list of all user repositories in your MLDM cluster
by running the `pachctl list repo` command.

### Example
```s
pachctl list repo
```

**System Response:**

```s
NAME       CREATED      SIZE (MASTER) ACCESS LEVEL
montage    19 hours ago 1.664MiB      [repoOwner]  Output repo for pipeline montage.
edges      19 hours ago 133.6KiB      [repoOwner]  Output repo for pipeline edges.
images     19 hours ago 238.3KiB      [repoOwner]
```

Additionally, `pachctl list repo --all` will let you see all repos of all types, and `pachctl list repo --type=spec` or `pachctl list repo --type=meta` will filter the `spec` or `meta` repos only.


## Inspect a Repo
The `pachctl inspect repo` command provides a more detailed overview
of a specified repository.

### Example
```s
pachctl inspect repo raw_data
```

**System Response:**

```s
Name: raw_data
Description: A raw data repository
Created: 6 hours ago
Size of HEAD on master: 5.121MiB
```
Add a `--raw` flag to output a more detailed JSON version of the repo's metadata.

## Delete a Repo
If you need to delete a repository, you can run the
`pachctl delete repo` command. This command deletes all
data and the information about the specified
repository, such as commit history. The delete
operation is irreversible and results in a
complete cleanup of your MLDM cluster.
If you run the delete command with the `--all` flag, all
repositories will be deleted.

{{% notice tip %}}
**See Also**: [Pipeline](../../pipeline-concepts/pipeline)
{{% /notice%}}
