---
author: Vidush H. Namah
title: 2016/03 MSCC Meetup - .NET Core 1.0
slug: mscc-march-meetup

date: 2016-03-29
draft: false

description: .NET has gone open source with the release of .NET Core 1.0 and the community loves it. We dove into it during one of our monthly meetups.

series: Community
---
Github: [https://github.com/dotnet/core](https://github.com/dotnet/core)

ASP.NET is now open source!

Last Saturday, I attended a meetup on the theme of open source software. The meetup itself was interesting and informative, with attendees mostly from the Mauritius Software Craftsmanship Community (MSCC) and Microsoft Student Partners (MSP).

## Kickoff
Starting with an attendance of about 10 people, the room slowly filled up completely! We started with a small round table icebreaker - and it has been a while since I've seen such a panorama of skills and expertise gathered in one place.

We had a little of everything - from COBOL and Visual Basic to modern web development with C#. The diversity was just as wide in terms of age and experience.

The first part was an introduction to the topic of the day and a quick run through the ASP.NET documentation showing off .NET Core 1.0.

> The site says ASP.NET 5! Is it .NET Core or ASP.NET?

Calm down - they are both accurate. In fact, Microsoft published a blog post explaining the .NET Core and ASP.NET 5 conundrum.

.NET Core 1.0 is the new open source and cross platform .NET Framework. The version is an important indication that Microsoft wants deveopers to know that this is a fresh start.

## How to code using .NET Core?
This is typically the first question that pops to mind when thinking of transitioning to .NET Core. What is the use of an open source **free** technology if we still need to spend hard earned money on the IDE and tools surrounding it?

This led to an interesting evvaluation about IDEs in general. We all love (but sometimes hate - let's be honest) a beast of an IDE like Visual Studio and its plethora of plugins and add-ons. But is this your first choice to write a simple Hello World application?

{{< quote author="Jochen Kirstätter"  >}}
The first choice (of IDE) for most average Joes like us is usually a simple text editor.
{{< /quote >}}

Indeed, simple text editors - Sublime, Atom, even Notepad - can all be used to code using the .NET Core framework. Many of us agreed that Visual Studio Code is one of the best cross platform editors available out there.

> Fun fact: Visual Studio Code runs on Electron.

## The Development Envrionment
The packages for .NET Core are all up for download on Github. At this point, we went through the steps to get ASP.NET on a system. To fully get a feel of cros platform development, we specifically looked at how to set up a Linux machine for .NET development.

## Coding
We have the IDE and .NET Core SDK, what are we  waiting for?

During this part of the meetup, we created a new .NET Project (still on a Linux machine). The official guide to do so is well documented on the ASP.NET site with how to install and use the DNVM and DNX. I was particular interested by other means of kicking off .NET project - using the `dotnet` command, which we are secretly hoping will become the new official way.

The directions are pretty straightforward:
1. Navigate to the required directory   
  `> cd directory_path` 

2. Create a new project which automatically creates a JSON file specifying the basic libraries required to run the project.   
  `> dotnet new`

3. Restore the libraries required (as specified by the JSON file).
  `> dotnet restore`

4. Run   
  `> dotnet run`

## It's a wrap!
Adrien and Prashant (fellow MSPs) did a quick recap of .NET Core as a **single modular and cross platform version of .NET**.

_The modular nature of .NET Core provides more flexibility to users compared to the existing .NET Framework._

Adrien gave us a demo of how an ASP.NET website was running from a Linux virtual machine. We also peeked at **Yeoman** on Linux - an interesting utility to aid developers in creating projects - and its support for .NET Core.

The framework being open source has obvious benefits to users. However, the technology also benefits from being open source with contributions from the entire open source community.

A Saturday well spent 😉