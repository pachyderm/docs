---
# metadata #
title: Ancestry Syntax
description: Learn about the concept of Ancestry Syntax in Pachyderm. 
date:
# taxonomy #
tags: 
series: ["glossary"]
seriesPart:
---

Ancestry syntax in Pachyderm is used to reference the [history](TBD) of [commits](TBD) and [branches](TBD) in a Pachyderm [repository](TBD). Ancestry syntax is similar to Git syntax, and it allows users to navigate the history of commits and branches using special characters like `^` and `.`.

- The `^` character is used to reference a commit or branch parent, where `commit^` refers to the parent of the commit, and `branch^"` refers to the parent of the branch head. Multiple `^` characters can be used to reference earlier ancestors, for example, `commit^^` refers to the grandparent of the commit.

- The `.` character is used to reference a specific commit in the history of a branch. For example, `branch.1` refers to the first commit on the branch, `branch.2` refers to the second commit, and so on. 

Ancestry syntax allows users to access historical versions of data stored in Pachyderm, which can be useful for tasks like debugging, testing, and auditing. However, it's important to note that resolving ancestry syntax can be computationally intensive, especially for long chains of commits, so it's best to use this feature judiciously.