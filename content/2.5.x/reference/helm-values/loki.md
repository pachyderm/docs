---
# metadata # 
title:  Loki HCVs
description: Set up logs with Loki, Grafana, and Promtail.
date: 
# taxonomy #
tags: ["helm"]
series:
seriesPart:
weight: 6
label: optional
--- 

## About

Loki Stack contains values that are passed to the loki-stack subchart. For more details on each service, see their official documentation:

- [Loki storage documentation](https://grafana.com/docs/loki/latest/operations/storage/)
- [Grafana documentation](https://grafana.com/docs/) 
- [Promtail documentation](https://grafana.com/docs/loki/latest/clients/promtail/configuration/) 


## Values

The following section contains a series of tabs for commonly used configurations for this section of your values.yml Helm chart. 


```s
loki-stack:
  loki:
    serviceAccount:
      automountServiceAccountToken: false
    persistence:
      enabled: true
      accessModes:
        - ReadWriteOnce
      size: 10Gi
      # More info for setting up storage classes on various cloud providers:
      # AWS: https://docs.aws.amazon.com/eks/latest/userguide/storage-classes.html
      # GCP: https://cloud.google.com/compute/docs/disks/performance#disk_types
      # Azure: https://docs.microsoft.com/en-us/azure/aks/concepts-storage#storage-classes
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
          # This is copy and paste of existing actions, so we don't lose them.
          # Cf. https://github.com/grafana/loki/issues/3519#issuecomment-1125998705
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
          # this gets all kubernetes labels as well
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
```