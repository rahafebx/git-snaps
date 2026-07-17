# Git Branch Management Lab: Hands-On Practice

## Lab Overview

In this lab, you will practice managing branches in Git, including listing, viewing commit history, identifying merged/unmerged branches, deleting branches, and renaming them.

**Duration:** 20-25 minutes

**Prerequisites:** Completed the "Git Branching" lab or equivalent knowledge

## Lab Objectives

By completing this lab, you will be able to:
- List local and remote branches
- View the last commit on each branch
- Identify merged and unmerged branches
- Safely delete merged branches
- Force delete unmerged branches
- Rename local and remote branches

## Lab Environment Setup

### Step 1: Create and Initialize Repository

```bash
mkdir branch-management-lab
cd branch-management-lab
git init
```

### Step 2: Create Multiple Branches and Commits

```bash
# Create initial commits on main
echo "# Project" > README.md
echo "console.log('Hello World');" > app.js
git add .
git commit -m "Initial commit"

echo "function add(a, b) {" >> app.js
echo "    return a + b;" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add add function"

# Create feature branch
git checkout -b feature/login
echo "function login(username, password) {" >> app.js
echo "    return username + ' logged in';" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add login function"

# Create another feature branch from main
git checkout main
git checkout -b feature/search
echo "function search(query) {" >> app.js
echo "    return 'Searching for ' + query;" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add search function"

# Make another commit on main
git checkout main
echo "/* Main branch updates */" >> app.js
git add app.js
git commit -m "Add comment header on main"
```

**Checkpoint:** View your current branch:

```bash
git branch
```

## Part 1: Listing Branches (5 minutes)

### Task 1.1: List Local Branches

View all local branches:

```bash
git branch
```

**Question:** Which branch is currently active? How can you tell?

### Task 1.2: List All Branches (Including Remote)

Create a remote reference and list all branches:

```bash
git remote add origin <remote-url>  # Replace <remote-url> with your remote repository URL
git fetch origin
git branch -a
```

**Note:** Since we haven't added a remote, only local branches will appear.

### Task 1.3: View Branch Names Only

List branches in a simple format:

```bash
git branch --list
```

## Part 2: Viewing Last Commits (5 minutes)

### Task 2.1: Show Last Commit on Each Branch

View the last commit on each branch:

```bash
git branch -v
```

**Question:** What information does `-v` display?

### Task 2.2: Detailed View with Log

View a more detailed branch history:

```bash
git log --oneline --decorate --all --graph
```

**Question:** How does this differ from `git branch -v`?

### Task 2.3: View Remote Branch Commits (Optional)

If you have remotes, show them:

```bash
git branch -va
```

## Part 3: Identifying Merged/Unmerged Branches (5 minutes)

### Task 3.1: List Merged Branches

See which branches have been merged into the current branch:

```bash
git branch --merged
```

**Question:** Which branches appear? Why?

### Task 3.2: List Unmerged Branches

See which branches haven't been merged:

```bash
git branch --no-merged
```

**Question:** Which branches are unmerged? Why?

### Task 3.3: Check Merge Status from Different Branches

Switch to a different branch and check merged status:

```bash
git checkout feature/login
git branch --merged
git branch --no-merged
```

**Question:** How does the output change compared to being on main?

## Part 4: Deleting Branches (10 minutes)

### Task 4.1: Try to Delete an Unmerged Branch
Attempt to delete a branch that hasn't been merged:
```bash
git checkout main
git branch -d feature/login
```

**Question:** What error message do you see? Why?

### Task 4.2: Delete a Merged Branch

Merge a branch and then delete it:

```bash
# Merge feature/search, resolve conflicts if any
git merge feature/search

# Verify it's merged
git branch --merged

# Delete it safely
git branch -d feature/search

# Verify deletion
git branch
```

**Question:** Why was this deletion successful?

### Task 4.3: Force Delete an Unmerged Branch

Force delete the login branch:

```bash
git branch -D feature/login
```

**Checkpoint:** Verify the branch is gone:

```bash
git branch
```

**Question:** What's the difference between `-d` and `-D`?

### Task 4.4: Clean Up All Merged Branches

Delete all branches that have been merged into main (except main itself):

```bash
# List merged branches excluding main
git branch --merged | grep -v "main\|master" | xargs git branch -d

# git branch --merged | ? { $_ -notmatch 'main|master' } | % { git branch -d $_.Trim() }
```

**Checkpoint:** Check remaining branches:

```bash
git branch
```

## Part 5: Renaming Branches (10 minutes)

### Task 5.1: Rename Current Branch

Create and rename a branch:

```bash
git checkout -b old-feature
git branch -m new-feature
```

**Checkpoint:** Verify the rename:

```bash
git branch
```

**Question:** What's the advantage of renaming a branch instead of creating a new one?

### Task 5.2: Rename a Branch You're Not On

```bash
git checkout main
git branch -m new-feature renamed-feature
```

**Checkpoint:** Check branches:

```bash
git branch
```

**Question:** Can you rename a branch you're not currently on?

### Task 5.3: Rename a Branch with Remote Tracking

Simulate renaming a remote branch:

```bash
# Create a remote (optional - if you have one)
# git remote add origin <url>

# Rename local branch
git branch -m old-remote new-remote

# Update remote tracking (if remote exists)
# git push --set-upstream origin new-remote
# git push origin --delete old-remote
```

**Checkpoint:** View local branches:

```bash
git branch -v
```

## Challenge Exercises (10 minutes)

### Challenge 1: Branch Cleanup Scenario

You have the following branches and need to clean them up:

```bash
# Create the scenario
git checkout main
git checkout -b feature/auth
echo "// Auth feature" >> app.js
git add app.js
git commit -m "Add auth feature"

git checkout main
git checkout -b feature/analytics
echo "// Analytics feature" >> app.js
git add app.js
git commit -m "Add analytics feature"

git checkout main
git merge feature/auth
```

**Tasks:**
1. List all branches
2. Identify which branches have been merged into main
3. Delete all merged branches safely
4. What should you do with `feature/analytics`?

### Challenge 2: Remote Branch Rename Simulation

You want to rename a branch that has been pushed to a remote:

```bash
# Create a remote (use a dummy URL)
git remote add origin https://github.com/demo/repo.git

# Create and push a branch
git checkout -b feature/old-name
git push -u origin feature/old-name
```

**Tasks:**
1. Rename the branch locally to `feature/new-name`
2. Push the renamed branch to remote
3. Delete the old branch from remote
4. Verify the new upstream tracking is set

### Challenge 3: Bulk Branch Management
You have multiple test branches and need to manage them:

```bash
# Create test branches
for i in {1..5}; do
    git checkout -b test/branch-$i
    echo "// Test $i" >> app.js
    git add app.js
    git commit -m "Add test $i"
    git checkout main
done
```

**Tasks:**
1. List all branches with their last commit
2. Identify which test branches have been merged
3. Delete all test branches (merged or not) in one command
4. Verify the cleanup


## Lab Solutions

Check your work against the solutions below.

### Task 1.1 - Active Branch:
The active branch is marked with an asterisk `*` next to its name.

### Task 2.1 - -v Display:
Shows the branch name, the commit hash, and the commit message of the last commit on each branch.

### Task 2.2 - Log vs Branch -v:
`git log --oneline --decorate --all --graph` shows the full commit history with visual structure, while `git branch -v` only shows the last commit on each branch.

### Task 3.1 - Merged Branches:
Only `main` appears because no branches have been merged yet.

### Task 3.2 - Unmerged Branches:
`feature/login` and `feature/search` appear because they haven't been merged into main.

### Task 3.3 - Merge Status Change:
When on `feature/login`, the current branch appears as merged, while `feature/search` and `main` are unmerged. The output changes because the merge status is relative to the current branch. When you switch to a different branch, the list of merged and unmerged branches reflects the history of that specific branch.

### Task 4.1 - Error Message:
`error: The branch 'feature/login' is not fully merged. If you are sure you want to delete it, run 'git branch -D feature/login'.`

### Task 4.2 - Successful Deletion:
`feature/search` was deleted successfully because it had been merged into main first.

### Task 4.3 - -d vs -D:
- `-d`: Safe delete (only works if branch is fully merged)
- `-D`: Force delete (deletes regardless of merge status)

### Task 5.1 - Branch Rename:
You maintain the same commit history and upstream relationships, making it easier than creating a new branch and cherry-picking commits.

### Task 5.2 - Rename a Branch You're Not On
Yes, you can rename any branch as long as you specify the correct old and new names.

### Challenge 1 - Solution:
```bash
# List all branches
git branch

# Identify merged branches
git branch --merged

# Delete merged branches (except main)
git branch --merged | grep -v "main\|master" | xargs git branch -d
# git branch --merged | ? { $_ -notmatch 'main|master' } | % { git branch -d $_.Trim() }

# feature/analytics is unmerged - delete with -D or merge it first
git branch -D feature/analytics
```

### Challenge 2 - Solution:
```bash
# Rename local
git branch -m feature/old-name feature/new-name

# Push new branch
git push -u origin feature/new-name

# Delete old remote branch
git push origin --delete feature/old-name

# Verify tracking
git branch -vv
```

### Challenge 3 - Solution:
```bash
# List with last commits
git branch -v

# Delete all test branches (merged or not)
git branch | grep "test/branch" | xargs git branch -D

# git branch | ? { $_ -match 'test/branch' } | % { git branch -D $_.Trim() }

# Verify cleanup
git branch
```

## Summary of Key Commands Learned

| Command | Purpose |
|---------|---------|
| `git branch` | List local branches |
| `git branch -a` | List all branches (including remote) |
| `git branch -v` | List branches with last commit |
| `git branch --merged` | List merged branches |
| `git branch --no-merged` | List unmerged branches |
| `git branch -d <branch>` | Safely delete merged branch |
| `git branch -D <branch>` | Force delete unmerged branch |
| `git branch -m <old> <new>` | Rename a branch |
| `git push -u origin <branch>` | Set upstream tracking |
| `git push origin --delete <branch>` | Delete remote branch |


## Best Practices for Branch Management

- **Regularly clean up merged branches** - Keeps repository tidy
- **Always use `-d` first** - Safer than `-D`
- **Check `--merged` before deleting** - Prevents accidental data loss
- **Use descriptive branch names** - Makes identification easier
- **Delete remote branches after merging** - Keeps remote clean
- **Be careful with `-D`** - Loses unmerged commits permanently
- **Use `git branch -v` frequently** - Stay aware of branch states