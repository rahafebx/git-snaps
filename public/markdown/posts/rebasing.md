# Git Branching - Rebasing

In Git, rebasing is a process of moving or combining a sequence of commits to a new base commit. It is an alternative to merging and can be used to maintain a cleaner project history.

Table of Contents:
- [Git Branching - Rebasing](#git-branching---rebasing)
  - [More Interesting Rebases](#more-interesting-rebases)
  - [The Perils of Rebasing](#the-perils-of-rebasing)
  - [Rebase vs. Merge](#rebase-vs-merge)


When you rebase a branch, you are essentially taking the changes from that branch and replaying them on top of another branch. This can be useful for integrating changes from one branch into another without creating a merge commit.

For example, if you have a feature branch that has diverged from the main branch, you can rebase the feature branch onto the main branch to incorporate the latest changes from the main branch into your feature branch.

```bash
git checkout feature/new-feature
git rebase main
```
At this point, you can go back to the `main` branch and merge the `feature/new-feature` branch. Since the feature branch has been rebased onto the main branch, the merge will be a fast-forward merge, and no merge commit will be created.

```bash
git checkout main
git merge feature/new-feature
```
If you examine the log of a rebased branch, it looks like a linear history: it appears that all the work happened in series, even when it originally happened in parallel.

The snapshots of the project are the same, but the history is different. Rebasing is a powerful tool, but it should be used with caution, especially when working with shared branches. It is generally recommended to avoid rebasing public branches that others may be using, as it can rewrite history and cause confusion.

## More Interesting Rebases
You can have your rebase replay on something other than the tip of the current branch. For example, you branched a topic branch `server` to add some server-side functionality, and made a commit. Then, you branched off that to make client-side changes `client` and committed a few times. Finally, you went back to your `server` branch and did a few more commits.

You decide to merge client-side changes into your mainline for a release, but you want to make sure that the server-side changes are not included in the merge. You can rebase the `client` branch onto the `main` branch, which will replay the client-side commits on top of the main branch, excluding the server-side changes.

```bash
git checkout client
git rebase --onto main server client
```
This means, "rebase the `client` branch onto the `main` branch, but only include commits that are not in the `server` branch."

Now you can merge the `client` branch into the `main` branch without including the server-side changes.

```bash
git checkout main
git merge client
```
You decide to pull in your `server` branch as well. You can rebase the `server` branch onto the `main` branch without having to check it out first.

```bash
git rebase main server
```
This checks out the `server` branch, rebases it onto the `main` branch, and then checks out the `main` branch again. Now you can merge the `server` branch into the `main` branch. (fast-forward the base branch `main` to the tip of the `server` branch).

```bash
git checkout main
git merge server
```
You can remove the `server` and `client` branches now that they have been merged into the `main` branch.

```bash
git branch -d server
git branch -d client
```
## The Perils of Rebasing

**Don't rebase commits that have been pushed to a shared repository.**

When you rebase stuff, you’re abandoning existing commits and creating new ones with new SHA-1 checksums. If you rebase commits that have been pushed to a shared repository, you will rewrite history and cause confusion for other developers who may have based their work on those commits.

## Rebase vs. Merge
Your repository’s commit history is a record of what actually happened in your project. Merging preserves the history of how the project was developed, while rebasing creates a linear history that can be easier to read and understand.

There is no difference in the end product of the integration, but rebasing makes for a cleaner history.

> You can get the best of both worlds: rebase local changes before pushing to clean up your work, but never rebase anything that you’ve pushed somewhere.