# Distributed Git - Contributing to a Project

There are numerous variations on how to contribute to a project, depending on the size of the team, the number of contributors, and the workflow used by the project. In this guide, we will explore some common scenarios for contributing to a project using Git.

**Table of Contents:**
- [Distributed Git - Contributing to a Project](#distributed-git---contributing-to-a-project)
  - [Commit Guidelines](#commit-guidelines)
  - [Private Small Team](#private-small-team)
  - [Private Managed Team](#private-managed-team)
  - [Forked Public Project](#forked-public-project)
  - [Public Project over Email](#public-project-over-email)
  - [Learning Resources](#learning-resources)
  - [References](#references)


Some of the project variables that you may want to consider when contributing to a project include:

- **Active contributors**: How many people are actively contributing to the project, and how often? A project with many active contributors is more likely to be well-maintained and responsive to issues.
- **Project workflow**: What is the project's workflow? Is it centralized, integration-manager, or dictator and lieutenants? Are all the patches peer-reviewed and approved? Understanding the workflow will help you know how to contribute effectively.
- **Commit access**: Do you have commit access to the project? If not, you may need to fork the repository and submit pull requests for your changes. How does the project prefer to accept contributed work? Does it even have a policy? How much work are you contributing at a time? How often do you contribute?

All these questions can affect how you contribute to a project and how your contributions are received. It's important to understand the project's workflow and policies before contributing, so you can make the most effective contributions possible.

## Commit Guidelines
When contributing to a project, it's important to follow the project's commit guidelines.

The Git project has a set of guidelines for writing good commit messages. You can read more about them in the Git source code in the [Documentation/SubmittingPatches](https://git-scm.com/docs/SubmittingPatches/2.35.0) file.

Here are some general guidelines for writing good commit messages:
- Use the imperative mood in the subject line. For example, "Fix bug" instead of "Fixed bug" or "Fixes bug".
- Limit the subject line to 50 characters or less.
- Separate the subject line from the body with a blank line.
- Use the body to explain what and why vs. how.
- Use bullet points or lists to break up the text and make it easier to read.
- Include relevant issue numbers or references in the commit message.
- Keep the commit message focused on a single topic or change.
- Avoid unnecessary punctuation or formatting.

For more information on writing good commit messages, you can refer to the [Git Commit Message Guidelines](https://chris.beams.io/posts/git-commit/) by Chris Beams.

## Private Small Team
The simplest setup you're likely to encounter is a small team of developers working together on a shared repository. In this scenario, all developers have commit access to the shared repository and can push their changes directly to it.

Bob, and Alice are two developers start to work together with a shared repository.

Bob, clones the repository, makes a change, and commit locally.

```bash
# Bob's Machine
git clone https://github.com/john/simplegit.git
cd simplegit
# Bob makes a change to the code on simplegit.rb
git commit -am "Remove invalid default value"
```
Alice, clones the repository, makes a change, and commit locally.

```bash
# Alice's Machine
git clone https://github.com/jessica/simplegit.git
cd simplegit
# Alice makes a change to the code on TODO.md
git commit -am "Add reset task"
```
Alice, pushes her change to the shared repository on the server.

```bash
# Alice's Machine
git push origin main
```
Shortly afterwards, Bob makes some changes, commits them, and tries to push them to the shared repository.

```bash
# Bob's Machine
git push origin main
```
Bob's push is rejected because Alice has already pushed her changes to the shared repository. Bob must fetch Alice's changes and merge them into his local repository before he can push his changes.

```bash
# Bob's Machine
git fetch origin
```
Now Bob can merge Alice's changes into his local repository.

```bash
# Bob's Machine
git merge origin/main
```
After testing Alice's changes, Bob can push his changes to the shared repository.

```bash
# Bob's Machine
git push origin main
```
In the meantime, Alice has created a new topic branch called `issue54` and make three commits to it. She hasn't fetched Bob's changes yet, so her local repository is out of date. She tries to push her changes to the shared repository.

```bash
# Alice's Machine
git push origin issue54
```

Alice's push is rejected because her local repository is out of date. She must fetch Bob's changes and merge them into her local repository before she can push her changes.

```bash
# Alice's Machine
git fetch origin
```
Alice wants to know what changes have been made to the shared repository since she last fetched it. She can use the `git log` command to see a list of commits that have been made to the shared repository.

```bash
# Alice's Machine
git log --no-merges issue54..origin/main
```

`issue54..origin/main` syntax means "show me all the commits that are in `origin/main` but not in `issue54`". The `--no-merges` option tells Git to exclude merge commits from the log.

Now, Alice can merge her topic into the `main` branch:

```bash
# Alice's Machine
git checkout main
git merge issue54
```
Alice will get a - [Distributed Git - Contributing to a Project](#distributed-git---contributing-to-a-project)
- [Distributed Git - Contributing to a Project](#distributed-git---contributing-to-a-project)
  - [Commit Guidelines](#commit-guidelines)
  - [Private Small Team](#private-small-team)
  - [Private Managed Team](#private-managed-team)
  - [Forked Public Project](#forked-public-project)
  - [Public Project over Email](#public-project-over-email)
  - [Learning Resources](#learning-resources)
  - [References](#references)

After that, Alice merges Bob's changes into her local repository.

```bash
# Alice's Machine
git merge origin/main
```
Now `origin/main` is reachable from Jessica’s `main` branch, so she should be able to successfully push (assuming Bob hasn’t pushed even more changes in the meantime):

```bash
# Alice's Machine
git push origin main
```

This is one of the simplest workflows for a small team of developers working on a shared repository. It works well when the team is small and everyone is aware of each other's changes. However, as the team grows, it can become more difficult to manage changes and avoid conflicts. In such cases, it may be beneficial to adopt a more structured workflow, such as the integration-manager or dictator and lieutenants workflow.

## Private Managed Team
Bob and Alice are working together on one feature (feature A), while Alice and a third developer, Josie, are working on a second (feature B). In this case, the company is using a type of integration-manager workflow, where the work of the individual groups is integrated only by the project maintainers, the `main` branch of the main repository can be updated only by the project maintainers. In this scenario, all work is done in team-based branches and pulled together by the integrators later.

Alice works on feature A and makes a commit to her local repository.

```bash
# Alice's Machine
git checkout -b featureA
# Alice makes a change to the code on simplegit.rb
git commit -am "Add limit to log function"
```
After that, Alice pushes her changes to the shared repository.

```bash
# Alice's Machine
git push -u origin featureA
```

Alice email Bob to tell him that she has pushed her changes to the shared repository and that he can look at it now.

While Alice waits for Bob feedback, she starts working on feature B with Josie. They create a new branch called `featureB`, basing it off the server's `main` branch, and make some changes to the code.

```bash
# Alice's Machine
git fetch origin
git checkout -b featureB origin/main
# Alice makes a change to the code on simplegit.rb
git commit -am "Make ls-tree function recursive"

# Alice makes a change to the code on simplegit.rb
git commit -am "Add ls-files"
```
She's ready to push her work, but gets an email from Josie that a branch with some initial "featureB" work on it was already pushed to the server as the `featureBee` branch. Alice needs to merge those changes with her own work before she can push her changes to the shared repository.

```bash
# Alice's Machine on branch featureB
git fetch origin
git merge origin/featureBee
```
At this point, Alice wants to push all of this merged "featureB" work back to the server, but she doesn't want to simply push her own `featureB` branch. Rather she wants to push the merged work to the `featureBee` branch on the server. She can do this by specifying the remote branch name when pushing.

```bash
# Alice's Machine on featureA branch
git push -u origin featureB:featureBee
```
Alice gets email from Bob, who tells her he’s pushed some changes to the `featureA` branch, and asks her to take a look at them. Alice fetches the changes from the shared repository and merges them into her local `featureA` branch.

```bash
# Alice's Machine
git fetch origin
```
Then she displays the log of commits that have been made to the `featureA` branch on the shared repository since she last fetched it.

```bash
# Alice's Machine
git log featureA..origin/featureA
```
She decides to merge Bob's changes into her local `featureA` branch.

```bash
# Alice's Machine
git checkout featureA
git merge origin/featureA
```
Alice might want to make a couple minor changes to all that merged content, so she makes a commit to her local `featureA` branch.

```bash
# Alice's Machine
git commit -am "Add small tweak to merged content"
git push
```

At some point, Alice, Josie, and Bob inform the integrators that the `featureA` and `featureBee` on the server are ready for integration into the mainline. The integrators fetch the changes from the shared repository and merge them into their local `main` branch.

```bash
# Integrator's Machine
git fetch origin
git checkout main
git merge origin/featureA
git merge origin/featureBee
```
The integrators then push the merged changes to the shared repository.

```bash
# Integrator's Machine
git push origin main
```
## Forked Public Project
Contributing to public projects is a bit different. Because you don’t have the permissions to directly update branches in the main repository, you will need to fork the repository and work on your own copy. Once you have made your changes, you can submit a pull request to the main repository for review and merging.

First, you need to clone the public repository, create a topic branch, and do your work there.

```bash
git clone <repository-url> project-name
cd project-name
git checkout -b new-feature
# Do some changes to the code
git commit -am "Add new feature"
```
**Note:** You may want to use `rebase -i` to squash your work down to a single commit before you submit it for review. This will make it easier for the maintainers to review your changes and merge them into the main repository.

**Example of squashing commits:**

```bash
# interactive rebase to squash commits
git rebase -i HEAD~3
```

When your branch work is finished and you’re ready to contribute it back to the maintainers, go to the original project page and click the "**Fork**" button, which will create a copy of the repository under your own GitHub account. Then, push your changes to your forked repository.

```bash
# add repository of your fork as a remote
git remote add fork <fork-url>
# push your changes to your forked repository
git push -u fork new-feature
```

After that you need to notify the maintainers of the original project that you have work you’d like them to merge. This is often called a ***pull request***, and you can create one either via the GitHub web interface or by using the `git request-pull` command.

You can can run the `git request-pull` and email subsequent output to the project maintainer manually.

```bash
# request a pull from the original repository
git request-pull origin/main fork new-feature
```
The output of the `git request-pull` command will include a summary of your changes, along with instructions for the maintainer on how to fetch your changes and merge them into the main repository. You can email The maintainer with this information, or you can create a pull request on the original project’s GitHub page, which will notify the maintainers of your changes.

If you want to submit a second topic of work to the project, based on the project `origin/main` branch, you can create a new branch and make your changes there.

```bash
# create a new branch for the second topic of work
git checkout -b second-topic origin/main
# Do some changes to the code
git commit -am "Add second topic of work"
# push your changes to your forked repository
git push fork second-topic
# create a pull request for the second topic of work
git request-pull origin/main fork second-topic
# Or, email the maintainer with the output of the `git request-pull` command directly
git request-pull origin/main fork second-topic | mail -s "Pull request for second topic of work"
git fetch origin
```
Let’s say the project maintainer has pulled in a bunch of other patches and tried your first branch, but it no longer cleanly merges. In this case, you can rebase your branch on top of the latest `origin/main` branch and resolve any conflicts that arise.

```bash
# rebase your branch on top of the latest origin/main
git checkout new-feature
git rebase origin/main
git push -f fork new-feature
```
Because you rebased the branch, you have to specify the `-f` to your push command in order to be replace the `new-feature` branch on the server with a commit that isn’t a descendant of it. Or, you can push this new work to a different branch on the server.

**Another scenario:** the maintainer has looked at work in your second branch and likes the concept but would like you to change an implementation detail. You’ll also take this opportunity to move the work to be based off the project’s current `main` branch. You start a new branch based on the current `origin/main`, resolve any conflicts, make the implementation change, and then push that as a new branch:

```bash
# create a new branch based on the current origin/main
git checkout -b new-implementation origin/main
git merge --squash second-topic
# resolve any conflicts and make the implementation change
git commit -am "Implement new implementation"
git push fork new-implementation
# create a pull request for the new implementation and email the maintainer with the output of the `git request-pull` command directly
git request-pull origin/main fork new-implementation | mail -s "Pull request for new implementation"
```
The `--squash` option tells Git to combine all the commits from the `second-topic` branch into a single commit on the `new-implementation` branch. This is useful when you want to keep the history of your changes clean and concise.

The `--no-commit` option can be useful to delay the merge commit in case of the default merge strategy. This allows you to make additional changes or resolve conflicts before committing the merge.

At this point, you can notify the maintainer that you have made the requested changes, and they can find those changes in the `new-implementation` branch of your forked repository. The maintainer can then review your changes and merge them into the main repository if they are satisfied with the implementation.

## Public Project over Email
Many projects still use email as the primary means of communication and collaboration. In this case, you will need to send your patches to the project mailing list for review and merging.

The workflow is similar to previous scenarios, but instead of pushing your changes to a remote repository, you will generate a patch file and send it to the mailing list.

```bash
git checkout -b new-topic
# Do some changes to the code
git commit -am "Add new topic of work"
```
Now you can use `git format-patch` to generate a patch file for your changes. This will create a file in the current directory with a `.patch` extension. Applying a patch from an  email generated with this command preserves all the commit information properly.

```bash
git format-patch -M origin/main
```
The `-M` option tells Git to detect renames and generate a patch for the renamed file. The `origin/main` argument tells Git to generate a patch for all commits that are in your current branch but not in the `origin/main` branch.

You can edit these patch files to add more information for the email list, such as a description of the changes, a summary of the work, and any relevant links or references. If you add text between the `---` line at the beginning of the patch file (the `diff --git` line) and the `---` line at the end of the patch file (the `diff --git` line), that text will be included in the email message that is sent to the mailing list, but is ignored by the patch application process.

To email the patch file to the mailing list, you can either paste the contents of the patch file into the email body or send it via a command-line email client. You can use the `git send-email` command to send the patch file directly from the command line.

To use `git send-email`, you will need to configure your email client and set up your email account. You can find more information on how to do this in the [Git documentation](https://git-scm.com/docs/git-send-email).

First, you need to set up the section in your `~/.gitconfig` file. You can do this by running the following command:

```bash
git config --global sendemail.smtpserver smtp.example.com
git config --global sendemail.smtpuser your-email@example.com
```
Or, you can edit the `~/.gitconfig` file directly and add the following section:

```ini
[sendemail]
    smtpserver = smtp.example.com
    smtpuser = your-email@example.com
    smtppass = your-email-password
```
At this point, you can use `git send-email` to send the patch file to the mailing list. You can specify the patch file and the email address of the mailing list as arguments to the command.

```bash
git send-email --to=maintainer@example.com *.patch
```

For help on configuring your system and email, more tips and tricks, and a sandbox to send a trial patch via email, go to [git-send-email.io](https://git-send-email.io/).

## Learning Resources
- [How to Write Better Git Commit Messages](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)
- [Git Fast-Forward VS Non-Fast-Forward](https://leimao.github.io/blog/Git-Fast-Forward-VS-Non-Fast-Forward/)
- [Git Squash Commits](https://www.freecodecamp.org/news/git-squash-commits/)
- [How to Squash Commits in Git](https://medium.com/iosnesia/how-to-squash-commits-in-git-e73a41248211)
## References
- [Contributing to a Project](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project)