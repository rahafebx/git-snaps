

# Viewing the Commit History

In this guide, we will explore how to view the commit history of your Git repository.

- [Viewing the Commit History](#viewing-the-commit-history)
  - [Useful Specifiers for Formatting the Log Output](#useful-specifiers-for-formatting-the-log-output)
  - [Limiting the Log Output](#limiting-the-log-output)


You can view the commit history of your repository using the `git log` command. This command will show you a list of commits, including the commit hash, author, date, and commit message:

```bash
git log
```

**Command options:**

- `--patch` or `-p`: Show the changes made in each commit.
- `-n <number>`: Limit the number of commits shown.
- `--stat`: Show a summary of changes made in each commit.
- `--pretty`: Customize the output format of the log. Available formats include `oneline`, `short`, `medium`, `full`, `fuller`, and `format:<string>`.
- `--graph`: Show a graphical representation of the commit history.
- `--shortstat`: Show a summary of changes made in each commit, similar to `--stat`, but in a more concise format.
- `--name-only`: Show only the names of the files that were changed in each commit.
- `--name-status`: Show the names of the files that were changed in each commit, along with their status (added, modified, deleted).
- `--abbrev-commit`: Show only the abbreviated commit hash in the log output.

**Examples:**

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
## Useful Specifiers for Formatting the Log Output

When using the `--pretty=format:` option, you can use various specifiers to customize the output. Here are some commonly used specifiers:

| Specifier | Description |
|-----------|-------------|
| `%H`        | Commit hash |
| `%h`        | Abbreviated commit hash |
| `%T`        | Tree hash |
| `%t`        | Abbreviated tree hash |
| `%P`        | Parent hashes |
| `%p`        | Abbreviated parent hashes |
| `%an`       | Author name |
| `%ae`       | Author email |
| `%ad`       | Author date (format respects the --date= option) |
| `%ar`       | Author date, relative |
| `%cn`       | Committer name |
| `%ce`       | Committer email |
| `%cd`       | Committer date |
| `%cr`       | Committer date, relative |
| `%s`        | Subject |

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
