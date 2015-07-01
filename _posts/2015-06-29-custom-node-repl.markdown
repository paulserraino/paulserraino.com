---
layout: post
title:  "Custom Node REPL"
date:   2015-06-29 19:07:59
categories: web
tags:
  - js
---

The default repl that ships with node is good, but if you’re a hardcore node developer it probably isn’t enough. Taking the time to write your own repl is worth it, as it comes in handy quite a lot.

Below is an example of a simple repl I made, that does the following:

1. enable repl history
2. add common modules to repl context
3. database helper functions

<script src="https://gist.github.com/paulserraino/c74f8108bb60e182af2c.js"></script>

Notice that `sql` doesn't have a callback, I simply override the context variable `results`. Callbacks are kind of a pain to type out in a repl, and I recommend creating helpers that override a context variable (like `results`) instead of passing in a callback.


##Eval

Behind the scenes, node-repl is evaling code and writing the results to process.std.out, so it's possible to perform any code transformation you'd like before your code is executed.

{% highlight javascript %}
var repl = require('repl');

repl.start({
  eval: function (code, context, file, callback) {
    //run code transformation.
    // you can use any transform you'd like!
    // - es6 -> js
    // - coffescript -> js
    // - clojurescript -> js
    // than eval your code;
    return eval(code);
  }
})
{% endhighlight %}

protip: after running a code transform, just use the [default eval](https://gist.github.com/paulserraino/01e7ec30971d633fa35f) function from node core.
