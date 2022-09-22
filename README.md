# Pachyderm Documentation


<-- blurb about pachyderm -->

**Note**:  For theme documentation, see the theme [README](themes/pach-emdash/README.md).

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
