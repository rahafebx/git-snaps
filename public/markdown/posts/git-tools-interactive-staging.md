# Git Tools - Interactive Staging

You can craft commits to include only the changes you want by using Git's interactive staging features. This allows you to stage specific parts of files, discard unwanted changes, and create cleaner commit histories.

- [Git Tools - Interactive Staging](#git-tools---interactive-staging)
  - [Commands Usage Examples](#commands-usage-examples)
    - [Staging entire files using update](#staging-entire-files-using-update)
    - [Unstaging files using revert](#unstaging-files-using-revert)
    - [Selectively staging code sections using patch](#selectively-staging-code-sections-using-patch)
  - [References](#references)


By using `-i` option with `git add`, you can enter an interactive mode that provides a menu of options for staging changes.

```bash
git add -i
```
**Commands:**
|Command|Shortcut|Description|
|-------|--------|-----------|
|status|s|Show the status of changes in the working directory and staging area.|
|update|u|Update the index with changes from the working directory.|
|revert|r|Revert changes in the working directory to match the index.|
|add untracked|a|Add untracked files to the index.|
|patch|p|Interactively select hunks of changes to add to the index.|
|diff|d|View the differences between the working directory and the index.|
|quit|q|Exit the interactive mode.|
|help|?|Display help information for the interactive mode.|

## Commands Usage Examples
Practical, step-by-step examples of how to use the most common commands inside the `git add -i` interactive menu.

For these examples, imagine your repository has two modified files: `index.html` and `app.js`.

### Staging entire files using update
Use this when you want to stage whole files quickly without typing out their full paths.

1. Launch the interactive menu:

```bash
git add -i
What now> u

           staged     unstaged path
  1:    unchanged        +2/-1 index.html
  2:    unchanged       +15/-5 app.js
Update>>
```
2. Type `1,2` and press `Enter` to select both files (or type    `1-2`). Git marks them with an asterisk (`*`):

```bash
Update>> 1,2
           staged     unstaged path
 *1:    unchanged        +2/-1 index.html
 *2:    unchanged       +15/-5 app.js
Update>> 
```
3. Press `Enter` on an **empty line** to execute the update. The files are now staged.

### Unstaging files using revert

Use this if you accidentally staged a file and want to pull it back out of the staging area without losing your work.

1. From the main `What now>` prompt, type `3` or `r` for **revert**:

```bash
What now> r
           staged     unstaged path
  1:        +2/-1        binary index.html
  2:       +15/-5        binary app.js
Revert>> 
```
2. Type `2` and press Enter to select `app.js`.
3. Press `Enter` again on an **empty line**. `app.js` is now unstaged (moved back to your working directory), while `index.html` remains staged.

### Selectively staging code sections using patch
Use this when you made multiple changes to a single file (like adding a feature and a debugging print statement), but you only want to commit the feature.

1. From the main prompt, type `5` or `p` for patch:

```bash
What now> p
           staged     unstaged path
  1:    unchanged        +2/-1 index.html
  2:    unchanged       +15/-5 app.js
Patch update>> 
```

2. Type `2` and press `Enter` to patch `app.js`. Then press `Enter` on an **empty line** to start reviewing the changes.
3. Git will isolate the first change ("hunk") and ask what to do:

```bash
diff --git a/app.js b/app.js
--- a/app.js
+++ b/app.js
@@ -10,3 +10,6 @@
 function init() {
+    console.log("Debugging database connection..."); // You want to skip this
+    fetchData(); // You want to stage this
 }
Stage this hunk [y,n,q,a,d,s,e,?]? 
```
4. Because the console log and the function call are grouped together, type `s` to **split** this hunk into smaller pieces.
5. Git splits them. It will present the `console.log` line first. Type `n` (no) to skip it.
6. Git then presents the `fetchData()` line. Type `y` (yes) to stage it.
7. Once finished, type `7` or `q` at the main menu to quit and return to your normal terminal.

**Options of the `Stage this hunk` prompt:**
|Option|Description|
|------|-----------|
|y|Stage this hunk.|
|n|Do not stage this hunk.|
|a|Stage this hunk and all later hunks in the file.|
|d|Do not stage this hunk or any later hunks in the file.|
|g|Select a hunk to go to.|
|/|Search for a hunk matching the given regex.|
|j|Leave this hunk undecided, see the next undecided hunk.|
|J|Leave this hunk undecided, see the next hunk.|
|k|Leave this hunk undecided, see the previous undecided hunk.|
|K|Leave this hunk undecided, see the previous hunk.|
|s|Split the current hunk into smaller hunks.|
|e|Manually edit the current hunk.|
|?|Print help.|

You can also use `git add -p` to directly enter the patch mode without going through the interactive menu.

## References
- [Interactive Staging](https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging)
