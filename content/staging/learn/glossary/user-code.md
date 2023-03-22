---
# metadata # 
title: User Code
description: Learn about the concept of User Code in Pachyderm.
date: 
# taxonomy #
tags: 
series:
seriesPart:
--- 

In Pachyderm, user code refers to the custom code that users write to process their data in [pipelines](TBD). User code can be written in any language and can use any libraries or frameworks.

Pachyderm allows users to define their user code as a Docker image, which can be pushed to a registry and referenced using the [Transform](TBD) attribute of the [pipeline's specification](TBD). The user code image contains the necessary dependencies and configuration for the code to run in Pachyderm's distributed computing environment.

User code can be defined for each pipeline stage in Pachyderm, allowing users to chain together multiple processing steps and build complex data pipelines. Pachyderm also provides a Python library for building pipelines, which simplifies the process of defining user code and specifying pipeline stages.