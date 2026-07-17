# Git Branching Lab: Hands-On Practice

## Lab Overview
In this lab, you will practice creating, switching, merging branches, and resolving merge conflicts. You'll understand how branches work as pointers to commits and how Git manages parallel development.

**Duration:** 30-35 minutes

**Prerequisites:** Completed previous labs or equivalent knowledge

## Lab Objectives

By completing this lab, you will be able to:
- Create and switch between branches
- Visualize branch history
- Merge branches
- Resolve merge conflicts
- Delete merged branches

## Lab Environment Setup

### Step 1: Initialize Repository

```bash
mkdir branching-lab
cd branching-lab
git init
```

### Step 2: Create Initial Files and Commits

```bash
# Create initial files
echo "# My Project" > README.md
echo "console.log('Hello World');" > app.js
echo "body { font-family: Arial; }" > style.css

# Stage and commit
git add .
git commit -m "Initial commit: Project setup"

# Second commit
echo "function add(a, b) {" >> app.js
echo "    return a + b;" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add add function to app.js"

# Third commit
echo "function subtract(a, b) {" >> app.js
echo "    return a - b;" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add subtract function to app.js"
```

**Checkpoint:** View your initial history:

```bash
git log --oneline --decorate --all
```

## Part 1: Creating and Switching Branches (10 minutes)

### Task 1.1: View Current Branches

Check which branches exist and which one you're on:

```bash
git branch
```

**Question:** What branch are you currently on?

### Task 1.2: Create a Feature Branch

Create a new branch for adding a feature:

```bash
git branch feature/header
```

**Checkpoint:** List all branches:

```bash
git branch
```

**Question:** Does the new branch appear? Are you still on the main branch?

### Task 1.3: Switch to the Feature Branch

Switch to the new branch using both methods:

```bash
# Method 1: Using checkout
git checkout feature/header

# Method 2: Using switch (newer)
# git switch feature/header
```

**Checkpoint:** Verify you're on the new branch:

```bash
git branch
```

### Task 1.4: Create and Switch in One Command

Create a new branch and switch to it immediately:

```bash
git checkout -b feature/footer
# OR
# git switch -c feature/footer
```

**Checkpoint:** List branches:

```bash
git branch
```

**Question:** What's the advantage of using `-b` (or `-c` with switch)?

### Task 1.5: Make Changes on Feature Branch

Add changes to the footer branch:

```bash
echo "footer { background-color: #333; color: white; }" >> style.css
git add style.css
git commit -m "Add footer styling"
```

### Task 1.6: Switch Back to Main

Return to the main branch:

```bash
git checkout main
# OR
# git switch main
```

**Checkpoint:** Check the content of style.css:

```bash
cat style.css
```

**Question:** Is the footer styling present? Why?

## Part 2: Visualizing Branches (5 minutes)

### Task 2.1: View Branch History

View the complete history with branch information:

```bash
git log --oneline --decorate --all --graph
```

**Question:** What does the graph show about the relationship between branches?

### Task 2.2: Custom Log Format

Create a custom format to see branches clearly:

```bash
git log --graph --pretty=format:'%Cred%h%Creset - %s %Cgreen(%cr) %Cblue<%an>%Creset' --abbrev-commit --all
```

**Note:** This shows a colorful graph with commit details.

## Part 3: Basic Merging (10 minutes)

### Task 3.1: Merge Footer Branch into Main

Switch to main and merge the footer branch:

```bash
git checkout main
git merge feature/footer
```

**Checkpoint:** Check the result:

```bash
cat style.css
git log --oneline --decorate --all --graph
```

**Question:** What kind of merge occurred (fast-forward or recursive)?

### Task 3.2: Delete Merged Branch

Delete the feature branch after merging:

```bash
git branch -d feature/footer
```

**Checkpoint:** List branches to verify deletion:

```bash
git branch
```

**Question:** What happens if you try to delete a branch that hasn't been merged?


## Part 4: Merge Conflicts (10 minutes)

### Task 4.1: Create Conflicting Changes

Create a branch and make changes to the same file:

```bash
# Create and switch to new branch
git checkout -b feature/conflict

# Modify the file
echo "console.log('Feature branch message');" >> app.js
git add app.js
git commit -m "Add console log on feature branch"

# Switch back to main
git checkout main

# Make conflicting changes
echo "console.log('Main branch message');" >> app.js
git add app.js
git commit -m "Add console log on main branch"
```

**Checkpoint:** View the diverged history:

```bash
git log --oneline --decorate --all --graph
```

### Task 4.2: Attempt Merge

Try to merge the conflicting branch:

```bash
git merge feature/conflict
```

**Question:** What error message do you see?

### Task 4.3: Check Conflict Status

Identify the conflicting file:

```bash
git status
```

**Question:** What does the status say about app.js?

### Task 4.4: View the Conflict

Open and view the conflict:

```bash
cat app.js
```

**Question:** What conflict markers do you see?

### Task 4.5: Resolve the Conflict

Manually resolve the conflict by keeping both messages:

```bash
# Edit the file to include both messages
echo "console.log('Main branch message');" > app.js
echo "console.log('Feature branch message');" >> app.js
```

**Checkpoint:** Add the resolved file and commit:

```bash
git add app.js
git status
git commit -m "Resolve conflict in app.js"
```

### Task 4.6: Verify Resolution

Check the merged result:

```bash
cat app.js
git log --oneline --decorate --all --graph
```

## Challenge Exercises (10 minutes)

### Challenge 1: Multi-Branch Workflow

Create and manage multiple branches:

```bash
# 1. Create a branch for a new feature
git checkout -b feature/navigation

# 2. Make changes
echo "nav { display: flex; }" >> style.css
git add style.css
git commit -m "Add navigation styling"

# 3. Switch to main and create another branch
git checkout main
git checkout -b feature/forms

# 4. Make different changes
echo "form { margin: 20px; }" >> style.css
git add style.css
git commit -m "Add form styling"
```

**Tasks:**
1. Merge both branches into main (handle conflicts if any)
2. Delete the branches after merging
3. Show the final commit graph

### Challenge 2: Conflict Resolution Practice

Create a more complex conflict scenario:

```bash
# Create a branch
git checkout -b feature/complex

# Modify multiple files
echo "// Feature change" >> app.js
echo ".feature { color: red; }" >> style.css
git add .
git commit -m "Feature changes to app.js and style.css"

# Switch to main and make conflicting changes
git checkout main
echo "// Main change" >> app.js
echo ".main { color: blue; }" >> style.css
git add .
git commit -m "Main changes to app.js and style.css"
```

**Tasks:**
1. Attempt to merge
2. Resolve all conflicts
3. Complete the merge with a commit

### Challenge 3: Branch Cleanup

Clean up your repository:

**Tasks:**
1. List all branches (including remote if any)
2. Identify which branches have been merged into main
3. Safely delete all merged branches except main


**Question:** How to force delete any unmerged branches you want to remove?


## Lab Solutions

Check your work against the solutions below.

### Task 1.1 - Current Branch:
You should be on the `main` (or `master`) branch.

### Task 1.2 - New Branch:
The `feature/header` branch appears in the list, but you're still on `main`.

### Task 1.4 - Advantage of -b:
It saves time by combining `git branch` and `git checkout` into one command.

### Task 1.6 - Footer Styling Missing:
No, because you're on main and haven't merged the footer branch yet.

### Task 2.1 - Graph Interpretation:
The graph shows the branches diverging at a specific commit and then merging.

### Task 3.1 - Merge Type:
If no new commits were made on main before merging, it's a fast-forward merge. If there were commits, it's a recursive merge.

### Task 3.2 - Deleting Unmerged Branch:
Git will warn you and prevent the deletion unless you use `-D`.

### Task 4.2 - Merge Error:
Git shows: `Automatic merge failed; fix conflicts and then commit the result.`

### Task 4.3 - Status:
Shows "both modified: app.js" indicating the conflict.

### Task 4.4 - Conflict Markers:

```bash
<<<<<<< HEAD
console.log('Main branch message');
=======
console.log('Feature branch message');
>>>>>>> feature/conflict
```

### Challenge 1 - Solution:
```bash
# Merge navigation
git checkout main
git merge feature/navigation

# Merge forms (may have conflicts)
git merge feature/forms

# Resolve conflicts if any, then
git add style.css
git commit -m "Merge both feature branches"

# Delete branches
git branch -d feature/navigation
git branch -d feature/forms

# View final graph
git log --oneline --graph --all
```

### Challenge 2 - Solution:
```bash
# Attempt merge
git merge feature/complex
# Conflicts appear in both files

# Resolve app.js conflict
# Edit app.js to keep both changes
echo "// Main change" > app.js
echo "// Feature change" >> app.js
git add app.js

# Resolve style.css conflict
# Edit style.css to include both rules
echo ".main { color: blue; }" > style.css
echo ".feature { color: red; }" >> style.css
git add style.css

# Complete merge
git commit -m "Resolve conflicts in app.js and style.css"
```

### Challenge 3 - Solution:
```bash
# List all branches
git branch

# List merged branches
git branch --merged

# Delete all merged branches except main
git branch --merged | grep -v "main\|master" | xargs git branch -d

# git branch --merged | ? { $_ -notmatch 'main|master' } | % { git branch -d $_.Trim() }
```

You can force delete unmerged branches using:

```bash
git branch -D <branch-name>
```

## Summary of Key Commands Learned

| Command | Purpose |
|---------|---------|
| `git branch` | List branches |
| `git branch <name>` | Create branch |
| `git checkout <branch>` | Switch branch |
| `git checkout -b <branch>` | Create and switch |
| `git switch <branch>` | Switch branch (newer) |
| `git switch -c <branch>` | Create and switch (newer) |
| `git merge <branch>` | Merge branch into current |
| `git branch -d <branch>` | Delete merged branch |
| `git branch -D <branch>` | Force delete branch |
| `git log --graph --all` | Visualize branches |


## Branching Strategy Recommendations

| Strategy | Description |
|----------|-------------|
| **Git Flow** | Main, develop, feature, release, hotfix branches |
| **GitHub Flow** | Main + feature branches, deploy from main |
| **Trunk-Based** | Short-lived feature branches, frequent merges |
