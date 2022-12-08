---
# metadata # 
title:  Set a Project as Current
description: Learn how to switch to a project in Pachyderm.
date: 
# taxonomy #
tags: ["projects"]
series:
seriesPart:
weight: 2
---
In order to begin working on a project, you must assign it to a pachctl context. This enables you to safely add or update resources such as pipelines and repos without affecting other projects.

## Before You Start

- Check your available contexts using `pachctl config list context`.
- Optionally set a new context or [import a Kubernetes context](../../deploy-manage/deploy/import-kubernetes-context/) if needed.


## How to Set a Project to Your Current Context

### Via Pachctl

```s
pachctl config update context --project foo
```

You can check the details of your active context using the following commands:

 ```s
 pachctl config get active-context # returns contextName
 pachctl config get context <contextName>

# {
#   "source": "IMPORTED",
#   "cluster_name": "docker-desktop",
#   "auth_info": "docker-desktop",
#   "port_forwarders": {
#     "console": 4000,
#     "dex": 30658,
#     "oidc-acs": 30657,
#     "pachd": 30650,
#     "s3g": 30600
#   },
#   "cluster_deployment_id": "dev",
#   "project": "foo"
# }
```

### Via Console 

1. Open the Console UI.
2. Navigate to the top-level Projects view. 
3. Scroll to a project you wish to work on.
4. Select **View Project**. 

You can now work within the project from Console.