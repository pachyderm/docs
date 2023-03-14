---
# metadata # 
title:  Input Cron PPS
description: Trigger pipelines based on time.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart:
label: Required for Cron Inputs
---


## Spec 

```s

"input": {
  "cron": {
    {
        "name": string,
        "spec": string,
        "repo": string,
        "start": time,
        "overwrite": bool
    }
  }
}

```

## Attributes 

| Attribute     | Description                                                                                                                       |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `name`      | The name of the cron job, which should be unique within the Pachyderm cluster.                                                     |
| `spec`      | The cron schedule for the job, specified using the standard cron format or macros. [**See schedule macros**](https://en.wikipedia.org/wiki/Cron) for examples. Pachyderm also supports non-standard schedules, such as `"@daily"`.  |
| `repo`      | The name of the input repository that the cron job should read data from; default:`<pipeline-name>_<input-name>` |
| `start`     | An optional field that specifies the start time for the cron job. This is useful for running the job on a specific date in the future. If not specified, starts immediately.  Specifying a time enables you to run on matching times from the past or skip times from the present and only start running on matching times in the future. Format the time value according to [**RFC3339**](https://www.ietf.org/rfc/rfc3339.txt). |
| `overwrite` | An optional field that defines whether you want the timestamp file to be overwritten on each tick; defaults to simply writing new files on each tick. By default, when `"overwrite"` is disabled, ticks accumulate in the cron input repo. When `"overwrite"` is enabled, Pachyderm erases the old ticks and adds new ticks with each commit. If you do not add any manual ticks or run `pachctl run cron`, only one tick file per commit (for the latest tick) is added to the input repo. |




## Behavior 
The `input` field in a Pachyderm Pipeline Spec is used to specify the inputs to the pipeline, which are the Pachyderm repositories that the pipeline should read data from. The `input` field can include both static and dynamic inputs.

The `cron` field within the input field is used to specify a dynamic input that is based on a cron schedule. This is useful for pipelines that need to process data on a regular schedule, such as daily or hourly. 

A repo is created for each cron input. When a Cron input triggers, `pachd` commits a single file, named by the current [RFC3339 timestamp](https://www.ietf.org/rfc/rfc3339.txt) to the repo which contains the time which satisfied the spec.


## When to Use

You should use a `cron` input in a Pachyderm Pipeline Spec when you need to process data on a regular schedule, such as hourly or daily. A `cron` input allows you to specify a schedule for the pipeline to run, and Pachyderm will automatically trigger the pipeline at the specified times.

Example scenarios:

- **Batch processing**: If you have a large volume of data that needs to be processed on a regular schedule, a cron input can be used to trigger the processing automatically, without the need for manual intervention.

- **Data aggregation**: If you need to collect data from different sources and process it on a regular schedule, a cron input can be used to automate the data collection and processing.

- **Report generation**: If you need to generate reports on a regular schedule, a cron input can be used to trigger the report generation process automatically.