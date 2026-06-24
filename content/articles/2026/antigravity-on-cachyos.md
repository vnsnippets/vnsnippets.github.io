---
author: Vidush H. Namah
title: Antigravity Installation (Without AUR)
slug: antigravity-on-cachyos
date: 2026-06-24
draft: true
description: Guide on setting up Antigravity IDE from tarball on CachyOS.
category: Linux
series: "Arch Linux: Cooking Rice"
tags: 
- Arch Linux
- CachyOS
- Development
- AI
- Antigravity
---

Step-by-step instructions to manually extract, secure, and integrate the Google Antigravity IDE tarball on CachyOS. [1] 
## Step 1: Extract the Archive
Open your terminal and navigate to your Downloads folder to unpack the archive. We will move it to the system's /opt/ directory, which is the standard location for third-party self-contained binaries. [1, 2] 

cd ~/Downloads
# Extract the archive
tar -xzf "Antigravity IDE.tar.gz"
# Move the folder to /opt and rename it to a clean lowercase path
sudo mv "Antigravity IDE" /opt/antigravity

## Step 2: Fix Chromium Sandbox Permissions
Because Antigravity IDE is built on an Electron platform, its internal web rendering layers require strict root-level sandbox permissions to load securely on Arch-based kernels. If you skip this, the app will crash instantly on launch. [2] 

# Change ownership of the sandbox binary to root
sudo chown root:root /opt/antigravity/chrome-sandbox
# Assign SUID execution permissions (4755)
sudo chmod 4755 /opt/antigravity/chrome-sandbox

## Step 3: Symlink to Your System PATH
To make sure you can type antigravity-ide in any terminal window to fire up the editor, create a symbolic link into /usr/local/bin/.

sudo ln -s /opt/antigravity/antigravity /usr/local/bin/antigravity-ide

## Step 4: Create a Desktop App Launcher
To launch the IDE directly from your CachyOS application menu or application dock without keeping a terminal open, create a standard Freedesktop .desktop file. [1, 3] 

sudo nano /usr/share/applications/antigravity-ide.desktop

Paste the following configuration inside the file, then save and exit (Ctrl+O, Enter, Ctrl+X):

[Desktop Entry]
Name=Antigravity IDE
Comment=Google Agentic Development Platform Editor
Exec=/usr/local/bin/antigravity-ide %F
Icon=/opt/antigravity/resources/app/resources/linux/code.png
Type=Application
Terminal=false
Categories=Development;IDE;TextEditor;
MimeType=text/plain;inode/directory;
StartupNotify=true

(Note: If the bundled application icon filename differs in your tarball version, verify the path inside /opt/antigravity/resources/app/resources/linux/ and update the Icon= field accordingly).
## Step 5: Apply the CachyOS Loop Workaround
As mentioned earlier, avoid stuck tasks and memory hanging bugs unique to Arch-based kernels by routing kernel coredumps cleanly.

sudo sysctl -w kernel.core_pattern=/dev/null

To make this setting permanent across system reboots, add it to your sysctl configurations:

echo "kernel.core_pattern=/dev/null" | sudo tee -a /etc/sysctl.d/99-sysctl.conf

------------------------------
## Step 6: Initial Boot & Verification

   1. Open your CachyOS application launcher, search for Antigravity IDE, and click it to open.
   2. Complete the initial walkthrough wizard where you can choose your color palette, keybindings, and setup styles (like Review-driven development).
   3. Click Sign in with Google to fully authenticate your Gemini AI token quota. [4, 5, 6, 7] 

Would you like help mapping your existing VS Code extensions into this new directory, or would you like to build a quick test script to verify that the AI agent engine can execute commands without hanging?

[1] [https://www.antigravity-ide.com](https://www.antigravity-ide.com/blog/antigravity-install-guide.html)
[2] [https://medium.com](https://medium.com/@abusayem65/how-to-install-antigravity-ide-on-ubuntu-256e4ae1fa5c)
[3] [https://discuss.ai.google.dev](https://discuss.ai.google.dev/t/update-linux-installation-documentation-for-antigravity-2-0-tarball-setup/146920)
[4] [https://www.youtube.com](https://www.youtube.com/watch?v=-0Irz8G0PEE)
[5] [https://www.youtube.com](https://www.youtube.com/watch?v=ZFl8IZDCrw4)
[6] [https://www.youtube.com](https://www.youtube.com/watch?v=6X20S460q3Q)
[7] [https://www.secondtalent.com](https://www.secondtalent.com/resources/how-to-download-and-install-googles-antigravity-ide/)
