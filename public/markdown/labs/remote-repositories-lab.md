# Working with Remote Repositories Lab: Hands-On Practice

## Lab Overview

In this lab, you will practice working with remote repositories, including adding remotes, fetching, pulling, pushing changes, and managing remote connections.

**Duration:** 25-30 minutes

**Prerequisites:** GitHub account (or GitLab/Bitbucket), Git installed, completed previous labs

## Lab Objectives

By completing this lab, you will be able to:
- View and manage remote repositories
- Add and remove remote connections
- Fetch and pull changes from remotes
- Push local commits to remote repositories
- Inspect remote repository information

## Lab Environment Setup

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Name it: `git-remote-practice`
4. **Do NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

### Step 2: Initialize Local Repository

```bash
mkdir remote-repositories-lab
cd remote-repositories-lab
git init
```

### Step 3: Create Initial Commit

```bash
echo "# Remote Repositories Practice" > README.md
echo "print('Hello from local')" > app.py
git add .
git commit -m "Initial commit: Add README and app"
```

## Part 1: Adding and Viewing Remotes (5 minutes)

### Task 1.1: Add Remote Repository

Add your GitHub repository as a remote named `origin`:

```bash
git remote add origin https://github.com/YOUR_USERNAME/git-remote-practice.git
```

**Note:** Replace `YOUR_USERNAME` with your GitHub username.

### Task 1.2: View Remotes

List all configured remotes:

```bash
git remote -v
```

**Question:** What information does `-v` display? What would `git remote` (without `-v`) show?

### Task 1.3: Add Another Remote

Add a second remote named `backup`:

```bash
git remote add backup https://github.com/YOUR_USERNAME/git-remote-practice-backup.git
```

**Note:** Don't create the backup repository on GitHub yet; this is just for practice.

**Checkpoint:** Verify both remotes:

```bash
git remote -v
```

## Part 2: Pushing to Remote (10 minutes)

### Task 2.1: Push to Remote

Push your local `main` branch to `origin`:

```bash
git push -u origin main
```

**Note:** If you're using `master` instead of `main`, adjust the command accordingly.

**Checkpoint:** Refresh your GitHub repository page to verify the files are there.

**Question:** What does the `-u` flag do?

### Task 2.2: Make Changes and Push

Create and push more changes:

```bash
# Create new file
echo "def add(a, b):" > math.py
echo "    return a + b" >> math.py
git add math.py
git commit -m "Add math module with add function"

# Modify app.py
echo "from math import add" >> app.py
echo "print(add(5, 3))" >> app.py
git add app.py
git commit -m "Use math module in app"

# Push changes
git push
```

**Checkpoint:** Verify the changes are on GitHub.

### Task 2.3: Push to Different Remote

Push to the `backup` remote:

```bash
git push backup main
```

**Question:** What error do you get and why?

## Part 3: Fetching and Pulling (10 minutes)

### Task 3.1: Simulate Remote Changes

Create a change directly on GitHub:
1. Go to your repository on GitHub
2. Click on `README.md`
3. Click the pencil icon (Edit)
4. Add a new line: `## Updated from GitHub`
5. Commit directly to the `main` branch `Add section header for GitHub updates`.

### Task 3.2: Fetch Changes

Download the remote changes without merging:

```bash
git fetch origin
```

**Checkpoint:** Check your local status:

```bash
git status
```

**Question:** What does Git say about your branch status?

### Task 3.3: View Fetched Changes

See what was fetched:

```bash
git log origin/main --oneline
git diff origin/main
```

**Question:** What's the difference between your local `main` and `origin/main`?

### Task 3.4: Pull Changes

Merge the remote changes into your local branch:

```bash
git pull origin main
```

**Checkpoint:** Check the README.md file:

```bash
cat README.md
```

**Question:** Does it now contain the line you added on GitHub?

### Task 3.5: Configure Pull Behavior

Check your current pull behavior:

```bash
git config pull.rebase
```

**Question:** What output do you see? What does it mean?

### Task 3.6: Practice Pull with Rebase (Optional)

If you want to test rebase behavior:

```bash
# Enable rebase for this repository only
git config pull.rebase true

# Make a local commit
echo "Local change" >> app.py
git add app.py
git commit -m "Local change before pull"

# Pull with rebase
git pull origin main
```

## Part 4: Inspecting and Managing Remotes (10 minutes)

### Task 4.1: Inspect a Remote

Get detailed information about `origin`:

```bash
git remote show origin
```

**Question:** What information does this command provide?

### Task 4.2: Rename a Remote

Rename the `backup` remote to `archive`:

```bash
git remote rename backup archive
```

**Checkpoint:** Verify the rename:

```bash
git remote -v
```

### Task 4.3: Remove a Remote

Remove the `archive` remote:

```bash
git remote remove archive
```

**Checkpoint:** Verify it's gone:

```bash
git remote -v
```

## Challenge Exercises (10 minutes)

### Challenge 1: Multi-Remote Workflow

You want to maintain two remotes:
1. `origin` - your main repository (already set)
2. `upstream` - a fork of a popular project

```bash
# Add a remote to a public repository (use this example)
git remote add upstream https://github.com/octocat/Spoon-Knife.git
```

**Tasks:**
1. View all remotes
2. Fetch from upstream
3. What command would you use to push to both remotes?

### Challenge 2: Branch Tracking

```bash
# Create a new branch
git checkout -b feature/new-feature
echo "def feature(): return 'new'" > feature.py
git add feature.py
git commit -m "Add new feature"
```

**Tasks:**
1. Push this branch to `origin`
2. Set it to track the remote branch
3. Push again using just `git push`
4. View tracking information using `git branch -vv`

### Challenge 3: Remote Cleanup

```bash
# Create multiple remotes
git remote add remote1 https://github.com/user/repo1.git
git remote add remote2 https://github.com/user/repo2.git
git remote add remote3 https://github.com/user/repo3.git
```

**Task:** Remove all remotes except `origin` in a single command.

## Lab Solutions

Check your work against the solutions below.

### Task 1.2 - git remote vs git remote -v:
- `git remote` shows just the remote names (e.g., `origin`)
- `git remote -v` shows names and their fetch/push URLs

### Task 2.1 - What -u does:
The `-u` flag sets up tracking, so future `git push` commands can be run without specifying the remote and branch.

### Task 2.3 - Push to backup error:
You'll get an error because the `backup` remote doesn't exist yet or hasn't been created on GitHub.

### Task 3.2 - git status after fetch:
Git shows: "Your branch is behind 'origin/main' by 1 commit"

### Task 3.3 - Branch differences:
The local `main` branch does not have the new line added on GitHub, while `origin/main` does.

### Task 3.4 - After pull:
Yes, README.md now contains the line added on GitHub.

### Task 3.5 - pull.rebase output:
- If not set: no output (default is merge)
- If set to `true`: shows `true`
- If set to `false`: shows `false`

### Task 4.1 - git remote show information:
Shows: URL, tracked branches, local branches configured for git pull, and which branches are pushed.

### Challenge 1 - Push to both remotes:

```bash
# Fetch from upstream
git fetch upstream
# Push to both remotes
git push origin main
git push upstream main
```

### Challenge 2 - Branch tracking:

```bash
# Push and set tracking
git push -u origin feature/new-feature

# Now this works
git push

# View tracking
git branch -vv
```

### Challenge 3 - Remove all remotes except origin:

```bash
git remote | grep -v origin | xargs -n1 git remote remove
```
Or manually:

```bash
git remote remove remote1
git remote remove remote2
git remote remove remote3
```

OR

```Powershell
git remote | Where-Object { $_ -ne "origin" } | ForEach-Object { git remote remove $_ }
```

## Summary of Key Commands Learned

| Command | Purpose |
|---------|---------|
| `git remote -v` | View all remotes with URLs |
| `git remote add <name> <url>` | Add a new remote |
| `git fetch <remote>` | Download changes without merging |
| `git pull <remote> <branch>` | Fetch and merge changes |
| `git push <remote> <branch>` | Upload local commits |
| `git push -u <remote> <branch>` | Push and set tracking |
| `git remote show <remote>` | Inspect remote details |
| `git remote rename <old> <new>` | Rename a remote |
| `git remote remove <remote>` | Remove a remote |

## Important Notes

**Authentication:** When pushing to GitHub, you may need to:
- Use a Personal Access Token (recommended)
- Set up SSH keys
- Use GitHub CLI

**Force Push Warning:** Never use `git push --force` unless you know exactly what you're doing.

**Push Order:** Always pull before pushing to avoid merge conflicts.

## Common Remote Workflow

```text
1. git add <files>
2. git commit -m "message"
3. git pull origin main     # Get latest changes
4. git push origin main     # Push your changes
```