# Git on the Server - Setting Up the Server
Quick guide to setting up SSH access on the server side.

**Table of Contents:**
- [Git on the Server - Setting Up the Server](#git-on-the-server---setting-up-the-server)
  - [Create a user account on the server](#create-a-user-account-on-the-server)
  - [Add public key to the server](#add-public-key-to-the-server)
  - [Setup your repository on the server](#setup-your-repository-on-the-server)
  - [Setup permissions](#setup-permissions)


What we describe here can be automated by using`ssh-copy-id` command, which copies your public key to the server and sets up the necessary permissions. However, we will go through the manual steps to understand what is happening behind the scenes.

## Create a user account on the server

First you need to create a user account on the server that you will use to log in via SSH. You can do this by running the following command on the server:

```bash
sudo adduser git
su git
cd
mkdir .ssh && chmod 700 .ssh
touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys
```

Explanation of the commands:
- `sudo adduser git`: Creates a new user account named "git".
- `su git`: Switches to the newly created user account.
- `cd`: Changes the current directory to the home directory of the user.
- `mkdir .ssh && chmod 700 .ssh`: Creates a `.ssh` directory in the user's home directory and sets the permissions to `700`, which means only the user can read, write, and execute files in this directory.
- `touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys`: Creates an empty `authorized_keys` file in the `.ssh` directory and sets the permissions to `600`, which means only the user can read and write to this file.

## Add public key to the server
After creating the user account and setting up the `.ssh` directory, you need to add developer SSH public keys to the `authorized_keys` file. You can do this by copying the contents of the developer's public key file (usually named `id_rsa.pub`) and pasting it into the `authorized_keys` file on the server.

Let's say you have a developer's public key in a file named `id_rsa.john.pub` on `tmp` directory. You can copy the contents of this file and paste it into the `authorized_keys` file on the server using the following command:

```bash
cat /tmp/id_rsa.john.pub >> ~/.ssh/authorized_keys
```
And then do the same for other developers' public keys.

## Setup your repository on the server
Once you have set up the user account and added the public keys, you can create a new Git repository on the server. You can do this by running the following commands:

```bash
cd ~
mkdir myproject.git && cd myproject.git
git init --bare
```

Then, John and other developers can add the remote repository to their local Git repositories using the following command:

```bash
# on John's local machine
cd myproject
git init
git add .
git commit -m "Initial commit"
git remote add origin git@your-server-ip:myproject.git
git push -u origin master
```

Other developer may clone the repository using the following command:

```bash
# on other developer's local machine
git clone git@your-server-ip:myproject.git
cd myproject
# Do some work and commit changes
git add .
git commit -m "Some changes"
git push origin main
```

With this setup, developers can securely access the Git repository on the server using their SSH keys, and they can push and pull changes to and from the repository as needed. Which means that you have a read/write Git server up and running, and developers can collaborate on the project using Git over SSH.

## Setup permissions
Currently all these users can log into the server and get a shell as the `git` user. If you want to restrict that, you will have to change the shell to something else in the `/etc/passwd` file. For example, you can change the shell to `/usr/bin/git-shell`, which is a restricted shell that only allows Git commands. You can do this by running the following command on the server:

```bash
sudo chsh -s /usr/bin/git-shell git
```
Explanation of the command:
- `sudo chsh -s /usr/bin/git-shell git`: Changes the login shell for the `git` user to `/usr/bin/git-shell`, which is a restricted shell that only allows Git commands. This prevents users from executing arbitrary commands on the server and limits their access to Git-related activities.

You can easily restrict the `git` user to only Git-related activities with a limited shell tool called `git-shell`. This shell is designed to allow users to execute Git commands without giving them full shell access. By changing the shell for the `git` user to `git-shell`, you can ensure that users can only perform Git operations and cannot execute arbitrary commands on the server.

To use `git-shell`, you need to make sure that it is installed on your server. You can check if it is installed by running the following command:

```bash
cat /etc/shells
which git-shell
sudo -e /etc/shells
```

Explanation of the commands:
- `cat /etc/shells`: This command displays the contents of the `/etc/shells` file, which lists all the valid login shells on the system. You can check if `git-shell` is listed in this file.
- `which git-shell`: This command checks if the `git-shell` executable is available in the system's PATH. If it is installed, this command will return the path to the `git-shell` executable.
- `sudo -e /etc/shells`: This command opens the `/etc/shells` file in an editor with superuser privileges, allowing you to add `git-shell` to the list of valid login shells if it is not already present.

Now you can edit the shell for a user using `chsh` command.

```bash
sudo chsh -s $(which git-shell)
```

Explanation of the command:
- `sudo chsh -s $(which git-shell)`: This command changes the login shell for the current user to `git-shell`. The `$(which git-shell)` part dynamically finds the path to the `git-shell` executable and sets it as the new shell for the user. This ensures that the user can only execute Git commands and cannot access a full shell environment on the server.

Now, the `git` user can still use the SSH connection to push and pull from the repository, but they will not have access to a full shell environment. This helps to improve security by limiting the actions that users can perform on the server.

Until now, users are still able to use SSH port forwarding to access the server. If you want to disable port forwarding, you can do so by adding the following line to the `~/.ssh/authorized_keys` file for each user:

```bash
no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty
```

Explanation of the line:
- `no-port-forwarding`: Disables port forwarding for the user, preventing them from creating tunnels to other services on the server.
- `no-X11-forwarding`: Disables X11 forwarding, preventing the user from running graphical applications on the server and displaying them on their local machine.
- `no-agent-forwarding`: Disables agent forwarding, preventing the user from using their SSH agent to authenticate to other servers through the server they are connected to.
- `no-pty`: Disables pseudo-terminal allocation, preventing the user from obtaining an interactive shell session on the server. This further restricts their access and limits their ability to execute commands.

Now Git network commands will still work just fine but the users won't be able to get a shell.