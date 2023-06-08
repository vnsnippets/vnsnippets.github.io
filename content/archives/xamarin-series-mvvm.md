---
author: "Vidush H. Namah"
title: "Xamarin Series: MVVM"
date: 2016-06-24T00:00:00+00:00
draft: false

description: "This article covers the essentials of MVVM in a Xamarin.Forms project covering the basics of separating your UI code from your business logic and how to connect them through binding."

image: "https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"

series: ["Xamarin Series"]
categories: [
    "Xamarin Series"
]

tags: [
    ".NET",
    "Xamarin",
    "Mobile Development"
]

aliases: ["xamarin-series-mvvm"]
---

# Xamarin Series: MVVM

Source Code: <github link>

This tutorial requires a basic knowledge of C# and Xamarin. Some practice in UI design using XAML and Xamarin Forms is also recommended.

### MVVM: A Pattern
Model-View-ViewModel (MVVM) is a pattern. What's that, you say?

The way I like to put it is, patterns (and practices) are blessings from our annoyed forefathers who spent too much time facing the same problems over and over. You can think of them as half-baked recipes that you need to throw your own ingredients in to complete.

> Patterns provide you with a "way of coding" to avoid common problems regarding complexity.

For the case of MVVM, it is a pattern that allows for the separation of the UI part of an application from the business logic.

> UI: The code that make pretty screens and buttons
> Business Logic: The code that makes the buttons actually do something

For instance, without any kind of separations like MVVM, a typical Xamarin application would have a `UI.xaml` file for the GUI and an accompanying `UI.xaml.cs` file holding the logic that will run when you use the GUI.

<Image>

### Structure of the Pattern
With the application of MVVM, the architecture is broken into three components:
* Models: A class used to represent data
* Views: The GUI of an application
* ViewModel: The business logic that runs when an action is taken

<Image>

### Xamarin x MVVM
Time to get coding! Fire up Visual Studio and create a new Xamarin Forms (Portable) project to begin with.

> All the files and codes will be in the portable project for this tutorial. We will not be touching the platform-specific projects.

Our goal is to create a simple BMI calculator.

#### Project Structure
<Image>
Create three new folders as follows:
* /Models
* /Views
* /ViewModels

This directly represents the MVVM patterns.

#### Create a view
Create a first screen in the `/Views` folder.
<code-snippet>

#### Create a model
Create a class in the `/Models` folder.
This model will be representing the data required when calculating a BMI. Depending on your application, such classes sometimes can represent your database table models directly as well.
<code-snippet>

#### Create a view-model
Create a class in the `/ViewModels` folder.
This is the fun part.

The **ViewModel** links up your **View** with your **Model**. It is responsible for performing all the operations/processing involved when something happens on the View.

> Every bit of information being read from or written to the View goes through the ViewModel.

Therefore, it is only logical that every input and output fields in the View must have a corresponding element (variable) in the ViewModel.

### Till Death Do Us Part
Awesome, we have a view and a view-model. What is missing?

#### Binding Context
At the moment, the view and view-model are completely separate files in the project. We did not inform the view that it needs to use the view-model (or vice-versa).

What we need is a **binding context** - which will essentially tell the UI that it needs to link up to its View-Model. This can be done directly in XAML, or via the XAML.CS code.

We will go for XAML.CS in this tutorial.
<code-snippet>

#### Data Binding
The view is now bound to the view-model, but something is still missing. Similar to binding context, we also need to tell the UI components (Entry Boxes, Labels etc.) to bind themselves to the variables in the view-model.

Set Data Binding in the View.
<code-snippet>

### Command Binding
Whoop whoop - things are moving.
The only thing left is the Button, and luckily MVVM allows you to treat Buttons very similarly to other components like Labels - i.e. using Bindings. For that, we will make sure of the **ICommand Property**.

Simply put, one can set the value of an ICommand Property to be a function - hence, when that property is read, the function is returned.

> Think of ICommands as a way to expose functions as a variable.

This allows us to bind a function to a button, just like the other properties were bound to their UI counterpart.

Create an ICommand in the View-Model.
<code-snippet>

> Read more on Lambda Expressions if you are unfamiliar with the code syntax above. You are a long way from Hello World!

Finally, update your view to bind the command to your button.

### Crash and Burn
Looks like everything is in place - the application should run, right? Go ahead and try to run it, and click on the button.

> Face that crash and burn like a proper developer.

That's right, clicking on the button does nothing.

Here's the deal.
Everything was coded and bound, but one problem remains. We cannot expect the application to spend all of its precious resources constantly surveying all the elements and variables in the codebase waiting for a change.

#### INotifyPropertyChanged
> INoti-what now?

INotifyPropertyChanged is a means to inform the application when something changes for it to taking necessary steps and refresh the elements on the screen.

Add the following lines to your view-model.
<code-snippet>

The **PropertyChanged** variable has two jobs:
* It acts as an agent between the view and the view-model, keeping track of what values are changing. While PropertyChanged is null – it implies nothing has changed.
* It updates the view or the view-model variables to make sure everything is synced up every time something changes. 

So, our next step is to ensure that we update the PropertyChanged variable when something changes.

Create a method in your view-model, designed to update the PropertyChanged variable when it is called.
<code-snippet>

Lastly, update your data variables (the ones that populate the screen) to call our method when a change happens.
<code-snippet>

### It's a wrap (or a taco)
Give your application a spin, and pray.

This was an introduction to MVVM and how you can easily set it up to decouple your logic from your front-end.

There is more to it, and there will be blog posts to continue the series - but for today, grab a taco and congratulate yourself for a job well done.

