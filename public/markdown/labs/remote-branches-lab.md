# Git Remote Branches Lab: Hands-On Practice

## Lab Overview
In this lab, you will practice working with remote branches, pushing changes, pulling updates, and managing remote repositories. You'll understand how Git handles distributed development and collaboration through remote branches.

**Duration:** 25-30 minutes

**Prerequisites:** Completed previous labs or equivalent knowledge

## Lab Objectives

By completing this lab, you will be able to:
- View remote branches and references
- Push local branches to remote repositories
- Create and manage tracking branches
- Fetch and pull updates from remote
- Delete remote branches
- Work with multiple remotes

## Lab Environment Setup

### Step 1: Create Local and Remote Repositories

Since we don't have an actual remote server, we'll simulate a remote repository using a local bare repository:

```bash
# Create a directory for our "remote" repository
mkdir remote-repo.git
cd remote-repo.git
git init --bare
cd ..

# Clone the "remote" repository to create a local working copy
git clone remote-repo.git local-repo
cd local-repo
```

**Checkpoint:** Verify your repository is set up correctly:

```bash
git remote -v
```

**Question:** What remote name appears? What URL does it point to?

### Step 2: Create Initial Files and Commits

```bash
# Create initial files
echo "# Remote Branches Lab" > README.md
echo "console.log('Hello Remote World');" > app.js
echo "body { font-family: Arial, sans-serif; }" > style.css

# Stage and commit
git add .
git commit -m "Initial commit: Project setup"

# Push to remote
git push origin main
```

**Checkpoint:** View your remote branches:

```bash
git branch -r
```

## Part 1: Exploring Remote References (5 minutes)

### Task 1.1: View All Remote References

List all references in the remote repository:

```bash
git ls-remote origin
```

**Question:** What references do you see in the output?

### Task 1.2: Get Detailed Remote Information

View detailed information about the remote repository:

```bash
git remote show origin
```

**Question:** What information does this command provide that `git ls-remote` doesn't?

### Task 1.3: List Remote Branches

View only the remote branches:

```bash
git branch -r
```

**Question:** How does this differ from `git branch` (without `-r`)?

## Part 2: Pushing Changes to Remote (8 minutes)

### Task 2.1: Create and Push a Feature Branch

Create a new branch and push it to the remote:

```bash
# Create feature branch
git checkout -b feature/api

# Make changes
echo "function fetchData() {" >> app.js
echo "    return 'Data from API';" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add fetchData function"

# Push to remote
git push origin feature/api
```

**Checkpoint:** View remote branches:

```bash
git branch -r
```

**Question:** What new remote branch appears?

### Task 2.2: Push with Different Branch Names

Create another branch and push it with a different remote name:

```bash
# Create new branch
git switch -c feature/auth

# Make changes
echo "function login() {" >> app.js
echo "    console.log('User logged in');" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add login function"

# Push with different remote name
git push origin feature/auth:feature/user-authentication
```

**Checkpoint:** Verify the remote branch:

```bash
git branch -r
```

**Question:** What remote branch was created? How does it differ from the local branch name?

### Task 2.3: Push to Main Branch

Switch to main and push the merged changes:

```bash
git switch main
git merge feature/api
git push origin main
```

**Checkpoint:** Check the remote:

```bash
git remote show origin
```

## Part 3: Fetching and Pulling (8 minutes)

### Task 3.1: Simulate Remote Changes

Now, simulate another developer making changes to the remote:

```bash
# Clone the repository again (simulating another developer)
cd ..
git clone remote-repo.git developer2
cd developer2

# Make and push changes
echo "function multiply(a, b) {" >> app.js
echo "    return a * b;" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add multiply function"
git push origin main

cd ../local-repo
```

**Checkpoint:** Check if you see the new changes:

```bash
cat app.js
```

**Question:** Do you see the multiply function? Why?

### Task 3.2: Fetch Remote Updates

Fetch the latest changes without merging:

```bash
git fetch origin
```

**Checkpoint:** View remote branches and local status:

```bash
git branch -r
git log --oneline --decorate --all --graph
```

**Question:** Can you see the new commit? Is it in your local branch?

### Task 3.3: Merge Fetched Changes

Manually merge the fetched changes:

```bash
git merge origin/main
```

**Checkpoint:** Verify the merge:

```bash
cat app.js
git log --oneline --decorate --all --graph
```

### Task 3.4: Pull to Fetch and Merge

Simulate another remote change and use pull:

```bash
cd ../developer2
echo "function divide(a, b) {" >> app.js
echo "    return a / b;" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add divide function"
git push origin main

cd ../local-repo
# Use pull to fetch and merge
git pull origin main
```

**Checkpoint:** Verify the changes:

```bash
cat app.js
git log --oneline --decorate --all --graph
```

## Part 4: Tracking Branches (5 minutes)

### Task 4.1: Create Tracking Branch

Create a local tracking branch for the remote feature branch in `local-repo`:

```bash
# Method 1: Using checkout with track
git checkout --track origin/feature/user-authentication
```

**Checkpoint:** Check tracking information:

```bash
git branch -vv
```

**Question:** What tracking relationship do you see?

### Task 4.2: View All Tracking Branches

List all branches with their tracking status:

```bash
git branch -vv
```

**Question:** Which branches are tracking remote branches?

### Task 4.3: Change Tracking Relationship

Create a branch with a different local name that tracks a remote branch:

```bash
git checkout -b local-auth origin/feature/user-authentication
```

**Checkpoint:** Verify tracking:

```bash
git branch -vv
```

## Part 5: Deleting Remote Branches (4 minutes)

### Task 5.1: Delete Remote Branch

Delete the user-authentication branch from the remote:

```bash
git push origin --delete feature/user-authentication
```

**Checkpoint:** Verify deletion:

```bash
git branch -r
git remote show origin
```

**Question:** Can you still see the deleted remote branch? What about the local tracking branch?

### Task 5.2: Prune Remote References

Remove stale remote-tracking branches that no longer exist:

```bash
git remote prune origin
```

**Checkpoint:** List remote branches:

```bash
git branch -r
```

## Challenge Exercises (5 minutes)

### Challenge 1: Multiple Remotes

Add and work with a second remote:

```bash
# Add a second remote (simulated)
cd ..
git clone remote-repo.git second-repo
cd second-repo
git remote add upstream ../remote-repo.git

# View remotes
git remote -v

# Fetch from upstream
git fetch upstream

# Push to upstream
git push upstream main
```

**Tasks:**
1. Add a third remote called `backup`
2. Push your current branches to the backup remote
3. View all remotes and their URLs

### Challenge 2: Tracking Branch Workflow

Practice setting up tracking branches:

```bash
# 1. Create a new local branch
git checkout -b feature/performance

# 2. Make a change
echo "// Performance optimization" >> app.js
git add app.js
git commit -m "Add performance improvements"

# 3. Push to remote without tracking
git push origin feature/performance

# 4. Set up tracking after the fact
git branch --set-upstream-to=origin/feature/performance feature/performance
```

**Tasks:**
1. Verify the tracking relationship using `git branch -vv`
2. Push changes using just `git push` (without specifying remote/branch)

### Challenge 3: Cleanup

Clean up your remote repository:

**Tasks:**
1. List all remote branches
2. Delete the `feature/api` and `feature/performance` branches
3. Prune stale references locally
4. Verify the cleanup


## Lab Solutions

### Task 1.1 - Remote References:
You'll see references like:
- `HEAD`
- `refs/heads/main`

### Task 1.2 - Remote Show:
`git remote show origin` provides:
- Remote URL
- Tracked branches
- Branches that can be pushed/pulled
- Local branches configured for `git pull`

### Task 1.3 - Remote vs Local Branches:
`git branch -r` shows only remote branches, while `git branch` shows only local branches.

### Task 2.1 - Remote Feature Branch:
The remote branch `origin/feature/api` appears after pushing.

### Task 2.2 - Different Branch Names:
The remote branch is named `feature/user-authentication`, while the local branch is `feature/auth`.

### Task 3.1 - Missing Changes:
No, because you haven't fetched the latest changes from the remote.

### Task 3.2 - After Fetch:
You can see the new commit in `git log`, but your local `main` branch doesn't yet contain it.

### Task 4.1 - Tracking Relationship:
`origin/feature/user-authentication` tracks `feature/user-authentication` (or vice versa).

### Task 4.2 - Tracking Branches:
The branches that have a remote branch listed next to them in the output are tracking branches.

### Task 5.1 - Deletion:
The remote branch is gone, but the local tracking branch still exists (it's not deleted automatically).

## Summary of Key Commands Learned

| Command | Purpose |
|---------|---------|
| `git remote -v` | View remote repositories |
| `git branch -r` | List remote branches |
| `git ls-remote origin` | List all remote references |
| `git remote show origin` | Detailed remote info |
| `git push origin <branch>` | Push branch to remote |
| `git push origin <local>:<remote>` | Push to different remote name |
| `git fetch origin` | Fetch changes without merging |
| `git pull origin <branch>` | Fetch and merge changes |
| `git checkout --track origin/<branch>` | Create tracking branch |
| `git branch -vv` | View tracking relationships |
| `git push origin --delete <branch>` | Delete remote branch |
| `git remote prune origin` | Remove stale references |
| `git remote add <name> <url>` | Add new remote repository |


## Remote Branching Strategy Recommendations

| Strategy | Description |
|----------|-------------|
| **Feature Branches** | Push each feature as a separate branch |
| **Pull Requests** | Use remote branches for code review |
| **Protected Branches** | Protect main branch from direct pushes |
| **Tagging Releases** | Use tags on remote for releases |
| **Remote Cleanup** | Regularly prune and delete stale branches |