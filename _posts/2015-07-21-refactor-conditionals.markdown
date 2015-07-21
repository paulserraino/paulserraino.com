---
layout: post
title:  "Refactoring Conditional Statements"
date:   2015-07-21 18:07:59
categories: web
tags:
---

So this is just going to be a quick programming protip/insight. I've noticed that as my programming style has progressed I've become wary of using too many conditional statements. I think they look bad and it oftens leads to rigid code that's hard to maintain. A better approach is to filter out any and all redundant data, i.e use map-reduce functions.

Here's an example using Javascript (but keep in mind the basic idea applies to any turing complete language).

{% highlight javascript %}
var data = [1,2,3,4,5,6,7,8,9];

//DO
data = data.filter(function (i) { return i % 2 === 0});
console.log('do work on data');

//DON'T
data.forEach(function (i) {
  if (i % 2 === 0) console.log('do work on data');
});

{% endhighlight %}
