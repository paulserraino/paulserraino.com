(function (doc, win, undefined) {

  doc.addEventListener("DOMContentLoaded", main);

  function main () {
    var nav = doc.getElementById('nav');
    affix(nav.offsetTop + 80, nav);
    renderQuote();
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

  function renderQuote() {
    var quotes = [
      'Repetition builds confidence builds strength.'
    , 'Fearlessness begets happiness.'
    , 'Nullius in verba.'
    , 'Everything around you was made by people no smarter than you.'
    , 'To get ahead you have to hustle.'
    ];

    var span = document.querySelectorAll('.quote')[0];
    span.innerText = quotes[Math.floor(Math.random() * quotes.length - 1) + 1];
  }

})(document, window);
