---
# metadata # 
title: Global Identifier
description: Learn about the concept of a global identifier in Pachyderm. 
date: 
# taxonomy #
tags:  ["data-operations", "pipelines"]
series:
seriesPart:
--- 

Global Identifiers provide a simple way to follow the [provenance](TBD) or [subvenance](TBD) of a DAG. Commits and jobs sharing the same Global ID represent a logically-related set of objects.

When a new commit is made, Pachyderm creates an associated commit ID; all resulting downstream **commits** and **jobs** in your DAG will then share that same ID (the Global Identifier). 

## Actions

You can perform the following actions with a Global ID:

1. [List all global commits](TBD)
2. [List all global jobs](TBD)
3. [List all commits associated with a global ID](TBD)
4. [List all jobs associated with a global ID](TBD)
5. [Track provenance downstream, live](TBD)
6. [Squash commits](TBD)
7. [Delete commits](TBD)



