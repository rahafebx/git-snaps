
# Undoing Changes
In this guide, we will explore how to undo changes in your Git repository.

**Table of Contents:**
- [Undoing Changes](#undoing-changes)
  - [Amending Commits](#amending-commits)
  - [Unstaging Changes](#unstaging-changes)
  - [Unmodifying Changes](#unmodifying-changes)
  - [Undoing With "git restore"](#undoing-with-git-restore)


## Amending Commits

When you want to modify the most recent commit, you can use the `git commit --amend` command. This allows you to change the commit message or add new changes to the last commit.

```bash
git commit --amend
```

After running this command, Git will open your default text editor with the commit message of the last commit. You can edit the message by pressing `i` and save the changes by pressing `Esc` and then typing `:wq` and pressing `Enter`. If you want to add new changes to the last commit, you can stage the changes using `git add` before running `git commit --amend`.

Only amend commits that have not been pushed to a remote repository. If you have already pushed the commit, you should avoid amending it, as it can cause issues for other collaborators.

You can set the default text editor for Git using the following command, as we see in the [Getting Started with Git](getting-started) post:

```bash
# view current editor
git config --global core.editor

# set your default editor
git config --global core.editor "your-editor"
```

You can use `-m` to provide a new commit message directly in the command line:

```bash
git commit --amend -m "New commit message"
```

Or `--no-edit` to keep the existing commit message:

```bash
git commit --amend --no-edit
```

## Unstaging Changes

If you have staged changes that you want to unstage, you can use the `git reset` command. This command will move the changes from the staging area back to the working directory, allowing you to modify them further before committing.

```bash
git reset HEAD <file-name>
```

## Unmodifying Changes

If you have modified changes that you want to undo, you can use the `git checkout` command. This command will discard the changes and restore the file to its last committed state.

```bash
git checkout -- <file-name>
```
Any local changes you made to the file will be lost, so use this command with caution. If you want to discard all local changes in your working directory, you can use the following command:

```bash
git checkout -- .
```

## Undoing With "git restore"

`git restore` is a command that can be used to undo changes in your working directory or staging area. It can be used to restore files to their last committed state or to unstage changes. It's a more modern alternative to `git checkout` for undoing changes.

To restore a file to its last committed state:

```bash
git restore <file-name>
```

To restore a file to its last staged state (unstage changes), you can use the `--staged` option:

```bash
# To unstage changes for a file
git restore --staged <file-name>
```
