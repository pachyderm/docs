---
# metadata #
title:  Add a Project Resource
description: Learn how to add a resource (like a repo) to a project.
date:
# taxonomy #
tags: ["projects"]
series:
seriesPart:
weight: 3
---



{{<stack type="wizard">}}
{{% wizardRow id="Tool"%}}
{{% wizardButton option="Pachctl CLI" state="active" %}}
{{% wizardButton option="Console" %}}
{{% /wizardRow %}}

{{% wizardResults  %}}

{{% wizardResult val1="tool/pachctl-cli"%}}

There are two main ways to add a resource to a project, depending on whether or not the project has been [set to your current pachyderm context](../set-project).

**Add Resource to Unset Project:**

```s
pachctl create repo bar --project foo
```

**Add Resource to Set Project:**

```s
pachctl create repo bar
```



![add project resources](/images/projects/add-project-resources.gif)

{{% /wizardResult %}}

{{% wizardResult val1="tool/console"%}}
1. Open the Console UI.
2. Scroll to the project you wish to work in.
3. Select **View Project**.
4. Select **Create Repo**.

![create a repo in Console](/images/projects/projects-console-create-repo.gif)

{{% /wizardResult %}}

{{% /wizardResults  %}}

{{</stack>}}

For more information about [Repos](../concepts/data-concepts/repo).
