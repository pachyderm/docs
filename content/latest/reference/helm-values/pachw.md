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

PachW enables fine-grained control of where compaction and object-storage interaction occur by running storage tasks in a dedicated Kubernetes deployment. Users can configure PachW's min and max replicas as well as define nodeSelectors, tolerations, and resource requests. Using PachW allows power users to save on costs by claiming fewer resources and running storage tasks on less expensive nodes.



{{% notice warning %}}
If you are upgrading to **2.5.0+** for the first time and you wish to use PachW, you must calculate how many maxReplicas you need. By defalut, PachW is set to `maxReplicas:1`  --- however, that is not sufficient for production runs.
{{% /notice %}}


### maxReplica
You should set the `maxReplicas` value to **at least match the number of pipeline replicas that you have**. For high performance, we suggest taking the following approach:

> `number of pipelines * highest parallelism spec * 1.5 = maxReplicas`

Let's say you have 6 pipelines. One of these pipelines has a [parallelism spec](../../pipeline-spec/parallelism) value of 6, and the rest are 5 or fewer. 

> `6 * 6 * 1.5 = 54`

### minReplica 

Workloads that constantly process storage and compaction tasks because they are committing rapidly may want to increase minReplicas to have instances on standby

### nodeSelectors

Workloads that utilize GPUs and other expensive resources may want to add a node selector to scope PachW instances to less expensive nodes.



## Values 

{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="Enabled"  state="active"%}}
{{% wizardButton option="With Minimum" %}}
{{% wizardButton option="With Specific Resources"  %}}
{{% wizardButton option="As Sidecars (Legacy)"  %}}

{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="options/enabled" %}}

```s
pachw:
  inheritFromPachd: true # defaults below configuration options like 'resources' and 'tolerations' to  values from pachd
  maxReplicas: 1
  minReplicas: 0
  inSidecars: false
  #tolerations: []
  #affinity: {}
  #nodeSelector: {}
  ```

{{% /wizardResult %}}


{{% wizardResult val1="options/with-minimum" %}}
```s
pachw:
  inheritFromPachd: true # defaults below configuration options like 'resources' and 'tolerations' to  values from pachd
  maxReplicas: 6 # set to match the number of pipline replicas you have; sample formula: pipeline count * paralellism = target maxReplicas
  minReplicas: 1
  #tolerations: []
  #affinity: {}
  #nodeSelector: {}
  #resources: # sets kubernetes resource configuration for pachw pods. If not defined, config from pachd is reused. We recommend defining resources when running pachw with a high value of maxReplicas (when formula is: target maxReplicas * 1.5).
   #limits:
     #cpu: "1"
     #memory: "2G"
   #requests:
     #cpu: "1"
   #memory: "2G"
```

{{% /wizardResult %}}

{{% wizardResult val1="options/with-specific-resources" %}}
```s
pachw:
  inheritFromPachd: false # defaults below configuration options like 'resources' and 'tolerations' to  values from pachd
  maxReplicas: 6 # set to match the number of pipline replicas you have; sample formula: pipeline count * paralellism = target maxReplicas
  minReplicas: 1
  #tolerations: []
  #affinity: {}
  #nodeSelector: {}
  resources: # sets kubernetes resource configuration for pachw pods. If not defined, config from pachd is reused. We recommend defining resources when running pachw with a high value of maxReplicas (when formula is: target maxReplicas * 1.5).
   limits:
     cpu: "1"
     memory: "2G"
   requests:
     cpu: "1"
   memory: "2G"
```

{{% /wizardResult %}}

{{% wizardResult val1="options/as-sidecars-legacy" %}}
```s
pachw:
  inheritFromPachd: true # defaults below configuration options like 'resources' and 'tolerations' to  values from pachd
  inSidecars: true # processes storage related tasks in pipeline storage sidecars like version 2.4.2 or less.
  maxReplicas: 1
  #tolerations: []
  #affinity: {}
  #nodeSelector: {}
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{</stack >}}

{{% notice note %}}
Looking for a comprehensive list of all attributes and comments? [View a complete values.yml file.](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/etc/helm/pachyderm/values.yaml)
{{% /notice %}}