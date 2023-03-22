---
# metadata #
title: Datum
description:  
date:
# taxonomy #
tags: 
series:
seriesPart:
---

A datum is **the smallest indivisible unit of computation within a job**. Datums are used to:
- Divide your input data
- Distribute processing workloads

A datum's scope can be as large as all of your data at once, a directory, a file, or a combination of multiple inputs. The shape and quantity of your datums is determined by a glob pattern defined in your pipeline specification. 

A job can have one, many, or no datums. Each datum is processed independently with a single execution of the user code on one of the pipeline worker pods. The individual output files produced by all of your datums are combined to create the final output commit.

If a job is successfully executed but has no matching files to transform, it is considered a zero-datum job.