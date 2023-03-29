---
# metadata # 
title:  Create a Project
description: Learn how to create a new project in MLDM.
date: 
# taxonomy #
tags: ["projects"]
series:
seriesPart:
weight: 1
---

## Before You Start 

- Project names should be less than 51 characters long
- Project names cannot start with special characters and cannot contain periods (.) at all. Regex example:  `/^[a-zA-Z0-9-_]+$/`.

## How to Create a Project
### 1. Create a Project

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
This is not yet available. 

{{% /wizardResult %}}

{{% /wizardResults  %}}

{{</stack>}}

### 2. Verify Creation 

You can verify that your project has been created by running `pachctl list projects` or by opening Console ([localhost](http://localhost) for non-production personal-machine installations) and viewing the home page. 

![create and list projects](/images/projects/create-list-projects.gif)
![projects list console](/images/projects/project-list-console.png)


