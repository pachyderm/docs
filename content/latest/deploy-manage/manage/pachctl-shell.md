---
# metadata # 
title: Using the MLDM Shell
description: Learn how to use the MLDM Shell.
date: 
# taxonomy #
tags: ["pachctl", "cli"]
series:
seriesPart:
---

The MLDM Shell is a special-purpose shell for MLDM that provides
auto-suggesting as you type. New MLDM users will find this user-friendly
shell especially appealing as it helps to learn `pachctl`, type commands
faster, and displays useful information about the objects you are interacting
with. This new shell does not supersede the classic use of `pachctl` shell
in your standard terminal, but is a compelling convenience for power users
and beginners alike. If you prefer to use just `pachctl`, you can continue to
do so.

To enter the MLDM Shell, type:

```s
pachctl shell
```

When you enter `pachctl` shell, your prompt changes to display your current
MLDM context, as well as displays a list of available commands in a
drop-down list.

![MLDM Shell](/images/s_pach_shell.png)

To scroll through the list, press `TAB` and then use arrows to move up or
down. Press `SPACE` to select a command.

When in the MLDM Shell, you do not need to prepend your commands with
`pachctl` because MLDM does that for you automatically behind the
scenes. For example, instead of running `pachctl list repo`, run `list
repo`:

![MLDM Shell list repo](/images/s_pach_shell_list_repo.png)

With nested commands, `pachctl shell` can do even more. For example, if you
type `list file <repo>@<branch>/`, you can preview and select files from that
branch:

![MLDM Shell list file](/images/s_pach_shell_list_file.png)

Similarly, you can select a commit:

![MLDM Shell list commit](/images/s_pach_shell_list_commit.png)

### Exit the MLDM Shell

To exit the MLDM Shell, press `CTRL-D` or type `exit`.

### Clearing Cached Completions

To optimize performance and achieve faster response time,
the MLDM Shell caches completion results. You can clear this cache
by pressing **F5** forcing the MLDM Shell to send requests to the
server for new completions.

### Clearing the screen

To clear the screen, press `CTRL-L`.

## Limitations

The MLDM Shell does not support standard UNIX commands or `kubectl` commands.
To run them, exit the MLDM Shell or run the commands in a different terminal
window.
