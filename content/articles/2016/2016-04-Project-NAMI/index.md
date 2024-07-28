---
author: Vidush H. Namah
title: WordPress with SQL Server
slug: wordpress-with-sql-server

date: 2016-04-06
draft: false

description: "Project Nami is an adaptation of WordPress to allow support for SQL Server and Microsoft Azure on a near-native level."

series: Development
---
_Update 2024: There have been significant changes to Project Nami and this blog post may not be relevant/accurate anymore._

Take a wild guess at the biggest problem someone hosting a blog on Microsoft Azure could face.
> Money? Not this time. An azure account is needed, but the free service tier was more than enough for me to get started.

It was storage space.   
When creating my first blog, I received access to a MySQL ClearDB database which has a size limit of 20MB (no, I did not miss a zero here).

Honestly, 20MB was not too bad to begin with. With all my blog posts, plugins and theme, I still have about 15MB left. Yet, in the long run this is going to be a problem. So a couple of friends and I booted the brainstorming engines to find a solution.

Since I already have a Microsoft Azure account, the obvious solution was to simply connect my blog to an SQL Server and SQL Databases on Microsoft Azure. As mentioned, costs were not an issue as I also have a subscription that grants me a certain amount of credits per month.

> It's never that simple, is it?

WordPress is coded for MySQL only and support for MSSQL is missing. It's not just a matter of database abstraction since on a low level itself, WordPress is tightly coupled with MySQL.

## Introducing Project Nami

Github repository: https://projectnami.org

Project Nami is an open source cloud solution to the WordPress with MSSQL problem. It was developed by Spencer Morin (WordPress & PHP Developer) and Patrick Bates (Microsoft Azure & MSSQL Solutions Developer).

### How to deploy WordPress on Microsoft Azure
There are several ways on how to deploy a WordPress blog with Project Nami - well documented on their website. They also provided a handy little deployment tool that creates your Azure Website and your SQL Azure Database here. Note that you will need to login to your Azure Account to proceed.   
https://deploy.azure.com/?repository=https://github.com/ProjectNami/projectnami/tree/latest

### Migrate your existing blog data
The migration process is actually really easy. I followed this order (it seemed logical):

1. Export your existing blog data.

2. Install your theme on your new (Project Nami) blog.   
   
   I can safely say that I tested this part to the extremes. Project Nami gives you access to the WordPress theme gallery like a true pureblood WordPress site would have. It even allows you to upload your zipped theme packages as well - which I did.     

   It all works perfectly. From the Customizer to the extra Theme Options that comes with my theme, it was all there.

3. Get your plugins.    
   
   Just as with the themes, you get access to the full WordPress gallery of plugins. Every plugin I installed worked fine - including the Jetpack Plugin with actually works in sync with a WordPress.com account.   
      
   I'm happy to report no issues so far and hopefully none will arise in the future.

5. Import your existing blog data to your new blog