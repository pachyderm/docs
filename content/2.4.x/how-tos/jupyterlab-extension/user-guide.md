---
# metadata #
title: User Guide
description: Learn how to use the JupyterLab Mount Extension with Pachyderm.
date:
# taxonomy #
tags: ["integrations", "jupyterlab", "notebooks"]
series:
seriesPart:
weight: 4
beta: true
---

## Mount a Branch

1. Open the JupyterLab UI.
2. Open a **Terminal** from the launcher.
3. Navigate to the **Mounted Repositories** tab.
4. Input the following to see a demo repo appear:

```s
pachctl create repo demo
pachctl create branch demo@master
```

5. Scroll to the **Unmounted Repositories** section.
6. Select **Mount** next to the **Demo** repository.
7. Input the following to create a simple text file:

```s
echo "Version 1 of file" | pachctl put file demo@master:/myfile.txt
```

8. Unmount and re-mount your repo to attach to the latest commit containing the new file.
   ![re-mount repo](/images/jupyterlab-extension/mount-repo.gif)
9. Read the file using the following:

```s
cat /pfs/demo/myfile.txt
```

## Mount a Datum

You can mount to a specific datum in your repository from the JupyterLab UI using an **input spec**. This is useful when:

- Working on data that is deeply nested within a specific directory of your repository.
- Testing and exploring viable glob patterns to use for your datums.

1. Open the JupyterLab UI.
2. Mount to a repo from the **Unmounted Repositories** section. (e.g., mounting to `demo` would look like `/pfs/demo/` in the file browser).
3. Navigate to the **Mounted Repositories** section and select **Datum**. You should see the following:
   ```yaml
   pfs:
     repo: demo
     branch: master
     glob: /
   ```
4. Update the glob pattern to match the datums you wish to focus on.

   ##### Directory Example

   ```yaml
   pfs:
     repo: demo
     branch: master
     glob: /images/2022/*
   ```

   ##### Extension Example

   ```yaml
   pfs:
     repo: demo
     branch: master
     glob: /images/**.png
   ```

5. Select **Mount Datums**.
6. The file browser updates to display the matching datums.

When you return to the mounted view by selecting **Back**, the file browser will return to displaying datums that match your default glob pattern.

## Explore Directories & Files

At the bottom of the **Mounted Repositories** tab, you'll find the file browser.

- Mounted repositories are nested within the root `/pfs` (Pachyderm's File System)
- These repositories are **read-only**
- Mounted repositories have a `/` glob pattern applied to their directories and files
- Files only downloaded locally when you access them (saving you time)

Using the previous example, while the **Demo** repository is mounted, you can select the **demo** folder to reveal the example `myfile.txt`.
