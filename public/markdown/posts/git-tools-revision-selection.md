# Git Tools - Revision Selection

Git allows you to select revisions in a variety of ways. You can select revisions by commit hash, branch name, tag name, or even by relative references like `HEAD~1` (the parent of the current commit).

**Table of Contents:**
- [Git Tools - Revision Selection](#git-tools---revision-selection)
  - [Single Revisions](#single-revisions)
    - [Short SHA-1 Hash](#short-sha-1-hash)
    - [Branch References](#branch-references)
    - [RefLog Shortnames](#reflog-shortnames)
    - [Ancestry References](#ancestry-references)
  - [Commit Ranges](#commit-ranges)
    - [Double Dot](#double-dot)
    - [Triple Dot](#triple-dot)
    - [Multiple Points](#multiple-points)
  - [Conclusion](#conclusion)
  - [References](#references)


## Single Revisions
You can refer to a single revision using its commit hash, branch name, or tag name.

### Short SHA-1 Hash
You can use the short SHA-1 hash of a commit to refer to it. You can use the first few characters of the hash as long as they are unique within the repository.

To examine a specific commit, you may run `git log` to find the commit hash, and then use it like this:

```bash
git show <commit-hash>
```
This will display the details of the specified commit:
- Commit message
- Author
- Date
- Changes made in that commit

### Branch References
You can refer to the latest commit on a branch by using the branch name. For example,

```bash
git show main
```
This will show the latest commit details on the `main` branch.

To see which specific SHA-1 hash a branch points to, you can use:

```bash
git rev-parse main
```

### RefLog Shortnames
Git maintains a reflog that records updates to the tips of branches and other references. You can refer to previous states of a branch using reflog shortnames. For example, `HEAD@{1}` refers to the previous state of `HEAD`, and `main@{2}` refers to the state of the `main` branch two updates ago.

You can view the reflog with:

```bash
git reflog
```

Every time you make a commit, checkout a branch, or perform other operations that change the state of your repository, Git records the previous state in the reflog. This allows you to recover lost commits or navigate through the history of your branches.

To show the details of a previous state of `HEAD`, you can use:

```bash
git show HEAD@{1}
```

To show the details of a previous state of the `main` branch, you can use:

```bash
git show main@{2}
```

To show the details of a previous state of the `main` branch two updates ago, you can use:

```bash
git show main@{2}
```

To show the details of a previous state of the `main` branch one day ago, you can use:

```bash
git show main@{1.day.ago}
git show main@{yesterday}
```

Using `-g` option with `git log` will show the reflog entries along with the commit messages, which can be helpful for understanding the context of each entry.

```bash
git log -g
git log -g main
```

RefLog information is stored in the `.git/logs` directory, and it is strictly local to your repository. It is not shared with others when you push or pull changes. This means that reflog entries are only available in your local repository and cannot be accessed by others.

### Ancestry References

Git provides several ways to reference commits based on their ancestry. For example, `HEAD~1` refers to the parent of the current commit, `HEAD~2` refers to the grandparent, and so on. Similarly, `main~1` refers to the parent of the latest commit on the `main` branch.

You can also use the `^` operator to refer to the parent of a commit. For example, `HEAD^` is equivalent to `HEAD~1`, and `HEAD^^` is equivalent to `HEAD~2`.

```bash
git show HEAD~1
git show main~1
```

You can also specify a specific parent of a merge commit using the `^` operator followed by a number. For example, `HEAD^1` refers to the first parent of the current commit, and `HEAD^2` refers to the second parent.

```bash
git show HEAD^1
git show HEAD^2
```

The `~` and `^` operators can be combined to navigate through the commit history. For example, `HEAD~2^1` refers to the first parent of the grandparent of the current commit.

## Commit Ranges
Specifying a range of commits can be useful for viewing the history between two points in your repository. Git provides several ways to specify commit ranges.

### Double Dot

You can specify a range of commits using the `..` operator. For example, `main..feature` refers to all commits that are in the `feature` branch but not in the `main` branch.

```bash
git log main..feature
```

This will show the commit history for the `feature` branch, excluding any commits that are also in the `main` branch.

### Triple Dot

You can also use the `...` operator to refer to commits that are in either branch but not in both. For example, `main...feature` refers to all commits that are in either the `main` or `feature` branch, but not in both.

```bash
git log main...feature
```

This will show the commit history for both branches, excluding any commits that are in both branches.

### Multiple Points

If you want to specify more than two branches to indicate your revision, such as seeing what commits are in any of several branches that aren't in the branch you are currently on. Git allows you to do this by using either the `^` character or the `--not` option. For example, to see what commits are in `feature1` and `feature2` but not in `main`, you can use:

```bash
git log main ^feature1 ^feature2
git log main --not feature1 --not feature2
```

The `--left-right` option can be used to show which commits are unique to each branch when using the `...` operator. For example, `main...feature --left-right` will show commits unique to `main` on the left and commits unique to `feature` on the right.

```bash
git log main...feature --left-right
```
## Conclusion

With these tools, you can effectively navigate and select revisions in your Git repository, allowing for precise control over your version history and collaboration workflow.

## References
- [Revision Selection](https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection)