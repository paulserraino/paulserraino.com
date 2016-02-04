---
layout: post
title:  "Modular Gulp Tasks"
date:   2016-02-04 6:07:59
categories: javascript
---

One of my favorite principles for software engineering is the DRY (don't repeat yourself) principle. It's often one the first things I think about before writing a line of code, because in the majority of cases it leads to smaller and more maintainable code bases.

Unfortunately, adhering to the DRY principle when working with build systems isn't always easy. Some build systems require developers to write custom procedures for each task; which begets large and complex build processes that are sluggish and hard to maintain; which begets slow developer work flows; which begets developer sadness. So in an effort to combat developer sadness and adhere to the DRY principle, I propose, writing (and using) modular tasks at all cost.

In my opinion it's possible for front-end developers to efficiently use modular build system tasks. After all, most front-end developers are using the same tools to build their projects. We're using less or sass precompilers for css, along with browserify or webpack to build front-end javascript; and we are often using the same tools for optimizing and even deploying our code bases.

Let's stop repeating ourselves.

Since my build system of choice is Gulp.js, i'm advocating using (and writing) gtasks, to modularize common gulp tasks.

[gtask-browserify](https://github.com/paulserraino/gtask-browserify)

{% highlight javascript %}
const gulp = require('gulp')
const Bundler = require('gtask-browserify')

gulp.task('default', ['js'])
gulp.task('watch', ['watch-js'])

const bundler = Bundler({
    entries: ['./public/js/src/main.js'],
    dest: './public/js/dist',
    transform: ["babelify"],
})

gulp.task('js', function() {
    return bundler.bundle()
})

gulp.task('js-watch', function() {
    return bundler.watch()
})

{% endhighlight %}
