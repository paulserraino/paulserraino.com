---
layout: post
title:  "Debugging Javascript"
date:   2015-02-02 19:07:59
categories: web
---

> The worst kind of error message is no error message. 

Debugging code can be a big challenge. This is especially true when working with a large unfamiliar code base and is certainly true when writing a ton of javascript code. I’ve definitely ran into my fair share of issues like: random undefined variables, dealing with globals, crying about commas (why the heck is node.js fine with `x = { a: 1,}`), unexpected stack overflows, the list goes on. Luckily there are some ways to deal with code going wrong. 

##Tracers

The most obvious debugging technique is logging stuff to the screen. This works fine until a million things are simultaneously logging to the terminal and your having to to scroll through hundreds of line of text. When `console.log` gets out of hand "tracers" are the way to go. 

As an aside, the guy in [this](http://www.youtube.com/watch?v=UYVUSoNrM-c&t=9m28s) video called them tracers and I thought it sounded kinda cool. It's really just a long, distinct, string of characters.

{% highlight javascript %}
console.log('=========================');
{% endhighlight %}



##Debugger

Next is the `debugger` statement. This is programmatic way of setting breakpoints in your code. No really, open the console and try it out right now. It's pretty awesome.

{% highlight javascript %}
debugger;
{% endhighlight %}


##console.trace

There's also `console.trace`, which allows you to output stack traces. I haven't gotten around to using this too much, but I think it's worth keeping in mind.

{% highlight javascript %}
!function hello() {
   return !function helloAgain () {
     console.trace();
    }()
}()
{% endhighlight %}

![stack trace](http://i.imgur.com/drrtYvr.png)


##console.assert

If, for some reason, you want combine testing and debugging you could use `console.assert`. It's not really perfect or ideal, in my option, since it outputs nothing when true. 

{% highlight javascript %}
console.assert(false, 'some message')
{% endhighlight %}

![assert](http://i.imgur.com/7yBw8ia.png)



<br>

<div id="disqus_thread"></div>

  <script type="text/javascript">
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = 'paulserraino'; // required: replace example with your forum shortname

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
 </script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
