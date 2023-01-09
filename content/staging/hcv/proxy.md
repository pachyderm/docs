---
# metadata # 
title:  Proxy HCVs
description: 
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 14
--- 

## Values 

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


```s

# The proxy is a service to handle all Pachyderm traffic (S3, Console, OIDC, Dex, GRPC) on a single
# port; good for exposing directly to the Internet.
proxy:
  # If enabled, create a proxy deployment (based on the Envoy proxy) and a service to expose it.  If
  # ingress is also enabled, any Ingress traffic will be routed through the proxy before being sent
  # to pachd or Console.
  enabled: false
  # The external hostname (including port if nonstandard) that the proxy will be reachable at.
  # If you have ingress enabled and an ingress hostname defined, the proxy will use that.
  # Ingress will be deprecated in the future so configuring the proxy host instead is recommended.
  host: ""
  # The number of proxy replicas to run.  1 should be fine, but if you want more for higher
  # availability, that's perfectly reasonable.  Each replica can handle 50,000 concurrent
  # connections.  There is an affinity rule to prefer scheduling the proxy pods on the same node as
  # pachd, so a number here that matches the number of pachd replicas is a fine configuration.
  # (Note that we don't guarantee to keep the proxy<->pachd traffic on-node or even in-region.)
  replicas: 1
  # The envoy image to pull.
  image:
    repository: "envoyproxy/envoy"
    tag: "v1.22.0"
    pullPolicy: "IfNotPresent"
  # Set up resources.  The proxy is configured to shed traffic before using 500MB of RAM, so that's
  # a resonable memory limit.  It doesn't need much CPU.
  resources:
    requests:
      cpu: 100m
      memory: 512Mi
    limits:
      memory: 512Mi
  # Any additional labels to add to the pods.  These are also added to the deployment and service
  # selectors.
  labels: {}
  # Any additional annotations to add to the pods.
  annotations: {}
  # Configure the service that routes traffic to the proxy.
  service:
    # The type of service can be ClusterIP, NodePort, or LoadBalancer.
    type: ClusterIP
    # If the service is a LoadBalancer, you can specify the IP address to use.
    loadBalancerIP: ""
    # The port to serve plain HTTP traffic on.
    httpPort: 80
    # The port to serve HTTPS traffic on, if enabled below.
    httpsPort: 443
    # If the service is a NodePort, you can specify the port to receive HTTP traffic on.
    httpNodePort: 30080
    httpsNodePort: 30443
    # Any additional annotations to add.
    annotations: {}
    # Any additional labels to add to the service itself (not the selector!).
    labels: {}
    # The proxy can also serve each backend service on a numbered port, and will do so for any port
    # not numbered 0 here.  If this service is of type NodePort, the port numbers here will be used
    # for the node port, and will need to be in the node port range.
    legacyPorts:
      console: 0 # legacy 30080, conflicts with default httpNodePort
      grpc: 0 # legacy 30650
      s3Gateway: 0 # legacy 30600
      oidc: 0 # legacy 30657
      identity: 0 # legacy 30658
      metrics: 0 # legacy 30656
  # Configuration for TLS (SSL, HTTPS).
  tls:
    # If true, enable TLS serving.  Enabling TLS is incompatible with support for legacy ports (you
    # can't get a generally-trusted certificate for port numbers), and disables support for
    # cleartext communication (cleartext requests will redirect to the secure server, and HSTS
    # headers are set to prevent downgrade attacks).
    #
    # Note that if you are planning on putting the proxy behind an ingress controller, you probably
    # want to configure TLS for the ingress controller, not the proxy.  This is intended for the
    # case where the proxy is exposed directly to the Internet.  (It is possible to have your
    # ingress controller talk to the proxy over TLS, in which case, it's fine to enable TLS here in
    # addition to in the ingress section above.)
    enabled: false
    # The secret containing "tls.key" and "tls.crt" keys that contain PEM-encoded private key and
    # certificate material.  Generate one with "kubectl create secret tls <name> --key=tls.key
    # --cert=tls.cert".  This format is compatible with the secrets produced by cert-manager, and
    # the proxy will pick up new data when cert-manager rotates the certificate.
    secretName: ""
    # If set, generate the secret from values here.  This is intended only for unit tests.
    secret: {}
```

The proxy is a service to handle all Pachyderm traffic (S3, Console, OIDC, Dex, GRPC) on a single port exposed directly to the Internet.

- `proxy.enabled` when set to `true`, create a proxy deployment and a service to expose it. If
ingress is also enabled, any ingress traffic will be routed through the proxy before being sent.

- `proxy.replicas` : The number of proxy replicas to run.  1 is a default but can be increased
for higher availability. Each replica can handle 50,000 concurrent connections. There is an affinity rule to prefer scheduling the proxy pods **on the same node as pachd**, so a number here that matches the number of pachd replicas is a fine configuration. Use this setting to scale pachd instances horizontally; horizontal scaling spreads the load from PFS across each instance.
  
{{% notice note %}}
 We don't guarantee to keep the proxy<->pachd traffic on-node or even in-region.
{{% /notice %}}

- `proxy.image` specifies the details of the proxy image to pull.  THe following fields can be left at the defaults unless instructed.

    - `proxy.image.repository` the proxy image repository. Defaults to "envoyproxy/envoy".
    - `proxy.image. tag` the tag of the proxy image.
    - `proxy.image.pullPolicy` the proxy image pull policy. Defaults to "IfNotPresent".
  
  - `proxy.resources` specifies the proxy ressources. The proxy is configured to shed traffic before using 500MB of RAM, so that's a resonable memory limit.  It doesn't need much CPU.

    - `proxy.resources.requests`

      - `proxy.resources.requests.cpu` defaults to 100m
      - `proxy.resources.requests.memory` defaults to 512Mi

    - `proxy.resources.limits.memory` sets the proxy memory limit. defaults to 512Mi.

  - `proxy.labels`  list any additional labels to add to the pods.  These are also added to the deployment and service selectors.

  - `proxy.annotations` list any additional annotations to add to the pods.

  - `proxy.service` this section configure the service that routes traffic to the proxy.

     - `proxy.service.type` The type of service can be **ClusterIP**, **NodePort**, or **LoadBalancer**. Defaults to ClusterIP.

         - If the service is a **LoadBalancer**, you can specify the IP `proxy.service.loadBalancerIP` address to use, the port to serve plain HTTP traffic on `proxy.service.httpPort` (defaults to 80), the port to serve HTTPS traffic on `proxy.service.httpsPort` (defaults to 443), if enabled below.
         - If the service is a **NodePort**, you can specify the port to receive HTTP traffic on `proxy.service.httpNodePort` (defaults to 30080), and `proxy.service.httpsNodePort` (defaults to 30443).

     - `proxy.service.annotations` list any additional annotations to add.

     - `proxy.service.labels` list any additional labels to add to the service itself (not the selector!).

     - `proxy.service.legacyPorts` The proxy can also serve each backend service on a numbered port, and will do so for any port not numbered 0.  If this service is of type NodePort, the port numbers will be used for the node port, and will need to be in the node port range.
    
        - `proxy.service.legacyPorts.console` defaults to 0, legacy 30080, conflicts with default httpNodePort
        - `proxy.service.legacyPorts.grpc` defaults to 0, legacy 30650
        - `proxy.service.legacyPorts.s3Gateway` defaults to 0, legacy 30600
        - `proxy.service.legacyPorts.oidc` defaults to 0, legacy 30657
        - `proxy.service.legacyPorts.identity` defaults to 0, legacy 30658
        - `proxy.service.legacyPorts.metrics` defaults to 0, legacy 30656

  - `proxy.tls.enabled` enable TLS (SSL, HTTPS) serving when `true`.  Enabling TLS is incompatible with support for legacy ports (you can't get a generally-trusted certificate for port numbers), and disables support for cleartext communication (cleartext requests will redirect to the secure server, and HSTS headers are set to prevent downgrade attacks).

  - `proxy.tls.secretName` The secret containing "tls.key" and "tls.crt" keys that contain PEM-encoded private key and certificate material.  Generate one with "kubectl create secret tls <name> --key=tls.key --cert=tls.cert".  This format is compatible with the secrets produced by cert-manager.
 