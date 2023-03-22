---
# metadata # 
title:  Input Join PPS
description: Join files that are stored in separate Pachyderm repositories.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart:
label: Required for Join Inputs
---

{{% notice note %}}
For a single-page view of all PPS options, go to the [PPS series page](/series/pps).
{{% /notice %}}

## Spec 


```s

"input": {
"join": [
  {
    "pfs": {
      "name": string,
      "repo": string,
      "branch": string,
      "glob": string,
      "join_on": string,
      "outer_join": bool,
      "lazy": bool,
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
      "join_on": string,
      "outer_join": bool,
      "lazy": bool,
      "empty_files": bool,
      "s3": bool
    }
  }
 ]
}

```

## Behavior 

-  A join input must have the `glob` and `join_on` parameters configured
to work properly. A join can combine multiple PFS inputs.
- You can optionally add `"outer_join": true` to your PFS input.  In that case, you will alter the join's behavior from a default "inner-join" (creates a datum if there is a match only) to a "outer-join" (the repos marked as `"outer_join": true` will see a datum even if there is no match).
- You can set 0 to many PFS input to `"outer_join": true` within your `join`.

