---
# metadata # 
title:  Proxy HCVs
description: Centralize all Pachyderm traffic on a single port that's safe to expose to the Internet. 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 14
label: required 
--- 

Proxy is a service that handles all Pachyderm traffic (S3, Console, OIDC, Dex, GRPC) on a single port; It's great for exposing directly to the Internet. 

{{% notice warning %}}
Proxy will soon be the mandatory way to interact with Pachyderm, replacing [Ingress](../ingress). See [Upgrade to Embedded Proxy](../../../deploy-manage/deploy/deploy-w-proxy/) for more details.
{{% /notice %}}

## Values

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


{{< stack type="wizard">}}

{{% wizardRow id="Options"%}}
{{% wizardButton option="Load Balancer" state="active" %}}
{{% wizardButton option="With Legacy Ports" %}}
{{% wizardButton option="Node Port"  %}}

{{% /wizardRow %}}

{{% wizardResults %}}

{{% wizardResult val1="options/load-balancer" %}}


```s
proxy:
  enabled: true
  host: "" # the external hostname (including port if nonstandard) that the proxy will be reachable at.
  replicas: 1 # each replica can handle 50,000 concurrent connections. There is an affinity rule to prefer scheduling the proxy pods on the same node as pachd, so a number here that matches the number of pachd replicas is a fine configuration. (Note that we don't guarantee to keep the proxy<->pachd traffic on-node or even in-region.)
  image:
    repository: "envoyproxy/envoy"
    tag: "v1.22.0"
    pullPolicy: "IfNotPresent"
  resources:
    requests:
      cpu: 100m
      memory: 512Mi
    limits:
      memory: 512Mi # proxy sheds traffic before using 500MB of RAM.
  labels: {}
  annotations: {}
  service:  # configures the service that routes traffic to the proxy.
    type: LoadBalancer # can be ClusterIP, NodePort, or LoadBalancer.
    loadBalancerIP: "" # If the service is a LoadBalancer, you can specify the IP address to use; defaults to 80.
    httpPort: 80  # The port to serve plain HTTP traffic on.
    httpsPort: 443 # The port to serve HTTPS traffic on, if enabled below.
    annotations: {}
    labels: {} # adds labels to the service itself (not the selector!).
  tls: # Incompatible with legacy ports. 
    enabled: false
    secretName: "" # must contain "tls.key" and "tls.crt" keys; generate with  kubectl create secret tls <name> --key=tls.key --cert=tls.cert"
    secret: {} #  generate the secret from values here.  This is intended only for unit tests.
```

{{% /wizardResult %}}

{{% wizardResult val1="options/with-legacy-ports" %}}


```s
proxy:
  enabled: true
  host: "" # the external hostname (including port if nonstandard) that the proxy will be reachable at.
  replicas: 1 # each replica can handle 50,000 concurrent connections. There is an affinity rule to prefer scheduling the proxy pods on the same node as pachd, so a number here that matches the number of pachd replicas is a fine configuration. (Note that we don't guarantee to keep the proxy<->pachd traffic on-node or even in-region.)
  image:
    repository: "envoyproxy/envoy"
    tag: "v1.22.0"
    pullPolicy: "IfNotPresent"
  resources:
    requests:
      cpu: 100m
      memory: 512Mi
    limits:
      memory: 512Mi # proxy sheds traffic before using 500MB of RAM.
  labels: {}
  annotations: {}
  service:  # configures the service that routes traffic to the proxy.
    type: LoadBalancer # can be ClusterIP, NodePort, or LoadBalancer.
    loadBalancerIP: "" # If the service is a LoadBalancer, you can specify the IP address to use; defaults to 80.
    httpPort: 80  # The port to serve plain HTTP traffic on.
    httpsPort: 443 # The port to serve HTTPS traffic on, if enabled below.
    annotations: {}
    labels: {} # adds labels to the service itself (not the selector!).
    legacyPorts: # proxy  can serve backend services on a numbered port if not set to 0.  If this service is of type NodePort, the port numbers here will be used for the node port, and will need to be in the node port range.
      console: 0 # legacy 30080, conflicts with default httpNodePort
      grpc: 0 # legacy 30650
      s3Gateway: 0 # legacy 30600
      oidc: 0 # legacy 30657
      identity: 0 # legacy 30658
      metrics: 0 # legacy 30656
```

{{% /wizardResult %}}

{{% wizardResult val1="options/node-port" %}}


```s
proxy:
  enabled: true
  host: "" # the external hostname (including port if nonstandard) that the proxy will be reachable at.
  replicas: 1 # each replica can handle 50,000 concurrent connections. There is an affinity rule to prefer scheduling the proxy pods on the same node as pachd, so a number here that matches the number of pachd replicas is a fine configuration. (Note that we don't guarantee to keep the proxy<->pachd traffic on-node or even in-region.)
  image:
    repository: "envoyproxy/envoy"
    tag: "v1.22.0"
    pullPolicy: "IfNotPresent"
  resources:
    requests:
      cpu: 100m
      memory: 512Mi
    limits:
      memory: 512Mi # proxy sheds traffic before using 500MB of RAM.
  labels: {}
  annotations: {}
  service:  # configures the service that routes traffic to the proxy.
    type: NodePort # can be ClusterIP, NodePort, or LoadBalancer.
    httpPort: 80  # The port to serve plain HTTP traffic on.
    httpsPort: 443 # The port to serve HTTPS traffic on, if enabled below.
    httpNodePort: 30080 # If the service is a NodePort, you can specify the port to receive HTTP traffic on.
    httpsNodePort: 30443
    annotations: {}
    labels: {} # adds labels to the service itself (not the selector!).
    legacyPorts: # proxy can serve backend services on a numbered port if not set to 0.  If this service is of type NodePort, the port numbers here will be used for the node port, and will need to be in the node port range.
      console: 0 # legacy 30080, conflicts with default httpNodePort
      grpc: 0 # legacy 30650
      s3Gateway: 0 # legacy 30600
      oidc: 0 # legacy 30657
      identity: 0 # legacy 30658
      metrics: 0 # legacy 30656
```

{{% /wizardResult %}}

{{% /wizardResults %}}

{{< /stack>}}
  
