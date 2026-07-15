# Staging and Committing Changes Lab: Hands-On Practice

## Lab Overview
In this lab, you will master the staging and committing workflow in Git. You'll learn to view changes, stage files selectively, commit with proper messages, and manage files through removal and renaming operations.

**Duration:** 45-60 minutes

**Prerequisites:** Completed the "Git Basics" lab or equivalent knowledge, Git installed

## Lab Objectives

By completing this lab, you will be able to:
- View staged and unstaged changes using `git diff`
- Commit changes with appropriate messages
- Skip the staging area using `git commit -a`
- Remove files from the repository
- Move and rename files in Git
- Understand the difference between tracked and untracked files in committing

## Lab Environment Setup

### Step 1: Create and Initialize Lab Repository

```bash
mkdir staging-committing-lab
cd staging-committing-lab
git init
```

### Step 2: Initial Setup - Create Base Files

```bash
# Create project structure
mkdir src docs

# Create initial files
echo "# Project Title" > README.md
echo "print('Hello World')" > src/main.py
echo "console.log('Hello World');" > src/app.js
echo "Project documentation" > docs/guide.txt

# Stage and commit initial state
git add .
git commit -m "Initial commit: Setup project structure"
```

## Part 1: Viewing Staged and Unstaged Changes (15 minutes)

### Task 1.1: Make Changes Without Staging

Create some unstaged changes:

```bash
# Modify a file
echo "print('Welcome to Git staging!')" > src/main.py

# Add new content to README
echo "## Installation" >> README.md
echo "Run python src/main.py" >> README.md

# Create a new file (untracked)
echo "API_KEY=secret" > .env
```

### Task 1.2: View Unstaged Changes

Use `git diff` to see what has changed in your working directory:
```bash
git diff
```

**Question:** What files and changes does `git diff` show? Which file is missing from the output?

### Task 1.3: Stage Some Changes

Stage specific changes:
```bash
git add src/main.py
git add README.md
```

### Task 1.4: View Staged vs Unstaged

Now use both diff commands:

```bash
# View unstaged changes (changes in working directory not yet staged)
git diff

# View staged changes (changes ready to be committed)
git diff --staged
```

**Question:** What differences do you see between the two `git diff` outputs?

### Task 1.5: Stage Remaining Changes

Stage the remaining file:

```bash
git add .env
```

**Checkpoint:** Run `git status` to see all files staged:

```bash
git status
```

### Task 1.6: Modified After Staging

Make a change to a file after staging it:

```bash
echo "print('Modified after staging!')" >> src/main.py
```

Now check the status and diffs:

```bash
git status
git diff          # Shows changes after staging
git diff --staged # Shows changes staged initially
```

**Question:** What states does `src/main.py` show in `git status`? What do the two diff commands show?

## Part 2: Committing Changes (15 minutes)

### Task 2.1: Commit Staged Changes

Commit the currently staged changes:

```bash
git commit -m "Add main.py functionality and README installation instructions"
```

**Checkpoint:** View the commit history:

```bash
git log --oneline
```

### Task 2.2: Verify Working Directory Clean

Check that all changes are committed:

```bash
git status
```

**Question:** Is the `src/main.py` modification (from Task 1.6) showing as unstaged? Why?

### Task 2.3: Create More Changes for -a Flag Practice

```bash
# Create a new file
echo "def greet():" > src/utils.py
echo "    return 'Hello'" >> src/utils.py

# Modify existing tracked file
echo "from utils import greet" >> src/main.py
echo "print(greet())" >> src/main.py

# Create an untracked file
echo "Debug info" > debug.log
```

### Task 2.4: Commit Using -a Flag

Commit changes to tracked files using `git commit -a`:

```bash
# Note: This will only commit changes to tracked files
git commit -am "Add utils module and integrate with main.py"
```

**Checkpoint:** Check what was committed:

```bash
git status
git log --oneline
```

**Question:** What happened to `debug.log` and `src/utils.py`? Why?

### Task 2.5: Add and Commit Untracked File

Add the untracked files and commit:

```bash
git add src/utils.py debug.log
git commit -m "Add utils.py and debug.log files"
```

## Part 3: Removing Files (15 minutes)

### Task 3.1: Remove a File from Repository

Remove the debug.log file:

```bash
git rm debug.log
```

**Checkpoint:** Check status and commit the removal:

```bash
git status
git commit -m "Remove debug.log from repository"
```

### Task 3.2: Remove Modified File Forcibly

Create and stage a file, then try to remove it:

```bash
echo "Important data" > important.txt
git add important.txt
echo "More important data" >> important.txt

# Try to remove (this should fail)
git rm important.txt
```

**Question:** Why does the `git rm` command fail? What error message do you see?

### Task 3.3: Force Remove the File

Use force flag to remove:

```bash
git rm -f important.txt
git status
```

### Task 3.4: Remove from Staging Only

Create a file and stage it, then remove it from staging while keeping it in working directory:

```bash
echo "Keep this file" > keep.txt
git add keep.txt
git rm --cached keep.txt
```

**Checkpoint:** Verify the file is still in your working directory but untracked:

```bash
ls -la keep.txt
git status
```

### Task 3.5: Remove Multiple Files with Wildcards

Create multiple log files and remove them:

```bash
touch app.log error.log access.log
git add *.log
git rm --cached *.log
git status
```

## Part 4: Moving and Renaming Files (15 minutes)

### Task 4.1: Move a File

Move a file to a different directory:

```bash
# Move docs/guide.txt to the src directory
git mv docs/guide.txt src/guide.md
```

**Checkpoint:** Check the status:

```bash
git status
git log --oneline
```

**Question:** How does Git show the move operation? What's the difference compared to manually moving and adding?

### Task 4.2: Rename a File

Rename main.py to app.py:

```bash
git mv src/main.py src/app.py
```

### Task 4.3: Verify Rename Operation

Check the status and commit the changes:

```bash
git status
git diff --staged
git commit -m "Rename main.py to app.py and move guide.txt to src"
```

### Task 4.4: Manual Move vs Git Move

Demonstrate the difference between manual and Git move:

```bash
# Manual move (without git mv)
cp src/app.py src/backup.py # copy app.py to backup.py
mv src/app.py src/main.py  # Rename back

# Manually stage the changes
git add src/backup.py src/main.py
git status
```

**Question:** How does this `git status` output differ from when using `git mv`?

### Task 4.5: Commit and Clean Up

```bash
git add -A
git commit -m "Restore main.py and add backup.py"
```

## Challenge Exercises (15 minutes)

### Challenge 1: Complex Staging Scenario

Start with this scenario:

```bash
# Create files
echo "Content 1" > file1.txt
echo "Content 2" > file2.txt
echo "Content 3" > file3.txt

# Stage all files
git add .

# Modify file1.txt and file2.txt
echo "Updated content 1" > file1.txt
echo "Updated content 2" > file2.txt

# Create file4.txt
echo "Content 4" > file4.txt
```

**Tasks:**
1. View the status and identify the state of each file
2. Use `git diff` and `git diff --staged` to see the differences
3. Stage only the modifications to file1.txt
4. Commit changes with message "Update file1.txt"

**Solution approach:** Show the sequence of commands needed.

### Challenge 2: Gitignore and Committing

Create this scenario:

```bash
# Create gitignore rules
cat > .gitignore << 'EOF'
*.tmp
*.bak
temp/
EOF

# Stage and commit gitignore
git add .gitignore
git commit -m "Add .gitignore"

# Create files that should be ignored
mkdir temp
touch temp/data.txt
touch debug.tmp
touch backup.bak
```

**Tasks:**
1. Try to commit all changes with `git commit -a`
2. Why doesn't this work?
3. Use `git add` with wildcards to stage tracked files (except ignored ones)
4. Commit with message "Add project files"

## Lab Solutions

Check your work against the solutions below.

### Task 1.2 - git diff output:

`git diff` shows changes in `src/main.py`, `README.md`, and doesn't show `.env` because it's untracked (Git doesn't track untracked files in diff).

### Task 1.4 - Diff comparison:

```bash
git diff          # Shows unstaged changes (modifications after staging)
git diff --staged # Shows staged changes (src/main.py changes and README updates)
```

### Task 1.6 - File states:

`src/main.py` shows as:
- Staged for commit (the initial changes)
- Modified (the additional line added after staging)
Both states can exist simultaneously.

### Task 2.2 - Modified file:

The `src/main.py` modification is still showing as unstaged because it was modified after the `git add` command.

### Task 2.4 - -a flag behavior:

`git commit -a` committed changes to `src/main.py` but:
- `src/utils.py` remained untracked (new file)
- `debug.log` remained untracked (new file)

### Task 3.2 - Removal failure:

Error: `fatal: cannot rm 'important.txt': the file is staged and modified`
Git prevents removing staged files with modifications to prevent data loss.

### Task 4.1 - Git move output:

Git shows the move as:

```bash
renamed: docs/guide.txt -> src/guide.md
```
This is cleaner than showing a deletion and addition.

### Task 4.4 - Manual move:

Manual move shows:

```bash
deleted: src/app.py
new file: src/backup.py
new file: src/main.py
```
Vs. git mv showing:

```bsh
renamed: src/app.py -> src/main.py
new file: src/backup.py
```

### Challenge 1 - Solution:

```bash
# 1. View status
git status
# States: file1.txt (staged+modified), file2.txt (staged+modified), file3.txt (staged), file4.txt (untracked)

# 2. View diffs
git diff          # Shows file1.txt and file2.txt modifications after staging
git diff --staged # Shows initial staged content of all files

# 3. Stage only file1 modifications
git add file1.txt

# 4. Commit
git commit -m "Update file1.txt"
```

### Challenge 2 - Solution:

```bash
# 1. Try commit -a
git commit -a    # commit only tracks modified files, ignores untracked files and .gitignore rules

# 2. Why doesn't it work?
# .gitignore prevents staging of ignored files, and -a only tracks modified tracked files

# 3. Stage tracked files (excluding ignored ones)
git add .

# 4. Commit
git commit -m "Add project files"
```

## Summary of Key Commands Learned

| Command | Purpose |
|---------|---------|
| `git diff` | Show unstaged changes |
| `git diff --staged` | Show staged changes |
| `git commit -m "msg"` | Commit staged changes |
| `git commit -a -m "msg"` | Skip staging, commit tracked files |
| `git rm <file>` | Remove file from repo |
| `git rm -f <file>` | Force remove staged/modified file |
| `git rm --cached <file>` | Remove from staging but keep file |
| `git mv <old> <new>` | Move/rename file |


## Common Pitfalls to Avoid

1. **Forgetting to stage new files**: `git commit -a` does NOT include untracked files
2. **Committing without staging**: Always use `git status` first
3. **Removing files incorrectly**: Use `git rm` instead of OS-level `rm`
4. **Renaming manually**: Use `git mv` to maintain proper history
5. **Not checking diffs before committing**: Always review changes with `git diff`
