---
layout: post
title:  "Getting Started: Javascript MV*"
date:   2014-10-20 19:07:59
categories: web
---

One of the most difficult aspects in writing good javascript is code structure. There are a large number of libraries out there to help structure your code (like Backbone, Ember..etc), but rather than spending hours learning a new library, just start writing code (be a hacker!). Writing code in "vanilla" javascript is not too difficult and I personally find a lot MV* libraries to be a bit over kill. So let's talk code structure. I'll show you how to set up a model, work with collections and render views. I might throw in some jquery or [underscore](http://underscorejs.org) here and there for brevity, but for the most part it's pure js!

###Model
A model is a single object, similar to classes in other languages. In the example below, my model is going to represent a single photo. It has a number of setters and getters to access and update data. It also has a fetch function to retrieve data from a web server. This model can be easly extend to work with any RESTful web service. I even went ahead and added an update function, to update the photo model. So with the exception of jQuery ajax, this is all in pure javascript! No framework needed!
{% highlight javascript %}
function Photo (opts) {
	// opts is a json object
	// opts equals opts or an empty object
	var opts = opts || {};

	this.name = opts.name || "my photo";
	this.url = opts.url || "";
	this.height = opts.height || 400;
	this.width = opts.width || 400;

	// if you are new to object orited programming in
	// javascript 'this' refers to 'function scope'
	// and remember function are objects!
}

Photo.prototype = {
	getUrl: function () { return this.url; },
	setUrl:function (url) { this.url = url; },
	getWidth: function () { return this.width; },
	setWidth: function (width) { this.width = width; },
	fetch: function () {
		// jquery ajax implicitly returns a promise
		return $.ajax({
			type: "GET",
			url: this.url
		});
	},
	update: function (updates) {
		this.url = updates.url || this.url;
		this.name = updates.name || this.name;

		return $.ajax({
			type: "PUT",
			url: this.url
		});	
	}
}	

{% endhighlight %}

###Collection
A collection is an array of models. Like a single model, your collection may have setters and getters, as well as methods to make requests to a web server. In the example below I implimented a simple fetch method that creates a new photo model and adds to the collection for each object in the response. I also add a few helpful methods for working with collections.

{% highlight javascript %}
function PhotosCollection () {
	this.photoscollection = [];
}

PhotosCollection.prototype = {
	fetch: function () {
		return $.ajax({
			success: function (photos) {
				type: "GET",
				photos.forEach(function (photo) {
					var p = new Photo({
						url: photo.url
					});

					this.photoscollection.push(p);
				});
			}
		});
	},
	search: function (key) {
		// using underscore.js to filter search results
		return _.filter(this.photoscollection, function (p) {
				return p.name === key;
			});
	},
	add: function (photo) {
		this.photoscollection.push(photo);
	},
	delete: function (photo) {
		this.photoscollection.forEach(function (p,index) {
			if (p === photo)
				this.photoscollection.pop(index);
		});
	}
}
{% endhighlight %}


###View
A view is the visual representation of models and collections. The best way to render a view is using templates (my favorite template library is [handlebars](http://handlebarsjs.com/) but in this example i'll using [underscore](http://underscorejs.org/#template)).
{% highlight javascript %}
function PhotosCollectionView (collection) {
	this.template = $("#photos-template").html();
	this.photosCollection = collection;
}

PhotosCollectionView.prototype = {
	render: function () {
		// using underscore.js for templating
		var tmp = _.template(this.template);
		tmp = tmp(this.photoscollection);
		$("#collection-view").html(tmp);
	}
}
{% endhighlight %}

###Putting It All Together
main.js
{% highlight javascript %}
var p1 = new Photo({ name: "dog" });
var p2 = new Photo({ name: "cat" });

var pc = new PhotosCollection();
pc.add(p1);
pc.add(p2);

pc.search("dog") // returns array of photo models named dog

var pcView = new PhotosCollectionView(pc);
pcView.render();


// or if you have RESTful routes set up.

pc.fetch().done(function () {
	pcView.render();
});
{% endhighlight %}

###What should you do next?
- Create a [hash router](http://projects.jga.me/routie) to render your views RESTfully
- Use [browserify](http://browserify.org) to organize code into seperate files
- Setup [gulp.js](http://gulpjs.com) to automate tasks (like minifying code).
- Use localStorage to cache collections
- Write tests with [mocha](http://visionmedia.github.io/mocha)




<a href="https://twitter.com/share" class="twitter-share-button" data-via="pau1pau1">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
</script>


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

