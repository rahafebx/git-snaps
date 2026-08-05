# Git on the Server - Generating Your SSH Public Key
Many Git servers use SSH keys to securely authenticate users. Each user in the system must generate their own SSH key pair and add the public key to their Git server account.

**Table of Contents:**
- [Git on the Server - Generating Your SSH Public Key](#git-on-the-server---generating-your-ssh-public-key)
  - [Checking for Existing SSH Keys](#checking-for-existing-ssh-keys)
  - [Generating a New SSH Key Pair](#generating-a-new-ssh-key-pair)
  - [Sending Your Public Key to the Git Server](#sending-your-public-key-to-the-git-server)


## Checking for Existing SSH Keys

Before generating your SSH key, ensure that you have a generated SSH key pair. By default, the SSH key pair is stored in the `~/.ssh` directory on your local machine.

```bash
cd ~/.ssh
ls
```
You're looking for files named `id_rsa` (private key) and `id_rsa.pub` (public key). If these files do not exist, you will need to generate a new SSH key pair.

## Generating a New SSH Key Pair
To generate a new SSH key pair, use the following command in your terminal:

```bash
ssh-keygen -o
```
This command will prompt you to enter a file in which to save the key. You can press Enter to accept the default location (`~/.ssh/id_rsa`). You will also be prompted to enter a passphrase for added security. You can choose to leave it empty, but it is recommended to use a passphrase.

If you do use a password, make sure to add `-o` option to the `ssh-keygen` command to use the new OpenSSH format, which is more secure. This formate is more resistant to brute-force attacks.

You can use the `ssh-agent` to manage your keys and avoid entering the passphrase every time you use the key.

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

## Sending Your Public Key to the Git Server
Once you have generated your SSH key pair, you need to add the public key to your Git server account. The public key is stored in the `id_rsa.pub` file. You can display the contents of this file using the following command:

```bash
cat ~/.ssh/id_rsa.pub
```
This will output your public key, which you can then copy and paste into the appropriate section of your Git server account settings (e.g., GitHub, GitLab, Bitbucket).

For a more detailed guide, see the GitHub documentation on [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

See the [GitHub - Getting Started](github.md) guide for more information on setting up your GitHub account and configuring SSH keys.

## References
- [Generating Your SSH Public Key](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key)