---
# metadata # 
title:  Beginner Tutorial
description: Learn how to quickly ingest photos, trace their outlines, and output a collage using the transformed data in Pachyderm.
date: 
# taxonomy #
tags: ["tutorials"]
series: ["onboarding"]
seriesPart: 
weight: 4
---

## Before You Start 

- Install Pachyderm either [locally](/tbd) our within the [cloud](/tbd). 
- Install [Pachyderm Shell](../../deploy-manage/manage/pachctl-shell/).
- Join our [Slack Community](https://www.pachyderm.com/slack/) so you can ask any questions you may have!

### Context

Pachyderm creates a Kubernetes cluster that you interact with using either the pachctl CLI or through Console, a GUI.

  - **pachctl** is great for users already experienced with using a CLI.
  - **Console** is great for beginners and helps with visualizing relationships between projects, repos, and pipelines.

Within the Pachyderm cluster, you can create projects that store primitives (basic components) like repos and pipelines. Put together, these primitives form DAGs. At the highest level, a DAG is comprised of the following: an input (repo) > transformation instructions (pipeline, user code) > and an output (repo). A DAG can be comprised of multiple DAGs chained together.

---

## Tutorial: Image processing with OpenCV

In this tutorial you will create a pipeline that performs  [edge
detection](https://en.wikipedia.org/wiki/Edge_detection) on 
images. Once set up, your pipeline will automatically process new data as it is added and output the results.

### 1. Create a Project 

To keep our work organized, we're going to create a project named `openCV` and set it to our currently active context. 

```s
pachctl create project openCV
pachctl config update context --project openCV
```

You can always check to confirm which project has been set to your context by running the following commands:

```s
# prints current context name (local) 
pachctl config get active-context 

# prints local's context details
pachctl config get context local 

# {
#   "source": "IMPORTED",
#   "cluster_name": "docker-desktop",
#   "auth_info": "docker-desktop",
#   "cluster_deployment_id": "dev",
#   "project": "openCV"
# }
```

### 2. Create a Repo

Now that we have a project set, we're ready to create a repo. Repos should be dedicated to
a single source of data such as log messages from a particular service,
a users table, or training data for an ML model. You can make as many repos ad you'd like. 

```s
pachctl create repo images
```

You can verify that the repository was created by running the following command:

```s
pachctl list repo

# NAME   CREATED       SIZE (MASTER) ACCESS LEVEL
# images 4 seconds ago ≤ 0B          [repoOwner]
```


### 3. Add Data

Now that we have created a repo, it is time to add some data. In
Pachyderm, you write data to an explicit `commit`. Commits are immutable
snapshots of your data which give Pachyderm its version control properties.
You can add, remove, or update `files` in a given commit.

#### Upload an Image File

We're going to use the `pachctl put file` command, along with the `-f` flag, to upload an image. the `-f` flag cantake either a local file, a URL, or a object storage bucket which it
scrapes automatically

```s
pachctl put file images@master:liberty.png -f http://imgur.com/46Q8nDz.png
```

`pachctl put file` **automatically starts and finishes a commit for you** so you can add files
more easily. 

{{% notice tip %}}
If you want to add many files over a period of time, you can do `pachctl start commit` and `pachctl finish commit` yourself.
{{% /notice %}}

You can confirm the commit using the following command:

```s
pachctl list commit images

# REPO          BRANCH COMMIT                           FINISHED       SIZE     ORIGIN DESCRIPTION
# openCV/images master 37559e89ed0c4a0cb354649524050851 10 seconds ago 57.27KiB USER  
```

You can also view the filename in the commit using the following command:

```s
pachctl list file images@master

# NAME         TYPE SIZE     
# /liberty.png file 57.27KiB
```

#### View Image 

#### In Terminal

{{< stack type="wizard" >}}
{{% wizardRow id="Operating System"%}}
{{% wizardButton option="MacOS" state="active" %}}
{{% wizardButton option="Linux" %}}
{{% /wizardRow %}}


{{% wizardResults%}}

{{% wizardResult val1="operating-system/macos" %}}
```s
pachctl get file images@master:liberty.png | open -f -a Preview.app
```
{{% /wizardResult %}}

{{% wizardResult val1="operating-system/linux" %}}
```s
pachctl get file images@master:liberty.png | display
```
{{% /wizardResult %}}

{{% /wizardResults%}}

{{</stack>}}



##### In Console 

In your Console, click on the `images` repo to visualize its commit and inspect its file:

![Console images liberty](../images/console-images-liberty.png)


### 4. Create a Pipeline

Now that you have some data in your repo, it is time to do something
with it using a [pipeline](../../concepts/pipeline-concepts/pipeline/). 

Pipelines are the processing primitive in Pachyderm and are defined using a JSON file (known as a [pipeline specification](../../reference/pipeline-spec)). For this [example](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/examples/opencv), we already
[created the pipeline spec for you](https://github.com/pachyderm/pachyderm/blob/{{% majorMinorVersion %}}/examples/opencv/edges.json).

#### Review Pipeline Spec

Let's walk through the details of the provided pipeline spec so that you'll know how to create one on your own in the future.

```json
{
  "pipeline": {
    "name": "edges"
  },
  "description": "A pipeline that performs image edge detection by using the OpenCV library.",
  "transform": {
    "cmd": [ "python3", "/edges.py" ],
    "image": "pachyderm/opencv:1.0"
  },
  "input": {
    "pfs": {
      "repo": "images",
      "glob": "/*"
    }
  }
}
```

The pipeline spec contains a few simple sections. The pipeline section contains
a `name`, which is how you will identify your pipeline. **Your pipeline will also
automatically create an output repo with the same name**. The `transform` section
allows you to specify the docker image you want to use. In this case,
`pachyderm/opencv:1.0` is the docker image (defaults to DockerHub as the registry),
and the entry point is `edges.py`. The input section specifies repos visible
to the running pipeline, and how to process the data from the repos. **Commits to
these repos will automatically trigger the pipeline to create new jobs to
process them**. In this case, `images` is the repo, and `/*` is the glob pattern.

The glob pattern defines how the input data will be transformed into **datums** if you want
to distribute computation. `/*` means that each file can be
processed individually, which makes sense for images. Glob patterns are
one of the most powerful features in Pachyderm.

{{% notice info%}}
More about the concept of [`Glob Pattern`](../../concepts/pipeline-concepts/datum/glob-pattern/#glob-pattern) in Pachyderm and the fundamental notion of [`Datums`](../../concepts/pipeline-concepts/datum/relationship-between-datums/).
{{% /notice %}}


The following extract is the Python code run in this pipeline:

```python
import cv2
import numpy as np
from matplotlib import pyplot as plt
import os

# make_edges reads an image from /pfs/images and outputs the result of running
# edge detection on that image to /pfs/out. Note that /pfs/images and
# /pfs/out are special directories that Pachyderm injects into the container.
def make_edges(image):
   img = cv2.imread(image)
   tail = os.path.split(image)[1]
   edges = cv2.Canny(img,100,200)
   plt.imsave(os.path.join("/pfs/out", os.path.splitext(tail)[0]+'.png'), edges, cmap = 'gray')

# walk /pfs/images and call make_edges on every file found
for dirpath, dirs, files in os.walk("/pfs/images"):
   for file in files:
       make_edges(os.path.join(dirpath, file))
```

The code simply walks over all the images in `/pfs/images`, performs edge
detection, and writes the result to `/pfs/out`.

`/pfs/images` and `/pfs/out` are special local directories that
Pachyderm creates within the container automatically. All the input data
for a pipeline is stored in `/pfs/<input_repo_name>` and **your code
should always write out to `/pfs/out`**  (see the function `make_edges(image)` above). 
Pachyderm automatically gathers everything you write to `/pfs/out`, versions it as this pipeline output, and maps it
to the appropriate output repo of your pipeline.

Now, let's create the pipeline in Pachyderm:

```s
pachctl create pipeline -f https://raw.githubusercontent.com/pachyderm/pachyderm/{{% majorMinorVersion %}}/examples/opencv/edges.json
```
Again, check the end result in your Console:
![Console edges pipeline](../images/console-edges-pipeline.png)
#### What Happens When You Create a Pipeline

Creating a pipeline tells Pachyderm to run your code on the data in your
input repo (the HEAD commit) as well as **all future commits** that
occur after the pipeline is created. Our repo already had a commit, so
Pachyderm automatically launched a `job` to process that data.

{{% notice info %}}
More about the concept of [`Job`](../../concepts/pipeline-concepts/job/#job) in Pachyderm.
{{% /notice %}}

The first time Pachyderm runs a pipeline job, it needs to download the
Docker image (specified in the pipeline spec) from the specified Docker
registry (DockerHub in this case). This first run might take a
minute or so because of the image download, depending on your Internet
connection. Subsequent runs will be much faster.

* You can view the job with:

    ```s
    pachctl list job
    ```

    **System response:**

    ```
    ID                               SUBJOBS PROGRESS CREATED       MODIFIED
    23378d899d3d45738f55df3809841145 1       ▇▇▇▇▇▇▇▇ 5 seconds ago 5 seconds ago
    ```

* You can check the state of your pipeline:

    ```s
    pachctl list pipeline
    ```

    **System response:**

    ```
    NAME  VERSION INPUT     CREATED       STATE / LAST JOB  DESCRIPTION
    edges 1       images:/* 2 minutes ago running / success A pipeline that performs image edge detection by using the OpenCV library.
    ```

    Yay! Your pipeline succeeded! Pachyderm creates a corresponding output
    repo for every pipeline. This output repo will have the same name as the
    pipeline, and all the results of that pipeline will be versioned in this
    output repo. In our example, the `edges` pipeline created an output repo
    called `edges` to store the results written to `/pfs/out`.

* List your repositories:

    ```s
    pachctl list repo
    ```

    **System response:**

    ```
    NAME   CREATED        SIZE (MASTER) ACCESS LEVEL
    edges  10 minutes ago ≤ 22.22KiB    [repoOwner]  Output repo for pipeline edges.
    images 3 hours ago    ≤ 57.27KiB    [repoOwner]
    ```

Note that all of that information and more are available in your Console.
#### Reading the Output

We can view the output data from the `edges` repo in the same fashion
that we viewed the input data.

* On macOS, run:

```s
pachctl get file edges@master:liberty.png | open -f -a Preview.app
```

* On Linux 64-bit, run:

```s
pachctl get file edges@master:liberty.png | display
```

The output should look like this:

![Console edges liberty](../images/console-edges-liberty.png)


#### Processing More Data

**Pipelines will automatically process the data from new commits as
they are created**. In a way, pipelines "subscribe" to their input repo(s), ready to process any new
incoming commits. Also similar to Git, commits have a
parental structure that tracks which files have changed. In this case
we are going to be adding more images.

Let's create two new commits in a parental structure. To do this we
will simply do two more `put file` commands and by specifying `master`
as the branch, it automatically parents our commits onto each other.
Branch names are just references to a particular HEAD commit.

```s
pachctl put file images@master:AT-AT.png -f http://imgur.com/8MN9Kg0.png
pachctl put file images@master:kitten.png -f http://imgur.com/g2QnNqa.png
```

**Adding a new commit of data will automatically trigger the pipeline to
run on the new data we have added**. We will see corresponding jobs get
started and commits to the output `edges` repo. Let's also view our
new outputs.

* View the list of jobs that have started:

    ```s
    pachctl list job
    ```

    **System response:**

    ```
    ID                               SUBJOBS PROGRESS CREATED        MODIFIED
    1c1a9d7d36944eabb4f6f14ebca25bf1 1       ▇▇▇▇▇▇▇▇ 31 seconds ago 31 seconds ago
    fe5c4f70ac4347fd9c5934f0a9c44651 1       ▇▇▇▇▇▇▇▇ 47 seconds ago 47 seconds ago
    23378d899d3d45738f55df3809841145 1       ▇▇▇▇▇▇▇▇ 12 minutes ago 12 minutes ago
    ```

* View the output data:

  * On macOS, run:

    ```s
    pachctl get file edges@master:AT-AT.png | open -f -a Preview.app
    pachctl get file edges@master:kitten.png | open -f -a Preview.app
    ```

  * On Linux, run:

    ```s
    pachctl get file edges@master:AT-AT.png | display
    pachctl get file edges@master:kitten.png | display
    ```

### Adding Another Pipeline

We have successfully deployed and used a single stage Pachyderm pipeline.
Now, let's add a processing stage to illustrate a multi-stage Pachyderm
pipeline (also referenced as a **Directed Acyclic Graph or DAG** is this documentation). Specifically, let's add a `montage` pipeline that take our
original and edge detected images and arranges them into a single
montage of images:

![image](../../assets/images/opencv-liberty-montage.png)

Below is the pipeline spec for this new pipeline:

```json
{
  "pipeline": {
    "name": "montage"
  },
  "description": "A pipeline that combines images from the `images` and `edges` repositories into a montage.",
  "input": {
    "cross": [ {
      "pfs": {
        "glob": "/",
        "repo": "images"
      }
    },
    {
      "pfs": {
        "glob": "/",
        "repo": "edges"
      }
    } ]
  },
  "transform": {
    "cmd": [ "sh" ],
    "image": "v4tech/imagemagick",
    "stdin": [ "montage -shadow -background SkyBlue -geometry 300x300+2+2 $(find /pfs -type f | sort) /pfs/out/montage.png" ]
  }
}
```

This `montage` pipeline spec is similar to our `edges` pipeline except
for the following differences:

1. We are using a different Docker image that
has `imagemagick` installed.
1. We are executing a `sh` command with
`stdin` instead of a python script in the pipeline's `transform` section.
1. We have multiple input data repositories (`images` and `edges`).

In the `montage` pipeline we are combining our multiple input data
repositories using a `cross` pattern. This `cross` pattern creates a
single pairing of our input images with our edge detected images. There
are several interesting ways to combine data in Pachyderm, which are
discussed in
[pipelines' concepts](../../concepts/pipeline-concepts/datum/)
and
[our pipeline specification page](../../reference/pipeline-spec/#pfs-input).

* To create the `montage` pipeline, run:

  ```s
  pachctl create pipeline -f https://raw.githubusercontent.com/pachyderm/pachyderm/{{% majorMinorVersion %}}/examples/opencv/montage.json
  ```

  See your new DAG in Console:
  ![Console opencv DAG](../images/console-opencv-dag.png)

* The pipeline creation triggers a job that generates a montage for all the current HEAD commits of the input repos:

  ```s
  pachctl list job
  ```

  **System response:**

  ```s
  ID                               SUBJOBS PROGRESS CREATED        MODIFIED
  01e0c8040e18429daf7f67ce34c3a5d7 1       ▇▇▇▇▇▇▇▇ 11 seconds ago 11 seconds ago
  1c1a9d7d36944eabb4f6f14ebca25bf1 1       ▇▇▇▇▇▇▇▇ 12 minutes ago 12 minutes ago
  fe5c4f70ac4347fd9c5934f0a9c44651 1       ▇▇▇▇▇▇▇▇ 12 minutes ago 12 minutes ago
  23378d899d3d45738f55df3809841145 1       ▇▇▇▇▇▇▇▇ 24 minutes ago 24 minutes ago
  ```

* View the generated montage image in Console or by running one of the following commands:

  * In Console:

  ![Console opencv montage](../images/console-opencv-montage.png)

  * On macOS, run:

  ```s
  pachctl get file montage@master:montage.png | open -f -a Preview.app
  ```

  * On Linux 64-bit, run:

  ```s
  pachctl get file montage@master:montage.png | display
  ```

## Next Steps

You can use what you have learned to build on or
change these pipelines. 
You can also dig in and learn more details about:

- [Working with Pipelines](../../how-tos/developer-workflow/working-with-pipelines)
- [Load Your Data into Pachyderm](../../how-tos/basic-data-operations/load-data-into-pachyderm)
- [Deploying Pachyderm to the cloud or on prem](../../deploy-manage/deploy)

Again, we would love to help and see what you come up with! Submit any
questions, comment, contribution on
[GitHub](https://github.com/pachyderm/pachyderm),
[Slack](https://www.pachyderm.com/slack/), or email at <support@pachyderm.io>
if you want to show off anything nifty you have created!
