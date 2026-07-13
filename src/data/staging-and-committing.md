# Staging and Committing Changes

In this guide, we will explore how to stage and commit changes in your Git repository.

- [Staging and Committing Changes](#staging-and-committing-changes)
  - [Viewing Staged and Unstaged Changes](#viewing-staged-and-unstaged-changes)
  - [Committing Changes](#committing-changes)
    - [Skipping the Staging Area](#skipping-the-staging-area)
    - [Removing Files](#removing-files)
    - [Moving Files](#moving-files)


## Viewing Staged and Unstaged Changes

You can view the changes that have been staged for commit and the changes that are still unstaged using the `git diff` command.

```bash
git diff
```

`git diff` shows the exact lines that have been added, modified, or deleted in the files. By default, it shows the differences between the working directory and the staging area (unstaged changes). To see the differences between the staging area and the last commit (staged changes), you can use:

```bash
git diff --staged
```

You can use `git diff --cached` as an alternative to `git diff --staged`.

## Committing Changes

Once you have staged your changes, you can commit them to the repository using the `git commit` command. A commit is a snapshot of your repository at a specific point in time. Anything that still unstaged will not be included in the commit. The flag `-m` allows you to include a commit message directly in the command:

```bash
git commit -m "Your commit message here"
```

The output will show the number of files changed, the number of insertions and deletions, and the commit hash.

### Skipping the Staging Area

If you want to commit changes directly without staging them first, you can use the `-a` flag with the `git commit` command. This will automatically stage all tracked files that have been modified and commit them in one step:

```bash
git commit -am "Your commit message here"
```

### Removing Files

To remove a file from the working directory and the staging area, you can use the `git rm` command:

```bash
git rm <file-name>
```

If you modified the file or had staged it, you can use the `-f` flag to force the removal:

```bash
git rm -f <file-name>
```

To keep the file in your working directory but remove it from the staging area, you can use the `--cached` flag:

```bash
git rm --cached <file-name>
```

You can pass multiple file names to the `git rm`. You can also use wildcards to remove files that match a specific pattern.

Example: To remove all `.log` files from the repository, you can use:

```bash
git rm *.log
git rm log/\*.log
```

**Note:** the backslash `\` is used to escape the asterisk `*` in the second command, which is necessary when using wildcards in certain shells.

### Moving Files

To move or rename a file in the repository, you can use the `git mv` command. This command will move the file in your working directory and stage the change for commit:

```bash
git mv <old-file-name> <new-file-name>
```
