# Distributed Git - Contributing to a Project

Table of Contents:
- [Distributed Git - Contributing to a Project](#distributed-git---contributing-to-a-project)
  - [Commit Guidelines](#commit-guidelines)
  - [Private Small Team](#private-small-team)
  - [Private Managed Team](#private-managed-team)
  - [Forked Public Project](#forked-public-project)


Some of the project variables that you may want to consider when contributing to a project include:
- **Active contributors**: How many people are actively contributing to the project? A project with many active contributors is more likely to be well-maintained and responsive to issues.
- **Project workflow**: What is the project's workflow? Is it centralized, integration-manager, or dictator and lieutenants? Understanding the workflow will help you know how to contribute effectively.
- **Commit access**: Do you have commit access to the project? If not, you may need to fork the repository and submit pull requests for your changes.

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
John, and Jessica are two developers start to work together with a shared repository.

John, clones the repository, makes a change, and commit locally.

```bash
# John's Machine
git clone https://github.com/john/simplegit.git
cd simplegit
# John makes a change to the code on simplegit.rb
git commit -am "Remove invalid default value"
```
Jessica, clones the repository, makes a change, and commit locally.

```bash
# Jessica's Machine
git clone https://github.com/jessica/simplegit.git
cd simplegit
# Jessica makes a change to the code on TODO.md
git commit -am "Add reset task"
```
Jessica, pushes her change to the shared repository.

```bash
# Jessica's Machine
git push origin main
```
Shortly afterwards, John makes some changes, commits them, ant tries to push them to the shared repository.

```bash
# John's Machine
git push origin main
```
John's push is rejected because Jessica has already pushed her changes to the shared repository. John must fetch Jessica's changes and merge them into his local repository before he can push his changes.

```bash
# John's Machine
git fetch origin
```
Now John can merge Jessica's changes into his local repository.

```bash
# John's Machine
git merge origin/main
```

John can now push his changes to the shared repository.

```bash
# John's Machine
git push origin main
```
In the meantime, Jessica has created a new topic branch called `issue54` and make three commits to it. She hasn't fetched John's changes yet, so her local repository is out of date. She tries to push her changes to the shared repository.

```bash
# Jessica's Machine
git push origin issue54
```

Jessica's push is rejected because her local repository is out of date. She must fetch John's changes and merge them into her local repository before she can push her changes.

```bash
# Jessica's Machine
git fetch origin
```
Jessica wants to know what changes have been made to the shared repository since she last fetched it. She can use the `git log` command to see a list of commits that have been made to the shared repository.

```bash
# Jessica's Machine
git log --no-merges issue54..origin/main
```

`issue54..origin/main` syntax means "show me all the commits that are in `origin/main` but not in `issue54`". The `--no-merges` option tells Git to exclude merge commits from the log.

Now, Jessica can merge her topic into the `main` branch:

```bash
# Jessica's Machine
git checkout main
git merge issue54
```
After that, Jessica merges John's changes into her local repository.

```bash
# Jessica's Machine
git merge origin/main
```
Now `origin/main` is reachable from Jessica’s `main` branch, so she should be able to successfully push (assuming John hasn’t pushed even more changes in the meantime):

```bash
# Jessica's Machine
git push origin main
```

This is one of the simplest workflows for a small team of developers working on a shared repository. It works well when the team is small and everyone is aware of each other's changes. However, as the team grows, it can become more difficult to manage changes and avoid conflicts. In such cases, it may be beneficial to adopt a more structured workflow, such as the integration-manager or dictator and lieutenants workflow.

## Private Managed Team
John and Jessica are working together on one feature (feature A), while Jessica and a third developer, Josie, are working on a second (feature B). In this case, the company is using a type of integration-manager workflow, where the work of the individual groups is integrated only by the project maintainers, the `main` branch of the main rep can be updated only by the project maintainers. In this scenario, all work is done in team-based branches and pulled together by the integrators later.

Jessica works on feature A and makes a commit to her local repository.

```bash
# Jessica's Machine
git checkout -b featureA
# Jessica makes a change to the code on simplegit.rb
git commit -am "Add limit to log function"
```
After that, Jessica pushes her changes to the shared repository.

```bash
# Jessica's Machine
git push -u origin featureA
```

Jessica email John to tell him that she has pushed her changes to the shared repository and that he can look at it now.

While Jessica waits for John feedback, she starts working on feature B with Josie. They create a new branch called `featureB`, basing it off the server's `main` branch, and make some changes to the code.

```bash
# Jessica's Machine
git fetch origin
git checkout -b featureB origin/main
# Jessica makes a change to the code on simplegit.rb
git commit -am "Make ls-tree function recursive"

# Jessica makes a change to the code on simplegit.rb
git commit -am "Add ls-files"
```
She's ready to push her work, but gets an email from Josie that a branch with some initial "featureB" work on it was already pushed to the server as the `featureBee` branch. Jessica needs to merge those changes with her own work before she can push her changes to the shared repository.

```bash
# Jessica's Machine on branch featureB
git fetch origin
git merge origin/featureBee
```
At this point, Jessica wants to push all of this merged "featureB" work back to the server, but she doesn't want to simply push her own `featureB` branch. Rather she wants to push the merged work to the `featureBee` branch on the server. She can do this by specifying the remote branch name when pushing.

```bash
# Jessica's Machine on featureA branch
git push -u origin featureB:featureBee
```
Jessica gets email from John, who tells her he’s pushed some changes to the `featureA` branch, and asks her to take a look at them. Jessica fetches the changes from the shared repository and merges them into her local `featureA` branch.

```bash
# Jessica's Machine
git fetch origin
```
Then she displays the log of commits that have been made to the `featureA` branch on the shared repository since she last fetched it.

```bash
# Jessica's Machine
git log featureA..origin/featureA
```
She decides to merge John's changes into her local `featureA` branch.

```bash
# Jessica's Machine
git checkout featureA
git merge origin/featureA
```
Jessica might want to make a couple minor changes to all that merged content, so she makes a commit to her local `featureA` branch.

```bash
# Jessica's Machine
git commit -am "Add small tweak to merged content"
git push
```

At some point, Jessica, Josie, and John inform the integrators that the `featureA` and `featureBee` on the server are ready for integration into the mainline. The integrators fetch the changes from the shared repository and merge them into their local `main` branch.

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

First, you need to clone the public repository.

```bash
git clone <repository-url> project-name
cd project-name
git checkout -b new-feature
# Do some changes to the code
git commit -am "Add new feature"
```
When your branch work is finished and you’re ready to contribute it back to the maintainers, go to the original project page and click the “Fork” button, which will create a copy of the repository under your own GitHub account. Then, push your changes to your forked repository.

```bash
# add repository of your fork as a remote
git remote add fork <fork-url>
# push your changes to your forked repository
git push -u fork new-feature
```
After that you need to notify the maintainers of the original project that you have work you’d like them to merge.

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
git push -u fork second-topic
# create a pull request for the second topic of work
git request-pull origin/main fork second-topic
# Or, email the maintainer with the output of the `git request-pull` command directly
git request-pull origin/main fork second-topic | mail -s "Pull request for second topic of work"
git fetch origin
```
Let’s say the project maintainer has pulled in a bunch of other patches and tried your first branch, but it no longer cleanly merges. You can rebase your branch on top of the latest `origin/main` branch and resolve any conflicts that arise.

```bash
# rebase your branch on top of the latest origin/main
git checkout new-feature
git rebase origin/main
git push -f fork new-feature
```
Because you rebased the branch, you have to specify the `-f` to your push command in order to be replace the `new-feature` branch on the server with a commit that isn’t a descendant of it. Or, you can push this new work to a different branch on the server.

Another scenario: the maintainer has looked at work in your second branch and likes the concept but would like you to change an implementation detail. You’ll also take this opportunity to move the work to be based off the project’s current `main` branch. You start a new branch based on the current `origin/main`, resolve any conflicts, make the implementation change, and then push that as a new branch:

```bash
# create a new branch based on the current origin/main
git checkout -b new-implementation origin/main
git merge --squash second-topic
# resolve any conflicts and make the implementation change
git commit -am "Implement new implementation"
git push -u fork new-implementation
# create a pull request for the new implementation and email the maintainer with the output of the `git request-pull` command directly
git request-pull origin/main fork new-implementation | mail -s "Pull request for new implementation"
```
The `--squash` option tells Git to combine all the commits from the `second-topic` branch into a single commit on the `new-implementation` branch. This is useful when you want to keep the history of your changes clean and concise.
