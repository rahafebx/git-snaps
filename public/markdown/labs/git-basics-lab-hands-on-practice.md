# Git Basics Lab: Hands-On Practice

## Lab Overview
In this lab, you will practice the fundamental Git operations covered in the guide. You'll create a repository, make changes, track files, and learn to manage your project effectively.

**Duration:** 45-60 minutes

**Prerequisites:** Git installed on your system, access to a terminal/command line

## Lab Objectives
By completing this lab, you will be able to:
- Initialize a Git repository
- Clone an existing repository
- Track and stage files
- Understand file states (tracked, untracked, modified, staged)
- Use `.gitignore` to exclude files
- View repository status

## Lab Environment Setup

### Step 1: Verify Git Installation

Open your terminal and verify Git is installed:

```bash
git --version
```
*If Git is not installed, download it from [git-scm.com](https://git-scm.com/)*

### Step 2: Create a Lab Directory

```bash
mkdir git-basics-lab
cd git-basics-lab
```

## Part 1: Getting a Git Repository (10 minutes)

### Task 1.1: Initialize a New Repository

Initialize a new Git repository in your lab directory:

```bash
git init
```

**Checkpoint:** Verify the `.git` directory was created:

```bash
ls -la | grep .git
```

### Task 1.2: Clone an Existing Repository

In a separate location, clone a practice repository:

```bash
cd ..
git clone https://github.com/github/gitignore.git practice-repo
cd practice-repo
```

**Checkpoint:** List the contents to verify the clone:

```bash
ls -la
```

## Part 2: Recording Changes (20 minutes)

### Task 2.1: Create Files

Return to your lab repository and create some files:

```bash
cd ../git-basics-lab

# Create a README file
echo "# My Git Project" > README.md
echo "This is a practice project for learning Git basics." >> README.md

# Create a Python script
echo "print('Hello, Git!')" > hello.py

# Create some log files
touch app.log
touch error.log

# Create a temporary file
echo "Temporary data" > temp.tmp
```

### Task 2.2: Check Repository Status

Run the status command to see untracked files:
```bash
git status
```

**Question:** What files appear as untracked?

### Task 2.3: Track Files

Stage the files you want to track:

```bash
# Add README.md
git add README.md

# Add hello.py
git add hello.py

# Check status again
git status
```

**Question:** What changed in the output after adding files?

### Task 2.4: Short Status

View the concise status output:

```bash
git status -s
```

**Question:** What symbols appear next to your staged files?

### Task 2.5: Modify Files

Make changes to your staged files:

```bash
# Add more content to README.md
echo "## Getting Started" >> README.md
echo "Run hello.py to see a greeting." >> README.md

# Update hello.py
echo "print('Welcome to Git!')" > hello.py
```

**Check:** Check the status using short format:
```bash
git status -s
```

**Question:** What does the output show for `README.md` and `hello.py`? Why?

### Task 2.6: Stage Changes

Stage the modifications:
```bash
git add README.md hello.py
git status
```

### Task 2.7: Commit Changes

Commit your staged changes:

```bash
git commit -m "Initial commit: Add README and hello.py"
```

**Checkpoint:** Verify the commit:

```bash
git log --oneline
```

## Part 3: Ignoring Files (15 minutes)

### Task 3.1: Create a `.gitignore` File

Create a `.gitignore` file in your repository root:

```bash
cat > .gitignore << 'EOF'
# Ignore log files
*.log

# Ignore temporary files
*.tmp

# Ignore Python cache
__pycache__/
*.pyc

# Ignore macOS system files
.DS_Store
EOF
```

### Task 3.2: Stage and Commit `.gitignore`

```bash
git add .gitignore
git commit -m "Add .gitignore to exclude log, tmp, and cache files"
```

### Task 3.3: Test Ignored Files

Check if your ignored files are still untracked:
```bash
git status
```

**Question:** Are `app.log`, `error.log`, and `temp.tmp` still showing as untracked? Why?

### Task 3.4: Add a File That Should Be Ignored

Try to add an ignored file:
```bash
git add app.log
git status
```

**Question:** What happens when you try to add a file that matches a `.gitignore` pattern?

### Task 3.5: Verify Ignored Files
Check if specific files are being ignored:
```bash
git check-ignore app.log
git check-ignore temp.tmp
git check-ignore README.md
```

**Question:** What does the output for `git check-ignore` look like for ignored vs. non-ignored files?

### Task 3.6: Create Nested Gitignore

Create a subdirectory and a `.gitignore` in it:

```bash
mkdir src
cd src
echo "*.bak" > .gitignore
echo "Backup file" > backup.bak
cd ..
```

**Check:** Check if the backup file is ignored:
```bash
git status
```

## Part 4: Challenge Exercises (15 minutes)

### Challenge 1: File State Diagram

Based on what you've practiced, create the following file states in your repository:

1. Create `challenge.txt` and stage it
2. Modify the file after staging
3. Make a change to `hello.py` without staging it
4. Create an untracked file `data.csv`

**Checkpoint:** Run `git status -s` and identify each file's state:
- `challenge.txt` should show `AM` (staged added, working modified)
- `hello.py` should show ` M` (working modified, not staged)
- `data.csv` should show `??` (untracked)

### Challenge 2: Gitignore Patterns

Update your `.gitignore` to:
1. Ignore all `.bak` files
2. Ignore the `temp/` directory
3. **But** allow `important.bak` (not ignored)

**Test your pattern:**

```bash
touch backup.bak
touch important.bak
mkdir temp
touch temp/data.txt
```

**Checkpoint:** Verify only the allowed file shows up:
```bash
git status
```

### Challenge 3: Repository Clone Practice

Using what you learned about cloning:
1. Create a bare clone of your current repository
2. Name it `git-basics-backup.git`

```bash
git clone --bare . ../git-basics-backup.git
```

## Lab Solutions

Check your work against the solutions below.

### Task 2.2 - Files as untracked:

```bash
# Untracked files:
  README.md
  app.log
  error.log
  hello.py
  temp.tmp
```

### Task 2.3 - After adding:

```bash
# Changes to be committed:
  new file:   README.md
  new file:   hello.py

# Untracked files:
  app.log
  error.log
  temp.tmp
```

### Task 2.4 - Short status output:

```bash
A  README.md
A  hello.py
?? app.log
?? error.log
?? temp.tmp
```

### Task 2.5 - After modifications:

```bash
AM README.md    # Added and modified
AM hello.py     # Added and modified
?? app.log
?? error.log
?? temp.tmp
```

### Task 3.3 - Ignored files:

The log and temp files don't show as untracked because they match patterns in `.gitignore`.

### Task 3.5 - check-ignore output:

```bash
app.log      # Shows the file is ignored
temp.tmp     # Shows the file is ignored
             # (No output for README.md means it's not ignored)
```

### Challenge 1 - Final status:

```bash
git status -s
# Output should show:
# AM challenge.txt  (staged added, working modified)
#  M hello.py       (working modified)
# ?? data.csv       (untracked)
```

### Challenge 2 - Updated gitignore:
Add these lines to `.gitignore`:

```gitignore
*.bak
!important.bak
temp/
```

## Summary of Key Commands Learned

| Command | Purpose |
|---------|---------|
| `git init` | Initialize a new repository |
| `git clone <url>` | Clone an existing repository |
| `git status` | Check file status |
| `git status -s` | Short status output |
| `git add <file>` | Stage files for commit |
| `git commit -m "message"` | Commit staged changes |
| `git check-ignore <file>` | Check if file is ignored |
| `git log` | View commit history |