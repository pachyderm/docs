---
# metadata # 
title:  Project Operations
description: Learn how to create, delete, and update projects
date: 
# taxonomy #
tags: ["projects"]
series:
seriesPart:
weight: 
---

Projects are namespaces that contain a collection of related work (such as repos and pipelines). Each Pachyderm cluster ships with an initial project named `Default`.

## Benefits of Projects

- **Logical Organization of DAGs**: Similar to a file system, you can organize your work  within a Pachyderm instance. 
  
- **Standardizable**: Resources like repos can have the same name if they belong to different projects, making it easier to create and adhere to project templates in a collaborative environment. 

- **Multi-team Enablement**: You can grant access to projects based on roles; projects are hidden from users without access by default. 


---