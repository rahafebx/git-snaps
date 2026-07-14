# Git Aliases

Aliases are shortcuts for Git commands that can save you time and make your workflow more efficient. You can create aliases for frequently used commands or for commands that have long names.

- [Git Aliases](#git-aliases)
  - [Creating Aliases](#creating-aliases)
  - [Using Aliases](#using-aliases)

## Creating Aliases

```bash
# Create a global alias for the 'git status' command
git config --global alias.st status

# Use the alias to check the status of your repository
git st
```

## Using Aliases

To run an external command as an alias, you can use the `!` character followed by the command. For example, to create an alias for the `ls -la` command, you can use:

```bash
# Create a global alias for the 'ls -la' command
git config --global alias.ls '!ls -la'

git ls
```

