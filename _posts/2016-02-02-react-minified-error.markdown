---
layout: post
title:  "React Minified Exception Occurred"
date:   2016-02-02 23:07:59
categories: javascript
---

> Uncaught Error: Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.

If you're seeing the above error, than it may not be the case that there was any syntax errors causing this exception to be throw. It could be that there was an issue with querying the DOM. In my case, I was missing the DOM element that I provided to React's `render` method.

{% highlight javascript %}

//bad index.html   //good index.html
'<div></div>'      '<div id="main"></div>'

//main.js
React.render(<App />, document.getElementById('main'));

{% endhighlight %}
