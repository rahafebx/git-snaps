# Working with Remote Repositories

Remote repositories are versions of your project that are hosted on the internet or network somewhere. You can have multiple remote repositories for a single project, and you can push and pull changes to and from these repositories.

**Table of Contents:**
- [Working with Remote Repositories](#working-with-remote-repositories)
  - [Showing Remote Repositories](#showing-remote-repositories)
  - [Adding a Remote Repository](#adding-a-remote-repository)
  - [Fetching and Pulling from Remote Repositories](#fetching-and-pulling-from-remote-repositories)
  - [Pushing Changes to Remote Repositories](#pushing-changes-to-remote-repositories)
  - [Inspecting a Remote Repository](#inspecting-a-remote-repository)
  - [Renaming and Removing Remote Repositories](#renaming-and-removing-remote-repositories)


## Showing Remote Repositories

To see which remote repositories are configured for your local repository, you can use the `git remote -v` command. This will show you the names and URLs of the remote repositories:

```bash
git remote -v
```
Using `git remote` without the `-v` option will only show the names of the remote repositories.

Remote repositories could use a variety of protocols, including HTTPS, SSH, and Git. The URL format for each protocol is different, and you can choose the one that best fits your needs. For more details see [Git on the Server](git-on-the-server). 

## Adding a Remote Repository

To add a new remote repository, you can use the `git remote add` command followed by the name you want to give to the remote and the URL of the repository:

```bash
git remote add <remote-name> <repository-url>
```

The `git clone` command automatically adds a remote named `origin` that points to the cloned repository. You can use any name you like for the remote, but `origin` is the conventional name for the main remote repository.

Example:

```bash
git remote add pb https://github.com/rahafebx/progit-snapshot.git

# use added remote name to fetch changes from the remote repository
git fetch pb
```

## Fetching and Pulling from Remote Repositories

To get the latest changes from a remote repository, you can use the `git fetch` command. This command downloads the changes from the remote repository ***but does not merge them into your local branch***:

```bash
git fetch <remote-name>
```

When cloning a repository, Git automatically sets up a remote named `origin` that points to the cloned repository. You can use this remote name to fetch changes from the remote repository:

```bash
git fetch origin
```

If your branch is set to track a remote branch, you can use the `git pull` command to **fetch** the changes from the remote repository and **merge** into your local branch in one step:

```bash
git pull <remote-name> <branch-name>
```

The rebase option can be used with `git pull` to rebase your local changes on top of the fetched changes instead of merging them:

```bash
git pull --rebase <remote-name> <branch-name>
```

If the `pull.rebase` configuration option is set to `true`, Git will automatically rebase your local changes on top of the fetched changes when you run `git pull`. You can set this option using the following command:

```bash
git config --global pull.rebase true
```

If you want the default behavior of `git pull` to be a merge instead of a rebase, you can set the `pull.rebase` configuration option to `false`:

```bash
git config --global pull.rebase false
```

## Pushing Changes to Remote Repositories

To push your local commits to a remote repository, you can use the `git push` command. This command uploads your local commits to the specified remote repository and branch:

```bash
git push <remote-name> <branch-name>
```

## Inspecting a Remote Repository

You can inspect a remote repository using the `git remote show` command. This command provides detailed information about the remote repository, including its URL, branches, and tracking information:

```bash
git remote show <remote-name>
```

This command shows which branch is automatically pushed to the remote repository when you run `git push` without specifying a branch. You can set the upstream branch for your local branch using the `--set-upstream` option, or `-u` for short. This option tells Git to remember the remote branch that your local branch is tracking, so you can use `git push` and `git pull` without specifying the remote and branch names in the future:

```bash
git push --set-upstream <remote-name> <branch-name>
```

## Renaming and Removing Remote Repositories

To rename a remote repository, you can use the `git remote rename` command:

```bash
git remote rename <old-remote-name> <new-remote-name>
```

To remove a remote repository, you can use the `git remote remove` command:

```bash
git remote remove <remote-name>
```