---
# metadata #
title:  Delete a Project
description: Learn how to delete a project from MLDM.
date:
# taxonomy #
tags: ["projects"]
series:
seriesPart:
weight: 
---

{{% notice warning %}}
Do not delete your project before deleting resources inside of it.
{{% /notice %}}

## How to Delete a Project

In order to fully and safely delete a project, you must delete the resources inside of it first in the following order: 

1. Delete all pipelines in your project.
   ```s
   pachctl delete pipeline <pipeline_name>
   ```
2. Delete all repos in your project.
   ```s
   pachctl delete repo <repo> 
   ```
3. Delete the project itself.
   ```s
   pachctl delete project <project>
   ```

If the project you removed was set to your currently active context, make sure to assign a new one:

```
pachctl config update context --project foo
```