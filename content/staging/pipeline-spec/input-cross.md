---
# metadata # 
title:  Input Cross 
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---


Cross inputs create the cross product of other inputs. In other words,
a cross input creates tuples of the datums in the inputs. In the example
below, each input includes individual datums, such as if  `foo` and `bar`
were in the same repository with the glob pattern set to `/*`.
Alternatively, each of these datums might have come from separate repositories
with the glob pattern set to `/` and being the only file system objects in these
repositories.

```s
| inputA | inputB | inputA ⨯ inputB |
| ------ | ------ | --------------- |
| foo    | fizz   | (foo, fizz)     |
| bar    | buzz   | (foo, buzz)     |
|        |        | (bar, fizz)     |
|        |        | (bar, buzz)     |
```

The cross inputs above do not take a name and maintain
the names of the sub-inputs.
In the example above, you would see files under `/pfs/inputA/...`
and `/pfs/inputB/...`.

`input.cross` is an array of inputs to cross.
The inputs do not have to be `pfs` inputs. They can also be
`union` and `cross` inputs. Although, there is
 no reason to take a union of unions because union is associative.

```s
{
  "input": {
    "cross": [
    {
      "pfs": {
        "name": string,
        "repo": string,
        "branch": string,
        "glob": string,
        "lazy" bool,
        "empty_files": bool,
        "s3": bool
      }
    },
    {
      "pfs": {
        "name": string,
        "repo": string,
        "branch": string,
        "glob": string,
        "lazy" bool,
        "empty_files": bool,
        "s3": bool
      }
    }
    ...
  ]
}
}
```