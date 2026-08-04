
# GitHub - Maintaining a Project
Creating, maintaining and administrating your own project on Github.

**Table of Contents:**
- [GitHub - Maintaining a Project](#github---maintaining-a-project)
  - [Creating a New Repository](#creating-a-new-repository)
  - [Adding Collaborators](#adding-collaborators)
  - [Managing Pull Requests](#managing-pull-requests)
    - [Email Notifications](#email-notifications)
    - [Collaborating on the Pull Request](#collaborating-on-the-pull-request)
    - [Pull Requests on Pull Requests](#pull-requests-on-pull-requests)
    - [Mentions and Notifications](#mentions-and-notifications)
    - [The Notification Settings](#the-notification-settings)
  - [Special Files](#special-files)
    - [README File](#readme-file)
    - [CONTRIBUTING](#contributing)
    - [CODE\_OF\_CONDUCT](#code_of_conduct)
  - [Project Administration](#project-administration)
    - [Changing the Default Branch](#changing-the-default-branch)
    - [Transferring a Project](#transferring-a-project)


## Creating a New Repository

1. **Sign in to GitHub**: Log in to your GitHub account.
2. **Create a New Repository**: Got to the "Repositories" tab on your GitHub profile and click the "**New**" button to create a new repository.
3. **Fill in Repository Details**: Provide a name for your repository, an optional description, and choose whether it will be public or private. You can also initialize the repository with a `README` file, `.gitignore` file, and a license.
4. **Create Repository**: Click the "Create repository".

After creating the repository, it will be available at `github.com/your-username/your-repository-name`. You can clone the repository to your local machine using the provided URL.

## Adding Collaborators

1. **Go to Repository Settings**: Navigate to your repository and click on the "**Settings**" tab.
2. **Manage Access**: In the left sidebar, click on "**Collaborators**".
3. **Invite Collaborators**: Click the "**Add People**" button and enter the GitHub username or email address of the person you want to invite. Click "Add to repository" to send the invitation.
4. **Collaborator Accepts Invitation**: The invited collaborator will receive an email notification and must accept the invitation to gain access to the repository.

## Managing Pull Requests
Pull Requests can either come from a branch in a fork of your repository or from another branch in the same repository. You can manage pull requests by reviewing the changes, leaving comments, and merging or closing the pull request.

### Email Notifications
If someone submits a pull request to your repository, you will get an email notification. The email will give you:
- A list of files that have changes.
- A link to view the pull request on GitHub.
- Patch files that you can download and apply to your local repository.
- Diff files that show the differences between the original and modified files.

You will get email notifications for any comments or updates on the pull request, so you can stay informed about the progress of the review process.

### Collaborating on the Pull Request
You can collaborate on the pull request by reviewing the changes, leaving comments, and suggesting modifications. You can also request changes or approve the pull request.

You can comment on whole commit or on specific lines of code. You can also leave comments on the pull request itself, which will be visible to all participants.

Every time someone else comments on the pull request, you will get an email notification. You can reply to comments directly from the email or by visiting the pull request on GitHub.

If the merge is trivial, you can merge the pull request directly on GitHub. This will do a "**non-fast-forward**" merge, which creates a merge commit. If the merge is not trivial, you need to inform the contributor to resolve any conflicts and update the pull request before merging.

If you decide you don't want to merge the pull request, you can close it without merging. This will notify the contributor that their changes were not accepted.

### Pull Requests on Pull Requests
You can open Pull Requests on Pull Requests. This is useful when you want to suggest changes or improvements to a pull request that someone else has submitted. You can create a new pull request that references the original pull request, and your changes will be reviewed alongside the original changes.

1. **Open the pull request**: Navigate to the original pull request on GitHub.
2. **Edit the pull request**: Click the "**Edit**" button to modify the pull request description or title.
3. **Choose the base fork and branch**: Select the base fork and branch that you want to merge your changes into. This should be the original pull request's branch.
4. **Create a new pull request**: Click the "**Create pull request**" button to submit your changes. In the description, reference the original pull request using the format `#<PR number>` or `username/repo#<PR number>`.

### Mentions and Notifications
you can mention other users in comments, pull requests, and issues by using the `@username` format. This will notify the mentioned user and draw their attention to the comment or discussion.

If someone gets mentioned on a Pull Request or Issue, they will be "subscribed" to that Pull Request or Issue. This means they will receive notifications for any updates, comments, or changes made to that Pull Request or Issue.

If you no longer want to receive notifications for a Pull Request or Issue, you can unsubscribe by clicking the "**Unsubscribe**" button on the right side of the page. This will stop notifications for that specific Pull Request or Issue.

### The Notification Settings
You can customize your notification settings on GitHub to control how and when you receive notifications. You can choose to receive notifications via email, web, or mobile, and you can also set up filters to receive notifications only for specific repositories or activities.

1. Click on your profile picture in the top right corner of GitHub and select "**Settings**".
2. In the left sidebar, click on "**Notifications**".
3. Adjust your notification settings according to your preferences. You can choose to receive notifications for all activity, participating and @mentions, or only for repositories you watch. You can also set up custom filters to receive notifications for specific events or activities.

## Special Files
There are several special files that you can include in your GitHub repository to provide additional information and guidelines for users and contributors. These files are typically placed in the root directory of your repository and are automatically recognized by GitHub.

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

## Project Administration
Generally there are not a lot of administrative things you can do with a single project, but there are some things you can do to manage your project and its contributors.

### Changing the Default Branch
1. **Go to Repository Settings**: Navigate to your repository and click on the "Settings" tab.
2. **Set default branch**: In the "General - Default branch" section, you can change the default branch. This will set the selected branch as the default for new pull requests and issues.

### Transferring a Project
1. **Go to Repository Settings**: Navigate to your repository and click on the "Settings" tab.
2. **Transfer Repository**: In the "Danger Zone" section, click on "Transfer". You will be prompted to enter the new owner's GitHub username or organization name. Confirm the transfer by typing the repository name and clicking "I understand, transfer this repository".

This will transfer ownership of the repository to the new owner, and they will have full control over the project. Also, it will setup a redirect from the old repository URL to the new one, so existing links will still work.
