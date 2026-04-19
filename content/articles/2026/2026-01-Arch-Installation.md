---

author: Vidush H. Namah
title: The Safest Path to Dual-Booting Arch Linux and Windows 11
slugorcontentbasename: dual-boot-arch-windows-guide
date: 2026-04-19
draft: false
description: A detailed technical walkthrough of my journey (starting April 18th) to achieve a stable dual-boot setup using the Arch install script and some manual finesse.
categories: Linux
category: "Arch Linux: Cooking Rice"
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

Before we touch Linux, we have to make sure Windows doesn't try to sabotage us. 

1.  **Backup and Restore:** Create a System Restore point so you can revert if things get messy.
2.  **BitLocker:** If you are on Windows Pro, **disable BitLocker**. It's a great feature, but it’s like a locked door that Linux doesn’t have the key for.
3.  **The Hibernation Trap:** This is the big one. **Disable Fast Startup and Hibernation** by running `powercfg /H off` in an Admin terminal. If you don’t, Windows keeps your drive in a "hibernated" state, which can lead to **data loss or filesystem corruption** when Linux tries to touch it.
4.  **Shrink the Drive:** Use Disk Management (`diskmgmt.msc`) to shrink your main C: volume. I went for about **129GB** (132,096MB) of unallocated space.

#### Phase 2: Manual Partitioning (The Secret Sauce)

Flash your USB with Rufus (ensure it's set to **GPT/UEFI** mode) and boot into the live environment. Once you’ve connected to the internet via `iwctl`, it’s time for some manual labor.

Instead of letting the script guess, use `cfdisk` to set your own boundaries:
*   **Windows EFI:** Keep it as is.
*   **Shared Storage:** I created a 312GB NTFS partition for sharing files between both OSs.
*   **Main Linux Partition:** 128GB (Linux filesystem).
*   **New Arch EFI:** I created a second **770MB EFI System** partition. Why? It's one of the safest ways to avoid messing with Windows' boot files directly.

Format them accordingly:
```bash
mkfs.fat -F32 /dev/nvme0n1pX  # For the new 770MB EFI
mkfs.ext4 /dev/nvme0n1pY     # For Arch Root
mkfs.ntfs /dev/nvme0n1pZ     # For the shared storage
```

#### Phase 3: The Main Course (archinstall)

Now, we mount:
```bash
mount /dev/nvme0n1pY /mnt       # Mount your 128GB Root
mkdir /mnt/boot
mount /dev/nvme0n1pX /mnt/boot  # Mount your 770MB EFI
```

Run `archinstall` and select **"Pre-mounted configuration"**. I went with a minimal profile to avoid Hyprland dependency issues during the script run, manually adding packages like `hyprland`, `waybar`, `kitty`, and `pipewire`.

#### Phase 4: Fixing the "Broken" Bootloader

The script is great, but sometimes it misses the landing on the bootloader. When it finishes, select the option to **chroot**.

Inside the chroot, run:
```bash
pacman -S grub efibootmgr dosfstools mtools
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

Once you reboot, you might notice Arch appears twice in GRUB (usually due to a UKI/GRUB conflict). I manually edited my `grub.cfg` to clean that up, but the most important part is getting Windows to show up. 

In your new Arch install, install `os-prober`, edit `/etc/default/grub` to set `GRUB_DISABLE_OS_PROBER=false`, and update GRUB one last time.

#### That's a wrap ✌️

You now have a system that boots into a gorgeous Hyprland environment with a shared NTFS drive for all your cross-platform projects. It’s a bit different from my usual coding sessions, requiring some introspection into how your hardware actually talks to your software. 

If you want to join the next .NET User Group or Arch discussion, reach out on LinkedIn.

Happy Coding 👨‍💻