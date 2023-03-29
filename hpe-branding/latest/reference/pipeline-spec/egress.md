---
# metadata # 
title:  Egress PPS
description: Push the results of a Pipeline to an external data store or an SQL Database.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart:
label: optional
---

{{% notice note %}}
For a single-page view of all PPS options, go to the [PPS series page](/series/pps).
{{% /notice %}}

## Spec

```s

"egress": {
    // Egress to an object store
    "URL": "s3://bucket/dir"
    // Egress to a database
    "sql_database": {
        "url": string,
        "file_format": {
            "type": string,
            "columns": [string]
        },
        "secret": {
            "name": string,
            "key": "PACHYDERM_SQL_PASSWORD"
        }
    }
},

```

## Attributes

| Attribute  | Description  |
|-|-|
| URL            | The URL of the object store where the pipeline's output data should be written.  |
| sql_database   | An optional field that is used to specify how the pipeline should write output data to a SQL database.|
| url            | The URL of the SQL database, in the format `postgresql://user:password@host:port/database`.  |
| file_format    | The file format of the output data, which can be specified as `csv` or `tsv`. This field also includes the column names that should be included in the output. |
| secret         | The name and key of the Kubernetes secret that contains the password for the SQL database. |


## Behavior 

The `egress` field in a MLDM Pipeline Spec is used to specify how the pipeline should write the output data. The `egress` field supports two types of outputs: writing to an object store and writing to a SQL database.

Data is pushed after the user code finishes running but before the job is marked as successful. For more information, see [Egress Data to an object store](/{{% release %}}/how-tos/basic-data-operations/export-data-out-pachyderm/export-data-egress) or [Egress Data to a database](/{{% release %}}/how-tos/basic-data-operations/export-data-out-pachyderm/sql-egress/).


This is required if the pipeline needs to write output data to an external storage system.

## When to Use 

You should use the `egress` field in a MLDM Pipeline Spec when you need to write the output data from your pipeline to an external storage system, such as an object store or a SQL database.

Example scenarios:

- **Long-term data storage**: If you need to store the output data from your pipeline for a long time, you can use the `egress` field to write the data to an object store, such as Amazon S3 or Google Cloud Storage.

- **Data sharing**: If you need to share the output data from your pipeline with external users or systems, you can use the `egress` field to write the data to an object store that is accessible to those users or systems.

- **Analytics and reporting**: If you need to perform further analytics or reporting on the output data from your pipeline, you can use the `egress` field to write the data to a SQL database that can be used for those purposes.