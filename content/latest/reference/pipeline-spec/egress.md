---
# metadata # 
title:  Egress PPS
description: Push the results of a Pipeline to an external data store or an SQL Database.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series:
seriesPart:
label: optional
---


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

## Behavior 

Data is pushed after the user code finishes running but before the job is marked as successful. For more information, see [Egress Data to an object store](../../how-tos/basic-data-operations/export-data-out-pachyderm/export-data-egress) or [Egress Data to a database](../../how-tos/basic-data-operations/export-data-out-pachyderm/sql-egress).


## When to Use 

You should consider enabling data Egress if you'd like to use or reference your transformed data in downstream tools/applications. 