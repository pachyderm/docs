---
# metadata # 
title:  Install pachctl Auto-completion
description: Learn how to install Pachyderm's auto-completion helper tool (it's great for learning pachctl commands).
date: 
# taxonomy #
tags: ["deployment"]
series:
seriesPart:
---

Pachyderm autocompletion allows you to automatically finish
partially typed commands by pressing `TAB`. Autocompletion needs
to be installed separately when `pachctl` is already
available on your client machine.

Pachyderm autocompletion is supported for `bash` and `zsh` shells.
You must have either of them preinstalled
before installing Pachyderm autocompletion.

{{% notice note %}}

Type `pachctl completion --help` to display help information about the command.
{{% /notice %}}

## Install `pachctl` Autocompletion for `bash`

If you are using bash as your preferred shell, follow the steps in this
section to install `pachctl` completion for bash.

To install `pachctl` autocompletion for `bash`, perform the following steps:

1. Verify that `bash-completion` is installed on your machine.
   For example, if you have installed bash completion by using Homebrew,
   type:

   ```s
   brew info bash-completion
   ```

   This command returns information about the directory in which
   `bash-completion` and bash completion scripts are installed.
   For example,  `/usr/local/etc/bash_completion.d/`. You need
   to specify the path to `bash_completion.d` as the path to which install
   `pachctl` autocompletion. Also, the output of the info
   command might have a suggestion to include the path to
   `bash-completion` into your `~/.bash_profile` file.

1. Install `pachctl` autocompletion:


   ```s

   pachctl completion bash --install --path <path/to/bash-completion>
   ```

   For example, if you specify the path to `bash-completion` as
   `/usr/local/etc/bash_completion.d/pachctl`, your system response
   looks like this:

   **System response:**

   ```s
   Bash completions installed in /usr/local/etc/bash_completion.d/pachctl, you must restart bash to enable completions.
   ```

1. Restart your terminal.

   `pachctl` autocomplete should now be enabled in your system.

## Install pachctl Autocompletion for `zsh`

Recently, `zsh` became the default shell on macOS, therefore, many users
might prefer using `zsh`. Before you install `pachctl` completion for `zsh`,
you must have `zsh-completions` installed.

To install `pachctl` completion for `zsh`, complete the following
steps:

1. Verify that `zsh-completions` are installed on your machine.
   For example, if you have installed zsh completion by using Homebrew,
   type:

   ```s
   brew info zsh-completions
   ```

   You should see the directory in which `zsh-completions` are installed
   and instructions to add the correct path in the `~/.zshrc` file. Make sure
   you add the required path. If you do not have the `~/.zshrc` file on
   your computer, create one. For more information about setting up zsh
   completions, see
   [zsh-completions](https://github.com/zsh-users/zsh-completions).

1. Install `pachctl` autocompletion for `zsh`:

   ```s
   pachctl completion zsh --install --path <path/to/zsh-completions>
   ```

   **Example:**

   ```s
   pachctl completion zsh --install --path /usr/local/share/zsh-completions/_pachctl
   ```

   **System response:**

   ```s
   Completions installed in "_pachctl", you must restart your terminal to enable them.
   ```

1. Restart your terminal.

   `pachctl` autocomplete should now be enabled in your system.

{{% notice note %}}
**See Also:** [Pachyderm Shell](../../deploy-manage/manage/pachctl-shell/)
{{% /notice %}}