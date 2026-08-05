# Git on the Server - Quick Overview
In order to do any collaboration in Git, you’ll need to have a remote Git repository. The preferred method for collaborating with someone is to set up an intermediate repository that you both have access to, and push to and pull from that.

**Table of Contents:**
- [Git on the Server - Quick Overview](#git-on-the-server---quick-overview)
  - [The Remote Repository](#the-remote-repository)
  - [The Protocols](#the-protocols)
    - [Local Protocol](#local-protocol)
    - [HTTP Protocol](#http-protocol)
      - [Smart HTTP](#smart-http)
      - [Dumb HTTP](#dumb-http)
    - [SSH Protocol](#ssh-protocol)
    - [Git Protocol](#git-protocol)

## The Remote Repository

A remote repository is generally a bare repository — a Git repository that has no working directory.
Because the repository is only used as a collaboration point, there is no reason to have a snapshot checked out on disk; it’s just the Git data. In the simplest terms, a bare repository is the contents of your project’s .git directory and nothing else.

## The Protocols

Git supports several protocols for communicating with remote repositories:

- **Local**: Git can work with local repositories on the same machine. This is useful for testing or when working with multiple repositories on the same system.
- **HTTP/HTTPS**: Git can also communicate with remote repositories over HTTP or HTTPS. This is often used for public repositories or when SSH access is not available.
- **SSH**: The most common protocol for accessing Git repositories over a network. It requires an SSH client to be installed on the client machine.
- **Git**: The Git protocol is a custom protocol that is optimized for Git operations. It is typically used for read-only access to public repositories.

### Local Protocol

To create a local bare repository for a project, you can use the following command:

```bash
mkdir <directory>
cd <directory>
git init --bare repo.git
```

To clone a local repository, you can use the following command:

```bash
git clone /path/to/repo.git new_repo
```

To add a local repository as a remote, you can use the following command:

```bash
git remote add local_origin /path/to/repo.git
```

**The Pros:**
- Simple to set up and use
- No network configuration required
- No additional software required on the client side

**The Cons:**
- Only works on the same machine
- Not suitable for collaboration with remote users
- No authentication or access control

### HTTP Protocol
Git can communicate over HTTP using two different modes: smart HTTP and dumb HTTP. 
- **Smart HTTP** is the preferred mode, as it provides better performance and supports authentication. 
- **Dumb HTTP** is a legacy mode that is less efficient and does not support authentication.

#### Smart HTTP
Operates very similarly to the SSH protocol, but run over standard HTTPS ports. Therefore, it can use various HTTP authentication methods, such as Basic Authentication or OAuth. Smart HTTP is the preferred method for accessing Git repositories over HTTP.

In A service like GitHub, you can use the following command to clone a repository over HTTPS:

```bash
git clone https://github.com/username/repository.git
```
The URL can be used also to view the repository in a web browser.

#### Dumb HTTP
Dumb HTTP is a legacy mode that is less efficient and does not support authentication. It is not recommended for use, but it may be necessary in some cases where smart HTTP is not available. If the server does not support smart HTTP, the Git client will try to use dumb HTTP as a fallback. However, this mode is not recommended for use, as it is less efficient and does not support authentication.

The Dumb HTTP is simple to use and setup. Basically, all you have to do is put a bare Git repository under your HTTP document root and setup a specific `post-update` hook.

```bash
# create a bare repository
mkdir /var/www/git/repo.git
cd /var/www/git/repo.git
git init --bare
```

At this point, anyone who can access your web server can clone the repository using the following command:

```bash
git clone http://yourserver.com/git/repo.git gitproject.git
cd gitproject.git
mv hooks/post-update.sample hooks/post-update
chmod a+x hooks/post-update
```
The `post-update` hook is a script that is executed after a successful push to the repository. It updates the server's view of the repository and allows clients to fetch the latest changes.

The `post-update` hook comes with Git by default runs the appropriate command `git update-server-info` to make HTTP fetching and cloning work.

**The Smart HTTP pros:**
- Have a single URL for both web and Git access
- Can use various HTTPS authentication methods
- You can serve a read-only repository over HTTPS, which means you can encrypt the traffic between the client and server, and you can use HTTPS authentication methods to control access to the repository.
- Firewall friendly, as it uses standard HTTPS ports (443) and can work through most firewalls and proxies.

**The Smart HTTP cons:**
- Requires a web server to be set up and configured
- More complex to set up and maintain than the local protocol

### SSH Protocol
The SSH protocol is a secure way to access a Git repository over a network. It requires an SSH client to be installed on the client machine and an SSH server to be running on the server hosting the repository.

To clone a Git repository over SSH, you can use the following command:

```bash
git clone ssh://user@hostname/path/to/repo.git
```

Or you can use the shorthand syntax:

```bash
git clone user@hostname:path/to/repo.git
```

**The pros:**
- Secure, as it uses encryption to protect the data being transmitted
- Supports authentication, allowing you to control access to the repository

**The cons:**
- Requires an SSH client to be installed on the client machine
- More complex to set up and maintain than the local protocol

### Git Protocol
The Git protocol is a special protocol that comes with Git. It provides a service similar to the SSH protocol, but with absolutely no authentication or encryption.

To Set up a Git server using the Git protocol, you must create a `git-daemon-export-ok` file in the repository. This file is empty, but its presence indicates that the repository can be accessed via the Git protocol.

To clone a Git repository over the Git protocol, you can use the following command:

```bash
git clone git://hostname/path/to/repo.git
```

**The pros:**
- Fast, as it is optimized for Git operations
- Simple to set up and use

**The cons:**
- No authentication or encryption
- Not suitable for collaboration with remote users

## References
- [The Protocols](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols)