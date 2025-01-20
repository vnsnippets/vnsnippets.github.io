---
author: Vidush H. Namah
title: Alternatives to Fluent Assertions
slug: alternatives-to-fluent-assertions

date: 2025-01-20
draft: false

description: Fluent Assertions (by Xceed Software Inc.) now requires a paid license for commercial use. Let's explore some popular alternatives.

series: Development
---

Fluent Assertions is a popular library for writing assertions in .NET unit tests. They have recently been acquired by Xceed Software Inc. who have brought forward changes to their license.

{{< quote author="Xceed Software Inc." source="Fluent Assertions FAQ" url="https://xceed.com/fluent-assertions-faq/"  >}}
The free version of Fluent Assertions will remain available for non-commercial use. Xceed and the original creators are committed to maintaining the open-source nature of the library for the community that has supported it over the years. 
{{< /quote >}}

So, commercial use of the library now requires a paid license.   

As of today, according to [Xceed's Fluent Assertions product page](https://xceed.com/products/unit-testing/fluent-assertions/), the license for one person with unlimited installations, priority support and a 60-day guarantee is priced at **$129.95**.


### What should you do?!
Pay the license.

Or, there are several other libraries that offer similar functionality with their own unique features that you could look towards. In this article, we'll explore three alternatives in particular (ones I am familiar with):
- NUnit
- xUnit
- Shouldly

We'll discuss their licensing situation (of course!), benefits and drawbacks and provide some comparisons against FluentAssertions for good measure. Let's also throw in some user statistics and the latest release information so you can get a feel of how trusted and actively maintained the libraries are.

> FluentAssertion boasts a downloads count of over 211.4 million downloads as of today.

### NUnit
A widely-used unit testing framework for .NET applications. It supports a variety of assertion styles and integrates well with many CI/CD pipelines. NUnit is known for its flexibility and extensive documentation, making it a popular choice among developers.
- Licensing: MIT License (Allows free use, including for commercial purposes)
- Latest Release: 4.1.0 (February 23, 2024)   
- Usage: Over 211.4 million downloads

| The Good | The Bad |
| - | - |
| Widely used and well-documented. | Syntax can be verbose. |
| Supports a variety of assertion styles. | Less expressive compared to FluentAssertions. |
| Great CI/CD pipelines coverage. |  |

In comparison to FluentAssertions:
- NUnit lacks the fluent syntax that makes assertions more readable and expressive.
- NUnit also does not support chaining multiple assertions in a single statement.

Code Comparison:
```csharp
// FluentAssertions
result.Should().Be(expected);

// NUnit
Assert.That(result, Is.EqualTo(expected));
```

### xUnit
A modern unit testing framework for .NET that emphasizes simplicity and extensibility. It supports parallel test execution, which can significantly speed up the testing process for larger projects. xUnit is actively maintained and has a clean, straightforward syntax.

- Licensing: Apache License 2.0 (Allows free use, including for commercial purposes)
- Latest Release: 3.0.0 (October 27, 2024)   
- Usage: Over 423,158 downloads

| The Good | The Bad |
| - | - |
| Modern and actively maintained. | Limited built-in assertions. |
| Supports parallel test execution. | Requires additional libraries for more expressive assertions. |
| Simple and clean syntax. |  |

In comparison to FluentAssertions:
- xUnit lacks the extensive matcher support and fluent syntax of FluentAssertions.
- xUnit does not provide as detailed and readable error messages.

Code Comparison:
```csharp
// FluentAssertions
result.Should().Be(expected);

// xUnit
Assert.Equal(expected, result);
```

### Shouldly
Shouldly is an assertion framework for .NET that focuses on providing expressive and readable syntax. It offers detailed error messages, making it easier to understand test failures. Shouldly is actively maintained and well-documented, making it a great choice for developers who prioritize readability and maintainability in their tests.

- Licensing: BSD License (Allows free use, including for commercial purposes)
- Latest Release: 4.2.1 (April 24, 2023)   
- Usage: Over 12.5 million downloads

| The Good | The Bad |
| - | - |
| Very expressive and readable syntax. | Slightly slower performance compared to other libraries. |
| Provides detailed error messages. | Requires additional setup for some advanced features. |
| Actively maintained and well-documented. |  |

In comparison to FluentAssertions:
- Shouldly does not support as many complex assertions and chaining as FluentAssertions
- Shouldly has limited support for custom assertion extensions

Code Comparison:
```csharp
// FluentAssertions
result.Should().Be(expected);

// Shouldly
result.ShouldBe(expected);
```

## It's a rap ✌️!
FluentAssertions stands out with its fluent syntax, extensive matcher support, and detailed error messages, making it a powerful tool for writing clear and expressive unit tests. Hell, that's a major reason why it is so popular. Of course, no two libraries completely match each other perfectly. So you win some, you lose some.

Ultimately, the best choice depends on your specific needs and preferences.

This is probably a good time to say that this article is just an overview and based on some shared opinions (as is everything in the world) - but your experence with those libraries might differ. That's the cool thing about technology, it depends a lot on how you use it.