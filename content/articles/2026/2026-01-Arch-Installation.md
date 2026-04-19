---

author: Vidush H. Namah
title: Dual Boot Arch and Windows
slug: dual-boot-arch-and-windows
date: 2026-04-19
draft: false
description: Walk through my journey in shifting to Arch Linux and cooking some rice - starting with dual booting Arch and Windows.
category: Linux
series: "Arch Linux: Cooking Rice"
tags: 
- Arch Linux
- Windows 11
- Open Source
- Tutorial

---

#### The Existential Crisis of Choice


As I’ve mentioned in previous meetups, everyone eventually wants to jump to the latest tech. For me, that meant finally setting up a clean, high-performance dual-boot environment on my Ryzen 7 Pro laptop. The goal? Keep Windows 11 for the "corporate" side of life and Arch Linux for that sweet, minimalist Hyprland workflow.

Setting this up can feel like a bit of an existential crisis if you aren't prepared. But don't worry—I've spent the last 24 hours (starting April 18th!) iron-ing out the kinks so you don't have to. **To put it simply, we’re going to use the `archinstall` script, but with a manual partitioning "hack" to keep everything safe.**

#### Let's Get Cooking

This project requires a bit of preparation before we start "pushing pixels" in our new Linux environment.

##### Ingredients

| Requirement | Details | Reference |
| ------ | ------ | ------ |
| USB Drive | 8GB or higher | |
| Free Space | ~129GB (Unallocated) | |
| Rufus | ISO Flashing Utility | |
| Arch Linux ISO | Latest Release | |
| Patience | Highly Recommended | - |

#### Phase 1: Prepping the Kitchen (Windows)

Before we touch Linux, we have to make sure Windows is tucked in safely and remains unaffected. 

1. **Backup and Restore:**   
   Create a System Restore point so you can revert if things get messy.

2. **BitLocker:**   
   For Professional and Enterprise users, **disable BitLocker**.   
   It's a great feature, but it’s like a locked door that Linux doesn’t have the key for.

3. **The Hibernation Trap:** This is a big one.   
   Disable Fast Startup and Hibernation to prevent Windows from locking your drive in a "hibernated" state, which can lead to **data loss or filesystem corruption** when Linux tries to touch it. Run this command as admin:

   ```bash
   powercfg /H off
   ```

4. **Shrink the Drive:**   
   Use Disk Management to shrink your main volume (if needed).   
   I went for about **129GB** (132,096MB) of unallocated space.

   > You will need 1 GB for an EFI partition and the rest (128GB in my case) for your Linux system.

#### Phase 2: Manual Partitioning (The Secret Sauce)

Flash your USB with Rufus (ensure it's set to **GPT/UEFI** mode) and boot into the live environment. Once you’ve connected to the internet, it’s time for some manual labor.

**Connecting to WiFi**   
Run the following commands (see comments to see what they do).

```bash
# Logs you into the IWD shell
# Think of this as a sub-shell dedicated to your WiFi card.
iwctl

# Identify your WiFi hardware
device list

# Most often, your device name will be wlan0
# Use your WiFi to find networks
station wlan0 get-networks

# Connect to your network
station wlan0 connect Your_Network_Name

# And it should ask for your password.
# Et voila.
```

**Partitioning**   
Instead of letting the script guess, use `cfdisk` to set your own boundaries.   

Here is what I configured for myself:
- **Windows EFI:** Keep it as is (and any other Microsoft/Windows related partitions).

- **(New) Shared Storage:** 312GB (Type: Microsoft Basic Data)   
  I plan to format this into a shared storage partition between both systems.   
  And NTFS (Microsoft Basic Data) is the most cross-compatible choice.

- **(New) Main Linux Partition:** 128GB (Type: Linux Filesystem).

- **(New) Arch EFI:** 770MB (Type: EFI System)   
  GRUB should actually be quite lightweight and not need that much space - but I prefer to be future-proof in case I shift to another boot manager (like `systemd`) that requires more space.

> **Windows Partitions**   
> You may see Microsoft reserved, Microsoft basic data and/or Recovery partitions that are related to Windows.   
> Don't touch them.

> **Why create another EFI?**   
> Because I'm a coward. That's why.   
> It's one of the safest ways to avoid messing up my Windows boot files.

Format your partitions accordingly:
```bash
mkfs.fat -F32 /dev/nvme0n1pX  # For the new 770MB EFI
mkfs.ext4 /dev/nvme0n1pY     # For Arch Root
mkfs.ntfs /dev/nvme0n1pZ     # For the shared storage
```

#### Phase 3: The Main Course (archinstall)

When installing Arch, we want to clearly identify our Boot (EFI) partition and our main Filesystem partition. To do so, we can already mount them as such and just ask the installer to follow what we configured.

> Skipping this may lead the installer to use your existing (Windows) EFI partition and risks overwriting your Windows boot files!

Use the following command to list your partition names (in case you can't remember them from `cfdisk`):
```bash
# Stands for "List Blocks" (if I'm not wrong)
lsblk

# And from the output here, you'll be able to find your partition names
# E.g. nvme0n1p5, nvme0n1p6
```

So, as the cowardly bunch we are, we mount:
```bash
mount /dev/nvme0n1pY /mnt       # Mount your 128GB Root
mkdir /mnt/boot
mount /dev/nvme0n1pX /mnt/boot  # Mount your 770MB EFI
```

> Seriously, be sure to replace the X and Y with your actual partition numbers

Run `archinstall` and select **"Pre-mounted configuration"**.

I went with a minimal profile to avoid Hyprland dependency issues during the script run.

**Additional Packages**   
Make sure to at least include IWD or NetworkManager.   
You will need internet after the installation (and also, we are in 2026 - you will need internet in general).

In my next articles, I will list out the all packages I installed.


#### Phase 4: Fixing the "Broken" Bootloader

The script is great, but sometimes it misses the landing on the bootloader. When it finishes, select the option to **chroot**.

Inside the `chroot`, run:
```bash
pacman -S grub efibootmgr dosfstools mtools
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

You can now clean up after yourself, and reboot.
```bash
# Exit the chroot shell
exit

# Unmount those partitions you mounted earlier
# The -R parameter recursively unmounts everything in one go
umount -R /mnt

# Reboot
reboot
```

And, you will most likely see your Arch Linux in GRUB - **but no Windows**.   
That's OK. We can fix it.

Boot into Arch, and run the following to get Windows into GRUB:
- Install `os-prober`
  ```bash
  sudo pacman -S os-prober
  ```
- Edit `/etc/default/grub` and append `GRUB_DISABLE_OS_PROBER=false` at the end.
  ```bash
  nano /etc/default/grub
  ```
- And update GRUB one last time.
  ```bash
  grub-mkconfig -o /boot/grub/grub.cfg
  ```

> See? You immediately need an internet connection for installing packages.   
> You can always use IWD like before from the command line to connect to WiFi.

#### That's a wrap ✌️

You now have a system that boots into a gorgeous Hyprland environment (albeit it's just a black screen for us minimal installers) with a shared NTFS drive for all your cross-platform projects. It’s a bit different from my usual coding sessions, requiring some introspection into how your hardware actually talks to your software. 

If you want to join the next .NET User Group or Arch discussion, reach out on LinkedIn.

Happy Coding 👨‍💻