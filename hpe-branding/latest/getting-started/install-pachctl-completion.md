---
# metadata # 
title:  Install Pachctl Auto-completion
description: Learn how to install MLDM's auto-completion helper tool (it's great for learning pachctl commands).
date: 
# taxonomy #
tags: ["deployment"]
series:
seriesPart: 
weight: 3
directory: true 
---

MLDM autocompletion allows you to automatically finish
partially typed commands by pressing `TAB`. Autocompletion needs
to be installed separately when `pachctl` is already
available on your client machine.

MLDM autocompletion is supported for `bash` and `zsh` shells.
You must have either of them preinstalled
before installing MLDM autocompletion.

{{% notice tip %}}
Type `pachctl completion --help` to display help information about the command.
{{% /notice %}}

{{< stack type="wizard" >}}
 {{% wizardRow id="Command Shell" %}}
  {{% wizardButton option="Zsh" state="active" %}}
  {{% wizardButton option="Bash" %}}
 {{% /wizardRow %}}

{{% wizardResults %}}
{{% wizardResult val1="command-shell/bash"%}}
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

2. Install `pachctl` autocompletion:
3. 
   ```s

   pachctl completion bash --install --path <path/to/bash-completion>
   ```

   For example, if you specify the path to `bash-completion` as
   `/usr/local/etc/bash_completion.d/pachctl`, your system response
   looks like this:

   **System response:**

   ```
   Bash completions installed in /usr/local/etc/bash_completion.d/pachctl, you must restart bash to enable completions.
   ```

4. Restart your terminal.

   `pachctl` autocomplete should now be enabled in your system.
{{% /wizardResult %}}

{{% wizardResult val1="command-shell/zsh"%}}

1. Verify that `zsh-completions` are installed on your machine.
   For example, if you have installed zsh completion by using Homebrew,
   type:

   ```zsh
   brew info zsh-completions
   ```

   You should see the directory in which `zsh-completions` are installed
   and instructions to add the correct path in the `~/.zshrc` file. Make sure
   you add the required path. If you do not have the `~/.zshrc` file on
   your computer, create one. For more information about setting up zsh
   completions, see
   [zsh-completions](https://github.com/zsh-users/zsh-completions).

2. Install `pachctl` autocompletion for `zsh`:

   ```zsh
   pachctl completion zsh --install --path <path/to/zsh-completions>
   ```

   **Example:**

   ```zsh
   pachctl completion zsh --install --path /usr/local/share/zsh-completions/_pachctl
   ```

   **System response:**

   ```
   Completions installed in "_pachctl", you must restart your terminal to enable them.
   ```

3. Restart your terminal.

   `pachctl` autocomplete should now be enabled in your system.
{{% /wizardResult %}}
{{% /wizardResults %}}
 {{< /stack >}}
 