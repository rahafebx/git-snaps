# Git on the Server

> A remote repository is generally a bare repository — a Git repository that has no working directory.
Because the repository is only used as a collaboration point, there is no reason to have a snapshot checked out on disk; it’s just the Git data. In the simplest terms, a bare repository is the contents of your project’s .git directory and nothing else.

Table of Contents
- [Git on the Server](#git-on-the-server)
  - [The Protocols](#the-protocols)
    - [Local Protocol](#local-protocol)
    - [HTTP Protocol](#http-protocol)
    - [SSH Protocol](#ssh-protocol)
    - [Git Protocol](#git-protocol)
  - [Getting Git on a Server](#getting-git-on-a-server)
    - [Putting the Bare Repository on a Server](#putting-the-bare-repository-on-a-server)
  - [Generating Your SSH Public Key](#generating-your-ssh-public-key)

## The Protocols

Git supports several protocols for communicating with remote repositories:

- **SSH**: The most common protocol for accessing Git repositories over a network. It requires an SSH client to be installed on the client machine.
- **HTTP/HTTPS**: Git can also communicate with remote repositories over HTTP or HTTPS. This is often used for public repositories or when SSH access is not available.
- **Git**: The Git protocol is a custom protocol that is optimized for Git operations. It is typically used for read-only access to public repositories.
- **Local**: Git can also work with local repositories on the same machine. This is useful for testing or when working with multiple repositories on the same system.

### Local Protocol
To clone a local repository, you can use the following command:

```bash
git clone /path/to/repo
```

To add a local repository as a remote, you can use the following command:

```bash
git remote add local_origin /path/to/repo
```

### HTTP Protocol
The URL for a Git repository over HTTP is typically in the following format:

```
http://hostname/path/to/repo.git
```
This URL can be used to view the repository in a web browser or to clone the repository using Git.

### SSH Protocol
The SSH protocol is a secure way to access a Git repository over a network. It requires an SSH client to be installed on the client machine and an SSH server to be running on the server hosting the repository.

To clone a Git repository over SSH, you can use the following command:

```bash
git clone ssh://user@hostname/path/to/repo.git
```
### Git Protocol
The Git protocol is a special protocol that comes with Git. It provides a service similar to the SSH protocol, but with absolutely no authentication or encryption.

To Set up a Git server using the Git protocol, you must create a `git-daemon-export-ok` file in the repository. This file is empty, but its presence indicates that the repository can be accessed via the Git protocol.

To clone a Git repository over the Git protocol, you can use the following command:

```bash
git clone git://hostname/path/to/repo.git
```

## Getting Git on a Server
In order to initially set up any Git server, you have to export an existing repository into a new bare repository. This is done by creating a new directory on the server and running the following command:

```bash
git clone --bare /path/to/existing/repo /path/to/new/bare/repo.git
```

### Putting the Bare Repository on a Server
Once you have created a bare repository, you can put it on a server by copying the repository directory to the server using a tool like `scp` or `rsync`. For example:

```bash
scp -r /path/to/new/bare/repo.git user@hostname:/path/to/server/repo.git
```

Other users can then clone the repository from the server using the appropriate protocol (SSH, HTTP, Git, or local).

```bash
git clone user@hostname:/path/to/server/repo.git
```

Git will automatically add group write permissions to a repository properly configured for collaboration if you run the `git init` command with the `--shared` option. This allows multiple users to push to the same repository without running into permission issues.

```bash
ssh user@hostname
cd /path/to/server/repo.git
git init --bare --shared
```

## Generating Your SSH Public Key
Before you can use SSH to access a Git repository on a server, you need to generate an SSH key pair (public and private keys) on your local machine.

1. Check for existing SSH keys on your local machine by running the following command:

```bash
ls -al ~/.ssh
```
You're looking for files named `id_rsa` and `id_rsa.pub`. If they exist, you can use them. If not, you need to generate a new key pair.

2. To generate a new SSH key pair, run the following command:

```bash
$ ssh-keygen -o
Generating public/private rsa key pair.
# confirm the location of the key and enter a passphrase if desired
Enter file in which to save the key (/home/schacon/.ssh/id_rsa):
Created directory '/home/schacon/.ssh'.
# ask twice for the passphrase to ensure it is entered correctly
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/schacon/.ssh/id_rsa.
Your public key has been saved in /home/schacon/.ssh/id_rsa.pub.
The key fingerprint is:
d0:82:24:8e:d7:f1:bb:9b:33:53:96:93:49:da:9b:e3 schacon@mylaptop.local
```
3. Once you have generated your SSH key pair, you need to add your public key to the server's authorized keys file. You can do this by copying the contents of your public key file (`id_rsa.pub`) to the `~/.ssh/authorized_keys` file on the server.

For a more in-depth tutorial on creating an SSH key on multiple operating systems, see the GitHub documentation on [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).