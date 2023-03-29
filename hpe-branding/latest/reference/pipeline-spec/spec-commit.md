---
# metadata # 
title:  Spec Commit PPS
description: This attribute is auto-generated and is not configurable.
date: 
# taxonomy #
tags: ["pipelines", "pps"]
series: ["pps"]
seriesPart:
label: auto-generated
---

{{% notice note %}}
For a single-page view of all PPS options, go to the [PPS series page](/series/pps).
{{% /notice %}}

## Spec 

```s

"spec_commit": {
  "option": false,
  "branch": {
    "option": false,
    "repo": {
      "option": false,
      "name": string,
      "type": string,
      "project":{
        "option": false,
        "name": string,
      },
    },
    "name": string
  },
  "id": string,
}

```

## When to Use 

You do not need to ever configure this attribute; its details are auto-generated.
