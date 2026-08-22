# Git Tools - Stashing and Cleaning
Sometimes you may want to temporarily set aside your changes without committing them. Git provides a powerful feature called "stashing" that allows you to save your work-in-progress and revert to a clean working directory. Additionally, Git offers commands to clean up untracked files and directories.

## Stashing Changes

While you are working on a project, you might find yourself in a situation where you need to switch branches or pull updates, but you have uncommitted changes that you don't want to commit yet. In such cases, you can use the `git stash` command to save your changes temporarily.

```bash
git stash
```
At this point, you can switch branches or perform other Git operations without losing your work. When you're ready to continue working on your changes, you can apply the stashed changes back to your working directory:

```bash
# List all stashes
git stash list

# Apply the most recent stash
git stash apply

# Apply a specific stash (e.g., stash@{0})
git stash apply stash@{0}
```

You should use `--index` option if you want to keep the staged changes when applying the stash:

```bash
git stash apply --index
```

Applied stashes remain in the stash list until you explicitly drop them. To remove a stash after applying it, use:

```bash
# Drop the most recent stash
git stash drop

# Drop a specific stash (e.g., stash@{0})
git stash drop stash@{0}

# Drop all stashes
git stash clear
```
## Creative Stashing
There are a few stash variants that can be helpful in different scenarios:

The `--keep-index` option allows you to stash changes while keeping the staged changes intact. This is useful when you want to save your working directory changes but keep the index (staged files) as they are.

```bash
git stash --keep-index
```

The `--include-untracked` option allows you to stash untracked files along with your changes. This is useful when you have new files that are not yet tracked by Git.

```bash
git stash --include-untracked
```

To include both untracked and ignored files in your stash, you can use the `--all` option:

```bash
git stash --all
```

The `--patch` option allows you to interactively select changes to stash. This is useful when you want to stash only specific parts of your changes.

```bash
git stash --patch
```

## Creating a Branch from a Stash
If you want to create a new branch from a stash, you can use the following command:

```bash
git stash branch <branch-name> <stash>
```

## Cleaning your Working Directory
`git clean` is a command that helps you remove untracked files and directories from your working directory. This can be useful when you want to start fresh or clean up your project.

A safer option is to remove everything but save it in a stash:

```bash
git stash --all
```

To remove untracked files and directories, you can use the following commands:

```bash
# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove ignored files as well
git clean -fdx
```
To see what would be removed without actually deleting anything, you can use the `-n` or `--dry-run` option:

```bash
git clean -d -n
```

To Run the clean command in interactive mode to select which files to remove, you can use:

```bash
git clean -i
```

## References
- [Stashing and Cleaning](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning)