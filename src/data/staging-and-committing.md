# Staging and Committing Changes
In this guide, we will explore how to stage and commit changes in your Git repository.

- [Staging and Committing Changes](#staging-and-committing-changes)
  - [Viewing Staged and Unstaged Changes](#viewing-staged-and-unstaged-changes)
  - [Committing Changes](#committing-changes)
    - [Skipping the Staging Area](#skipping-the-staging-area)
    - [Removing Files](#removing-files)
    - [Moving Files](#moving-files)
  - [File 3: `03-viewing-history.md`](#file-3-03-viewing-historymd)
- [Viewing the Commit History](#viewing-the-commit-history)
  - [Limiting the Log Output](#limiting-the-log-output)


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


## File 3: `03-viewing-history.md`


# Viewing the Commit History

You can view the commit history of your repository using the `git log` command. This command will show you a list of commits, including the commit hash, author, date, and commit message:

```bash
git log
```

Command options:
- `--patch` or `-p`: Show the changes made in each commit.
- `-n <number>`: Limit the number of commits shown.
- `--stat`: Show a summary of changes made in each commit.
- `--pretty`: Customize the output format of the log. Available formats include `oneline`, `short`, `medium`, `full`, `fuller`, and `format:<string>`.
- `--graph`: Show a graphical representation of the commit history.
- `--shortstat`: Show a summary of changes made in each commit, similar to `--stat`, but in a more concise format.
- `--name-only`: Show only the names of the files that were changed in each commit.
- `--name-status`: Show the names of the files that were changed in each commit, along with their status (added, modified, deleted).
- `--abbrev-commit`: Show only the abbreviated commit hash in the log output.

Examples:

Show the last 5 commits with a summary of changes:
```bash
git log -n 5 --stat
```

Show the last 3 commits in a single line format:
```bash
git log -n 3 --pretty=oneline
```

Specify a custom format for the log output. This example shows the commit hash, author name, relative date, and commit message:
```bash
git log --pretty=format:"%h - %an, %ar : %s"
```

Useful specifiers for formatting the log output:
| Specifier | Description |
|-----------|-------------|
| %H        | Commit hash |
| %h        | Abbreviated commit hash |
| %T        | Tree hash |
| %t        | Abbreviated tree hash |
| %P        | Parent hashes |
| %p        | Abbreviated parent hashes |
| %an       | Author name |
| %ae       | Author email |
| %ad       | Author date (format respects the --date= option) |
| %ar       | Author date, relative |
| %cn       | Committer name |
| %ce       | Committer email |
| %cd       | Committer date |
| %cr       | Committer date, relative |
| %s        | Subject |

## Limiting the Log Output

You can limit the log output to a specific number of commits using the `-n` option followed by the number of commits you want to see. For example, to see the last 3 commits, you can use:

```bash
git log -n 3
```

Time-based filtering can also be applied to the log output using the `--since` and `--until` options. For example, to see commits made in the last 7 days, you can use:

```bash
git log --since="7 days ago"
```

You can specify:
- A specific date: `--since="2024-01-01"`
- A relative time: `--since="2 weeks ago"`

The `--author` option allows you to filter commits by a specific author. For example, to see commits made by "John Doe", you can use:

```bash
git log --author="John Doe"
```

The `--grep` option allows you to search for commits with specific keywords in the commit message. For example, to find commits that mention "bug fix", you can use:

```bash
git log --grep="bug fix"
```

The `--all-match` option can be used in conjunction with `--author` and `--grep` to find commits that match both criteria. For example, to find commits made by "John Doe" that mention "bug fix", you can use:

```bash
git log --author="John Doe" --grep="bug fix" --all-match
```

The `-S` option allows you to search for commits that add or remove a specific string in the code. For example, to find commits that add or remove the string "initialize", you can use:

```bash
git log -S "initialize"
```

You can limit the log output to a specific file or directory by specifying the path after the log command. For example, to see the commit history for a specific file named `example.txt`, you can use:

```bash
git log -- example.txt
```

Options to limit the output of `git log`:

|Option|Description|
|------|-----------|
|`-n <number>`|Limit the number of commits shown.|
|`--since=<date>`|Show commits made after the specified date.|
|`--until=<date>`|Show commits made before the specified date.|
|`--after=<date>`|Show commits made after the specified date (same as `--since`).|
|`--before=<date>`|Show commits made before the specified date (same as `--until`).|
|`--author=<pattern>`|Show commits made by the specified author.|
|`--committer=<pattern>`|Show commits made by the specified committer.|
|`--grep=<pattern>`|Show commits with messages matching the specified pattern.|
|`-S <string>`|Show commits that add or remove the specified string in the code.|

For example, if you want to see which commits modifying test files in the Git source code history were committed by John Doe in the month of November 2016 and are not merge commits, you can use the following command:

```bash
git log --pretty="%h - %s" --author="John Doe" --since="2016-11-01" --until="2016-11-30" --no-merges -- t/
```

The `--no-merges` option excludes merge commits from the log output. The `--pretty="%h - %s"` option formats the output to show only the abbreviated commit hash and the commit message.
