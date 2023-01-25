---
# metadata # 
title:  PachW HCVs
description:  Create a pool of pachd instances that dynamically scale storage task handling. 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 7
label: optional
--- 

## About

PachW processes storage tasks (like compaction) and url tasks (like uploads and downloads) in a distributed way. Your main PachD instance scales the number of PachW instances used based on the number of tasks counted. By default, PachW can only scale up to a max of 1 replica. You can also set the resources used by PachW instances. 

The type of work that PachW does is most affected by cpu and network bandwidth available.

### How to Calculate maxReplica Value
You should set the `maxReplicas` value to **at least match the number of pipeline replicas that you have**. For high performance, we suggest taking the following approach:

> `number of pipelines * highest parallelism spec * 1.5 = maxReplicas`

Let's say you have 6 pipelines. One of these pipelines has a [parallelism spec](../../pipeline-spec/parallelism) value of 6, and the rest are 5 or fewer. 

> `6 * 6 * 1.5 = 54`


## Values 

{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="Default"  state="active"%}}
{{% wizardButton option="With Minimum" %}}
{{% wizardButton option="As Sidecars"  %}}

{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="options/default" %}}

```s
pachw:
  maxReplicas: 1
  ```

{{% /wizardResult %}}


{{% wizardResult val1="options/with-minimum" %}}
```s
pachw:
  maxReplicas: 6 # set to match the number of pipline replicas you have; sample formula: pipeline count * paralellism = target maxReplicas
  minReplicas: 1
  #resources: # sets kubernetes resource configuration for pachw pods. If not defined, config from pachd is reused. We recommend defining resources when running pachw with a high value of maxReplicas (when formula is: target maxReplicas * 1.5).
   #limits:
     #cpu: "1"
     #memory: "2G"
   #requests:
     #cpu: "1"
   #memory: "2G"
```

{{% /wizardResult %}}

{{% wizardResult val1="options/as-sidecars" %}}
```s
pachw:
  inSidecars: true # processes storage related tasks in pipeline storage sidecars like version 2.4.2 or less.
  maxReplicas: 1
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack >}}

{{% notice note %}}
Looking for a comprehensive list of all attributes and comments? [View a complete values.yml file.](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml)
{{% /notice %}}