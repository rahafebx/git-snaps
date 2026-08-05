# Git Branching - Branch Management

Managing branches is an essential part of working with Git. This post will cover the basic commands for managing branches, including listing, creating, deleting, and renaming branches.

**Table of Contents:**
- [Git Branching - Branch Management](#git-branching---branch-management)
  - [Listing Branches](#listing-branches)
  - [Listing last commit on each branch](#listing-last-commit-on-each-branch)
  - [Listing merged and unmerged branches](#listing-merged-and-unmerged-branches)
  - [Deleting branches](#deleting-branches)
  - [Changing the name of a branch](#changing-the-name-of-a-branch)


## Listing Branches

To list all the branches in your repository, you can use the `git branch` command:

```bash
git branch
```
The current branch will be highlighted with an asterisk. To list all branches, including remote branches, you can use the `-a` option:

```bash
git branch -a
```

## Listing last commit on each branch

To see the last commit on each branch, you can use the `git log` command with the `--oneline` and `--decorate` options:

```bash
git log --oneline --decorate --all
```
Or, you can use the `git branch` command with the `-v` option:

```bash
git branch -v
```

## Listing merged and unmerged branches

To see which branches have been merged into the current branch, you can use the `--merged` option:

```bash
git branch --merged
```
To see which branches have not been merged into the current branch, you can use the `--no-merged` option:

```bash
git branch --no-merged
```

## Deleting branches

To delete a branch, you can use the `-d` option:
```bash
git branch -d <branch-name>
```

Branch delete may fail if the branch has unmerged changes. In that case, you can use the `-D` option to force delete the branch:

```bash
git branch -D <branch-name>
```

## Changing the name of a branch

To rename a branch, you can use the `-m` or `--move` option:

```bash
git branch -m <old-branch-name> <new-branch-name>
```
This change will only affect your local repository. If you want to rename a branch on a remote repository, you will need to push the renamed branch and delete the old branch on the remote repository:

```bash
git push --set-upstream origin <new-branch-name>
git push origin --delete <old-branch-name>
```
Changing the master branch name is a special case. You can rename the master branch to main using the following commands:

```bash
git branch -m master main
git push --set-upstream origin main
```
**Note:** you can use `-u` instead of `--set-upstream` to set the upstream branch.

## Learning Resources
- [Learn Git Branching](https://learngitbranching.js.org/)
- [Git branch](https://www.atlassian.com/git/tutorials/using-branches)
- [Git Rename Branch – How to Change a Local Branch Name](https://www.freecodecamp.org/news/git-rename-branch-how-to-change-a-local-branch-name/)
- [How to Delete a Git Branch Both Locally and Remotely](https://www.freecodecamp.org/news/how-to-delete-a-git-branch-both-locally-and-remotely/)
## References
- [Branch Management](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)