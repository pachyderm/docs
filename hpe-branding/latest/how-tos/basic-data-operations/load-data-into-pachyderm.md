---
# metadata # 
title: Ingest Data
description: Learn how to ingest data using the pachctl put command.
date: 
# taxonomy #
tags: ["ingest"]
series:
seriesPart:
---

## `pachctl put file`

{{% notice note %}}
At any time, run `pachctl put file --help` for the complete list of flags available to you.
{{% /notice %}}

1. Load your data into MLDM by using `pachctl` requires that one or several input repositories have been created. 

    ```s
    pachctl create repo <repo name>
    ```

1. Use the `pachctl put file` command to put your data into the created repository. Select from the following options:
    - Atomic commit: no open commit exists in your input repo. MLDM automatically starts a new commit, adds your data, and finishes the commit.
    ```s
    pachctl put file <repo>@<branch>:</path/to/file1> -f <file1>
    ```

    - Alternatively, you can manually start a new commit, add your data in multiple `put file` calls, and close the commit by running `pachctl finish commit`.

        1. Start a commit:
            ```s
            pachctl start commit <repo>@<branch>
            ```
        1. Put your data:
            ```s
            pachctl put file <repo>@<branch>:</path/to/file1> -f <file1>
            ```
        1. Put more data:
            ```s
            pachctl put file <repo>@<branch>:</path/to/file2> -f <file2>
            ```
        1. Close the commit:
            ```s
            pachctl finish commit <repo>@<branch>
            ```

## Filepath Formats

{{% notice tip %}}
MLDM uses `*?[]{}!()@+^` as reserved characters for [glob patterns](../../../concepts/pipeline-concepts/datum/glob-pattern/#glob-pattern). Because of this, you cannot use these characters in your filepath.
{{%/notice %}}

In MLDM, you specify the path to file by using the `-f` option. A path
to file can be a **local path or a URL to an external resource**. You can add
multiple files or directories by using the `-i` option. To add contents
of a directory, use the `-r` flag.

The following table provides examples of `pachctl put file` commands with
various filepaths and data sources:

* Put data from a URL:
  ```s
  pachctl put file <repo>@<branch>:</path/to/file> -f http://url_path
  ```

* Put data from an object store. You can use `s3://`, `gcs://`, or `as://`
in your filepath:

  	```s
	pachctl put file <repo>@<branch>:</path/to/file> -f s3://object_store_url
  	```

{{% notice note %}}
If you are configuring a local cluster to access an external bucket,
make sure that MLDM has been given the proper access.
{{% /notice %}}

* Add multiple files at once by using the `-i` option or multiple `-f` flags.
In the case of `-i`, the target file must be a list of files, paths, or URLs
that you want to input all at once:

  	```s
	pachctl put file <repo>@<branch> -i <file containing list of files, paths, or URLs>
  	```

* Add an entire directory or all of the contents at a particular URL, either
HTTP(S) or object store URL, `s3://`, `gcs://`, and `as://`, by using the
recursive flag, `-r`:

  	```s
  	pachctl put file <repo>@<branch> -r -f <dir>
  	```

## Loading Your Data Partially

Depending on your use case and the volume of your data, 
you might decide to keep your dataset in its original source
and process only a subset in MLDM.

Add a metadata file containing a list of URL/path
to your external data to your repo.

Your pipeline code will retrieve the data following their path
without the need to preload it all. 
In this case, MLDM will not keep versions of the source file, but it will keep
track and provenance of the resulting output commits. 