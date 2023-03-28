---
# metadata # 
title:  Input Union PPS
description: Create a union of pfs, cross, or other union inputs. 
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart:
label: Required for Union Inputs
---

{{% notice note %}}
For a single-page view of all PPS options, go to the [PPS series page](/series/pps).
{{% /notice %}}

## Spec 

```s
"input": {
  "union": [
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

```

## Behavior 

`input.union` is an array of inputs to combine. The inputs do not have to be
`pfs` inputs. They can also be `union` and `cross` inputs. 
 

Union inputs take the union of other inputs. In the example
below, each input includes individual datums, such as if  `foo` and `bar`
were in the same repository with the glob pattern set to `/*`.
Alternatively, each of these datums might have come from separate repositories
with the glob pattern set to `/` and being the only file system objects in these
repositories.

```s
| inputA | inputB | inputA ∪ inputB |
| ------ | ------ | --------------- |
| foo    | fizz   | foo             |
| bar    | buzz   | fizz            |
|        |        | bar             |
|        |        | buzz            |
```

The union inputs do not take a name and maintain the names of the
sub-inputs. In the example above, you would see files under
`/pfs/inputA/...` or `/pfs/inputB/...`, but never both at the same time.
When you write code to address this behavior, make sure that
your code first determines which input directory is present. Starting
with MLDM 1.5.3, we recommend that you give your inputs the
same `Name`. That way your code only needs to handle data being present
in that directory. This only works if your code does not need to be
aware of which of the underlying inputs the data comes from.



