(function (doc, win, undefined) {

  doc.addEventListener("DOMContentLoaded", main);

  function main () {
    var nav = doc.getElementById('nav');
    affix(nav.offsetTop + 50, nav);
  }

  function affix (offset, el) {
    win.onscroll = function () {
      var dy = win.scrollY;
      if (dy > offset) {
        return el.classList.add('affix')
      }
      return el.classList.remove('affix');
    }
  }

})(document, window);
