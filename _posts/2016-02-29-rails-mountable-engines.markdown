---
layout: post
title:  "Using Rails Engines Like a Pro"
date:   2016-02-29 6:07:59
categories: rails
thumbnail: rails-logo.png
summary: Learn how to create small reusable rails applications using rails engines.
---

## Motivation

![diagram](/assets/images/rails-engine-diagram.png)

Mounting applications within applications is a powerful technique, that allows developers to build highly scalable applications that are both cost effective and easy to maintain. [Rails Engines](http://api.rubyonrails.org/classes/Rails/Engine.html) give developers the power to transform a rails apps into ruby gems. Many popular ruby gems such as [Device](https://github.com/plataformatec/devise) and [Spree](https://github.com/spree/spree) leverage rails engines to provide default custom views like login forms. Having a suite of rails engines has a ton of advantages and I would recommend refactoring large monolith apps into smaller engines.


## Getting Started

As an example, i'm going to set up a blog that is made up of two component applications a `blog_api` and `blog_core` (the core application). I'm not going to do anything fancy, i'm just going to set up each component as separate rails apps and write a little extra code to make them "mountable".

### Blog API

Let's start by, first, setting up the API.

{% highlight bash %}
# terminal
rails new blog_api
{% endhighlight %}

{% highlight bash %}
# terminal
cd blog_api
rails g scaffold posts title:string context:text
touch blog_api.gemspec
{% endhighlight %}

We also setup a gemspec; this allows us export our rails app as a ruby gem.

{% highlight ruby %}
# ~/blog_api/blog_api.gemspec

$:.push File.expand_path("../lib", __FILE__)

Gem::Specification.new do |s|
  s.name        = "blog_api"
  s.version     = "0.0.1"
  s.authors     = ["Paul Serraino"]
  s.summary     = "testing out mounting apps"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.2.5.1"

  s.add_development_dependency "sqlite3"
end
{% endhighlight %}


Next, we're going to setup the engine itself for our blog API.

{% highlight bash %}
# ~/blog_api

mkdir -p lib/engines/blog_api
touch lib/engines/blog_api/engine.rb
{% endhighlight %}

{% highlight ruby %}
# ~/blog_api/lib/engines/blog_api/engine.rb

module BlogAPI
    class Engine < Rails::Engine
    end
end
{% endhighlight %}

Next, we're going to add one more file

{% highlight bash %}
# ~/blog_api
touch lib/blog_api.rb
{% endhighlight %}

{% highlight ruby %}
# ~/blog_api/lib/blog_api.rb

require 'engines/blog_api/engine'
module BlogAPI
end

{% endhighlight %}

That's it, our blog API is now a ruby gem!

### Blog Core
Now that we have our blog API gem we can include in our core application.

First, we need to setup our core app.

{% highlight bash %}
# ~/
rails new blog_core
cd blog_core
{% endhighlight %}

In our gem file we're going to include the `blog_api` gem that we just created, using a relative path.

{% highlight ruby %}
# ~/blog_core/Gemfile

gem 'blog_api', path: '../blog_api'
{% endhighlight %}

Next, we need to run the `blog_api` migrations with `blog_core`.

{% highlight bash %}
# ~/blog_core
rake blog_api:install:migrations
{% endhighlight %}

And that's it! We have successfully mounted our `blog_api` within `blog_core`.

So this was just a boilerplate example of using rails engines (just to get started). There are many was of making your rails engine more robust, such as mounting an engine on a specific route or autosyncing database migrations. I'm not going to go into too much depth in optimizing a rails engine in this post , there are plenty of resources online to help you out, if you're interested in doing that, but I will briefly cover autosyncing database migrations since it's fairly easy to accomplish.

## Syncing Migrations
Interestingly, Rails Engines inherent from [Railties](http://api.rubyonrails.org/classes/Rails/Railtie.html). Railties allow developers to hook into and extend the Rails initialization process. So we can write initializers in our `blog_api` engine and Rails will execute the initializers when the gem is required.

Let's set up an initialization process to append the `blog_api` migrations to the migrations found in `blog_core`.

{% highlight ruby %}
# ~/blog_api/lib/engines/blog_api/engine.rb

module App1
    class Engine < Rails::Engine

        initializer :append_migrations do |app|
            unless app.root.to_s.match(root.to_s)
                config.paths["db/migrate"].expanded.each do |expand_path|
                    app.config.paths['db/migrate'] << expand_path
                end
            end
        end

    end
end
{% endhighlight %}

Now we can simply run `rake db:migrate` and `blog_core` will know to include the `blog_api` migrations.

{% highlight bash %}
# ~/blog_core
rake db:migrate
{% endhighlight %}

## Resources

- [Rails Engine Docs](http://api.rubyonrails.org/classes/Rails/Engine.html)
- [rails-mountable-engines](https://www.amberbit.com/blog/2015/10/15/rails-mountable-engines)
