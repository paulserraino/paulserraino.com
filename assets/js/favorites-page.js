Handlebars.registerHelper('eq', function(a, b, options) {
  if ( !options || typeof options.fn !== 'function' ) return a === b;
  return options[a === b ? 'fn' : 'inverse'](this);
});

(function() {
  var favData = [
    { type: 'music', src: 'https://embed.spotify.com/?uri=spotify:user:tallpaul11:playlist:6od2kerzt4iedS5qx3g2fQ'},
    { type: 'music', src: 'https://embed.spotify.com/?uri=spotify:user:tallpaul11:playlist:3WGnClFppCZrQjXSFsc48F'},
    { type: 'artist', src: '/assets/images/antony-gormley.jpg', link: 'http://www.antonygormley.com'},
    { type: 'movie', src: 'https://www.youtube.com/embed/tFMo3UJ4B4g'},
    { type: 'artist', src: '/assets/images/buckminster.jpg', link: 'https://www.bfi.org'},
    { type: 'movie', src: 'https://www.youtube.com/embed/bPsedLjDAcw'},
    { type: 'artist', src: '/assets/images/tim-biskup.jpg', link: 'http://www.timbiskup.com'},
    { type: 'music', src: 'https://embed.spotify.com/?uri=spotify:user:tallpaul11:playlist:1ksNG4iDfAacJUubx7aVAF'},
    { type: 'artist', src: '/assets/images/dan-mumford.jpg', link: 'http://www.dan-mumford.com'},
    { type: 'artist', src: '/assets/images/marc-quinn.jpg', link: 'http://marcquinn.com'},
    { type: 'webDev', src: 'https://www.youtube.com/embed/GhFrlX0LdFA'},
    { type: 'webDev', src: 'https://www.youtube.com/embed/2Op3QLzMgSY'},
    { type: 'movie', src: 'https://www.youtube.com/embed/ClcQUlXcCKw'},
    { type: 'webDev', src: 'https://www.youtube.com/embed/vTHRHWIacI0'},
    { type: 'movie', src: 'https://www.youtube.com/embed/ZjDbJQKDXCY'}
  ];

  var _favTemplate = `
  <div class="fav-grid">
    {{#each data}}
    <div class="fav-grid-item {{type}}">
      {{#if (eq type "music")}}
        <iframe src="{{ src }}" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
      {{/if}}
      {{#if (eq type "movie")}}
        <iframe width="300" height="315" src="{{ src }}" frameborder="0" allowfullscreen></iframe>
      {{/if}}
      {{#if (eq type "artist")}}
        <a href="{{link}}" target="_blank">
        <img src="{{ src }}" style="width: 300px;" alt="">
        </a>
      {{/if}}
      {{#if (eq type "webDev")}}
        <iframe width="300" height="315" src="{{ src }}" frameborder="0" allowfullscreen></iframe>
      {{/if}}
      </div>
    {{/each}}
  </div>
  `;

  document.addEventListener("DOMContentLoaded", main, false);

  function main() {
    initFavGrid(favData);
    setTimeout(function() {
      var iso = initIsotope();
      initEvents(iso);
    }, 100);
  }

  function shuffleFavItems(data) {
    for (var i = data.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }
    return data;
  }

  function initIsotope() {
    var elem = document.querySelector('.fav-grid');
    var iso = new Isotope(elem, {
      itemSelector: '.fav-grid-item',
      layoutMode: 'packery'
    });

    return new Isotope('.fav-grid', {});
  }

  function initFavGrid(data) {
    var source = _favTemplate;
    var template = Handlebars.compile(source);
    document.getElementById('fav-grid').innerHTML = template({data: data});
  }

  function initEvents(iso) {
    var buttons = document.querySelectorAll('.fav-button-group');
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].addEventListener('click', filter, false);
    }

    function filter(event) {
      var buttons = document.querySelectorAll('.fav-button-group button');
      for (var b = 0; b < buttons.length; b++) {
        buttons[b].classList.remove('active');
      }
      var val = event.target.value;
      event.target.classList.add("active");
      iso.arrange({
        filter: function( itemElem ) {
          if (val === 'all') {
            return true;
          }
          var list = itemElem.getAttribute('class').split(' ')
          return list.indexOf(val) > -1;
        }
      });
    }
  }
})();
