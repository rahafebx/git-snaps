# GitHub - Getting Started
GitHub is a web-based platform for version control and collaboration that allows developers to host and review code, manage projects, and build software together. It uses Git, a distributed version control system, to track changes in source code during software development.

**Table of Contents:**
- [GitHub - Getting Started](#github---getting-started)
  - [Account Creation and Setup](#account-creation-and-setup)
  - [SSH Key Generation and Configuration](#ssh-key-generation-and-configuration)
  - [Public Profile](#public-profile)
  - [Email Addresses](#email-addresses)
  - [Two Factor Authentication](#two-factor-authentication)


## Account Creation and Setup
You need to setup a free user account by simply visit [github.com](https://github.com).

Github provides almost all of its functionality for free , except some advanced features. GitHub's paid plans include advanced tools and features, visit [GitHub Pricing](https://github.com/pricing).

## SSH Key Generation and Configuration
To securely connect to GitHub, you can generate an SSH key pair and add the public key to your GitHub account. This allows you to authenticate without entering your username and password every time you interact with GitHub.

**Example of generating an SSH key pair using the command line for windows users:**

**Check for Existing SSH Keys:**

Before generating a new key, see if you already have one:

1. Open **Git Bash**.
2. Enter ```ls -al ~/.ssh``` to see if existing SSH keys are present.
3. Look for an existing public key. GitHub accepts these filenames by default:
    - `id_rsa.pub`
    - `id_ecdsa.pub`
    - `id_ed25519.pub`

4. If you find one, you can use it—otherwise, generate a new key.

**Generate a New SSH Key:**

1. Open **Git Bash**.
2. Run the following, replacing the email with your GitHub email:
    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```
3. When prompted for a file location, press Enter to accept the default.

4. When prompted, enter a secure passphrase (or press Enter for no passphrase):

    ```bash
    > Enter passphrase (empty for no passphrase): [Type passphrase]
    > Enter same passphrase again: [Type passphrase again]
    ```
**Add Your SSH Key to the ssh-agent:**

1. In an **administrator PowerShell** window, ensure the ssh-agent is running: 

    ```bash
    # start the ssh-agent in the background
    Get-Service -Name ssh-agent | Set-Service -StartupType Manual
    Start-Service ssh-agent
    ```

2. In a **regular terminal** (non-elevated), add your private key:

    ```bash
    ssh-add c:/Users/YOU/.ssh/id_ed25519
    ```

3. Add the SSH public key to your account on GitHub.

**Add the SSH Key to Your GitHub Account:**

1. Copy your public key to the clipboard: In a new admin elevated PowerShell window

    ```ps
    $ cat ~/.ssh/id_ed25519.pub | clip
    # Copies the contents of the id_ed25519.pub file to your clipboard
    ```
2. On **GitHub**, go to **Settings → SSH and GPG keys**.

3. Click **New SSH key**.

4. Give it a descriptive Title (e.g., "Personal Laptop").

5. Select the key type (authentication or signing).

6. Paste your public key into the Key field.

7. Click **Add SSH key**.

**Testing your SSH connection:**

After you've set up your SSH key and added it to GitHub, you can test your connection.

1. Open Git Bash.

2. Enter the following:

    ```bash
    ssh -T git@github.com
    # Attempts to ssh to GitHub
    ```
3. If prompted, verify the fingerprint matches GitHub's public key fingerprint, then type `yes`. You should see:

    ```bash
    > Hi USERNAME! You've successfully authenticated, but GitHub does not
    > provide shell access.
    ```

4. Verify that the resulting message contains your username.

For more information, you can refer to the official GitHub documentation on [connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

## Public Profile
You can customize your public profile on GitHub to showcase your work, contributions, and personal information. This can help you build a professional presence in the developer community.

1. Go to your GitHub profile by clicking on your avatar in the top right corner and selecting "settings".
2. In the left sidebar, click on "Public Profile".
3. Fill in your profile information, including:
   - Avatar (profile picture)
   - Name
   - Bio
   - Location
   - Website URL
   - Social media links (optional)
   - Company (if applicable)
4. Click "Update profile" to save your changes.

## Email Addresses
You can manage your email addresses in your GitHub settings. These emails will be used for notifications and other communications from GitHub.

1. Go to your GitHub profile by clicking on your avatar in the top right corner and selecting "settings".
2. In the left sidebar, click on "Emails".
3. Here you can:
   - Add a new email address.
   - Verify your email addresses by clicking the verification link sent to your email.
   - Set a primary email address for notifications.
   - Remove any email addresses you no longer want associated with your account.

## Two Factor Authentication
It's important to enable two-factor authentication (2FA) for added security on your GitHub account. This requires you to provide a second form of verification (like a code from your phone) in addition to your password when logging in.

1. Go to your GitHub profile by clicking on your avatar in the top right corner and selecting "settings".
2. In the left sidebar, click on "Password and authentication".
3. Under "Two-factor authentication", add a new method (like an authenticator app or SMS).
4. Follow the prompts to complete the setup. You may be asked to scan a QR code with your authenticator app or enter a code sent via SMS.

If you setup multiple methods, you can choose which one to use when logging in. Make sure to keep backup codes in a safe place in case you lose access to your primary 2FA method.

## Learning Resources
- [Setting up your profile](https://docs.github.com/en/get-started/start-your-journey/setting-up-your-profile)

## References
- [Account Setup and Configuration](https://git-scm.com/book/en/v2/GitHub-Account-Setup-and-Configuration)