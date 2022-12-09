---
# metadata # 
title:  Create a Project
description: Learn how to create a new project in Pachyderm.
date: 
# taxonomy #
tags: ["projects"]
series:
seriesPart:
weight: 1
---


## How to Create a Project

{{<stack type="wizard">}}
{{% wizardRow id="Tool"%}}
{{% wizardButton option="Pachctl CLI" state="active" %}}
{{% wizardButton option="Console" %}}
{{% /wizardRow %}}

{{% wizardResults  %}}

{{% wizardResult val1="tool/pachctl-cli"%}}

```s
pachctl create project foo
```

{{% /wizardResult %}}

{{% wizardResult val1="tool/console"%}}
1. Open the Console UI.
2. Select **Create Project**.
3. Provide inputs for the following fields:
    - Project Name
    - Project Description
4. Select **Create Project**.

{{% /wizardResult %}}

{{% /wizardResults  %}}

{{</stack>}}


