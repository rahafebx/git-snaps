# Git Aliases Lab: Hands-On Practice

## Lab Overview
In this lab, you will learn how to create and use Git aliases to speed up your workflow. You'll create aliases for common Git commands, complex combinations, and even external shell commands.

**Duration:** 15-20 minutes

**Prerequisites:** Completed previous labs or equivalent knowledge, Git installed

## Lab Objectives

By completing this lab, you will be able to:
- Create global and local Git aliases
- Use aliases for frequently used commands
- Combine multiple Git commands into a single alias
- Create aliases for external shell commands
- Organize and manage your aliases

## Lab Environment Setup

### Step 1: Create Repository

```bash
mkdir aliases-lab
cd aliases-lab
git init

# Create initial commits
echo "# Aliases Practice" > README.md
echo "print('Hello World')" > app.py
git add .
git commit -m "Initial commit"

echo "def add(a, b):" > math.py
echo "    return a + b" >> math.py
git add math.py
git commit -m "Add math module"

echo "def subtract(a, b):" >> math.py
echo "    return a - b" >> math.py
git add math.py
git commit -m "Add subtract function"
```

## Part 1: Basic Aliases (5 minutes)

### Task 1.1: Create Status Alias

Create a shortcut for `git status`:

```bash
git config --global alias.st status
```

**Checkpoint:** Test the alias:

```bash
git st
```

**Question:** What output do you see?

### Task 1.2: Create Log Aliases

Create shortcuts for common log commands:

```bash
# Short one-line log
git config --global alias.lg "log --oneline"

# Pretty log with graph
git config --global alias.lg2 "log --graph --pretty=format:'%Cred%h%Creset - %s %Cgreen(%cr) %Cblue<%an>%Creset' --abbrev-commit"

# Log with statistics
git config --global alias.ls "log --stat"
```

**Checkpoint:** Test each alias:

```bash
git lg
git lg2
git ls
```

**Question:** Which alias shows the most detailed information?

### Task 1.3: Create Commit Alias

Create a shortcut for committing with a message:

```bash
git config --global alias.cm "commit -m"
```

**Checkpoint:** Test by making a change and committing:

```bash
echo "def multiply(a, b):" >> math.py
echo "    return a * b" >> math.py
git add math.py
git cm "Add multiply function"
```

**Question:** What's the advantage of using `git cm` instead of `git commit -m`?

## Part 2: Advanced Aliases (10 minutes)

### Task 2.1: Combine Commands

Create an alias that stages, commits, and pushes in one command:

```bash
git config --global alias.acp '!git add -A && git commit -m "$1" && git push'
```

**Note:** The `!` allows running shell commands. The `$1` captures the first argument.

**Checkpoint:** Test the alias:

```bash
echo "def divide(a, b):" >> math.py
echo "    return a / b" >> math.py
git acp "Add divide function"
```

**Question:** What does the `!` character do in the alias?

### Task 2.2: Create Unstage Alias

Create an alias to unstage a file:

```bash
git config --global alias.unstage "restore --staged"
```

**Checkpoint:** Test by staging and unstaging:

```bash
echo "temporary content" > temp.txt
git add temp.txt
git status
git unstage temp.txt
git status
```

**Question:** What command does `git unstage` replace?

### Task 2.3: Create a Clean Up Alias

Create an alias for cleaning up branches:

```bash
git config --global alias.cleanup "!git branch --merged | grep -v '\\*\\|main\\|master' | xargs -n 1 git branch -d"
```

**Checkpoint:** View the alias:

```bash
git config --global --get alias.cleanup
```

**Question:** What does this alias do? (Without running it)

### Task 2.4: Create Amend Alias

Create an alias for amending commits:
```bash
git config --global alias.amend "commit --amend --no-edit"
```

**Checkpoint:** Test by making a change and using amend:

```bash
echo "Updated README" >> README.md
git add README.md
git amend
```

### Task 2.5: Create Shell Alias

Create an alias for an external command:

```bash
git config --global alias.tree "!git log --oneline --graph --all"
```

**Checkpoint:** Test the alias:

```bash
git tree
```

## Part 3: Managing Aliases (5 minutes)

### Task 3.1: View All Aliases

View all your configured aliases:

```bash
git config --global --get-regexp alias
```

### Task 3.2: View Aliases by Editing Config

Open the global Git config:

```bash
# View the config file
git config --global --edit
```

**Note:** Look for the `[alias]` section. You can add or remove aliases here.

### Task 3.3: Create Local Repository Aliases

Create repository-specific aliases:

```bash
git config alias.co "checkout"
git config alias.br "branch"
```

**Checkpoint:** View local aliases:

```bash
git config --get-regexp alias
```

**Question:** How do global aliases differ from local aliases?

### Task 3.4: Remove an Alias

Remove an alias you no longer need:

```bash
git config --global --unset alias.tree
```

**Checkpoint:** Verify the alias is removed:

```bash
git config --global --get-regexp alias | grep tree
```

## Challenge Exercises (10 minutes)

### Challenge 1: Create a Useful Alias Set

Create aliases for these common tasks:

1. `git last` - Show the last commit (use `log -1`)
2. `git files` - Show the files changed in the last commit (use `log -1 --name-only`)
3. `git graph` - Show a colorful graph of all branches (use `log --graph --all --decorate`)
4. `git search` - Search commit messages (use `log --grep`)

**Test each alias to verify it works.**

### Challenge 2: Interactive Alias

Create an alias that combines `git add` and `git commit`:

```bash
# Create an alias called "quick" that:
# 1. Adds all changes
# 2. Commits with a message passed as an argument
# 3. Shows the status after committing
```

**Hint:** You'll need to use `!` and shell commands.

### Challenge 3: Alias Organization

Your aliases are getting messy. Create a file with all your aliases:

```bash
# Create a file with all global aliases
# Format: alias name = command
```

**Task:** Write a command that exports all aliases to a file called `my-aliases.txt`.

## Lab Solutions

Check your work against the solutions below.

### Task 1.1 - Status Alias Explanation:
The `git st` alias is a shortcut for `git status`, which shows the current state of the working directory and staging area.


### Task 1.3 - Advantage of git cm:
Saves keystrokes - instead of typing `git commit -m "message"`, you type `git cm "message"`.


### Task 2.1 - What ! does:
The `!` tells Git to run the command as a shell command rather than a Git command.

### Task 2.2 - unstage alias:
The `git unstage` alias replaces the command `git restore --staged`, which is used to unstage files that have been added to the staging area.

### Task 2.3 - Cleanup alias:
Deletes all branches that have been merged into the current branch, except for the current branch and main/master.

### Task 3.3 - Local vs Global:
- **Global aliases:** Available in all repositories on your system
- **Local aliases:** Only available in the current repository

### Challenge 1 - Solution:

```bash
# Create aliases
git config --global alias.last "log -1 --oneline"
git config --global alias.files "log -1 --name-only"
git config --global alias.graph "log --graph --all --decorate --oneline"
git config --global alias.search "log --grep"
```

### Challenge 2 - Solution:

```bash
git config --global alias.quick '!git add -A && git commit -m "$1" && git status'
```

### Challenge 3 - Solution:

```bash
# Export aliases to file
git config --global --get-regexp alias > my-aliases.txt
```

## Summary of Common Aliases

| Alias | Command | Purpose |
|-------|---------|---------|
| `git st` | `status` | Short status |
| `git lg` | `log --oneline` | One-line history |
| `git cm` | `commit -m` | Quick commit |
| `git br` | `branch` | Branch management |
| `git co` | `checkout` | Switch branches |
| `git unstage` | `restore --staged` | Unstage files |
| `git acp` | `add + commit + push` | Complete workflow |

## Quick Reference: Alias Commands

| Command | Purpose |
|---------|---------|
| `git config --global alias.NAME COMMAND` | Create global alias |
| `git config alias.NAME COMMAND` | Create local alias |
| `git config --global --get-regexp alias` | List all global aliases |
| `git config --global --unset alias.NAME` | Remove global alias |
| `git config --global --edit` | Edit config file |


## Best Practices

- **Use meaningful names:** `st` is better than `s` because it's memorable.
- **Keep aliases consistent:** Use the same naming across your systems.
- **Document your aliases:** Share with team members or document in your dotfiles.
- **Start with common commands:** Don't over-engineer; create aliases for commands you use frequently.
- **Be careful with complex aliases:** Test them thoroughly before relying on them.