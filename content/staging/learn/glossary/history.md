---
# metadata # 
title: History
description: Learn about the concept of history (version control) in Pachyderm. 
glossaryDefinition: The collective record of version-controlled commits for pipelines and jobs.
date: 
# taxonomy #
tags:  
series:
seriesPart:
--- 

History in Pachyderm is a record of the changes made to data over time, stored as a series of immutable snapshots ([commits](TBD)) that can be accessed using [ancestry syntax](TBD) and [branch](TBD) pointers. Each commit has a parentage structure, where new commits inherit content from their parents, creating a chain of commits that represents the full history of changes to the data. 

## Actions 

You can perform the following actions to view history: 

1. [View pipeline history](TBD)
2. [View job history](TBD)