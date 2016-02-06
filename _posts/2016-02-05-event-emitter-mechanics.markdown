---
layout: post
title:  "Event Emitter Mechanics"
date:   2016-02-05 7:07:59
categories: javascript
---

{% highlight javascript %}
function EventEmitter () {
    this.handlers = {};
};

EventEmitter.prototype.emit = function () {
    // convert arguments object to an array
    var args = [].slice.call(arguments);

    // get the event name
    var event = args.shift();

    // apply args to the event's handler
    if (event in this.handlers) {
        this.handlers[event].apply(this, args);
    }
};

EventEmitter.prototype.on = function (event, handler) {
    this.handlers[event] = handler;
};
{% endhighlight %}

Hacking is about taking things apart, figuring out how something works and using that knowledge to build something new and useful. In this blog post, I want to hack event emitters, as they're an essential messaging pattern to understanding javascript programming.

Event emitters are implementations of the publish-subscribe architecture, a messaging pattern where emitters (or publishers) emit event (that are usually key value pairs) to a subscriber.

The event emitter can have many subscriber listening to same event, but each subscriber may be performing a different task based on it's unique context. This what makes event emitters so powerful. They allow developers to write code that is loosely coupled with minimal dependencies.

So how do they work?

Well, based on the example above each instance of the `EventEmitter` class is going in initialize a key value map, `this.handlers`. In the example i'm using a javascript object but one could imagine a more complex event emitter using a sophisticated hash table or a key value database like redis.

The `EventEmitter` class has two methods `emit` and `on`. The `on` method registers the subscriber by an event name (which is usually a string) and an event handler. The subscriber's event name/handler pair are added as key value pairs to the handler store, `this.handlers`.

{% highlight javascript %}
emitter.on('eventname', function handler() {})

// [ Subscriber Handler ] -----> [ Handler Store ]
{% endhighlight %}

The `emit` method reads from the handler store and if an event is found, it applies the `message` arguments to the handler methods.

{% highlight javascript %}
emitter.emit('eventname', 'message')

// [ Handler Store ] -----> [ Handler Method ]
{% endhighlight %}

The above example, while functional, is lacking in good features (also it's poorly implemented since it only allow for one handler per event). It mainly serves as a jumping off point for hacking your own custom event emitter.

#### Good API Features <span style="font-size: 16px;">[1]</span>

- "*", for listening on any event
- inheritance, for bubbling events
- queueing, for processing large numbers of events concurrently
- caching, for optimizing performance


#### Exercise
Implement an event emitter that can execute multiple handlers, so that the following code runs as expected.
{% highlight javascript %}
var ee = new EventEmitter()

ee.on('greeting', function (message) {
    console.log('hello ' + message);
})

ee.on('greeting', function (message) {
    console.log('hi ' + message);
})

ee.emit('greeting', 'world')

// In the console you should see:
// > hello world
// > hi world
{% endhighlight %}

(<a id="show-solution" href="#solution">show solution</a>)
<div id="solution" class="hide">
{% highlight javascript %}
function EventEmitter () {
    this.handlers = {};
};

EventEmitter.prototype.emit = function () {
    var args = [].slice.call(arguments);
    var event = args.shift();
    if (event in this.handlers) {
        this.handlers[event].forEach(function(handler) {
            handler.apply(this, args);
        }.bind(this));
    }
};

EventEmitter.prototype.on = function (event, handler) {

    // put handlers into an array
    if (event in this.handlers) {
        this.handlers[event].push(handler);
    } else {
        this.handlers[event] = [handler];
    }
};

{% endhighlight %}
</div>

### Resources
- [1] [The Magic of Custom Event Emitters (video)](https://www.youtube.com/watch?v=EbdBDR-ZUTA)

<script>
document.addEventListener('DOMContentLoaded', function() {
    var showLink = document.getElementById('show-solution');
    var solution = document.getElementById('solution');

    showLink.addEventListener('click', function(e) {
        e.preventDefault();

        solution.classList.remove('hide');
    });
});
</script>
