# Undoing Changes Lab: Hands-On Practice

## Lab Overview

In this lab, you will practice various techniques to undo changes in Git, including amending commits, unstaging files, discarding working directory changes, and using the modern `git restore` command.

**Duration:** 25-30 minutes

**Prerequisites:** Completed the "Staging and Committing" lab or equivalent knowledge, Git installed

## Lab Objectives

By completing this lab, you will be able to:
- Amend the most recent commit message
- Add forgotten changes to the last commit
- Unstage files using `git reset` and `git restore`
- Discard working directory changes
- Understand when to use each undo technique


## Lab Environment Setup

### Step 1: Create and Initialize Repository

```bash
mkdir undoing-changes-lab
cd undoing-changes-lab
git init
```

### Step 2: Create Initial Commits

```bash
# Create initial files
echo "# My Project" > README.md
echo "print('Hello World')" > app.py
git add .
git commit -m "Initial commit: Add README and app"

# Create second commit
echo "def greet(name):" > utils.py
echo "    return f'Hello {name}'" >> utils.py
git add utils.py
git commit -m "Add utils module with greet function"
```

**Checkpoint:** Verify your history:

```bash
git log --oneline
```

## Part 1: Amending Commits (10 minutes)

### Task 1.1: Amend Commit Message

The last commit message "Add utils module with greet function" could be clearer. Amend it:

```bash
git commit --amend -m "Add utils module: Implement greet function"
```

**Checkpoint:** Verify the message changed:

```bash
git log --oneline -n 1
```

**Question:** What happened to the commit hash? Why?

### Task 1.2: Add Forgotten Changes to Last Commit

Create a new file and modify an existing one, but forget to include them:

```bash
# Make changes
echo "def goodbye(name):" >> utils.py
echo "    return f'Goodbye {name}'" >> utils.py
echo "## Usage" >> README.md
echo "Run app.py to see the greeting" >> README.md

# Stage only utils.py (forgetting README.md)
git add utils.py

# Amend the commit (but we forgot README.md!)
git commit --amend -m "Add utils module with greet and goodbye functions"
```

**Checkpoint:** Check status:

```bash
git status
```

**Question:** Is README.md staged or unstaged? What would we need to do to include it?

### Task 1.3: Amend with Multiple Changes

Stage the forgotten file and amend again:

```bash
git add README.md
git commit --amend --no-edit  # Uses the same commit message
```

**Checkpoint:** Verify both changes are included:

```bash
git log --oneline -n 1
git show --stat
```

**Question:** What does `--no-edit` do?

## Part 2: Unstaging Changes (10 minutes)

### Task 2.1: Create Files and Stage Them

```bash
# Create new files
echo "def calculate(a, b):" > calculator.py
echo "    return a + b" >> calculator.py
echo "TODO: Implement all functions" > todo.txt

# Stage both files
git add calculator.py todo.txt

# Check status
git status
```

**Question:** What state are the files in?

### Task 2.2: Unstage Using git reset

Unstage `todo.txt` using the traditional method:

```bash
git reset HEAD todo.txt
```

**Checkpoint:** Check status:

```bash
git status
```

**Question:** What happened to `todo.txt`? Is it still in the working directory?

### Task 2.3: Unstage Using git restore

Unstage `calculator.py` using the modern method:

```bash
git restore --staged calculator.py
```

**Checkpoint:** Check status:
```bash
git status
```

**Question:** What's the difference between using `git reset HEAD` and `git restore --staged`?

### Task 2.4: Stage and Unstage All Files

Practice staging and unstaging multiple files:

```bash
# Stage all changes
git add .

# Unstage all files
git restore --staged .
git status
```

## Part 3: Unmodifying Changes (10 minutes)

### Task 3.1: Modify and Discard Using git checkout

Make changes to a file and discard them:

```bash
# Make a change
echo "# This is a bad change" >> app.py
echo "print('This will be undone')" >> app.py

# Check the change
cat app.py

# Discard using git checkout (traditional)
git checkout -- app.py
```

**Checkpoint:** Verify the file is restored:

```bash
cat app.py
git status
```

**Question:** What happened to the changes you made?

### Task 3.2: Modify and Discard Using git restore

Make another change and discard using the modern approach:

```bash
# Make a change
echo "def test():" >> utils.py
echo "    return 'testing'" >> utils.py

# Discard using git restore
git restore utils.py
```

**Checkpoint:** Verify:

```bash
cat utils.py
git status
```

### Task 3.3: Discard Changes After Staging

Create a scenario where changes are both staged and unstaged:

```bash
# Make changes and stage them
echo "This is staged" >> app.py
git add app.py

# Make additional changes (unstaged)
echo "This is unstaged" >> app.py

# Check status
git status
```

**Question:** What does the status show for `app.py`?

### Task 3.4: Restore Different States

```bash
# Discard unstaged changes only
git restore app.py

# Check status
git status
```

**Question:** What happened to the unstaged changes? What about the staged ones?

### Task 3.5: Full Restore

```bash
# Unstage the remaining changes
git restore --staged app.py

# Now discard working directory changes
git restore app.py
git status
```

**Question:** What's the final state of `app.py`?

## Challenge Exercises (10 minutes)

### Challenge 1: Fix a Bad Commit

You made a commit with a typo in the message and forgot to include a file:

```bash
# Create scenario
echo "def multiply(a, b):" > math.py
echo "    return a * b" >> math.py
echo "# Math utilities" >> README.md

# Stage only math.py
git add math.py

# Bad commit
git commit -m "Add math modue"  # Typo: "modue" instead of "module"

# README.md is still untracked/staged
```

**Tasks:**
1. Fix the commit message
2. Add README.md to the commit
3. Verify both changes are in one commit

### Challenge 2: Rescue a File

You accidentally deleted content from a file:

```bash
# Create a file with content
echo "Important code" > important.py
echo "def critical_function():" >> important.py
echo "    return 'success'" >> important.py
git add important.py
git commit -m "Add important code"

# Accidentally delete content
echo "Broken code" > important.py
```

**Task:** Restore `important.py` to its last committed state without deleting it.

### Challenge 3: Clean Staging Area

You staged files but now want to start fresh:

```bash
echo "temp1" > temp1.txt
echo "temp2" > temp2.txt
echo "temp3" > temp3.txt
git add .
```

**Task:** Unstage all files while keeping them in your working directory.


## Lab Solutions

Check your work against the solutions below.

### Task 1.1 - Commit Hash Changed:

The commit hash changed because amending creates a new commit with a new hash, replacing the old one. This is why you shouldn't amend pushed commits.

### Task 1.2 - Status Check:

README.md shows as unstaged (`Changes not staged for commit`) because it wasn't added before amending.

### Task 1.3 - --no-edit:

`--no-edit` tells Git to reuse the existing commit message without opening an editor.

### Task 2.1 - Status Check:

calculator.py and todo.txt are both staged (`Changes to be committed`).

### Task 2.2 - git reset HEAD:

`todo.txt` is unstaged but still exists in the working directory with its content unchanged.

### Task 2.3 - Difference:

Both commands achieve the same result. `git restore --staged` is newer and more intuitive, while `git reset HEAD` is the traditional approach.

### Task 3.1 - git checkout --:

Discards all changes to the file and restores it to its last committed state.

### Task 3.3 - Status for app.py:

Shows: `Changes to be committed` (staged) AND `Changes not staged for commit` (unstaged) for the same file.

### Task 3.4 - After git restore:

The unstaged changes are discarded, but staged changes remain.

### Task 3.5: Full Restore

The file is now completely restored to its last committed state, with no staged or unstaged changes.

### Challenge 1 - Solution:

```bash
# Stage README.md
git add README.md

# Amend with new message
git commit --amend -m "Add math module"

# Verify
git status
```

### Challenge 2 - Solution:

```bash
git restore important.py
# OR
git checkout -- important.py
```

### Challenge 3 - Solution:
```bash
git restore --staged .
```


## Summary of Key Commands Learned

| Command | Purpose | Modern Alternative |
|---------|---------|-------------------|
| `git commit --amend` | Modify last commit | Same |
| `git reset HEAD <file>` | Unstage file | `git restore --staged <file>` |
| `git checkout -- <file>` | Discard changes | `git restore <file>` |
| N/A | Unstage all files | `git restore --staged .` |
| N/A | Discard all changes | `git restore .` |


## Quick Reference: When to Use Each Command

| Scenario | Command |
|----------|---------|
| Change last commit message | `git commit --amend -m "new message"` |
| Add forgotten file to last commit | `git add <file>` + `git commit --amend` |
| Unstage a file but keep changes | `git restore --staged <file>` |
| Discard changes and restore file | `git restore <file>` |
| Unstage all files | `git restore --staged .` |
| Discard all changes | `git restore .` |


## Important Notes

- **Never amend commits that have been pushed** - This rewrites history and causes problems for others.
- **Discarded changes cannot be recovered** - Always be sure before using `git restore` or `git checkout --`.
- **Use `git status` frequently** - It helps you understand what state your files are in before undoing changes.