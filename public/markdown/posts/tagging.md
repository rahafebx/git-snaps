# Tagging

>Like most VCSs, Git has the ability to tag specific points in a repository’s history as being important. Typically, people use this functionality to mark release points (`v1.0, v2.0` and so on).

In this guide, we will explore how to manage tags in your Git repository.

- [Tagging](#tagging)
  - [List Tags](#list-tags)
  - [Creating Tags](#creating-tags)
  - [Tagging Latest Commit](#tagging-latest-commit)
  - [Sharing Tags](#sharing-tags)
  - [Deleting Tags](#deleting-tags)
  - [Checking out Tags](#checking-out-tags)


## List Tags

To list all the tags in your repository, you can use the `git tag` command (with optional `-l` or `--list` flag).

```bash
git tag
```

To search for tags that match a specific pattern, you can use the `-l` or `--list` option followed by the pattern:

```bash
git tag -l "v1.*"
```

This command will list all tags that start with "`v1.`".

## Creating Tags

To create a new tag, you can use the `git tag` command followed by the name of the tag. There are two types of tags: **lightweight** tags and **annotated** tags.

- A **lightweight** tag is simply a name for a specific commit and does not contain any additional information.
- An **annotated** tag is a full object in the Git database and contains additional information such as the tagger's name, email, date, and a message. Annotated tags are recommended for most cases, as they provide more context about the tag.

```bash
# create Lightweight tag
git tag <tag-name>

# create Annotated tag
git tag -a <tag-name> -m "Tag message"
```

The `-m` specifies a message for the tag. If you omit the `-m` option, Git will open your default text editor to allow you to enter a message.

You can edit the message by pressing `i` and save the changes by pressing `Esc` and then typing `:wq` and pressing `Enter`.

See [Getting Started with Git](getting-started) for instructions on how to set your default text editor for Git.


**Example:**

```bash
# Create a lightweight tag named v1.0
git tag v1.0

# Create an annotated tag named v1.1 with a message
git tag -a v1.1 -m "Release version 1.1"

# Show the tag data with the commit it points to
git show v1.1
```

Running `git show <tag-name>` will display the commit that the tag points to, along with the tag message and other information for annotated tags.

For lightweight tags, `git show <tag-name>` will display the commit that the tag points to, but it will not show any additional information since lightweight tags do not contain any metadata.

## Tagging Latest Commit

To tag the latest commit in your repository, you can use the `git tag` command without specifying a commit hash. By default, Git will tag the latest commit on the current branch.

```bash
# Tag the latest commit with a lightweight tag
git tag <tag-name>

# Tag a specific commit with a lightweight tag
git tag <tag-name> <commit-hash>

# Tag the latest commit with an annotated tag
git tag -a <tag-name> -m "Tag message"

# Tag a specific commit with an annotated tag
git tag -a <tag-name> <commit-hash> -m "Tag message"
```

## Sharing Tags

To share tags with others, you need to push them to the remote repository. By default, `git push` does not transfer tags to the remote repository. You can use the `--tags` option to push all tags:

```bash
# Push a specific tag to the remote repository
git push <remote-name> <tag-name>

# Push all tags to the remote repository
git push <remote-name> --tags

# Push only annotated tags to the remote repository
git push <remote-name> --follow-tags
```

## Deleting Tags

To delete a tag from your local repository, you can use the `git tag -d` command followed by the name of the tag:

```bash
# Delete a local tag
git tag -d <tag-name>
```

This does not delete the tag from the remote repository. To delete a tag from the remote repository, you can use the `git push` command with the `--delete` option:

```bash
# Delete a tag from the remote repository
git push <remote-name> --delete <tag-name>
```

## Checking out Tags

To view the files associated with a specific tag, you can use the `git checkout` command followed by the tag name. This will put your working directory in a "detached HEAD" state, meaning you are not on any branch:

```bash
# Checkout a specific tag
git checkout <tag-name>
```

In this state, you can view the files and make changes, but you cannot commit new changes to the tag. If you want to make changes based on a tag, you should create a new branch from that tag:

```bash
# Create a new branch from a specific tag
git checkout -b <new-branch-name> <tag-name>
```
You can checkout back to your previous branch using:

```bash
# Checkout back to the previous branch
git checkout <branch-name>
```