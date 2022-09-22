# Pachyderm Documentation


<-- blurb about pachyderm -->

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

When contributing, it's recommended to create a pull request with the following format:

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
2. Create a new markdown file titled `_index.md` inside the new folder.
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
