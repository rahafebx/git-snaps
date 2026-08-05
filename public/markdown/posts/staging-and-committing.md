# Staging and Committing Changes

In this guide, we will explore how to stage and commit changes in your Git repository.

**Table of Contents:**
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

## Skipping the Staging Area

If you want to commit changes directly without staging them first, you can use the `-a` flag with the `git commit` command. This will automatically stage all tracked files that have been modified and commit them in one step:

```bash
git commit -am "Your commit message here"
```
**Note:** The `-a` flag only works for tracked files. If you have new untracked files, you will need to stage them first using `git add`.

To commit a specific file, you can specify the file name in the `git commit` command:

```bash
git commit -m "Your commit message here" <file-name>
```

If you run `git commit` without the `-m` flag, Git will open your default text editor to allow you to write a more detailed commit message. After writing your message, save and close the editor to complete the commit.

You can set the default text editor for Git using the following command, as we see in the [Getting Started with Git](getting-started) post:

```bash
# view current editor
git config --global core.editor

# set your default editor
git config --global core.editor "your-editor"
```

**Deal with `vim` editor (the default):**

If you are using `vim` as your default editor, you can save and exit by pressing `Esc`, typing `:wq`, and then pressing `Enter`. If you want to exit without saving, press `Esc`, type `:q!`, and then press `Enter`.

## Removing Files

To remove a file from the working directory and the staging area, you can use the `git rm` command:

```bash
git rm <file-name>
```
This command will delete the file from your working directory and stage the removal for the next commit. After running this command, you can commit the change to finalize the removal.

You can use `.gitignore` to keep the file in your working tree but remove it from your staging area. See [Git Basics - Getting Started](getting-started) for more information.


If you modified the file or had staged it, you can use the `-f` flag to force the removal:

```bash
git rm -f <file-name>
```

To keep the file in your working directory but remove it from the staging area, you can use the `--cached` flag:

```bash
git rm --cached <file-name>
```

You can pass multiple file names to the `git rm`. You can also use wildcards to remove files that match a specific pattern.

**Example:** To remove all `.log` files from the repository, you can use:

```bash
git rm *.log
git rm log/\*.log
```

**Note:** the backslash `\` is used to escape the asterisk `*` in the second command, which is necessary when using wildcards in certain shells.

## Moving Files

To move or rename a file in the repository, you can use the `git mv` command. This command will move the file in your working directory and stage the change for commit:

```bash
git mv <old-file-name> <new-file-name>
```

## Learning Resources
- [Git commit](https://www.atlassian.com/git/tutorials/saving-changes/git-commit)
- [Comparing changes with Git diff](https://refine.dev/blog/git-diff-command/)
- [What does Staged Changes mean in Git?](https://dillionmegida.com/p/staged-changes-in-git/)
- [How to unstage files in Git](https://www.git-tower.com/learn/git/faq/git-unstage)
- [Rewriting history](https://www.atlassian.com/git/tutorials/rewriting-history)

## References
[Recording Changes to the Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)