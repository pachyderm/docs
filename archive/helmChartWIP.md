
{{<stack type="wizard">}}
{{% wizardRow id="Deploy Target" %}}
{{% wizardButton  option="Local" state="active" %}}
{{% wizardButton  option="Amazon" %}}
{{% wizardButton  option="Microsoft" %}}
{{% wizardButton  option="Minio" %}}
{{% wizardButton  option="Custom" %}}
{{% /wizardRow %}}
{{% wizardRow id="Proxy"%}}
{{% wizardButton  option="Yes" %}}
{{% wizardButton  option="No" state="active" %}}
{{% /wizardRow %}}
{{% wizardRow id="OAuth"%}}
{{% wizardButton  option="Yes" %}}
{{% wizardButton  option="No" state="active" %}}
{{% /wizardRow %}}
{{% wizardRow id="Enterprise Server"%}}
{{% wizardButton  option="Yes" %}}
{{% wizardButton  option="No" state="active" %}}
{{% /wizardRow %}}
{{% wizardRow id="Ingress"%}}
{{% wizardButton  option="Yes" %}}
{{% wizardButton  option="No" state="active" %}}
{{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="deploy-target/local" val2="proxy/no" val3="oauth/no" val4="enterprise-server/no" val5="ingress/no" %}}

```yaml
# SPDX-FileCopyrightText: Pachyderm, Inc. <info@pachyderm.com>
# SPDX-License-Identifier: Apache-2.0
# See docs.pachyderm.com for attribute descriptions
deployTarget: "LOCAL"

global:
  postgresql:
    postgresqlAuthType: "md5" 
    postgresqlUsername: "pachyderm"
    postgresqlPassword: "insecure-user-password"
    postgresqlPostgresPassword: "insecure-root-password"
    postgresqlExistingSecretName: ""
    postgresqlExistingSecretKey: ""
    postgresqlDatabase: "pachyderm"
    postgresqlHost: "postgres"
    postgresqlPort: "5432"
    postgresqlSSL: "disable"
    postgresqlSSLCACert: ""
    postgresqlSSLSecret: ""
    identityDatabaseFullNameOverride: ""
  imagePullSecrets: []
  customCaCerts: false
  securityContexts:
    enabled: true

console:
  enabled: true
  annotations: {}
  image:
    repository: "pachyderm/haberdashery"
    pullPolicy: "IfNotPresent"
    tag: "{{% latestPatchVersion %}}"
  priorityClassName: ""
  nodeSelector: {}
  tolerations: []
  podLabels: {}
  resources:
    {}
  config:
    graphqlPort: 4000
    pachdAddress: "pachd-peer:30653"
    disableTelemetry: false 
  service:
    annotations: {}
    labels: {}
    type: ClusterIP

etcd:
  affinity: {}
  annotations: {}
  dynamicNodes: 1
  image:
    repository: "pachyderm/etcd"
    tag: "v3.5.1"
    pullPolicy: "IfNotPresent"
  maxTxnOps: 10000
  priorityClassName: ""
  nodeSelector: {}
  podLabels: {}
  resources:
    {}
  storageClass: ""

  storageSize: 10Gi
  service:
    annotations: {}
    labels: {}
    type: ClusterIP
  tolerations: []

enterpriseServer:
  enabled: false

ingress:
  enabled: false

loki-stack:
  loki:
    serviceAccount:
      automountServiceAccountToken: false
    persistence:
      enabled: true
      accessModes:
        - ReadWriteOnce
      size: 10Gi
      storageClassName: ""
      annotations: {}
      priorityClassName: ""
      nodeSelector: {}
      tolerations: []
    config:
      limits_config:
        retention_period: 24h
        retention_stream:
          - selector: '{suite="pachyderm"}'
            priority: 1
            period: 168h # = 1 week
  grafana:
    enabled: false
  promtail:
    config:
      clients:
        - url: "http://{{ .Release.Name }}-loki:3100/loki/api/v1/push"
      snippets:
        # The scrapeConfigs section is copied from loki-stack-2.6.4
        # The pipeline_stages.match stanza has been added to prevent multiple lokis in a cluster from mixing their logs.
        scrapeConfigs: |
          - job_name: kubernetes-pods
            pipeline_stages:
              {{- toYaml .Values.config.snippets.pipelineStages | nindent 4 }}
              - match:
                  selector: '{namespace!="{{ .Release.Namespace }}"}'
                  action: drop
            kubernetes_sd_configs:
              - role: pod
            relabel_configs:
              - source_labels:
                  - __meta_kubernetes_pod_controller_name
                regex: ([0-9a-z-.]+?)(-[0-9a-f]{8,10})?
                action: replace
                target_label: __tmp_controller_name
              - source_labels:
                  - __meta_kubernetes_pod_label_app_kubernetes_io_name
                  - __meta_kubernetes_pod_label_app
                  - __tmp_controller_name
                  - __meta_kubernetes_pod_name
                regex: ^;*([^;]+)(;.*)?$
                action: replace
                target_label: app
              - source_labels:
                  - __meta_kubernetes_pod_label_app_kubernetes_io_instance
                  - __meta_kubernetes_pod_label_release
                regex: ^;*([^;]+)(;.*)?$
                action: replace
                target_label: instance
              - source_labels:
                  - __meta_kubernetes_pod_label_app_kubernetes_io_component
                  - __meta_kubernetes_pod_label_component
                regex: ^;*([^;]+)(;.*)?$
                action: replace
                target_label: component
              {{- if .Values.config.snippets.addScrapeJobLabel }}
              - replacement: kubernetes-pods
                target_label: scrape_job
              {{- end }}
              {{- toYaml .Values.config.snippets.common | nindent 4 }}
              {{- with .Values.config.snippets.extraRelabelConfigs }}
              {{- toYaml . | nindent 4 }}
              {{- end }}
        pipelineStages:
          - cri: {}
        common:
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_node_name
            target_label: node_name
          - action: replace
            source_labels:
              - __meta_kubernetes_namespace
            target_label: namespace
          - action: replace
            replacement: $1
            separator: /
            source_labels:
              - namespace
              - app
            target_label: job
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_name
            target_label: pod
          - action: replace
            source_labels:
              - __meta_kubernetes_pod_container_name
            target_label: container
          - action: replace
            replacement: /var/log/pods/*$1/*.log
            separator: /
            source_labels:
              - __meta_kubernetes_pod_uid
              - __meta_kubernetes_pod_container_name
            target_label: __path__
          - action: replace
            regex: true/(.*)
            replacement: /var/log/pods/*$1/*.log
            separator: /
            source_labels:
              - __meta_kubernetes_pod_annotationpresent_kubernetes_io_config_hash
              - __meta_kubernetes_pod_annotation_kubernetes_io_config_hash
              - __meta_kubernetes_pod_container_name
            target_label: __path__
          - action: keep
            regex: pachyderm
            source_labels:
              - __meta_kubernetes_pod_label_suite
          - action: labelmap
            regex: __meta_kubernetes_pod_label_(.+)
    livenessProbe:
      failureThreshold: 5
      tcpSocket:
        port: http-metrics
      initialDelaySeconds: 10
      periodSeconds: 10
      successThreshold: 1
      timeoutSeconds: 1

pachd:
  enabled: true
  preflightChecks:
    enabled: true
  affinity: {}
  annotations: {}
  clusterDeploymentID: ""
  configJob:
    annotations: {}
  goMaxProcs: 0
  image:
    repository: "pachyderm/pachd"
    pullPolicy: "IfNotPresent"
    tag: ""
  logFormat: "json"
  logLevel: "info"
  lokiDeploy: true
  lokiLogging: true
  metrics:
    enabled: true
    endpoint: ""
  priorityClassName: ""
  nodeSelector: {}
  podLabels: {}
  replicas: 1
  resources:
    {}
  requireCriticalServersOnly: false
  externalService:
    enabled: false
    loadBalancerIP: ""
    apiGRPCPort: 30650
    s3GatewayPort: 30600
    annotations: {}
  service:
    labels: {}
    type: "ClusterIP"
    annotations: {}
    apiGRPCPort: 30650
    prometheusPort: 30656
    oidcPort: 30657
    identityPort: 30658
    s3GatewayPort: 30600
  activateEnterprise: false
  activateEnterpriseMember: false
  activateAuth: false
  rootToken: ""
  rootTokenSecretName: ""
  localhostIssuer: "" # "true", "false", or "" (used string as bool doesn't support empty value)
  # set the initial pachyderm cluster role bindings, mapping a user to their list of roles
  # ex.
  # pachAuthClusterRoleBindings:
  #   robot:wallie:
  #   - repoReader
  #   robot:eve:
  #   - repoWriter
  pachAuthClusterRoleBindings: {}
  # additionalTrustedPeers is used to configure the identity service to recognize additional OIDC clients as trusted peers of pachd.
  # For example, see the following example or the dex docs (https://dexidp.io/docs/custom-scopes-claims-clients/#cross-client-trust-and-authorized-party).
  # additionalTrustedPeers:
  #   - example-app
  additionalTrustedPeers: []
  serviceAccount:
    create: true
    additionalAnnotations: {}
    name: "pachyderm"  
  storage:
    backend: "LOCAL"
    local:
      # hostPath indicates the path on the host where the PFS metadata
      # will be stored.  It must end in /.  It is analogous to the
      # --host-path argument to pachctl deploy.
      hostPath: ""
      requireRoot: true #Root required for hostpath, but we run rootless in CI
    # putFileConcurrencyLimit sets the maximum number of files to
    # upload or fetch from remote sources (HTTP, blob storage) using
    # PutFile concurrently.  It is analogous to the
    # --put-file-concurrency-limit argument to pachctl deploy.
    putFileConcurrencyLimit: 100
    # uploadConcurrencyLimit sets the maximum number of concurrent
    # object storage uploads per Pachd instance.  It is analogous to
    # the --upload-concurrency-limit argument to pachctl deploy.
    uploadConcurrencyLimit: 100
    # The shard size corresponds to the total size of the files in a shard.
    # The shard count corresponds to the total number of files in a shard.
    # If either criteria is met, a shard will be created.
    compactionShardSizeThreshold: 0
    compactionShardCountThreshold: 0
  ppsWorkerGRPCPort: 1080
  # the number of seconds between pfs's garbage collection cycles.
  # if this value is set to 0, it will default to pachyderm's internal configuration.
  # if this value is less than 0, it will turn off garbage collection.
  storageGCPeriod: 0
  # the number of seconds between chunk garbage colletion cycles.
  # if this value is set to 0, it will default to pachyderm's internal configuration.
  # if this value is less than 0, it will turn off chunk garbage collection.
  storageChunkGCPeriod: 0
  # There are three options for TLS:
  # 1. Disabled
  # 2. Enabled, existingSecret, specify secret name
  # 3. Enabled, newSecret, must specify cert, key and name
  tls:
    enabled: false
    secretName: ""
    newSecret:
      create: false
      crt: ""
      key: ""
  tolerations: []
  worker:
    image:
      repository: "pachyderm/worker"
      pullPolicy: "IfNotPresent"
      # Worker tag is set under pachd.image.tag (they should be kept in lock step)
    serviceAccount:
      create: true
      additionalAnnotations: {}
      # name sets the name of the worker service account.  Analogous to
      # the --worker-service-account argument to pachctl deploy.
      name: "pachyderm-worker" #TODO Set default in helpers / Wire up in templates
  rbac:
    # create indicates whether RBAC resources should be created.
    # Setting it to false is analogous to passing --no-rbac to pachctl
    # deploy.
    create: true

kubeEventTail:
  # Deploys a lightweight app that watches kubernetes events and echos them to logs.
  enabled: true
  # clusterScope determines whether kube-event-tail should watch all events or just events in its namespace.
  clusterScope: false
  image:
    repository: pachyderm/kube-event-tail
    pullPolicy: "IfNotPresent"
    tag: "v0.0.6"
  resources:
    limits:
      cpu: "1"
      memory: 100Mi
    requests:
      cpu: 100m
      memory: 45Mi

pgbouncer:
  service:
    type: ClusterIP
  annotations: {}
  priorityClassName: ""
  nodeSelector: {}
  tolerations: []
  image:
    repository: pachyderm/pgbouncer
    tag: 1.16.1-debian-10-r82
  resources:
    {}
    #limits:
    #  cpu: "1"
    #  memory: "2G"
    #requests:
    #  cpu: "1"
    #  memory: "2G"
  # maxConnections specifies the maximum number of concurrent connections into pgbouncer.
  maxConnections: 1000
  # defaultPoolSize specifies the maximum number of concurrent connections from pgbouncer to the postgresql database.
  defaultPoolSize: 20

# Note: Postgres values control the Bitnami Postgresql Subchart
postgresql:
  # enabled controls whether to install postgres or not.
  # If not using the built in Postgres, you must specify a Postgresql
  # database server to connect to in global.postgresql
  # The enabled value is watched by the 'condition' set on the Postgresql
  # dependency in Chart.yaml
  enabled: true
  image:
    tag: "13.3.0"
  # DEPRECATED from pachyderm 2.1.5
  initdbScripts:
    dex.sh: |
      #!/bin/bash
      set -e
      psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE DATABASE dex;
        GRANT ALL PRIVILEGES ON DATABASE dex TO "$POSTGRES_USER";
      EOSQL
  fullnameOverride: postgres
  persistence:
    # Specify the storage class for the postgresql Persistent Volume (PV)
    # See notes in Bitnami chart values.yaml file for more information.
    # More info for setting up storage classes on various cloud providers:
    # AWS: https://docs.aws.amazon.com/eks/latest/userguide/storage-classes.html
    # GCP: https://cloud.google.com/compute/docs/disks/performance#disk_types
    # Azure: https://docs.microsoft.com/en-us/azure/aks/concepts-storage#storage-classes
    storageClass: ""
    # storageSize specifies the size of the volume to use for postgresql
    # Recommended Minimum Disk size for Microsoft/Azure: 256Gi  - 1,100 IOPS https://azure.microsoft.com/en-us/pricing/details/managed-disks/
    # Recommended Minimum Disk size for Google/GCP: 50Gi        - 1,500 IOPS https://cloud.google.com/compute/docs/disks/performance
    # Recommended Minimum Disk size for Amazon/AWS: 500Gi (GP2) - 1,500 IOPS https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html
    size: 10Gi
    labels:
      suite: pachyderm
  primary:
    priorityClassName: ""
    nodeSelector: {}
    tolerations: []
  readReplicas:
    priorityClassName: ""
    nodeSelector: {}
    tolerations: []

cloudsqlAuthProxy:
  # connectionName may be found by running `gcloud sql instances describe INSTANCE_NAME --project PROJECT_ID`
  connectionName: ""
  serviceAccount: ""
  iamLogin: false
  port: 5432
  enabled: false
  image:
    # repository is the image repo to pull from; together with tag it
    # replicates the --dash-image & --registry arguments to pachctl
    # deploy.
    repository: "gcr.io/cloudsql-docker/gce-proxy"
    pullPolicy: "IfNotPresent"
    # tag is the image repo to pull from; together with repository it
    # replicates the --dash-image argument to pachctl deploy.
    tag: "1.23.0"
  priorityClassName: ""
  nodeSelector: {}
  tolerations: []
  # podLabels specifies labels to add to the dash pod.
  podLabels: {}
  # resources specifies the resource request and limits.
  resources: {}
  #  requests:
  #    # The proxy's memory use scales linearly with the number of active
  #    # connections. Fewer open connections will use less memory. Adjust
  #    # this value based on your application's requirements.
  #    memory: ""
  #    # The proxy's CPU use scales linearly with the amount of IO between
  #    # the database and the application. Adjust this value based on your
  #    # application's requirements.
  #    cpu: ""
  service:
    # labels specifies labels to add to the cloudsql auth proxy service.
    labels: {}
    # type specifies the Kubernetes type of the cloudsql auth proxy service.
    type: ClusterIP

oidc:
  issuerURI: "" #Inferred if running locally or using ingress
  requireVerifiedEmail: false
  # IDTokenExpiry is parsed into golang's time.Duration: https://pkg.go.dev/time#example-ParseDuration
  IDTokenExpiry: 24h
  # (Optional) If set, enables OIDC rotation tokens, and specifies the duration where they are valid.
  # RotationTokenExpiry is parsed into golang's time.Duration: https://pkg.go.dev/time#example-ParseDuration
  RotationTokenExpiry: 48h
  # (Optional) Only set in cases where the issuerURI is not user accessible (ie. localhost install)
  userAccessibleOauthIssuerHost: ""
  ## to set up upstream IDPs, set pachd.mockIDP to false,
  ## and populate the pachd.upstreamIDPs with an array of Dex Connector configurations.
  ## See the example below or https://dexidp.io/docs/connectors/
  # upstreamIDPs:
  #   - id: idpConnector
  #     config:
  #       issuer: ""
  #       clientID: ""
  #       clientSecret: ""
  #       redirectURI: "http://localhost:30658/callback"
  #       insecureEnableGroups: true
  #       insecureSkipEmailVerified: true
  #       insecureSkipIssuerCallbackDomainCheck: true
  #       forwardedLoginParams:
  #       - login_hint
  #     name: idpConnector
  #     type: oidc
  #
  #   - id: okta
  #     config:
  #       issuer: "https://dev-84362674.okta.com"
  #       clientID: "client_id"
  #       clientSecret: "notsecret"
  #       redirectURI: "http://localhost:30658/callback"
  #       insecureEnableGroups: true
  #       insecureSkipEmailVerified: true
  #       insecureSkipIssuerCallbackDomainCheck: true
  #       forwardedLoginParams:
  #       - login_hint
  #     name: okta
  #     type: oidc
  upstreamIDPs: []
  # upstreamIDPsSecretName is used to pass the upstreamIDPs value via an existing k8s secret.
  # The value is pulled from the secret key, "upstream-idps".
  upstreamIDPsSecretName: ""
  # Some dex configurations (like Google) require a credential file. Whatever secret is included in this
  # below secret will be mounted to the pachd pod at /dexcreds/ so for example serviceAccountFilePath: /dexcreds/googleAuth.json
  dexCredentialSecretName: ""
  mockIDP: true
  # additionalClients specifies a list of clients for the cluster to recognize
  # See the ecample below or the dex docs (https://dexidp.io/docs/using-dex/#configuring-your-app).
  # additionalOIDCClient:
  #   - id: example-app
  #     secret: example-app-secret
  #     name: 'Example App'
  #     redirectURIs:
  #     - 'http://127.0.0.1:5555/callback'
  additionalClients: []
  additionalClientsSecretName: ""
  #TODO scopes:

testConnection:
  image:
    repository: alpine
    tag: latest

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
{{% /wizardResult %}}
{{% /wizardResults %}}
{{</stack>}}