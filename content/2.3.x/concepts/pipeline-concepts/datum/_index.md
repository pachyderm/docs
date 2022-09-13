---
# metadata # 
title: Datum
description: 
date: 
# taxonomy #
tags: 
series:
seriesPart:
layout: glossary
--- 

!!! note "TL;DR"
    Datums define what input data is seen by your code. It can be
    all data at once, each directory independently, individual
    files one by one, or combined data from multiple inputs together.

## Definition
A datum is **the smallest indivisible unit of computation within a job**.
A job can have one, many or no datums. Each datum is processed
independently with a single execution of the user code on one of
the pipeline worker pods.
The files output by all of the datums are then combined together to
create the final output commit.

## Data distribution
Think of datums as a way to **divide your input data** 
and **distribute processing workloads**.
They are instrumental in optimizing your pipeline performance.

You define how your data is spread among workers by
**specifying [pipeline inputs](#pipeline-inputs)** for your pipeline 
in its pipeline specification file. 

Based on this specification file, the data in the `input` 
of your pipeline is turned in datums 
each of which can contain 1 to many files.
Pachyderm provides a wide variety of ways to define the granularity of each datum. 

For example, you can configure a whole branch of an
input repository to be one datum, each top-level filesystem object of a given branch
to be a separate datum, specific paths on a given branch can be datums, etc...
You can also create a combination of the above by aggregating multiple input.

## Pipeline Inputs
This section details the tools at your disposal to
"break down" your data and fit your specific use case.
### PFS Input and Glob Pattern
The most primitive input of a pipeline is a [**PFS input**](../../../reference/pipeline-spec/#pfs-input), defined, at a minimum, by:

- a repo containing the data you want your pipeline to consider
- a branch to watch for commits
- and **a [glob pattern](glob-pattern.md) to determine how the input data is partitioned**.

A pipeline input can have one or multiple PFS inputs.
In the latter case, Pachyderm provides a variety of options to aggregate several PFS inputs together. 
