---
# metadata # 
title:  View User Logs
description: View a list of user-entered commands using pachctl. 
date: 
# taxonomy #
tags: 
series:
seriesPart:
weight: 
---



## How to View User Logs 

1. Open a terminal.
2. Input the following command, replacing `user command` with pachctl terms:
```s
pachctl logs | grep 'user command'
```
3. Review logs.
```s
pachctl logs | grep 'create project'
{"log":"{\"severity\":\"info\",\"time\":\"2023-01-24T15:46:35.447335088Z\",\"logger\":\"grpc.admin_v2.API/InspectCluster\",\"caller\":\"logging/interceptor.go:529\",\"message\":\"request for admin_v2.API/InspectCluster\",\"service\":\"admin_v2.API\",\"method\":\"InspectCluster\",\"x-request-id\":[\"3384fceb-68a7-4003-92ad-3bc8102d9e72\"],\"command\":[\"pachctl create project dogs\"],\"peer\":\"10.1.5.2:50784\",\"request\":\"client_version:\u003cmajor:2 minor:5 additional:\\\"-alpha.4\\\" git_commit:\\\"1a252e4f760513c820353d47227009472213713a\\\" git_tree_modified:\\\"true\\\" build_date:\\\"2023-01-19T22:43:41Z\\\" go_version:\\\"go1.19.5\\\" platform:\\\"arm64\\\" \u003e \"}\n","stream":"stderr","time":"2023-01-24T15:46:35.447552838Z"}
{"log":"{\"severity\":\"info\",\"time\":\"2023-01-24T15:46:35.447439005Z\",\"logger\":\"grpc.admin_v2.API/InspectCluster\",\"caller\":\"logging/interceptor.go:529\",\"message\":\"response for admin_v2.API/InspectCluster\",\"service\":\"admin_v2.API\",\"method\":\"InspectCluster\",\"x-request-id\":[\"3384fceb-68a7-4003-92ad-3bc8102d9e72\"],\"command\":[\"pachctl create project dogs\"],\"peer\":\"10.1.5.2:50784\",\"response\":\"id:\\\"9d417960076d4f63969254424a25a651\\\" deployment_id:\\\"LImXqySxvSBudquUR0vlohA1NeHnsTrr\\\" version_warnings_ok:true \",\"messagesSent\":1,\"messagesReceived\":1,\"grpc.code\":0,\"duration\":0.000194958}\n","stream":"stderr","time":"2023-01-24T15:46:35.448185588Z"}
{"log":"{\"severity\":\"info\",\"time\":\"2023-01-24T15:46:35.452357963Z\",\"logger\":\"grpc.pfs_v2.API/CreateProject\",\"caller\":\"logging/interceptor.go:529\",\"message\":\"request for pfs_v2.API/CreateProject\",\"service\":\"pfs_v2.API\",\"method\":\"CreateProject\",\"x-request-id\":[\"b1fd3d34-7fd1-4ca1-bcb3-6130b3ece8e8\"],\"command\":[\"pachctl create project dogs\"],\"peer\":\"10.1.5.2:50784\",\"request\":\"project:\u003cname:\\\"dogs\\\" \u003e \"}\n","stream":"stderr","time":"2023-01-24T15:46:35.452537213Z"}
{"log":"{\"severity\":\"info\",\"time\":\"2023-01-24T15:46:35.465953046Z\",\"logger\":\"grpc.pfs_v2.API/CreateProject\",\"caller\":\"logging/interceptor.go:529\",\"message\":\"response for pfs_v2.API/CreateProject\",\"service\":\"pfs_v2.API\",\"method\":\"CreateProject\",\"x-request-id\":[\"b1fd3d34-7fd1-4ca1-bcb3-6130b3ece8e8\"],\"command\":[\"pachctl create project dogs\"],\"peer\":\"10.1.5.2:50784\",\"messagesSent\":1,\"messagesReceived\":1,\"grpc.code\":0,\"duration\":0.013663667}\n","stream":"stderr","time":"2023-01-24T15:46:35.46607713Z"}
{"log":"{\"severity\":\"info\",\"time\":\"2023-01-24T15:46:39.028400256Z\",\"logger\":\"grpc.admin_v2.API/InspectCluster\",\"caller\":\"logging/interceptor.go:529\",\"message\":\"request for admin_v2.API/InspectCluster\",\"service\":\"admin_v2.API\",\"method\":\"InspectCluster\",\"x-request-id\":[\"714c04e7-d180-4182-9230-3ec27e554d97\"],\"command\":[\"pachctl create project cats\"],\"peer\":\"10.1.5.2:60084\",\"request\":\"client_version:\u003cmajor:2 minor:5 additional:\\\"-alpha.4\\\" git_commit:\\\"1a252e4f760513c820353d47227009472213713a\\\" git_tree_modified:\\\"true\\\" build_date:\\\"2023-01-19T22:43:41Z\\\" go_version:\\\"go1.19.5\\\" platform:\\\"arm64\\\" \u003e \"}\n","stream":"stderr","time":"2023-01-24T15:46:39.028511715Z"}
{"log":"{\"severity\":\"info\",\"time\":\"2023-01-24T15:46:39.028438673Z\",\"logger\":\"grpc.admin_v2.API/InspectCluster\",\"caller\":\"logging/interceptor.go:529\",\"message\":\"response for admin_v2.API/InspectCluster\",\"service\":\"admin_v2.API\",\"method\":\"InspectCluster\",\"x-request-id\":[\"714c04e7-d180-4182-9230-3ec27e554d97\"],\"command\":[\"pachctl create project cats\"],\"peer\":\"10.1.5.2:60084\",\"response\":\"id:\\\"9d417960076d4f63969254424a25a651\\\" deployment_id:\\\"LImXqySxvSBudquUR0vlohA1NeHnsTrr\\\" version_warnings_ok:true \",\"messagesSent\":1,\"messagesReceived\":1,\"grpc.code\":0,\"duration\":0.000077375}\n","stream":"stderr","time":"2023-01-24T15:46:39.028556673Z"}
{"log":"{\"severity\":\"info\",\"time\":\"2023-01-24T15:46:39.030396298Z\",\"logger\":\"grpc.pfs_v2.API/CreateProject\",\"caller\":\"logging/interceptor.go:529\",\"message\":\"request for pfs_v2.API/CreateProject\",\"service\":\"pfs_v2.API\",\"method\":\"CreateProject\",\"x-request-id\":[\"a0beac90-f6ad-4c49-8a39-188076e3d03d\"],\"command\":[\"pachctl create project cats\"],\"peer\":\"10.1.5.2:60084\",\"request\":\"project:\u003cname:\\\"cats\\\" \u003e \"}\n","stream":"stderr","time":"2023-01-24T15:46:39.030474673Z"}
{"log":"{\"severity\":\"info\",\"time\":\"2023-01-24T15:46:39.031706548Z\",\"logger\":\"grpc.pfs_v2.API/CreateProject\",\"caller\":\"logging/interceptor.go:529\",\"message\":\"response for pfs_v2.API/CreateProject\",\"service\":\"pfs_v2.API\",\"method\":\"CreateProject\",\"x-request-id\":[\"a0beac90-f6ad-4c49-8a39-188076e3d03d\"],\"command\":[\"pachctl create project cats\"],\"peer\":\"10.1.5.2:60084\",\"messagesSent\":1,\"messagesReceived\":1,\"grpc.code\":0,\"duration\":0.001327458}\n","stream":"stderr","time":"2023-01-24T15:46:39.031799756Z"}
```

## Useful Search Terms

|Command
|-|
|delete branch|
|delete commit|
|delete file|
|delete job|
|delete pipeline|
|delete repo|
|delete secret|
|delete transaction|
|edit pipeline|

