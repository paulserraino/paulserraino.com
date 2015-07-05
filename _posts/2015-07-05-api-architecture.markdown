---
layout: post
title:  "the C in MVC"
date:   2015-07-05 18:07:59
categories: web
tags:
---

The controller (the 'C' in MVC), is the bridge between the end-user and the data model. Architecturally it is pretty straight forward. A user requests information and the controller interprets what is needed, than returns the necessary information from the data model to the view (and the view can be html, json, xml...etc). The problem is in how controllers are implemented. I would argue that poor implementation is the result of a misunderstanding of MVC architecture. The model can be any source of data, it does not necessarily need to be from your internal database. The model is simply some data source that can be interfaced. So the controller should really be database agnostic. If you're using an ORM in your controller, you're doing it wrong. I would advocate that the controller should act as a method, that executes a set of microservices. Those services would ideally perform data transformations, accessing internal or external data sources (whatever is most necessary).

For example, lets say we have a some set RESTful endpoints.

- POST   /api/model
- GET    /api/model
- GET    /api/model/:id
- PUT    /api/model/:id
- DELETE /api/model/:id

Than the controller might be structured as such (and let's just pretend we're using node.js to pipe the data into a set of microservices).

{% highlight javascript linenos %}
module.exports.action = function (request, response) {
  request
    .pipe(microservice)
    .pipe(microservice)
    .pipe(microservice)
    .pipe(response)
}
{% endhighlight %}

A more "real world" example can be found [here](https://github.com/paulserraino/node-app-architecture).
