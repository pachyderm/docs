---
# metadata # 
title:  Egress
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

`egress` allows you to push the results of a Pipeline to an external data
store or an SQL Database. Data will be pushed
after the user code has finished running but before the job is marked as
successful.

For more information, see [Egress Data to an object store](../../how-tos/basic-data-operations/export-data-out-pachyderm/export-data-egress) or [Egress Data to a database](../../how-tos/basic-data-operations/export-data-out-pachyderm/sql-egress) .

```s
{
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
}
```