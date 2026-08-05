# Git Aliases

Aliases are shortcuts for Git commands that can save you time and make your workflow more efficient. You can create aliases for frequently used commands or for commands that have long names.

**Table of Contents:**
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
Here are a couple of examples you may want to set up:

```bash
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
$ git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
```

## Using Aliases

To run an external command as an alias, you can use the `!` character followed by the command. For example, to create an alias for the `ls -la` command, you can use:

```bash
# Create a global alias for the 'ls -la' command
git config --global alias.ls '!ls -la'

git ls
```

To use the previous aliases:

```bash
git co <branch-name>
git br <branch-name>
git ci -m "Commit message"
git st -s
git reset HEAD -- <file-name>
git last
```

## References

- [Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)