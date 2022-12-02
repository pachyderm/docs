---
# metadata # 
title:  Add a Project Resource
description: Learn how to add a resource (like a repo) to a project.
date: 
# taxonomy #
tags: ["projects"]
series:
seriesPart:
weight: 3
---

There are two main ways to add a resource to a project, depending on whether or not the project has been [set to your current pachyderm context](../set-project). 

## Add Resource to Unset Project 

```s 
pachctl create repo bar --project foo
```

## Add Resource to Set Project 

```s
pachctl create repo bar 
```

## Example 

![add project resources](/images/projects/add-project-resources.gif)