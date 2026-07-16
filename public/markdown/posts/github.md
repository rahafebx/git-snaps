# GitHub
GitHub is a web-based platform for version control and collaboration that allows developers to host and review code, manage projects, and build software together. It uses Git, a distributed version control system, to track changes in source code during software development.

Table of Contents:
- [GitHub](#github)
  - [Contributing to a Project](#contributing-to-a-project)
    - [Forking a Repository](#forking-a-repository)
    - [Keeping up with Upstream](#keeping-up-with-upstream)
    - [References](#references)
    - [GitHub Flavored Markdown](#github-flavored-markdown)
  - [Maintaining a Project](#maintaining-a-project)
    - [Creating a New Repository](#creating-a-new-repository)
    - [Adding Collaborators](#adding-collaborators)
    - [Managing Pull Requests](#managing-pull-requests)
      - [Email Notifications](#email-notifications)
      - [Collaborating on the Pull Request](#collaborating-on-the-pull-request)
      - [Pull Requests on Pull Requests](#pull-requests-on-pull-requests)
      - [Mentions](#mentions)
    - [README File](#readme-file)
    - [CONTRIBUTING](#contributing)
    - [CODE\_OF\_CONDUCT](#code_of_conduct)
    - [Project Administration](#project-administration)
      - [Changing the Default Branch](#changing-the-default-branch)
      - [Transferring a Project](#transferring-a-project)
  - [Summary](#summary)


## Contributing to a Project
Contributing to a project on GitHub typically involves forking the repository, making changes in a topic branch, and submitting a pull request for review.

### Forking a Repository
If you don't have write access to a repository, you can fork it. Forking creates a personal copy of the repository in your GitHub account.

This workflow centered on the the [Topic Branches](../05-distributed-git/notes.md/#working-in-topic-branches) workflow.

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


### Keeping up with Upstream
If you want to keep your fork up to date with the original repository, you can add the original repository as a remote called `upstream` and fetch changes from it.

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

### References

You can mention the old Pull Request in the new Pull Request description using the format `#<PR number>`. For example, if the old Pull Request number is 42, you can write `This PR builds upon #42`.

Example:

```txt
This PR builds upon #42.
```
You can also use `username#<PR number>` to reference a Pull Request from a different user. For example, if the old Pull Request number is 42 and the username is `octocat`, you can write `octocat#42`.

Example:

```txt
This PR builds upon octocat#42.
```
Or referencing a Pull Request from a different repository using the format `username/repo#<PR number>`. For example, if the old Pull Request number is 42, the username is `octocat`, and the repository name is `hello-world`, you can write `octocat/hello-world#42`.

```txt
This PR builds upon octocat/hello-world#42.
```
### GitHub Flavored Markdown
In Issue and Pull Request description, comments, code comments, and README files, you can use GitHub Flavored Markdown (GFM) to format your text. GFM supports features like headings, lists, code blocks, links, images, and more.

For more information on GitHub Flavored Markdown, you can refer to the [GitHub Docs - Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

## Maintaining a Project
Creating, maintaining and administrating your own project on Github.

### Creating a New Repository

1. **Sign in to GitHub**: Log in to your GitHub account.
2. **Create a New Repository**: Click the "+" icon in the top right corner and select "New repository".
3. **Fill in Repository Details**: Provide a name for your repository, an optional description, and choose whether it will be public or private. You can also initialize the repository with a README file, .gitignore file, and a license.
4. **Create Repository**: Click the "Create repository".

### Adding Collaborators

1. **Go to Repository Settings**: Navigate to your repository and click on the "Settings" tab.
2. **Manage Access**: In the left sidebar, click on "Collaborators".
3. **Invite Collaborators**: Click the "Add People" button and enter the GitHub username or email address of the person you want to invite. Click "Add to repository" to send the invitation.
4. **Collaborator Accepts Invitation**: The invited collaborator will receive an email notification and must accept the invitation to gain access to the repository.

### Managing Pull Requests

#### Email Notifications
If someone submits a pull request to your repository, you will get an email notification. The email will give you:
- A list of files that have changes.
- A link to view the pull request on GitHub.
- Patch files that you can download and apply to your local repository.
- Diff files that show the differences between the original and modified files.

You will get email notifications for any comments or updates on the pull request, so you can stay informed about the progress of the review process.

#### Collaborating on the Pull Request
You can collaborate on the pull request by reviewing the changes, leaving comments, and suggesting modifications. You can also request changes or approve the pull request.

If the merge is trivial, you can merge the pull request directly on GitHub. This will do a "non-fast-forward" merge, which creates a merge commit. If the merge is not trivial, you need to inform the contributor to resolve any conflicts and update the pull request before merging.

If you decide you don't want to merge the pull request, you can close it without merging. This will notify the contributor that their changes were not accepted.

#### Pull Requests on Pull Requests
You can open Pull Requests on Pull Requests. This is useful when you want to suggest changes or improvements to a pull request that someone else has submitted. You can create a new pull request that references the original pull request, and your changes will be reviewed alongside the original changes.

1. **Open the pull request**: Navigate to the original pull request on GitHub.
2. **Edit the pull request**: Click the "Edit" button to modify the pull request description or title.
3. **Choose the base fork and branch**: Select the base fork and branch that you want to merge your changes into. This should be the original pull request's branch.
4. **Create a new pull request**: Click the "Create pull request" button to submit your changes. In the description, reference the original pull request using the format `#<PR number>` or `username/repo#<PR number>`.

#### Mentions 
you can mention other users in comments, pull requests, and issues by using the `@username` format. This will notify the mentioned user and draw their attention to the comment or discussion.

### README File
The README file is a crucial part of your GitHub repository. It serves as the front page of your project and provides essential information to users and contributors. This file generally includes:
- **Project Title**: The name of your project.
- **Description**: A brief overview of what your project does and its purpose.
- **Installation Instructions**: Steps to install and set up your project.
- **Usage Examples**: Code snippets or examples showing how to use your project.
- **Contribution Guidelines**: Information on how to contribute to your project.
- **License**: Details about the license under which your project is distributed.

### CONTRIBUTING
The CONTRIBUTING file is a document that outlines the guidelines and best practices for contributing to your project. It helps maintain a consistent workflow and ensures that contributions are made in a structured manner. This file typically includes Instructions on how to submit issues, pull requests, and code contributions.

### CODE_OF_CONDUCT
The CODE_OF_CONDUCT file is a document that sets the expectations for behavior and interaction within your project's community. It helps create a welcoming and inclusive environment for all contributors. This file typically includes guidelines on respectful communication, reporting issues, and consequences for violating the code of conduct.

### Project Administration
#### Changing the Default Branch
1. **Go to Repository Settings**: Navigate to your repository and click on the "Settings" tab.
2. **Set default branch**: In the "General - Default branch" section, you can change the default branch. This will set the selected branch as the default for new pull requests and issues.

#### Transferring a Project
1. **Go to Repository Settings**: Navigate to your repository and click on the "Settings" tab.
2. **Transfer Repository**: In the "Danger Zone" section, click on "Transfer". You will be prompted to enter the new owner's GitHub username or organization name. Confirm the transfer by typing the repository name and clicking "I understand, transfer this repository".

This will transfer ownership of the repository to the new owner, and they will have full control over the project. Also, it will setup a redirect from the old repository URL to the new one, so existing links will still work.

## Summary
In this document, we have covered the essential aspects of using GitHub for version control and collaboration. We discussed how to contribute to a project by forking repositories, creating topic branches, and submitting pull requests. We also explored how to keep your fork up to date with the upstream repository.
