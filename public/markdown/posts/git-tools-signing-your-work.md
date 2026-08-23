# Git Tools - Signing Your Work
If you want to ensure the authenticity of your commits, you can sign them using GPG (GNU Privacy Guard). This adds a layer of security and trust to your work.

**Table of Contents:**
- [Git Tools - Signing Your Work](#git-tools---signing-your-work)
  - [GPG Installation](#gpg-installation)
  - [Generating a GPG Key](#generating-a-gpg-key)
  - [Extract Your Key ID \& Configure Git](#extract-your-key-id--configure-git)
  - [Add Your Public Key to GitHub](#add-your-public-key-to-github)
  - [Sign your Work](#sign-your-work)
    - [Sign Commits](#sign-commits)
    - [Sign Tags](#sign-tags)
  - [Verify Local Signatures](#verify-local-signatures)
  - [Conclusion](#conclusion)


## GPG Installation
First, you need to install GPG on your system:
- macOS: `brew install gnupg`
- Windows: Download and install Gpg4win from [https://gpg4win.org/](https://gpg4win.org/)
- Linux: Use your package manager, e.g., `sudo apt-get install gnupg` for Debian-based systems.

## Generating a GPG Key
To generate a new GPG key.
1. Run the following command in your terminal:

```bash
gpg --full-generate-key
```
2. Select **RSA** and RSA is the default option.
3. Choose a key size (**2048** or **4096** bits is recommended).
4. Set an expiration date for your key (optional). You can press `Enter` for no expiration.
5. Enter your **real name** and **email address**. Make sure to use the same email address associated with your Git commits.
6. Set a passphrase for your key to protect it. This will lock your private key and require the passphrase whenever you sign a commit.

## Extract Your Key ID & Configure Git
1. List your GPG keys to find your key ID:

```bash
gpg --list-secret-keys --keyid-format=long
```
2. Locate the line starting with `sec` and copy the long string after `/`. This is your GPG key ID.

```bash
sec   rsa4096/XXXXXXXXXXXXXXXX 2024-06-01 [SC] [expires: 2025-06-01]
```
The key ID in this example is `XXXXXXXXXXXXXXXX`.

3. Inform Git about your GPG key by running:

```bash
git config --global user.signingkey XXXXXXXXXXXXX
```

4. Tell Git to locate your local GPG program path automatically:

```bash
git config --global gpg.program $(which gpg)
```

## Add Your Public Key to GitHub
1. Export your public key:

```bash
gpg --armor --export XXXXXXXXXXXXX
```
2. Copy the output of the command. The text block will look like this:

```bash
-----BEGIN PGP PUBLIC KEY BLOCK-----
...
-----END PGP PUBLIC KEY BLOCK-----
```
You should copy everything between and including the `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----` lines.

3. Go to your GitHub account settings, navigate to **SSH and GPG keys**, and click **New GPG key**.
4. Paste your public key into the provided field and click **Add GPG key**.
5. You may be prompted to enter your GitHub password to confirm the addition of the key.
6. Once added, GitHub will automatically verify your signed commits.

## Sign your Work

### Sign Commits
To sign your commits, you can use the `-S` flag when committing:

```bash
git commit -S -m "Your commit message"
```
You can force all future commits to be signed by default by running:

```bash
git config --global commit.gpgsign true
```

To verify the signature of a commit, you can use:

```bash
git log --show-signature
git log --pretty="format:%h %G? %s"  
# This will show the commit hash, signature status, and commit message
```

In Git 1.8.3 and later, `git merge` anf `git pull` can be told to inspect and reject unsigned commits by using the `--verify-signatures` option. This is useful for ensuring that all commits in a branch are signed.

```bash
git merge --verify-signatures <branch-name>
```
You can use `-S` option with `git merge` to sign the merge commit:

```bash
git merge -S <branch-name>
```

### Sign Tags
You can also sign tags in Git. To create a signed tag, use the `-s` option:

```bash
git tag -s v1.0.0 -m "Release version 1.0.0"
```

If you run `git show` on a signed tag, you will see the signature information.

To verify the signature of a tag, you can use:

```bash
git tag -v v1.0.0
```
This will display the signature information and confirm whether the tag is valid.

## Verify Local Signatures
To verify the signature of a commit, you can use the following command:

```bash
git log --show-signature
```
Your commits will display metadata outlining whether a valid GPG signature was detected locally. When pushed to your remote engine, a green "**Verified**" badge will now show next to your commit username.

## Conclusion
Signing tags and commits is great, but if you decide to use this in your normal workflow, you will have to make sure that everyone on your team is also signing their work. Otherwise, you will have to deal with unsigned commits and tags in your repository.

You can ask everyone to run `git config --local commit.gpgsign true` to sign their commits by default. This will help maintain the integrity and authenticity of your codebase.