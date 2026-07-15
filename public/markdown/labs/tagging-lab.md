# Tagging Lab: Hands-On Practice

## Lab Overview
In this lab, you will practice creating, managing, and sharing tags in Git. You'll learn the difference between lightweight and annotated tags, how to push tags to remote repositories, and how to work with tags for versioning.

**Duration:** 20-25 minutes

**Prerequisites:** Completed the "Remote Repositories" lab or equivalent knowledge, GitHub account

## Lab Objectives
By completing this lab, you will be able to:
- List and search for tags
- Create lightweight and annotated tags
- Tag specific commits
- Push tags to remote repositories
- Delete local and remote tags
- Checkout tags and create branches from them


## Lab Environment Setup

### Step 1: Create and Initialize Repository

```bash
mkdir tagging-lab
cd tagging-lab
git init
```

### Step 2: Create a Commit History

```bash
# Create initial commit
echo "# My Project" > README.md
echo "print('Hello World')" > app.py
git add .
git commit -m "Initial commit"

# Second commit
echo "def add(a, b):" > math.py
echo "    return a + b" >> math.py
git add math.py
git commit -m "Add math module with add function"

# Third commit
echo "def subtract(a, b):" >> math.py
echo "    return a - b" >> math.py
git add math.py
git commit -m "Add subtract function to math"

# Fourth commit
echo "## Usage" >> README.md
echo "Run app.py to see the demo" >> README.md
git add README.md
git commit -m "Update README with usage instructions"
```

**Checkpoint:** Verify your commit history:

```bash
git log --oneline
```

## Part 1: Listing and Creating Tags (10 minutes)

### Task 1.1: List Current Tags

Check if any tags exist:

```bash
git tag
git tag -l
```

**Question:** What output do you see?

### Task 1.2: Create Lightweight Tag

Create a lightweight tag for the current commit:

```bash
git tag v1.0
```

**Checkpoint:** List tags again:

```bash
git tag
```

### Task 1.3: Create Annotated Tag

Create an annotated tag with a message:

```bash
git tag -a v1.1 -m "Release version 1.1: Added math functions"
```

**Checkpoint:** View tag details:

```bash
git show v1.1
```

**Question:** What additional information does `git show` display for an annotated tag vs. a lightweight tag?

### Task 1.4: Search for Tags

List tags matching a pattern:

```bash
git tag -l "v1.*"
```

### Task 1.5: Tag Specific Commit

Create a tag for an earlier commit:

```bash
# Get the hash of the second commit (the one with "Add math module")
git log --oneline

# Replace <hash> with the actual commit hash
git tag -a v1.0-alpha <commit-hash> -m "Alpha release with add function"
```

**Checkpoint:** Verify the tag was created:

```bash
git tag -l "v1.*"
```

## Part 2: Sharing Tags (10 minutes)

### Task 2.1: Create Remote Repository
1. Go to GitHub and create a new repository named `tagging-practice`
2. **Do NOT** initialize with README

### Task 2.2: Add Remote

```bash
git remote add origin https://github.com/YOUR_USERNAME/tagging-practice.git
```

### Task 2.3: Push Code and Tags

Push the main branch and all tags:

```bash
git push -u origin main
git push origin --tags
```

**Checkpoint:** Refresh your GitHub repository page. Click on "Releases" or "Tags" to verify all tags are visible.

**Question:** How many tags appear on GitHub?

### Task 2.4: Push Specific Tag

Push just one tag:

```bash
# Create a new tag
git tag -a v1.2 -m "Minor update"

# Push only this tag
git push origin v1.2
```

**Checkpoint:** Check GitHub - only `v1.2` should appear as new.

### Task 2.5: Push Only Annotated Tags

Create both lightweight and annotated tags, then push only annotated:

```bash
# Create lightweight tag
git tag v1.3

# Create annotated tag
git tag -a v1.4 -m "Version 1.4"

# Push only annotated tags (and commits)
git push origin --follow-tags
```

**Checkpoint:** Check GitHub - only `v1.4` should be pushed, not `v1.3`.

**Question:** What's the benefit of using `--follow-tags` instead of `--tags`?


## Part 3: Deleting and Checking Out Tags (10 minutes)

### Task 3.1: Delete Local Tag

Delete a local tag:

```bash
git tag -d v1.3
```

**Checkpoint:** Verify it's gone:

```bash
git tag
```

### Task 3.2: Delete Remote Tag

Delete a tag from the remote:

```bash
git push origin --delete v1.2
```

**Checkpoint:** Check GitHub - `v1.2` should be gone.

### Task 3.3: Checkout a Tag

View the state of the repository at a specific tag:

```bash
git checkout v1.0
```

**Checkpoint:** Look at the files:

```bash
ls -la
cat app.py
```

**Question:** What files are present? Are all the math functions there?

### Task 3.4: Create Branch from Tag

Create a new branch based on a tag:

```bash
# Create a branch from v1.0
git checkout -b hotfix/v1.0-bugfix v1.0
```

**Checkpoint:** Verify you're on the new branch:

```bash
git branch
git status
```

**Question:** What's the difference between checking out a tag directly vs. creating a branch from it?

### Task 3.5: Return to Main Branch

```bash
git checkout main
```

## Challenge Exercises (10 minutes)

### Challenge 1: Release Workflow

Simulate a complete release workflow:

```bash
# Make a new feature
echo "def multiply(a, b):" >> math.py
echo "    return a * b" >> math.py
git add math.py
git commit -m "Add multiply function"

# Make another feature
echo "def divide(a, b):" >> math.py
echo "    return a / b" >> math.py
git add math.py
git commit -m "Add divide function"

# Update README
echo "## Version 2.0" >> README.md
echo "Complete math library with add, subtract, multiply, divide" >> README.md
git add README.md
git commit -m "Update README for v2.0"
```

**Tasks:**

1. Create an annotated tag `v2.0` for the latest commit
2. Create a lightweight tag `latest` that points to the same commit
3. Push both tags to the remote

### Challenge 2: Tag Cleanup

Clean up unnecessary tags:

```bash
# Create several test tags
git tag test1
git tag test2
git tag test3
git tag -a test4 -m "Test tag"
```

**Tasks:**
1. Delete all local tags with "test" in their name
2. Verify they are gone locally
3. If they existed on remote, delete them there too

### Challenge 3: Historical Tag

Find the commit that introduced the `subtract` function and tag it:

```bash
# Hint: Use git log -S to find the commit
```

**Task:** Create an annotated tag `history/subtract` for the commit that added the subtract function.

## Lab Solutions

Check your work against the solutions below.

### Task 1.1 - Initial Tags:
No tags exist yet, so `git tag` returns nothing.

### Task 1.3 - git show differences:
- **Lightweight tag:** Shows only the commit details
- **Annotated tag:** Shows tag metadata (tagger, date, message) plus the commit details

### Task 1.5 - Tag specific commit:
```bash
# Find the hash
git log --oneline

# Example: tag the second commit
git tag -a v1.0-alpha abc123d -m "Alpha release with add function"
```

### Task 2.3 - Tags on GitHub:
All tags created (`v1.0`, `v1.1`, `v1.0-alpha`) should appear.

### Task 2.5 - --follow-tags vs --tags:
- `--tags`: Pushes ALL tags (including lightweight)
- `--follow-tags`: Pushes only annotated tags that are reachable from the current commit

### Task 3.3 - Files at v1.0:
Only `README.md` and `app.py` exist. `math.py` is not present because it was added in later commits.

### Task 3.4 - Checkout vs Branch:
- `git checkout <tag>`: Puts you in detached HEAD state (read-only)
- `git checkout -b <branch> <tag>`: Creates a writable branch from the tag

### Challenge 1 - Solution:
```bash
# Create tags
git tag -a v2.0 -m "Release version 2.0: Complete math library"
git tag latest

# Push both
git push origin v2.0
git push origin latest
```

### Challenge 2 - Solution:
```bash
# Delete local tags matching pattern
git tag -l "test*" | xargs git tag -d

# Delete from remote if they exist
git tag -l "test*" | xargs -n1 git push origin --delete
```

For windows, use:

```powershell
git tag -l "test*" | ForEach-Object { git tag -d $_ }
git tag -l "test*" | ForEach-Object { git push origin --delete $_ }
```

### Challenge 3 - Solution:

```bash
# Find the commit that added "subtract"
git log -S "subtract" --oneline

# Tag it (replace <hash> with the commit hash)
git tag -a history/subtract <hash> -m "Tag: Commit that added subtract function"
```

## Summary of Key Commands Learned

| Command | Purpose |
|---------|---------|
| `git tag` | List all tags |
| `git tag -l "pattern"` | Search for tags |
| `git tag <name>` | Create lightweight tag |
| `git tag -a <name> -m "msg"` | Create annotated tag |
| `git show <tag>` | View tag details |
| `git push <remote> <tag>` | Push specific tag |
| `git push <remote> --tags` | Push all tags |
| `git push <remote> --follow-tags` | Push only annotated tags |
| `git tag -d <tag>` | Delete local tag |
| `git push <remote> --delete <tag>` | Delete remote tag |
| `git checkout <tag>` | Checkout a tag (detached HEAD) |
| `git checkout -b <branch> <tag>` | Create branch from tag |


## Quick Reference: Tag Types

| Feature | Lightweight | Annotated |
|---------|-------------|-----------|
| Metadata (tagger, date) | × | ✓ |
| Tag message | × | ✓ |
| GPG signing | × | ✓ |
| Recommended for releases | × | ✓ |
| Storage | Just a pointer | Full Git object |


## Important Notes

**Tag naming conventions:** Common patterns include:
- `v1.0.0` (Semantic Versioning)
- `release-1.0`
- `stable-2024-01`

**Always use annotated tags** for releases - they provide useful metadata

**Don't push lightweight tags** if you want to maintain proper release history

**Tags are local** until you push them - remember to push tags to share with others