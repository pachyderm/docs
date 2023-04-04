---
# metadata # 
title: Update a Pipeline
description: 
date: 
# taxonomy #
tags: ["pipelines"]
series:
seriesPart:
---

While working with data, it's common to modify an existing pipeline with new transformation code or pipeline parameters. This can be done in a few ways:

- Using the `pachctl update pipeline` command.
- Using [jsonnet pipeline specification files (PPS)](#using-jsonnet-pipeline-specification-files).

Making changes to your pipeline's user code or parameters causes the pipeline to calculate any new datums using the new pipeline specification. Existing datums are not reprocessed; however, if your changes result in new datums being created, those new datums are processed. New datums are created when you either: change the glob pattern, add new files, or add more input repos.

You can trigger reprocessing of your datums by adding the `--reprocess` flag to your `update pipeline` command.

## How to Update a Pipeline

### Via pachctl update pipeline

1. Apply any changes necessary to your [pipeline specification](../../../reference/pipeline-spec) JSON file.
2. [Update your user code](#how-to-update-user-code-in-a-pipeline).
3. Run the following:
```s
pachctl update pipeline -f pipeline.json
```

{{% notice note %}}
Similar to `create pipeline`, `update pipeline` with the `-f` flag can  take a URL if your JSON manifest is hosted on GitHub or other remote location.
{{% /notice %}}

### Via Jsonnet PPS

[Jsonnet pipeline specs](../jsonnet-pipeline-specs) allow you to bypass the "update-your -specification-file" step and 
apply your changes at once by running:

```s
pachctl update pipeline --jsonnet <your jsonnet pipeline specs path or URL> --arg <param 1>=<value 1> --arg <param 2>=<value 2>
```

#### Example
```s
pachctl update pipeline --jsonnet jsonnet/edges.jsonnet --arg suffix=1 --arg tag=1.0.2
```

## How to Update User Code in a Pipeline

1. Make the code changes.
2. Verify that the Docker daemon is running using the command `docker ps`. Depending on your operating system and
the container orchestrator that you use (Docker Desktop, Minikube, Kind, etc) this step may vary.
1. Build, tag, and push the new image to your image registry and update the pipeline. This step comes in 3 flavors:

{{< stack type="wizard">}}

{{% wizardRow id="Push Method"%}}
{{% wizardButton option="Image Registry" state="active" %}}
{{% wizardButton option="Jsonnet" %}}
{{% wizardButton option="PachCTL" %}}
{{% /wizardRow %}}

{{% wizardResults  %}}
{{% wizardResult val1="push-method/image-registry"%}}
   1. Build, tag, and push a new image as described in your
      image registry documentation. For example, if you use
      DockerHub, see [Docker Documentation](https://docs.docker.com/docker-hub/).

   2. Update the [`transform.image`](../../../reference/pipeline-spec/#transform-required) field of your pipeline spec with your new tag.
   
   {{% notice tip %}}
   Make sure to update your tag every time you re-build. Our pull policy is `IfNotPresent` (Only pull the image if it does not already exist on the node.). Failing to update your tag will result in your pipeline running on a previous version of your code.
   {{%/notice %}}

   3. Update the pipeline:

      ```s
      pachctl update pipeline -f <pipeline.json>
      ```
{{% /wizardResult %}}
{{% wizardResult val1="push-method/jsonnet"%}}
   1. Pass the tag of your image to your jsonnet specs.
   As an example, see the `tag` parameter in this jsonnet version of opencv's edges pipeline (`edges.jsonnet`):
      
      ```json
      ////
      // Template arguments:
      //
      // suffix : An arbitrary suffix appended to the name of this pipeline, for
      //          disambiguation when multiple instances are created.
      // src : the repo from which this pipeline will read the images to which
      //       it applies edge detection.
      ////
      function(suffix, src)
      {
        pipeline: { name: "edges-"+suffix },
        description: "OpenCV edge detection on "+src,
        input: {
          pfs: {
            name: "images",
            glob: "/*",
            repo: src,
          }
        },
        transform: {
          cmd: [ "python3", "/edges.py" ],
          image: "pachyderm/opencv:0.0.1"
        }
      }
      ```

   2. Update your pipeline using this command line. In this case, there is no need to edit the pipeline specification file to update the value of your new tag. This command will take care of it:

      ```s
      pachctl update pipeline --jsonnet jsonnet/edges.jsonnet --arg suffix=1 --arg tag=1.0.2
      ```
{{% /wizardResult %}}
{{% wizardResult val1="push-method/pachctl"%}}
   1. [Build your new image](../../developer-workflow/working-with-pipelines/#step-2-build-your-docker-image) using `docker build` (for example, in a makefile: `@docker build --platform linux/amd64 -t $(DOCKER_ACCOUNT)/$(CONTAINER_NAME) .`). No tag needed, the folllowing [`--push-images`](../../developer-workflow/push-images-flag/) flag will take care of it.


   1. Run the following command:

      ```s
      pachctl update pipeline -f <pipeline name> --push-images --registry <registry> --username <registry user>
      ```

      If you use DockerHub, omit the `--registry` flag.

      **Example:**

      ```s
      pachctl update pipeline -f edges.json --push-images --username testuser
      ```

   1. When prompted, type your image registry password:

      **Example:**

      ```s
      Password for docker.io/testuser: Building pachyderm/opencv:f1e0239fce5441c483b09de425f06b40, this may take a while.
      ```
{{% /wizardResult %}}
{{% /wizardResults %}}
{{< /stack >}}

