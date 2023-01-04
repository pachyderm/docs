---
# metadata # 
title:  PGBouncer HCVs
description: 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
--- 

```s

pgbouncer:
  service:
    type: ClusterIP
  annotations: {}
  priorityClassName: ""
  nodeSelector: {}
  tolerations: []
  image:
    repository: pachyderm/pgbouncer
    tag: 1.16.1-debian-10-r82
  resources:
    {}
    #limits:
    #  cpu: "1"
    #  memory: "2G"
    #requests:
    #  cpu: "1"
    #  memory: "2G"
  # maxConnections specifies the maximum number of concurrent connections into pgbouncer.
  maxConnections: 1000
  # defaultPoolSize specifies the maximum number of concurrent connections from pgbouncer to the postgresql database.
  defaultPoolSize: 20
```

### pgbouncer

This section is to configure the PGBouncer Postgres connection pooler.

- `service.type` specifies the Kubernetes type of the pgbouncer service. The default is `ClusterIP`.

- `resources` specifies resources and limits in standard kubernetes format. It is left unset by default.

- `maxConnections` defaults to 1000