# GitHub - Contributing to a Project

Contributing to a project on GitHub typically involves forking the repository, making changes in a topic branch, and submitting a pull request for review.

**Table of Contents:**
- [GitHub - Contributing to a Project](#github---contributing-to-a-project)
  - [Forking a Repository](#forking-a-repository)
  - [Creating a Pull Request](#creating-a-pull-request)
  - [Iterating on a Pull Request](#iterating-on-a-pull-request)
  - [Keeping up with Upstream](#keeping-up-with-upstream)
  - [References](#references)
  - [GitHub Flavored Markdown](#github-flavored-markdown)


## Forking a Repository
If you don't have write access to a repository, you can fork it. Forking creates a personal copy of the repository in your GitHub account. It lives in your username's namespace and allows you to freely make changes without affecting the original project.

This workflow centered on the the [Topic Branches](branching-workflows) workflow.

1. **Fork the Repository**: Click the "Fork" button on the repository page.
2. **Clone the Repository**: Use the `git clone` command to download your fork.
3. **Create a Topic Branch**: Create a new branch for your changes using `git checkout -b branch-name`.
4. **Make Changes**: Edit the code or documentation as needed.
5. **Commit Changes**: Use `git add .` to stage your changes and `git commit -m "Your commit message"` to commit them.
6. **Push Changes**: Push your changes to your forked repository using `git push origin branch-name`.
7. **Create a Pull Request**: Go to the forked repository and click "New Pull Request" to submit your changes for review.
8. **Address Feedback**: Respond to any feedback from the project maintainers and make necessary changes.
9. **Merge Changes**: Once your pull request is approved, the maintainers will merge your changes into the main project.
10. **Sync Your Fork**: Keep your fork up to date with the original repository by pulling in changes from the upstream repository.

**Note:** To fork a repository, you need to have a GitHub account. If you don't have one, you can create it by following the steps in the [Account Creation and Setup](github) guide. From the repository page, click the "**Fork**" button in the upper right corner. This will create a copy of the repository under your GitHub account.

After forking, you can clone the repository to your local machine using the following commands:

```bash
git clone <your-fork-url> <local-directory>
cd <local-directory>
git checkout -b <topic-branch>
# Make your changes
git add .
git commit -m "Your commit message"
git push origin <topic-branch>
# Create a pull request on GitHub
```

## Creating a Pull Request
Once you've made your changes and pushed them to your fork, you can create a pull request to propose your changes to the original repository. To create a pull request:

1. Go to the original repository on GitHub.
2. Click the "**New Pull Request**" button.
3. Enter a title and description for your pull request, explaining the changes you've made.
4. Select the branch you want to merge into (usually `main` or `master`) and the branch you made your changes in (your topic branch).
5. Click "**Create Pull Request**" to submit your changes for review.

## Iterating on a Pull Request
When the maintainers review your pull request, they may request changes or provide feedback by leaving comments.

Once the maintainer makes a comment, you will receive a notification. You can then make the requested changes in your local repository, commit them, and push them to your fork. The pull request will automatically update with your new changes.

Anyone also can comment on your pull request, including other contributors and maintainers. You can respond to comments, ask questions, and discuss the changes with the reviewers.


## Keeping up with Upstream
If you want to keep your fork up to date with the original repository, you can add the original repository as a remote called `upstream` and fetch changes from it, and merge them into your topic branch.

```bash
git remote add upstream <original-repo-url>
# on the topic branch
git fetch upstream
git merge upstream/main
# do some work and commit changes
git add .
git commit -m "Your commit message"
git push origin branch-name
# if you face conflicts, resolve them and then push again
git add .
git commit -m "Resolved merge conflicts"
git push origin branch-name
```
You have to synchronize your fork with the upstream repository periodically to ensure that your fork has the latest changes from the original repository.

```bash
# on the topic branch
git fetch upstream
git merge upstream/main
# or pull the changes directly (fetch + merge)
git pull upstream main
```

## References

You can mention the old Pull Request in the new Pull Request description using the format `#<PR number>`. For example, if the old Pull Request number is `42`, you can write `This PR builds upon #42`.

```txt
This PR builds upon #42.
```

You can also use `username#<PR number>` to reference a Pull Request from a different user. For example, if the old Pull Request number is 42 and the username is `octocat`, you can write `octocat#42`.

```txt
This PR builds upon octocat#42.
```
Or referencing a Pull Request from a different repository using the format `username/repo#<PR number>`. For example, if the old Pull Request number is 42, the username is `octocat`, and the repository name is `hello-world`, you can write `octocat/hello-world#42`.

```txt
This PR builds upon octocat/hello-world#42.
```
## GitHub Flavored Markdown
In Issue and Pull Request description, comments, code comments, and README files, you can use GitHub ***Flavored Markdown*** (GFM) to format your text. GFM supports features like headings, lists, code blocks, links, images, and more.

This file you are reading is written in Markdown, and you can use GFM to format your own content on GitHub. For example, you can create headings using `#`, lists using `-` or `*`, and code blocks using triple backticks (```) or indentation.

For more information on GitHub Flavored Markdown, you can refer to the [GitHub Docs - Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).
