---
layout: post
title:  "React Mixins"
date:   2015-07-17 18:07:59
categories: web
tags:
---

I spent a couple of hours playing around with React mixins today (see [here](https://github.com/paulserraino/react-validate-mixin) and [here](https://github.com/paulserraino/react-mixin-starter)), it's a great way to separate business logic from your components. Unfortunately, this level of flexibility can lead to bad software patterns, as you can use mixins to manipulate state. [This](https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918#a58c) article by Eric Elliott sheds some light on the matter of using business logic in React components. He argues that components should be stateless and i'm still not sure that I completely agree. After all UI isn't exactly stateless and i'm sure there are many cases where the solution doesn't fit into that software model; but my guess is, the main take away is that state should be minimal. So have fun making mixins, but be wary of relying on too much state.
