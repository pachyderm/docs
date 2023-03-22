---
# metadata # 
title: Job
description: Learn about the concept of a Job in Pachyderm. 
date: 
# taxonomy #
tags: ["concepts", "pachctl", "data-operations", "pipelines"]
series: ["glossary"]
seriesPart:
--- 

A job is an execution of a [pipeline](TBD) triggered by new data detected in an input repository. 

When a [commit](TBD) is made to the input repository of a pipeline, jobs are created for all downstream pipelines in a [directed acyclic graph (DAG)](TBD), but they do not run until the prior pipelines they depend on produce their output. Each job runs the user's code against the current commit in a repository at a specified [branch](TBD) and then submits the results to the output repository of the pipeline as a single output commit.

Each job has a unique alphanumeric identifier (ID) that users can reference in the `<pipeline>@<jobID>` format. Jobs have the following states:

| Sate     | Description  |
| --------- | ------------ |
|CREATED| An input commit exists, but the job has not been started by a worker yet.|
|STARTING| The worker has allocated resources for the job (that is, the job counts towards parallelism), but it is still waiting on the inputs to be ready.|
|UNRUNNABLE|The job could not be run, because one or more of its inputs is the result of a failed or unrunnable job. As a simple example, say that pipelines Y and Z both depend on the output from pipeline X.  If pipeline X fails, both pipeline Y and Z will pass from `STARTING` to `UNRUNNABLE` to signify that they had to be cancelled because of upstream failures.|
|RUNNING|The worker is processing datums.|
|EGRESS|The worker has completed all the datums and is uploading the output to the egress endpoint.|
|FINISHING| After all of the datum processing and egress (if any) is done, the job transitions to a finishing state where all of the post-processing tasks such as compaction are performed.|
|FAILURE|The worker encountered too many errors when processing a datum.|
|KILLED|The job timed out, or a user called StopJob|
|SUCCESS| None of the bad stuff happened.| 



