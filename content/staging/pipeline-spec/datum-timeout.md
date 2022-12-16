---
# metadata # 
title:  Datum Timeout
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
label: optional
---

`datum_timeout` determines the maximum execution time allowed for each
datum. The value must be a string that represents a time value, such as
`1s`, `5m`, or `15h`. This parameter takes precedence over the parallelism
or number of datums, therefore, no single datum is allowed to exceed
this value. By default, `datum_timeout` is not set, and the datum continues to
be processed as long as needed.

```s
{
    "datum_timeout": string,
}
```