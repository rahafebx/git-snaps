
# Undoing Changes
In this guide, we will explore how to undo changes in your Git repository.

- [Undoing Changes](#undoing-changes)
  - [Amending Commits](#amending-commits)
  - [Unstaging Changes](#unstaging-changes)
  - [Unmodifying Changes](#unmodifying-changes)
  - [Undoing With `git restore`](#undoing-with-git-restore)


## Amending Commits

When you want to modify the most recent commit, you can use the `git commit --amend` command. This allows you to change the commit message or add new changes to the last commit.

```bash
git commit --amend
```

After running this command, Git will open your default text editor with the commit message of the last commit. You can edit the message by pressing `i` and save the changes by pressing `Esc` and then typing `:wq` and pressing `Enter`. If you want to add new changes to the last commit, you can stage the changes using `git add` before running `git commit --amend`.

Only amend commits that have not been pushed to a remote repository. If you have already pushed the commit, you should avoid amending it, as it can cause issues for other collaborators.

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

## Undoing With `git restore`

`git restore` is a command that can be used to undo changes in your working directory or staging area. It can be used to restore files to their last committed state or to unstage changes. It's a more modern alternative to `git checkout` for undoing changes.

```bash
# To restore a file to its last committed state
git restore <file-name>
```

To restore a file to its last staged state (unstage changes), you can use the `--staged` option:

```bash
# To unstage changes for a file
git restore --staged <file-name>
```
