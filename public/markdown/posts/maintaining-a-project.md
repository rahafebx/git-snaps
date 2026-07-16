# Distributed Git - Maintaining a Project

Whether you maintain a canonical repository or want to help by verifying or approving patches, you need to know how to accept work in a way that is clearest for other contributors and sustainable by you over the long run.

Table of Contents:
- [Distributed Git - Maintaining a Project](#distributed-git---maintaining-a-project)
  - [Working in Topic Branches](#working-in-topic-branches)
  - [Applying Patches from Email](#applying-patches-from-email)
    - [Applying a Patch with `apply`](#applying-a-patch-with-apply)
    - [Applying a Patch with `am`](#applying-a-patch-with-am)
  - [Checking Out Remote Branches](#checking-out-remote-branches)
  - [Determining What Is Introduced](#determining-what-is-introduced)
  - [Integrating Contributed Work](#integrating-contributed-work)
    - [Merging Workflows](#merging-workflows)
    - [Rebasing and Cherry-Picking Workflows](#rebasing-and-cherry-picking-workflows)
    - [Rerere](#rerere)
  - [Tagging Your Releases](#tagging-your-releases)
  - [Generating a Build Number](#generating-a-build-number)
  - [Preparing a Release](#preparing-a-release)
  - [The Shortlog](#the-shortlog)


## Working in Topic Branches
A topic branch is a temporary branch that is created to work on a specific feature or bug fix.

```bash
git checkout -b src/fix_bug origin/main
```
Add the contributed work that you received into this topic branch:

```bash
git remote add contributor <contributor-repo-url>
git fetch origin contributor_branch
git merge --no-ff contributor_branch
```
Merge it into your longer-term branches:

```bash
git checkout main
git merge --no-ff src/fix_bug
```

`--no-ff` option tells Git to create a merge commit even if the merge could be resolved as a fast-forward. This is useful when you want to keep the history of your changes clean and concise.

## Applying Patches from Email
If you receive a patch over email that you need to integrate into your project, you can use the `git am` or `git apply` command to apply the patch.

### Applying a Patch with `apply`
Used when the patch generated with `git diff`.

```bash
git apply <patch-file>
```

To check if the patch can be applied cleanly, you can use the `--check` option:

```bash
git apply --check <patch-file>
```
### Applying a Patch with `am`
Used when the patch generated with `git format-patch`.

First, you should download the batch email into an mbox file. Then, you can use the `git am` command to apply the patch:

```bash
git am < mbox-file
```

This will generate a commit for each patch in the mbox file, preserving the original author and commit message.

Output example of the `git log --pretty=fuller -1` after applying the patch:

```bash
git log --pretty=fuller -1
commit 1a2b3c4d5e6f7g8h9i0j
Author: John Doe <john.doe@example.com>
AuthorDate: Mon Jan 1 12:00:00 2026 -0500
Commit: John Doe <john.doe@example.com>
CommitDate: Mon Jan 1 12:00:00 2026 -0500
    Fix bug in feature X
    Limit the number of retries to 3 to prevent infinite loops.
```
You can use `--resolved` option to mark a patch as resolved if you have manually resolved any conflicts that arose during the application of the patch.

```bash
# fix any conflicts in the patch
git add <conflicted-files>
git am --resolved
```

You can use `-3` option to use a three-way merge if the patch does not apply cleanly.

```bash
git am -3 <batch-file>
```

You can run `am` command in interactive mode when applying a number of patches from an mbox, which stops at each patch it finds and asks if you want to apply it:

```bash
git am -3 -i mbox
Commit Body is:
--------------------------
See if this helps the gem
--------------------------
Apply? [y]es/[n]o/[e]dit/[v]iew patch/[a]ccept all
```

## Checking Out Remote Branches

You can test contributed work by adding the contributor's repository as a remote and fetching their branch. You can then check out the branch and test it locally.

```bash
# add the contributor's repository as a remote
git remote add contributor <contributor-repo-url>
# fetch the contributor's branch
git fetch contributor
# check out the contributor's branch
git checkout -b <branch-name> contributor/<contributor-branch>
```
if contributor emails you again later with another branch containing another great feature, you could directly `fetch` and `checkout` because you already have the remote setup.

To do a one-time pull without saving the URL as a remote reference:

```bash
git pull <contributor-repo-url>
```
## Determining What Is Introduced

To get a review of all commits that are in the the created topic branch but that aren't in your `main` branch, you can exclude commits in the `main` by using `--not` option before the branch name.

```bash
git log --oneline --no-merges --not main topic-branch
```
You can use the `-p` option to show the patch introduced by each commit.

```bash
git log -p --oneline --no-merges --not main topic-branch
```

To see a full diff of all changes introduced by the topic branch, you can use the `git diff` command:

```bash
git diff main..topic-branch
```
This command shows you only the work your current topic branch has introduced since its common ancestor with `main`.

## Integrating Contributed Work
There are several ways to integrate contributed work into your project. The most common methods are merging and rebasing.

### Merging Workflows
One basic workflow is to merge all work directly into your `master` branch.

```bash
git checkout main
git merge topic-branch
git push origin main
git branch -d topic-branch
```

Instead you may have two long-running branches, `main` and `next`, where `next` is the branch that will eventually be merged into `main`. In this case, you would merge the topic branch into `next` instead of `main`.

```bash
git checkout next
git merge topic-branch
git push origin next
git branch -d topic-branch
```
### Rebasing and Cherry-Picking Workflows

Rebase or cherry-pick the contributed work into your `main` branch. This workflow is useful when you want to keep a linear history of your changes.

```bash
git checkout main
git rebase topic-branch
git push origin main
```

A cherry-pick workflow is useful when you want to apply specific commits from a topic branch to your `main` branch.

```bash
git checkout main
git cherry-pick <commit-hash>
git push origin master
```
### Rerere
Git has a feature called "rerere" (reuse recorded resolution) that can help you resolve conflicts more easily. When you enable rerere, Git will remember how you resolved a conflict and automatically apply the same resolution if the same conflict occurs again in the future.

This feature comes in two parts:

1. Configuration setting
```bash
   git config --global rerere.enabled true
```

2. Command

```bash
   git rerere
```
## Tagging Your Releases
Tags are used to mark specific points in history as important. Typically, people use this functionality to mark release points (v1.0, v2.0 and so on).

```bash
git tag -a v1.0 -m "Release version 1.0"
```

To sign your tags with GPG:
1. Figure out which key you want to use for signing your tags. You can list your GPG keys with the following command:

```bash
gpg --list-keys
```
2. Import the key into your Git database, by exporting it from your GPG keyring and importing it into Git:

```bash
gpg --export -a <key-id> | git hash-object --stdin -w
```
This command will give you back the SHA-1 of the blob:
```bash
659ef797d181633c87ec71ac3f9ba29fe5775b92
```

3. Create a tag that points directly to the key by specifying the new SHA-1 value that `hash-object` command gave you:

```bash
git tag -a v1.0 -m "Release version 1.0" 659ef797d181633c87ec71ac3f9ba29fe5775b92
```

4. Verify the tag, and directly import GPG key:

```bash
git show v1.0 | gpg --import
```

5. Verify the tag signature:

```bash
git tag -v v1.0
```

6. Push the tag to the remote repository:

```bash
git push origin v1.0
```
## Generating a Build Number
If you want to generate a build number for your project, you can use the `git describe` command. This command will give you a human-readable name for the current commit, based on the most recent tag that is reachable from it.

```bash
git describe --tags
```
Expected output:
```
v1.0-2-g659ef79
```

## Preparing a Release
Create an archive of the latest snapshot of your code using `git archive` command:

```bash
$ git archive main --prefix='project/' | gzip > `git describe master`.tar.gz
$ ls *.tar.gz
v1.0-2-g659ef79.tar.gz
```
You can also create a zip file instead of a tarball:

```bash
$ git archive main --prefix='project/' --format=zip > `git describe master`.zip
```
## The Shortlog
To email interested people with your project updates, you can get the changelog of what has been added to your project since your last release using `git shortlog` command:

```bash
git shortlog --no-merges main --not v1.0
```
This command will give you a summary of all the commits since your last release.
