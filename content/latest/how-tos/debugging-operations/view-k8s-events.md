---
# metadata # 
title:  View Kubernetes Logs
description: View the Kubernetes Log using PachCTL. 
date: 
# taxonomy #
tags: 
series:
seriesPart:
weight: 
---

The `kube-event-tail` pod in your Pachyderm cluster stores Kubernetes logs which are discarded after a certain amount of time. You can view these logs to obtain insights on key events. There are three event types: informational, warning, and error.

## How to View Kubernetes Logs

1. Open a terminal.
2. Input the following command, replacing `user command` with pachctl terms:
```s
pachctl  kube-events
```
3. Review logs.

```s
LAST SEEN      TYPE    REASON            OBJECT                                         MESSAGE                                                                          
20 minutes ago         ScalingReplicaSet Deployment/pachd                               Scaled up replica set pachd-84f599bccd to 1                                      
19 minutes ago         ScalingReplicaSet Deployment/pachd                               Scaled down replica set pachd-65fc687687 to 0 from 1                             
21 minutes ago         SandboxChanged    Pod/pachyderm-kube-event-tail-84bdc9977d-zkch9 Pod sandbox changed, it will be killed and re-created.                           
21 minutes ago         Pulled            Pod/pachyderm-kube-event-tail-84bdc9977d-zkch9 Container image "pachyderm/kube-event-tail:v0.0.7" already present on machine    
21 minutes ago         Created           Pod/pachyderm-kube-event-tail-84bdc9977d-zkch9 Created container kube-event-tail                                                
21 minutes ago         Started           Pod/pachyderm-kube-event-tail-84bdc9977d-zkch9 Started container kube-event-tail                                                
21 minutes ago         SandboxChanged    Pod/pachyderm-loki-0                           Pod sandbox changed, it will be killed and re-created.                           
21 minutes ago         Pulled            Pod/pachyderm-loki-0                           Container image "grafana/loki:2.6.1" already present on machine                  
21 minutes ago         Created           Pod/pachyderm-loki-0                           Created container loki                                                           
21 minutes ago         Started           Pod/pachyderm-loki-0                           Started container loki                                                           
20 minutes ago Warning Unhealthy         Pod/pachyderm-loki-0                           Readiness probe failed: HTTP probe failed with statuscode: 503                   
20 minutes ago Warning Unhealthy         Pod/pachyderm-loki-0                           Liveness probe failed: HTTP probe failed with statuscode: 503                    
21 minutes ago         SandboxChanged    Pod/pachyderm-promtail-b8plv                   Pod sandbox changed, it will be killed and re-created.                           
21 minutes ago         Pulled            Pod/pachyderm-promtail-b8plv                   Container image "docker.io/grafana/promtail:2.6.1" already present on machine    
21 minutes ago         Created           Pod/pachyderm-promtail-b8plv                   Created container promtail                                                       
21 minutes ago         Started           Pod/pachyderm-promtail-b8plv                   Started container promtail                                                       
21 minutes ago         SandboxChanged    Pod/pachyderm-proxy-7d757c85bb-zp5ht           Pod sandbox changed, it will be killed and re-created.                           
21 minutes ago         Pulled            Pod/pachyderm-proxy-7d757c85bb-zp5ht           Container image "envoyproxy/envoy-distroless:v1.24.1" already present on machine 
21 minutes ago         Created           Pod/pachyderm-proxy-7d757c85bb-zp5ht           Created container envoy                                                          
21 minutes ago         Started           Pod/pachyderm-proxy-7d757c85bb-zp5ht           Started container envoy                                                          
21 minutes ago Warning Unhealthy         Pod/pachyderm-proxy-7d757c85bb-zp5ht           Readiness probe failed: HTTP probe failed with statuscode: 503                   
21 minutes ago         SandboxChanged    Pod/pg-bouncer-746bb45867-hgd57                Pod sandbox changed, it will be killed and re-created.                           
21 minutes ago         Pulled            Pod/pg-bouncer-746bb45867-hgd57                Container image "pachyderm/pgbouncer:1.16.2" already present on machine          
21 minutes ago         Created           Pod/pg-bouncer-746bb45867-hgd57                Created container pg-bouncer                                                     
21 minutes ago         Started           Pod/pg-bouncer-746bb45867-hgd57                Started container pg-bouncer                                                     
20 minutes ago Warning Unhealthy         Pod/pg-bouncer-746bb45867-hgd57                Liveness probe failed: psql: error: FATAL:  pgbouncer cannot connect to server
               
21 minutes ago         SandboxChanged Pod/pipeline-joins-inner-join-v1-pfrnh   Pod sandbox changed, it will be killed and re-created.                                 
21 minutes ago         Pulled         Pod/pipeline-joins-inner-join-v1-pfrnh   Container image "pachyderm/worker:2.5.0-alpha.4" already present on machine            
21 minutes ago         Created        Pod/pipeline-joins-inner-join-v1-pfrnh   Created container init                                                                 
21 minutes ago         Started        Pod/pipeline-joins-inner-join-v1-pfrnh   Started container init                                                                 
21 minutes ago         Pulled         Pod/pipeline-joins-inner-join-v1-pfrnh   Container image "pachyderm/example-joins-inner-outer:2.1.0" already present on machine 
21 minutes ago         Created        Pod/pipeline-joins-inner-join-v1-pfrnh   Created container user                                                                 
21 minutes ago         Started        Pod/pipeline-joins-inner-join-v1-pfrnh   Started container user                                                                 
20 minutes ago         Pulled         Pod/pipeline-joins-inner-join-v1-pfrnh   Container image "pachyderm/pachd:2.5.0-alpha.4" already present on machine             
20 minutes ago         Created        Pod/pipeline-joins-inner-join-v1-pfrnh   Created container storage                                                              
20 minutes ago         Started        Pod/pipeline-joins-inner-join-v1-pfrnh   Started container storage                                                              
20 minutes ago Warning BackOff        Pod/pipeline-joins-inner-join-v1-pfrnh   Back-off restarting failed container                                                   
19 minutes ago         Killing        Pod/pipeline-joins-inner-join-v1-pfrnh   Stopping container user                                                                
19 minutes ago         Killing        Pod/pipeline-joins-inner-join-v1-pfrnh   Stopping container storage                                                             
21 minutes ago         SandboxChanged Pod/pipeline-joins-reduce-inner-v1-jjx6w Pod sandbox changed, it will be killed and re-created.                                 
21 minutes ago         Pulled         Pod/pipeline-joins-reduce-inner-v1-jjx6w Container image "pachyderm/worker:2.5.0-alpha.4" already present on machine            
21 minutes ago         Created        Pod/pipeline-joins-reduce-inner-v1-jjx6w Created container init                                                                 
21 minutes ago         Started        Pod/pipeline-joins-reduce-inner-v1-jjx6w Started container init                                                                 
21 minutes ago         Pulled         Pod/pipeline-joins-reduce-inner-v1-jjx6w Container image "ubuntu:20.04" already present on machine                              
21 minutes ago         Created        Pod/pipeline-joins-reduce-inner-v1-jjx6w Created container user                                                                 
21 minutes ago         Started        Pod/pipeline-joins-reduce-inner-v1-jjx6w Started container user                                                                 
20 minutes ago         Pulled         Pod/pipeline-joins-reduce-inner-v1-jjx6w Container image "pachyderm/pachd:2.5.0-alpha.4" already present on machine             
20 minutes ago         Created        Pod/pipeline-joins-reduce-inner-v1-jjx6w Created container storage                                                              
LAST SEEN      TYPE    REASON         OBJECT                                   MESSAGE                                                                            
20 minutes ago         Started        Pod/pipeline-joins-reduce-inner-v1-jjx6w Started container storage                                                          
20 minutes ago Warning BackOff        Pod/pipeline-joins-reduce-inner-v1-jjx6w Back-off restarting failed container                                               
19 minutes ago         Killing        Pod/pipeline-joins-reduce-inner-v1-jjx6w Stopping container user                                                            
19 minutes ago         Killing        Pod/pipeline-joins-reduce-inner-v1-jjx6w Stopping container storage                                                         
21 minutes ago         SandboxChanged Pod/postgres-0                           Pod sandbox changed, it will be killed and re-created.                             
21 minutes ago         Pulled         Pod/postgres-0                           Container image "docker.io/pachyderm/postgresql:13.3.0" already present on machine 
21 minutes ago         Created        Pod/postgres-0                           Created container postgres                                                         
21 minutes ago         Started        Pod/postgres-0                           Started container postgres   
```

## Key Events

|Event|Description|
|-|-|
|CrashLoopBackOff| When a pod starts, crashes, starts again, and then crashes again|
|ImagePullBackOff|When a pod starts, crashes, starts again, and then crashes again|
|Evicted| When a node determines that a pod needs to be evicted or terminated to free up some resources (CPU, memory...etc).|
|FailedMount / FailedAttachVolume| When pods require a persistent volume or storage, this event prevents them from starting if the storage is not accessible.|
|FailedSchedulingEvents|When the scheduler is not able to find a node to run your pods.|
|NodeNotReady| When a node cannot be used to run a pod because of an underlying issue.|