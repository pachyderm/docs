---
# metadata # 
title:  Console 
description: Learn how to use Pachyderm's user interface, Console. 
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

Pachyderm **Console is a complete web UI for visualizing running pipelines and exploring your data**. By clicking on individual pipeline segments, users can check their jobs' status, visualize their commits' content, access logs, and much more! It is a valuable companion when troubleshooting pipelines.

![Console in action](/images/console/console-input-repo.png)

## Enterprise Edition
Pachyderm Community Edition comes with Console per default. Upon upgrading to Enterprise, you will be able to:

- Benefit from our Authentication/Authorization features and control which users, groups, or roles have access to specific Pachyderm resources.
- Lift all [CE scaling limits](../../../reference/scaling-limits/).

{{% notice note %}}
Request an Enterprise trial token directly from Console CE by hitting the **"Upgrade to Enterprise"** button at the bottom right of your Console, fill in [this form](https://www.pachyderm.com/trial/), or get in touch with us at [sales@pachyderm.io](mailto:sales@pachyderm.io).
{{% /notice %}}

## Console States 
Before diving into Console installation steps, please look at Console's various states, from the Community Edition to Enterprise. It should give you a mental model of the various paths to upgrade your Community Edition and what happens when your Enterprise token expires.

![Console state diagram](/images/console-state-diagram.png)



