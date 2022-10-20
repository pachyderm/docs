# Pachyderm Documentation


**Note**:  For theme documentation, see the theme [README](themes/pach-emdash/README.md).

---

## Download & Run the Docs Locally 

### 1. Install Hugo

[Hugo](https://gohugo.io/) is a golang static site generator.

1. Open a terminal.
2. Run the following or view their [official quickstart guide](https://gohugo.io/getting-started/quick-start/):
    ```
    brew install hugo
    ```

### 2. Install This Repository

1. Open a terminal.
2. Navigate to a directory like `/Documents/GitHub/`.
3. Run the following:
    ```
    gh repo clone pachyderm/docs
    ```

**Tip**: Don't have [the GitHub client](https://cli.github.com/) yet? `brew install gh`.

### 3. Build! 

1. Open a terminal.
2. Navigate into the `/docs ` root directory. 
3. Run the following:
    ```
    hugo server
    ```
4. View your docs at the listed url (typically **`localhost:1313`**).

*Most* content and styling changes will hot-reload instantly, however the following changes may require you to restart your local server: 

- significant changes to javascript in the `/assets` folder
- significant restructuring of directories (moving sub-directories from one to another)

### VSCode Plugins (Recommended)

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one): provides styling shortcuts for **bold**, *italics*, links, & more. 
- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml): frontmatter & config details are in YAML.

**Tip**: Like CMS vibes? try using the [Front Matter](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter) CMS UI plugin.

---

## Contribute 

When contributing, we recommend creating a branch with the following naming convention:

```s
<gitHubHandle>/<optionalRelatedTicketNumber>/change-title-here

# lbliii/doc-111/update-docs-readme
```

### Editing Existing Content 

1. Open the docs repo in a text editor. 
2. Pull any changes since your last use of the docs.
3. Create a new branch.
4. Navigate to the markdown file you wish to update.
5. Make, stage, and commit your changes.
6. Create a pull request.
7. Tag someone at Pachyderm for approval (`@lbliii` if SME unknown).


### Creating New Content 

1. Open the docs repo in a text editor. 
2. Pull any changes since your last use of the docs.
3. Create a new branch.
4. Navigate to a place in the `/content` folder you wish to make a new file or folder.

#### A: New File 

1. Create a new `.md` file.
2. Insert the following frontmatter template:
    ```yaml
    ---
    # metadata # 
    title: 
    description: 
    date: yyyy-mm-dd
    # taxonomy #
    tags: # ["",""]
    series: #[""]
    seriesPart:
    weight: # optional ordered ranking
    --- 
    ```
3. Begin writing! 

#### B: New Folder 

1. Create a new folder.
2. Create a new markdown file titled `_index.md` inside the new folder. This is the parent article.
3. Insert the following frontmatter template:
    ```yaml
    ---
    # metadata # 
    title: 
    description: 
    date: yyyy-mm-dd
    # taxonomy #
    tags: # ["",""]
    series: #[""]
    seriesPart:
    weight: # optional ordered ranking
    layout: # "glossary" if applicable
    --- 
    ```
4. Begin writing! 

---

## Drafting Tips 


### Diagrams 

You can use this [mermaid live editor](https://mermaid.live/) tool to build diagrams before putting them in the documentation.

### Notices

Use the following shortcode in your markdown files to display notices:

```
{{% notice tip/warning/note/danger/info %}}
    Content Here
{{%/notice %}}
```

### Tables

Use this [table generator tool](https://www.tablesgenerator.com/markdown_tables) to quickly build markdown tables. 

---

## Update Docs Version

### Major/Minor Version Updates

1. Open the docs repo and create a new branch named similar to: `/username/2.4.x/release-prep`.
2. Copy the most recent release directory in `/content` and give it the new release version name (e.g., `2.4.x`).
3. Navigate to your new release directory's top `_index.md` file.
4. Update the following front-matter attributes: 
   ```yaml
    ---
      # metadata # 
      title:  2.4.x
      description: Pachyderm Version 2.4.x 
      date: 
      # taxonomy #
      tags:
      series:
      seriesPart:
      cascade:
          latestPatch: 2.4.0
          majorMinor: 2.4
          clientPython: 7.3 
          extensionJupyterLab: 0.6.3
          mountServerBinary: 2.4
    ---
   ```
5. Open the `config.yaml` file.
6. Find the following section and update to the new version:
```yaml
  ## Release Features
  versionDropdown: true # displays a top-nav dropdown with top-level sections served as versioned documentation. 
  ## downloads: true # Enables displaying the download dropdown (requires release.patch)
  releaseInfo: # Note: See the new directory's /content/x.x.x./_index.md page to set release-related frontmatter variables. 
    latest: "2.4.x" # displays matching directory's sections on home page; if blank, all directories are displayed.
    patch: "2.4.0" # Used for announcements and to generate download links
```
7. Open the `netlify.toml` file.
8. Update the redirects for `/latest` to point to the new version. (This step may be deprecated in the future.)

You now have a staged release branch that is ready for all of your new major/minor release documentation updates. You can submit this as a pull request, set that to draft, and safely share previews of the next version for feedback.

#### Pachctl Command Doc Generation

Pachyderm often releases new pachctl commands in major/minor releases. You can auto-generate markdown docs for these commands from the Pachyderm repo and then migrate them to the docs site. This should be done closer to the release date to ensure all changes are captured.

1. Open the Pachyderm repo.
2. In a terminal, run `make install-doc`.
3. Run `sh ./etc/build/reference_refresh.sh`. 
4. Copy the files that get generated.
5. Open the docs repo.
6. Replace the pachctl command reference files with the newly generated ones.

#### Search Index Update 

1. Navigate to the docs site (either locally or deploy preview).
2. Add the following to the path: `/{{version}}/index.json`.
3. Copy the JSON.
4. Log in to Algolia.
5. Create a new index with the version name. (e.g., `2.4.x`).
6. Add the records by selecting **add records** > **add manually** and pasting in the json.

### Patch Version Updates

1. Open the docs repo and navigate to the latest release directory's top-level `_index.md` page (e.g., `/content/2.4.x/_index.md`.
2. Update the `latestPatch` attribute value.
3. Open the `config.yaml` file.
4. Update the `releaseInfo.patch` attribute value.