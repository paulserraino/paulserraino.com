---
layout: post
title:  "IIFE Async Control Flow"
date:   2014-12-24 19:07:59
categories: web
---

Javascript's functional (almost [LISP](http://en.wikipedia.org/wiki/Lisp_%28programming_language%29) like) nature is so very powerful and if you want proof of this, look no further than the IIFE. 

An immediately-invoked function expression (IIFE, pronounced "iffy") is an anonymous function that calls itself. IIFE's are fairly flexible in how you implement them and they're used everywhere in JS, mainly in creating a local scope.

{% highlight javascript%}
(function (localArgs) {
	//local scope
	// where localArgs = args 	
})(args);

//or 
!function (localArgs) {
	// exactly the same as above
} (args);

{% endhighlight %}

Okay, now we can start talking about the fun stuff, recursive IIFEs. The idea of recursion is quite simple, a function calls itself infinitely many times unless a base case is given. The base case, at least for us, will be the number of iterations. 

###Example
In the example shown below, a recursive IIFE is used to count down and display the numbers 1 through 10.

{% highlight javascript%}
(function next(i) {
	console.log(i);
	if (!(i >= 10)) next(i + 1);
})(1);
{% endhighlight %}

###Practical Example
In this next example, I'm using a recursive IIFE to perform a batch operation with leveldb. Only calling `next()` after each datum is `put` into the db.

{% highlight javascript%}
var level = require("level")
var db = level("./yourdb")

var data = [{name: "paul", age: 23}, {name: "jeff", age: 19}, {name: "sara", age: 21}]

var batch = db.batch()
(function next(i) {
	if (i > data.length) batch.write()

	batch.put(data[i].name, data[i].age, function () {
		if (err) throw err
		next(i + 1)
	})

})(0)
{% endhighlight %}

###Useful Resources

- [Ben Altman on IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression)
- [Recursion - wolfram](http://mathworld.wolfram.com/topics/Recursion.html)

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
