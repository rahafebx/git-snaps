# Git Branching - Remote Branches

Remote branches are references to the state of branches in your remote repositories. They are read-only and cannot be modified directly. Instead, you can fetch updates from the remote repository and merge them into your local branches.

**Table of Contents:**
- [Git Branching - Remote Branches](#git-branching---remote-branches)
  - [Pushing and Pulling](#pushing-and-pulling)
  - [Tracking Branches](#tracking-branches)
  - [Deleting Remote Branches](#deleting-remote-branches)


Remote references are pointers in your remote repositories, including branches, tags, and other references.  You can get a list of all remote references by using the `git ls-remote` or `git remote show` command:

```bash
git ls-remote <remote-name>
git remote show <remote-name>
```
`<remote-name>` is the name of the remote repository, such as `origin`. The `git ls-remote` command shows all references in the remote repository, while the `git remote show` command provides more detailed information about the remote repository, including its branches and their tracking status.

Remote branches are references to the state of branches in your remote repositories. They are read-only and cannot be modified directly. Instead, you can fetch updates from the remote repository and merge them into your local branches.

Remote branches are typically prefixed with the name of the remote repository `<remote>/<branch>`, such as `origin/main` or `origin/feature/new-feature`. You can see a list of all remote branches by using the `git branch -r` command:

```bash
git branch -r
```

When cloning a repository, Git automatically creates a remote called `origin` that points to the cloned repository. The default branch of the remote repository is also checked out and set up to track the corresponding remote branch.

To synchronize your local repository with the remote repository, you can use the `git fetch <remote-name>` command to retrieve updates from the remote repository without modifying your local branches. You can then merge the changes into your local branches as needed.

You can add another remote reference to your repository using the `git remote add <remote-name> <remote-url>` command. This allows you to fetch and push changes to multiple remote repositories.

## Pushing and Pulling

To push your local commits to a remote repository, you can use the `git push <remote-name> <branch-name>` command. This will update the remote branch with your local commits.

```bash
git push origin feature/theme-switching
```
We can also use `git push <remote-name> <branch-name>:<remote-branch-name>` to push a local branch to a different remote branch name that differs from the local branch name.

```bash
git push origin feature/theme-switching:feature/new-feature
```

To fetch updates from a remote repository, you can use the `git fetch <remote-name>` command. This will retrieve the latest changes from the remote repository without modifying your local branches.

```bash
git fetch origin
```
However, if you want to fetch and merge the changes from the remote branch into your local branch, you can use the `git pull <remote-name> <branch-name>` command. This is a combination of `git fetch` and `git merge`.

```bash
git pull origin feature/theme-switching
```
IF you use the `fetch` command, you can also use the `git merge <remote-name>/<branch-name>` command to merge the changes from the remote branch into your local branch.

```bash
git merge origin feature/theme-switching
git merge origin/feature/theme-switching
```
## Tracking Branches

Checking out a remote branch creates a local tracking branch that is set up to track the remote branch. This means that your local branch will automatically be updated with changes from the remote branch when you fetch or pull.

When you clone a repository, Git automatically creates a local tracking branch for the default branch of the remote repository. You can also create a local tracking branch for any other remote branch by using the `git checkout -b <local-branch-name> <remote-name>/<remote-branch-name>` command.

```bash
git checkout -b feature/new-feature origin/feature/new-feature
```
The `--track` option can also be used to create a local tracking branch for a remote branch:

```bash
git checkout --track origin/feature/new-feature
```
To setup a local branch with a different name than the remote branch, you can use the `-b` option with the `git checkout` command:

```bash
git checkout -b local-branch-name origin/remote-branch-name
```
To set a local branch to track a remote branch, you can use the `git branch --set-upstream-to=<remote-name>/<remote-branch-name> <local-branch-name>` command:

```bash
git branch --set-upstream-to=origin/feature/new-feature feature/new-feature
```
Or simply use the `-u` option with the `git branch` command:

```bash
git branch -u origin/feature/new-feature feature/new-feature
```
To view tracking branches, you can use the `git branch -vv` command. This will show you the local branches, their tracking status, and the last commit on each branch.

```bash
git branch -vv
```

## Deleting Remote Branches
To delete a remote branch, you can use the `git push <remote-name> --delete <branch-name>` command. This will remove the specified branch from the remote repository.

```bash
git push origin --delete feature/new-feature
```