---
layout: post
title:  "Transform Origin Property"
date:   2015-06-28 19:07:59
categories: web
tags:
---

<style>
  .rot {
  width: 100px;
  height: 100px;
  background-color: hsla( 0, 100%, 50%, 0.7 );
}

.rot-x {
  transform-origin: 0px 50px;
  animation: rotate-x 6s;
  animation-iteration-count: infinite;
}

.rot-y {
  transform-origin: 50px 0px;
  animation: rotate-y 6s;
  animation-iteration-count: infinite;
}

.rot-z {
  transform-origin: 50px 50px 0px;
  animation: rotate-z 6s;
  animation-iteration-count: infinite;
}

@keyframes rotate-x {
    0%   { transform: perspective(1000px) rotatex(0deg); }
    100% { transform: perspective(1000px) rotatex(360deg); }
}

@keyframes rotate-y {
    0%   { transform: perspective(1000px) rotateY(0deg); }
    100% { transform: perspective(1000px) rotateY(360deg); }
}

@keyframes rotate-z {
    0%   { transform: perspective(1000px) rotateZ(0deg); }
    100% { transform: perspective(1000px) rotateZ(360deg); }
}
</style>

The level of graphical abtractions CSS tranforms brings to the browser never ceases to impress me. The [`transform-origin`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin) property allows users to set the origin of a transformation, for a given element. When combined with `rotate` and [`perspective`](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective) you get a nice three dimensional effect.

<table class="table">
  <tr>
    <td>
      <img src="/images/axis-of-rotation.png" alt="axis of rotation">
    </td>
    <td>
      <div class="rot-container col-1-2">
        <div class="rot rot-x">rotateX</div>
        <div class="rot rot-y">rotateY</div>
        <div class="rot rot-z">rotateZ</div>
      </div>
    </td>
  </tr>
</table>

Below are a few examples I made the other day.

<p data-height="268" data-theme-id="0" data-slug-hash="ZGvbZZ" data-default-tab="result" data-user="paulserraino" class='codepen'>See the Pen <a href='http://codepen.io/paulserraino/pen/ZGvbZZ/'>unbox</a> by Paul Serraino (<a href='http://codepen.io/paulserraino'>@paulserraino</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

<p data-height="268" data-theme-id="0" data-slug-hash="zGpKzr" data-default-tab="result" data-user="paulserraino" class='codepen'>See the Pen <a href='http://codepen.io/paulserraino/pen/zGpKzr/'>reveal</a> by Paul Serraino (<a href='http://codepen.io/paulserraino'>@paulserraino</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Resources

- [transoform-origin docs](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)