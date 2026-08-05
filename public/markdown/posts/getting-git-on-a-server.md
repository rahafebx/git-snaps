# Git on the Server - Getting Git on a Server

Command and steps needed to do basic installation of Git on a Linux-based server. It's also possible to run these services on macOS or Windows servers.

**Table of Contents:**
- [Git on the Server - Getting Git on a Server](#git-on-the-server---getting-git-on-a-server)
  - [Putting the Bare Repository on a Server](#putting-the-bare-repository-on-a-server)
  - [Small Setups](#small-setups)
    - [SSH Access](#ssh-access)


To initially setup any Git server, you have to export an existing repository into a new bare repository.

To clone repository to create a new bare repository, you can use the following command:

```bash
git clone --bare my_project my_project.git
```
You should now have a copy of the Git directory data in your `my_project.git` directory.

## Putting the Bare Repository on a Server
Put the bare repository on a server. You can use `scp` to copy the repository to the server under the `/path/to/repositories/` directory.

```bash
scp -r my_project.git user@server:/path/to/repositories/
```
At this point, other users who have SSH-base read access to the `/path/to/repositories/` directory can clone the repository using the following command:

```bash
git clone user@server:/path/to/repositories/my_project.git
```
Users with write access can push changes to the repository.

If you run the following command, Git will automatically add group write permissions to the repository, allowing other users to push changes to the repository.

```bash
ssh user@server
cd /path/to/repositories/my_project.git
git init --bare --shared
```

## Small Setups
One of the most complicated aspects of setting up a git server is user management. If you want some repositories to be read-only for certain users, and read/write for others, you will need to set up a more complex user management system.

### SSH Access
If all developers have SSH access to the server, you can use the `authorized_keys` file to control access. You can create a new user on the server for each developer and add their public SSH keys to the `~/.ssh/authorized_keys` file of that user.

## References
- [Getting Git on a Server](https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server)