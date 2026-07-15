# Viewing the Commit History Lab: Hands-On Practice

## Lab Overview

In this lab, you will master viewing and analyzing Git commit history using various `git log` options to filter, format, and search through commits effectively.

**Duration:** 30-40 minutes

**Prerequisites:** Completed the "Staging and Committing" lab or equivalent knowledge, Git installed


## Lab Objectives

By completing this lab, you will be able to:
- View commit history with different formatting options
- Filter commits by author, date, and message content
- Search for specific code changes using `-S`
- Limit output with various options
- Create custom log formats


## Lab Environment Setup

### Step 1: Create and Initialize Repository

```bash
mkdir viewing-history-lab
cd viewing-history-lab
git init
```

### Step 2: Create a Meaningful Commit History

Run these commands to create multiple commits with various changes:

```bash
# Commit 1: Initial project setup
echo "# My Project" > README.md
echo "def add(a, b):" > math.py
echo "    return a + b" >> math.py
git add .
git commit -m "Initial commit: Setup project with math module"

# Commit 2: Add string utilities
echo "def to_uppercase(s):" > strings.py
echo "    return s.upper()" >> strings.py
echo "def to_lowercase(s):" >> strings.py
echo "    return s.lower()" >> strings.py
git add strings.py
git commit -m "Add string utility functions"

# Commit 3: Add user management (bug fix)
echo "class User:" > user.py
echo "    def __init__(self, name):" >> user.py
echo "        self.name = name" >> user.py
git add user.py
git commit -m "bug fix: Add User class for authentication"

# Commit 4: Update math module
echo "def subtract(a, b):" >> math.py
echo "    return a - b" >> math.py
git add math.py
git commit -m "Feature: Add subtract function to math module"

# Commit 5: Documentation update
echo "## Installation" >> README.md
echo "Clone the repository and run the code." >> README.md
git add README.md
git commit -m "Update documentation: Add installation instructions"

# Commit 6: Minor fix
echo "# Fix: Handle negative numbers" >> math.py
echo "def multiply(a, b):" >> math.py
echo "    return a * b" >> math.py
git add math.py
git commit -m "bug fix: Handle edge cases in math operations"

# Commit 7: Refactor strings
echo "def reverse_string(s):" >> strings.py
echo "    return s[::-1]" >> strings.py
git add strings.py
git commit -m "Refactor: Add reverse string function"
```

**Checkpoint:** Verify your commit history:

```bash
git log --oneline
```
You should see 7 commits with different messages.


## Part 1: Basic Log Commands (10 minutes)

### Task 1.1: Full Commit History

View the complete commit history:

```bash
git log
```
**Note:** Use arrow keys to scroll through the log. Press `q` to exit.
**Question:** What information is displayed for each commit?

### Task 1.2: One-Line Format

View a concise one-line history:

```bash
git log --oneline
```

**Question:** How many characters of the commit hash are shown?

### Task 1.3: Last 3 Commits

View only the last 3 commits:

```bash
git log -n 3
```

### Task 1.4: Show Changes in Commits

View the history with patch details:

```bash
git log -p -n 2
```

**Question:** What does the `-p` option show that regular `git log` doesn't?

### Task 1.5: Statistics Summary

View commits with change statistics:

```bash
git log --stat -n 3
```

## Part 2: Custom Formatting (10 minutes)

### Task 2.1: Basic Custom Format

Create a custom format showing hash, author, date, and message:

```bash
git log --pretty=format:"%h - %an, %ar : %s"
```

**Question:** What does `%ar` display?

### Task 2.2: Detailed Custom Format

Create a more detailed custom format:

```bash
git log --pretty=format:"%C(yellow)%h%Creset %C(blue)%an%Creset - %C(red)%ad%Creset : %s" --date=short
```

### Task 2.3: Graph Visualization

View the commit history with a graph:

```bash
git log --graph --oneline --all
```

**Question:** What does the graph show? Why is it useful?

### Task 2.4: File Names Only

View only the files changed in each commit:

```bash
git log --name-only -n 3
```

### Task 2.5: Name Status

View files with their change status:

```bash
git log --name-status -n 3
```

**Question:** What status indicators do you see? What do they mean?

## Part 3: Filtering Log Output (15 minutes)

### Task 3.1: Filter by Author

View commits by a specific author:

```bash
git log --author="$(git config user.name)" --oneline
```

### Task 3.2: Filter by Date Range

View commits from the last week:

```bash
git log --since="7 days ago" --oneline
```

**Question:** How would you view commits from a specific date range?

### Task 3.3: Search by Message

Find commits containing "bug fix":

```bash
git log --grep="bug fix" --oneline
```

### Task 3.4: Search in Code

Find commits that added or removed the word "return":

```bash
git log -S "return" --oneline
```

**Question:** How is `-S` different from `--grep`?

### Task 3.5: Complex Filtering

Combine multiple filters:

```bash
git log --author="$(git config user.name)" --grep="bug fix" --all-match --oneline
```

**Question:** What does `--all-match` do in this command?

### Task 3.6: File-Specific History

View the history of a specific file:

```bash
git log --oneline -- math.py
```

**Question:** How many commits show up? Why not all 7?

### Task 3.7: Exclude Merge Commits

```bash
git log --no-merges --oneline
```

**Note:** Since we don't have merge commits, this will show all commits.

## Challenge Exercises (10 minutes)

### Challenge 1: Custom Log Format

Create a custom log format that displays:
- Abbreviated hash in yellow
- Author name in green
- Date in red (short format)
- Subject in white
- Number of changes (insertions/deletions)

**Hint:** Use `%C(color)` for colors and `--stat` for statistics.

### Challenge 2: Finding Specific Changes

Find all commits that:
1. Were made in the last week
2. Contain "math" in the commit message
3. Change the `math.py` file

**Solution:** Combine the appropriate filters.

### Challenge 3: History Analysis

Answer these questions using git log:
1. Who was the author of the first commit?
2. When was `strings.py` created?
3. What was the last commit that changed `README.md`?
4. How many commits have "bug fix" in their message?
5. Which commit added the "multiply" function?


## Lab Solutions

Check your work against the solutions below.

### Task 1.1 - Log Information:

Each commit shows: commit hash, author (name and email), date, and commit message.

### Task 1.2 - Hash Length:

`--oneline` shows 7 characters of the commit hash.

### Task 1.4 - -p Option:

`-p` shows the actual changes (diff) made in each commit, including added and removed lines.

### Task 2.1 - %ar Specifier:

`%ar` shows the author date in relative format (e.g., "2 days ago").

### Task 2.3 - Graph Usefulness:

The graph shows branching and merging structure, making it easy to visualize the repository's history flow.

### Task 2.5 - Status Indicators:

Common statuses: A (Added), M (Modified), D (Deleted), R (Renamed), C (Copied).

### Task 3.2 - Date Range:

```bash
git log --since="2026-01-01" --until="2026-01-31" --oneline
```

### Task 3.4 - -S vs --grep:

- `--grep` searches in commit messages
- `-S` searches in the actual code changes (additions/deletions)

### Task 3.5 - --all-match:

`--all-match` ensures commits must match ALL specified filters (author AND grep pattern), not just one.

### Task 3.6 - File History:

Only 3 commits show (initial, addition of subtract, and bug fix for multiply) because math.py wasn't changed in other commits.

### Challenge 1 - Solution:

```bash
git log --pretty=format:"%C(yellow)%h%Creset %C(green)%an%Creset %C(red)%ad%Creset : %s" --date=short
```

### Challenge 2 - Solution:

```bash
git log --since="7 days ago" --grep="math" -- oneline math.py
```

### Challenge 3 - Answers:

```bash
# 1. First commit author
git log --reverse --format="%an <%ae>" | head -n 1

# Powershell alternative:
git log --reverse --max-count=1 --format="%an <%ae>"

# --reverse starts from the beginning of time, and %an <%ae> prints just the author's name and email.

# 2. When strings.py was created
git log --reverse --format="%ad" --strings.py | head -n 1

# Powershell alternative:
git log --reverse --max-count=1 --format="%ad" --follow -- strings.py

# Uses --follow to track the file even if it was renamed in the past, and --max-count=1 isolates the earliest commit to show its date (%ad).

# 3. Last commit to change README.md
git log -n 1 -- README.md

# Powershell alternative:
git log -1 -- README.md

# The -1 flag is a built-in Git shortcut that limits the output to exactly the single most recent commit.

# 4. Count commits with "bug fix"
git log --grep="bug fix" --oneline | wc -l

# Powershell alternative:
git shortlog --summary --grep="bug fix"

# git shortlog is a native tool built into Git. Adding --summary suppresses the commit descriptions and outputs a quick, clean count of commits per author that match the phrase.

# 5. Commit that added multiply
git log -S "def multiply" -p --reverse | head -n 30

# Powershell alternative:
git log -S "def multiply" --reverse -1 -p

# Uses the -1 flag directly with the pickaxe search (-S) and --reverse to instantly show you the single, exact commit that first introduced the text, along with the patch (-p).
```

## Summary of Key Commands Learned

| Command | Purpose |
|---------|---------|
| `git log` | View full commit history |
| `git log --oneline` | Concise one-line format |
| `git log -n <number>` | Limit number of commits |
| `git log -p` | Show changes in commits |
| `git log --stat` | Show change statistics |
| `git log --graph` | Visual branch structure |
| `git log --pretty=format:"..."` | Custom output format |
| `git log --author="Name"` | Filter by author |
| `git log --since="date"` | Filter by date |
| `git log --grep="pattern"` | Search commit messages |
| `git log -S "string"` | Search code changes |
| `git log -- file.txt` | File-specific history |


## Quick Reference: Format Specifiers

| Specifier | Description | Example |
|-----------|-------------|---------|
| `%h` | Short hash | `a1b2c3d` |
| `%an` | Author name | `John Doe` |
| `%ar` | Author date (relative) | `2 days ago` |
| `%ad` | Author date (absolute) | `2024-01-15` |
| `%s` | Subject (message) | `Fix bug` |
| `%C(color)` | Color | `%Cred` for red |
