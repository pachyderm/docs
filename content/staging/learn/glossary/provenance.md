---
# metadata # 
title: Provenance
description: Learn about the concept of provenance in Pachyderm. 
glossaryDefinition: The recorded data lineage that tracks the dependencies and relationships between datasets. 
date: 
# taxonomy #
tags: ["concepts", "pachctl", "data-operations"]
series: ["glossary"]
seriesPart:
mermaid: true
--- 

Provenance in Pachyderm refers to the tracking of the dependencies and relationships between datasets, as well as the ability to go back in time and see the state of a dataset or repository at a particular moment. It allows users to track all revisions of their data and understand the connection between the data stored in one repository and the results in the other repository. Pachyderm automatically maintains a complete audit trail, allowing all results to be fully reproducible.

Pachyderm provides the `pachctl inspect` command to track the direct provenance of [commits](TBD) and learn where the data in the repository originates. By running this command, users can view provenance information, including the origin kind, direct provenance, and size of the data.

Pachyderm's DAG structure makes it easy to traverse the provenance and [subvenance](TBD) in any commit. All related steps in a DAG share the same [global identifier](TBD), making it possible to run `pachctl list commit <commitID>` to get the full list of all the [branches](TBD) with commits created due to provenance relationships. 