---
path: "/flux-dispatcher-primer"
title:  "Flux Dispatcher Primer"
date: "2016-02-09T17:12:33.962Z"
summary: "The flux dispatcher is not a traditional event-emitter that we, javascript developers, know and love. The flux dispatcher broadcasts messages to a single subscriber, resulting in unidirectional data flow."
thumbnailRef: "flux-logo"
---

The flux dispatcher is not a traditional [event emitter](/javascript/2016/02/05/event-emitter-mechanics.html) that we, javascript developers, know and love. The flux dispatcher is meant to broadcast unidirectional messages. Messages, that are emitted by one or more publishers to a single subscriber. This gives rise to some interesting patterns and is a nice solution that decouples UI components from the application stores.

For the sake of understanding these concepts, i'm going to call the single subscriber a 'registered callback'; and let's call the messages emitted by the publishers, 'payloads'.

```javascript
// ex. registered callback
const token = dispatcher.register(payload => {
    // handle payload data
})
```

At a glance, the registered callback may seem completely useless, since using a traditional pub/sub subscriber (via `.on` method) works perfectly, but using a basic event emitter becomes problematic when modeling application into stores. The data coming in from the server is relational (the majority of the time). So for each update in a relational data store would require updates to cascade from parent dependencies. The flux dispatcher solves this issue with [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

The flux dispatcher has method called [`.waitFor`](https://github.com/facebook/flux/blob/master/src/Dispatcher.js#L152). This method leverages promises to wait for each parent dispatcher to resolve before invoking the next child registered callback.

```
//[dispatch: Update Store 3] -> [Update Store 1] -> [Wait for: Store 1] -> [Wait for: Store 2] -> [Update Store 3]
```


The `.waitFor(id)` method knows the order in which to invoke each registered callback via a dispatcher token.

<br>
<br>
fin.
