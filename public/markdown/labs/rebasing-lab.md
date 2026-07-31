# Git Rebasing Lab: Hands-On Practice

## Lab Overview
In this lab, you will practice rebasing branches to maintain a clean, linear project history. You'll learn how to rebase feature branches onto main, use interactive rebasing for cleanup, and understand when it's appropriate to rebase.

**Duration:** 20-25 minutes

**Prerequisites:** Completed previous labs or equivalent knowledge

## Lab Objectives

By completing this lab, you will be able to:
- Understand the rebasing process
- Rebase a feature branch onto main
- Use interactive rebasing to squash commits
- Identify when to rebase vs. merge
- Apply advanced rebasing techniques

## Lab Environment Setup

### Step 1: Create Repository with Branch Structure

Initialize a repository with a branching structure suitable for rebasing:

```bash
# Create a new repository
mkdir rebasing-lab
cd rebasing-lab
git init

# Create initial main branch commits
echo "# Project" > README.md
git add README.md
git commit -m "Initial commit: Add README"

echo "console.log('Hello World');" > app.js
git add app.js
git commit -m "Add main application file"

echo "body { margin: 0; padding: 20px; }" > style.css
git add style.css
git commit -m "Add base styles"

# Create and work on a feature branch
git checkout -b feature/user-profile
echo "function getUserProfile() {" >> app.js
echo "    return { name: 'John', age: 30 };" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add getUserProfile function"

echo ".profile { border: 1px solid #ccc; padding: 10px; }" >> style.css
git add style.css
git commit -m "Add profile styles"

# Switch back to main and add more commits
git checkout main
echo "console.log('Application started');" >> app.js
git add app.js
git commit -m "Add startup message"

echo "footer { text-align: center; }" >> style.css
git add style.css
git commit -m "Add footer styles"
```

**Checkpoint:** View your branch history:

```bash
git log --oneline --decorate --all --graph
```

**Question:** How many commits are on `main`? How many on `feature/user-profile`?

## Part 1: Basic Rebasing (5 minutes)

### Task 1.1: Rebase Feature Branch onto Main

Now, rebase your feature branch onto the updated main:

```bash
# Switch to feature branch
git checkout feature/user-profile

# Rebase onto main
git rebase main
```

If you face any conflicts during the rebase, resolve them by editing the files, then continue the rebase:

```bash
# See which files have conflicts
git status
# After resolving conflicts, stage the changes
git add .
git rebase --continue
```

**Checkpoint:** View the updated history:

```bash
git log --oneline --decorate --all --graph
```

**Question:** What happened to the commit order? How does it differ from the previous graph?

### Task 1.2: Verify the Changes

Check that your changes are still intact:

```bash
# View app.js
cat app.js

# View style.css
cat style.css
```

**Question:** Are all your feature changes still present? Are the main branch changes included?

### Task 1.3: Fast-Forward Merge

Now merge the rebased feature branch into main:

```bash
git checkout main
git merge feature/user-profile
```

**Checkpoint:** Verify the merge type:

```bash
git log --oneline --decorate --all --graph
```

**Question:** Was this a fast-forward merge? How can you tell?

## Part 2: Advanced Rebasing (8 minutes)

### Task 2.1: Create Multi-Branch Structure

Create a more complex branching structure:

```bash
# Create a topic branch from a topic branch
git checkout -b feature/authentication
echo "function login(username, password) {" >> app.js
echo "    // Authentication logic" >> app.js
echo "    return true;" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add login function"

echo "function logout() {" >> app.js
echo "    console.log('Logged out');" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add logout function"

# Create another branch off of feature/authentication
git checkout -b feature/session-management
echo "function createSession(user) {" >> app.js
echo "    return { token: 'xyz', user: user };" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add session creation"

echo "function destroySession(session) {" >> app.js
echo "    console.log('Session destroyed');" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add session destruction"
```

**Checkpoint:** View the complex structure:

```bash
git log --oneline --decorate --all --graph
```

### Task 2.2: Rebase with --onto

Rebase `feature/session-management` onto main, excluding authentication changes:

```bash
git checkout feature/session-management
git rebase --onto main feature/authentication feature/session-management
```

**Checkpoint:** Examine the new history:

```bash
git log --oneline --decorate --all --graph
```

**Question:** What commits are now in `feature/session-management`? What happened to the authentication commits?

### Task 2.3: Rebase Without Checking Out

Rebase the `feature/authentication` branch onto main without switching to it:

```bash
git rebase main feature/authentication
```

**Checkpoint:** Verify the operation:

```bash
git branch
git log --oneline --decorate --all --graph
```

**Question:** Which branch are you on after this command? Where is `feature/authentication` now?

## Part 3: Interactive Rebasing (5 minutes)

### Task 3.1: Create More Feature Commits

Create a feature branch with multiple small commits:

```bash
git checkout -b feature/database
echo "// Database connection" >> app.js
echo "function connectDB() {" >> app.js
echo "    return 'Connected';" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add database connection function"

echo "function queryDB(sql) {" >> app.js
echo "    return 'Query result';" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add database query function"

echo "function disconnectDB() {" >> app.js
echo "    return 'Disconnected';" >> app.js
echo "}" >> app.js
git add app.js
git commit -m "Add database disconnection function"
```

**Checkpoint:** View the commits:

```bash
git log --oneline -3
```

### Task 3.2: Squash Commits with Interactive Rebase

Squash the three database commits into one:

```bash
# Interactive rebase for the last 3 commits
git rebase -i HEAD~3
```

**Instructions for interactive rebase:**
1. An editor will open showing the 3 commits
2. Leave the first commit as `pick`
3. Change the second and third commits from `pick` to `squash` (or `s`)
4. Save and close the editor
5. A new editor will open for the commit message
6. Combine the messages or write a new one, save and close

**Checkpoint:** Verify the squashed commits:

```bash
git log --oneline --decorate --all --graph
```

**Question:** How many commits are now in the database feature branch?

### Task 3.3: Reorder Commits with Interactive Rebase

Reorder commits to demonstrate interactive rebasing power:

```bash
# Create some more commits for reordering
echo "// Performance optimization" >> app.js
git add app.js
git commit -m "Add performance optimization"

echo "// Error handling" >> app.js
git add app.js
git commit -m "Add error handling"

echo "// Documentation" >> app.js
git add app.js
git commit -m "Update documentation"

# Reorder the last 3 commits
git rebase -i HEAD~3
```

**Instructions for reordering:**
1. In the editor, reorder the lines
2. Put "Add error handling" first, then "Add performance optimization", then "Update documentation"
3. Save and close

**Note:** to change line order in `vim` editor, you can use `dd` to cut a line and `p` to paste it where you want.

**Checkpoint:** Verify the reordering:

```bash
git log --oneline -3
```

## Lab Solutions

### Task 1.1 - Basic Rebasing:
After rebasing, the feature commits appear after all main commits, creating a linear history.

### Task 1.3 - Fast-Forward Merge:
Yes, it's a fast-forward merge because the feature branch tip is ahead of main, and main hasn't diverged.

### Task 2.2 - Rebase with --onto:
`feature/session-management` now contains only the session management commits, and the authentication commits remain on their branch.

### Task 3.2 - Squashing:
The three database commits are combined into one commit with a consolidated message.


## Summary of Key Commands Learned

| Command | Purpose |
|---------|---------|
| `git rebase <base>` | Rebase current branch onto base |
| `git rebase --onto <newbase> <oldbase> <branch>` | Rebase branch onto new base excluding old base commits |
| `git rebase <base> <branch>` | Rebase branch onto base without checking it out |
| `git rebase -i HEAD~<n>` | Interactive rebase last n commits |
| `git rebase --continue` | Continue rebasing after resolving conflicts |
| `git rebase --abort` | Abort rebasing and return to original state |
| `git push --force-with-lease` | Force push safely (use with caution!) |
| `git log --oneline --decorate --all --graph` | View commit history with graph |

## Rebasing Decision Matrix

| Situation | Recommended Action |
|-----------|-------------------|
| Local branch, not pushed | Rebase for clean history |
| Local branch, to be reviewed | Rebase to organize commits |
| Public/shared branch | Merge (never rebase) |
| Feature branch with messy history | Interactive rebase locally |
| Updates from main to feature | Rebase (if local) or Merge (if shared) |
| Preparing a pull request | Rebase to create linear history |

## Key Takeaways

1. **Rebasing = Clean History**: Rebasing creates a linear, readable commit history
2. **Rebasing = Rewriting History**: It creates new commits with new SHA-1 checksums
3. **Never Rebase Shared Branches**: Don't rebase commits that have been pushed to shared repositories
4. **Interactive Rebasing is Powerful**: Use it to squash, reorder, and clean up commits locally
5. **Rebase Locally, Merge Publicly**: Clean up local commits with rebase, then merge public branches