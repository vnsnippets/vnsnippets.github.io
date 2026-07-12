---
Author: Vidush H. Namah
Title: Setting up Waybar
Caption: Demystifying Waybar styling and layout configuration on CachyOS, featuring modular styles and CSS color injection.

Published: 2026-05-22
Draft: false

Series: "Arch Linux: Cooking Rice"
Tags: 
- Arch Linux
- CachyOS
- Hyprland
- Waybar
- Open Source
- Tutorial

---

#### The Customization Paradox

You finally booted into CachyOS. Magnificent, right? But then you look up, and the default status bar looks completely out of place, or worse — nonexistent.

Configuring your desktop status bar is arguably the easiest first step into ricing Linux. So let's get to it.

> OK, I lied. Maybe you should start with configuring your Hyprland configurations - but that shifted to Lua recently and I have not gotten to migrating mine yet.

Below are some of the tools I used, but the text editor can really be anything you want. I may have used Visual Studio Code here and there - but as long as you can edit text, you're fine.

##### Ingredients

| Requirement | Details | Reference |
| --- | --- | --- |
| Waybar | Highly customizable Wayland status bar | [https://github.com/Alexays/Waybar](https://github.com/Alexays/Waybar) |
| Nerd Fonts | System icons (Symbols Nerd Font preferred) | [https://www.nerdfonts.com/](https://www.nerdfonts.com/) |
| CachyOS / Arch | An active Wayland composited desktop environment | [https://cachyos.org/](https://cachyos.org/) |
| Text Editor | For dealing with JSONC and CSS quirks |  [https://www.nano-editor.org/](https://www.nano-editor.org/) |

You can find my rice here: [https://github.com/vnsnippets/arch-basmati-rice](https://github.com/vnsnippets/arch-basmati-rice).

---

#### The Blueprint (`config.jsonc`)

Waybar relies on a master JSONC (JSON with Comments) structure. Think of this as defining the overall layout of your status bar and what it will hold.

Our setup splits the top bar into three functional target zones: Left (Time), Center (Workspaces), and Right (System States & Hardware toggles).


```jsonc
{
    "position": "top",
    "margin-top": 10,
    "margin-left": 10,
    "margin-right": 10,
    "spacing": 4,
    "modules-left": ["clock"],
    "modules-center": ["hyprland/workspaces"],
    "modules-right": [
        "network",
        "pulseaudio",
        "battery",
        "power-profiles-daemon",
        "custom/power"
    ],

    // Each of the modules are then further configured
    // below with their own parameters
}
```

There is a whole world of modules supported listed in the official wiki at [https://github.com/alexays/waybar/wiki](https://github.com/alexays/waybar/wiki).

#### Modules: Clock
Complete wiki at [https://github.com/Alexays/Waybar/wiki/module:-clock](https://github.com/Alexays/Waybar/wiki/module:-clock).

```jsonc
"clock": {
    "format": "{:%Y-%m-%d %H:%M}",
    "tooltip": false
}
```

I don't need much from my clock, so moving on.

#### Modules: Workspaces
Complete wiki at [https://github.com/Alexays/Waybar/wiki/Module:-Hyprland#workspaces](https://github.com/alexays/waybar/wiki/module:-hyprland#workspaces).

```jsonc
"hyprland/workspaces": {
    "format": "",
    "active-only": false,
    "all-outputs": false,
    "sort-by-number": true,
    "format-icons": {
        "default": ""
    }
}
```

Now, I don't know what fonts you have installed and if this will show correctly on your screen - but for the `format`, I am using a big filled circle from (any) Nerd Fonts.

This gives it a "dot" appearance, but the colors will tell me which workspace is active or not.

> Setting `"all-outputs": false` ensures your workspaces don't leak across secondary displays. If you multi-task heavily on twin monitors, leaving this true will cause visual confusion as workspace IDs start stepping on each other's toes.

Next we will dive into the modules, followed then by the styles which brings in the nice colors and aesthetics.

#### Modules: Network
Complete wiki at [https://github.com/Alexays/Waybar/wiki/Module:-Network](https://github.com/Alexays/Waybar/wiki/Module:-Network).

```jsonc
"network": {
    "format-wifi": "<span size='13000' foreground='#f5e0dc'>  </span>{essid}",
    "format-ethernet": "<span size='13000' foreground='#f5e0dc'>󰤭  </span> Disconnected",
    "format-linked": "{ifname} (No IP) ",
    "format-disconnected": "<span size='13000' foreground='#f5e0dc'>  </span>Disconnected",
    "tooltip-format-wifi": "Signal Strength: {signalStrength}%"
}
```

Notice how we leverage Pango markup syntax directly inside the JSON structure to inject explicit font sizes and hex codes directly to the icons.

#### Modules: Pulse Audio
Complete wiki at [https://github.com/Alexays/Waybar/wiki/Module:-PulseAudio](https://github.com/Alexays/Waybar/wiki/Module:-PulseAudio).

```jsonc
"pulseaudio": {
    "format": "{icon}",
    "format-muted": "",
    "tooltip-format": "({format_source}) {desc}",
    "format-source": "Active",
    "format-source-muted": "Muted",
    "on-click": "pactl set-sink-mute @DEFAULT_SINK@ toggle",
    "format-icons": {
        "headphone": "",
        "default": ["", "", ""]
    }
}
```

Setting `format` determines the structure of what will show on the status bar component, and the specific formats like `format-muted` or `format-icons` determines the actual content.

In particular, `format-icons.default` takes an array to adapt the icon based on your volume level.

#### Battery
```jsonc
"battery": {
    "states": {
        "warning": 30,
        "critical": 15
    }, 
    "format": "{icon} {capacity}%",
    "format-charging": " {capacity}%",
    "format-plugged": " {capacity}%",
    "format-alt": "{icon} {capacity}%", 
    "format-icons": ["", "", "", "", ""]
}
```

The formatting here is similar to Pulse Audio, but battery also takes a `states.warning` and `states.critical` setting to allow style changes based on whether your battery is below those levels.

#### Modules: Power Profiles
Complete wiki at [https://github.com/Alexays/Waybar/wiki/Module:-PowerProfilesDaemon](https://github.com/Alexays/Waybar/wiki/Module:-PowerProfilesDaemon).

```jsonc
"power-profiles-daemon": {
    "format": "{icon}",
    "tooltip": false,
    "format-icons": {
        "default": "",
        "performance": "",
        "balanced": "",
        "power-saver": ""
    }
}
```

This module allows changing the battery power mode, and the icon can be set differently for each mode as well.

#### Modules: Custom (Power)
Complete wiki at [https://github.com/Alexays/Waybar/wiki/Module:-Custom](https://github.com/Alexays/Waybar/wiki/Module:-Custom).

```jsonc
"custom/power": {
    "format": "⏻",
    "tooltip": false,
    "on-click": "poweroff"
}
```

This is a bit of a special one.

You can create custom components that invokes scripts. In my case, I added a shut-down button that simply runs the `poweroff` command when clicked.

#### Styles
If you dump all your styling logic and hex color codes into a massive, monolithic file, modifying your theme later will feel like walking through mud. Instead, we can implement modular stylesheet grouping.

We'll abstract colors out completely into a palette declaration module called `colors.css`, and import it into our layout style definitions.

**Defining the Core Palette (`colors.css`)**

```css
@define-color module-background #232634;
@define-color module-border #394250;

@define-color workspace-background #232634;
@define-color workspace-active #232634;

@define-color teal #81c8be;
@define-color green #a6d189;
@define-color red #e78284;
@define-color yellow #e5c890;
```

**Assembling the style (`style.css`)**

```css
@import "colors.css"; 

* {
    font-family: "Noto Sans", "Noto Sans Mono", "Symbols Nerd Font";
    font-size: 14px;
    min-height: 0;
    transition: all 0.3s cubic-bezier(.55, .055, .675, .19);
}

window {
    background: transparent;
}

#workspaces button {
    min-width: 12px;
    min-height: 12px;
    padding: 0 6px;
    margin: 6px 2px;
    background-color: @workspace-background;
    color: transparent;
    border: none;
    border-radius: 100%;
}

#workspaces button.active {
    background-color: @workspace-active;
    min-width: 24px;
    border-radius: 24px;
}

#bluetooth,
#pulseaudio,
#clock,
#battery,
#power-profiles-daemon,
#network,
#custom-power {
    padding: 8px 12px;
    border: 1px solid @module-border;
    border-radius: 12px;
    background-color: @module-background;
}
```

This is simply CSS - which means you can add `:hover` and other CSS selectors to further customize everything.

Similarly, by binding attributes onto generic CSS variable placeholders (`@module-background` and `@module-border`), changing the theme across the whole status bar down the road requires nothing more than editing color palette in `colors.css`.


#### Custom Layout Options: Chaining vs Islands

When building bars, ricing enthusiasts often argue over structural layout schemes. Let’s do a quick comparison of the two dominant structural behaviors:

| Layout Style | The Good | The Bad |
| --- | --- | --- |
| **Monolithic Unified Block** | Clean traditional look, zero gap calculation issues, easy alignment. | Harder to accent specific metric warnings visually. |
| **Pill / Island Configuration** | Exceptional modularity, beautiful modern gaps, distinct element groups. | Margin configurations can get tedious quickly. |

Our configuration leverages a clean standalone island configuration where each distinct functional module gets isolated padding rules, structural border treatments, and specific border radius to create a floating pill aesthetic over a transparent compositor layer.

#### Complete Style
Here is my full stylesheet with all the hovers and specific colors.
```css
@import "colors.css"; 

* {
    font-family: "Noto Sans", "Noto Sans Mono", "Symbols Nerd Font";
    font-size: 14px;
    min-height: 0;
    transition: all 0.3s cubic-bezier(.55, .055, .675, .19);
}

window {
    background: transparent;
}

#workspaces {
    background-color: transparent;
}

#workspaces button {
    min-width: 12px;
    min-height: 12px;
    
    padding: 0 6px;
    margin: 6px 2px;
    
    background-color: @workspace-background;
    background-size: 10px 10px; 
    background-repeat: no-repeat;
    background-position: center;
    color: transparent;
    
    border: none;
    border-radius: 100%;
    box-shadow: inset 0 0 0 1px transparent;
}

#workspaces button:hover {
    background-color: @workspace-active;
    opacity: 0.7;
    box-shadow: inherit;
    text-shadow: inherit;
}

#workspaces button.active {
    background-color: @workspace-active;
    min-width: 24px;
    border-radius: 24px;
}

#bluetooth,
#pulseaudio,
#clock,
#battery,
#power-profiles-daemon,
#cpu,
#memory,
#disk,
#temperature,
#backlight,
#wireplumber,
#tray,
#network,
#mode,
#scratchpad,
#custom-power {
    padding: 8px 12px;
    border: 1px solid @module-border;
    border-radius: 12px;
    background-color: @module-background;
}

#clock {
    color: @text;
}

#pulseaudio,
#wireplumber {
    color: @teal;
}

#network {
    color: @yellow;
}

#idle_inhibitor {
    color: #7cb342;
}

#idle_inhibitor.activated {
    color: @red;
}

#battery {
    color: @green;
}

#power-profiles-daemon.performance {
    color: @red;
}

#power-profiles-daemon.balanced {
    color: @teal;
}

#power-profiles-daemon.power-saver {
    color: @green;
}

#custom-power {
    color: @red;
}

#custom-power:hover {
    background-color: @red;
    color: @module-border;
    border-radius: 10px;
}
```

#### And that's it ✌️

You now have a modularized status bar configuration that will survive whatever system alterations you cook up next.

Full disclosure: I stopped using Waybar a week into my journey and went for coding my own desktop aesthetics from scratch.

Till the next one, stay techy :)