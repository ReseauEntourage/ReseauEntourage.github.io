
// *** All pages JS *** //

$(function () {

  // Fixed navbar //
  $(window).scroll(function(){            
    if ($(this).scrollTop() > ($('#stage').offset().top + 200)) {
      $('#navbar').fadeIn(500);
    } else {
      $('#navbar').fadeOut(500);
    }
  });

  // ??? //
  if ($('.docs-top').length) {
    _backToTopButton()
    $(window).on('scroll', _backToTopButton)
    function _backToTopButton () {
      if ($(window).scrollTop() > $(window).height()) {
        $('.docs-top').fadeIn()
      } else {
        $('.docs-top').fadeOut()
      }
    }
  }

  // doc nav js (???) //
  var $toc    = $('#markdown-toc')
  var $window = $(window)

  if ($toc[0]) {

    maybeActivateDocNavigation()
    $window.on('resize', maybeActivateDocNavigation)

    function maybeActivateDocNavigation () {
      if ($window.width() > 768) {
        activateDocNavigation()
      } else {
        deactivateDocNavigation()
      }
    }

    function deactivateDocNavigation() {
      $window.off('resize.theme.nav')
      $window.off('scroll.theme.nav')
      $toc.css({
        position: '',
        left: '',
        top: ''
      })
    }

    function activateDocNavigation() {

      var cache = {}

      function updateCache() {
        cache.containerTop   = $('.docs-content').offset().top
        cache.containerRight = $('.docs-content').offset().left + $('.docs-content').width() + 40
        measure()
      }

      function measure() {
        var scrollTop = $window.scrollTop()
        var distance =  Math.max(scrollTop - cache.containerTop, 0)

        if (!distance) {
          $($toc.find('li')[1]).addClass('active')
          return $toc.css({
            position: '',
            left: '',
            top: ''
          })
        }

        $toc.css({
          position: 'fixed',
          left: cache.containerRight,
          top: 0
        })
      }

      updateCache();

      $(window)
        .on('resize.theme.nav', updateCache)
        .on('scroll.theme.nav', measure)

      $('body').scrollspy({
        target: '#markdown-toc',
        selector: '#markdown-toc li > a'
      })

      setTimeout(function () {
        $('body').scrollspy('refresh');
        
      }, 1000)
    }
  }

  /*** OVERLAY ***/
  
  /*$('body').addClass('with-overlay');
  $('.close-overlay').on('click', function(){
    $('#overlay').fadeOut();
    $('body').removeClass('with-overlay');
  });

  function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
  };

  var entourageToken = getUrlParameter('entourageToken');
  if (entourageToken) {
    $band = $('#join-band');
    $band.find('.entourage-name').text('"Manger avec Pierre"');
    $band.find('.created-time').text('25 décembre');
    $band.find('.user-picture').attr('src', 'https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/1375097_219352668225071_1544888449_n.jpg?oh=d00365819316d803419f7760f9394620&oe=58EE4B94');
    $band.find('.entourage-description').text('"Des personnes SDF de l\'association La Bagagerie mains libres cherchent des tentes et des matelas gonflables !"');
    $band.find('.user-name').text('René');
    $.get( "https://api.entourage.social/api/v1/public/entourage.json?token=" + entourageToken, function({entourage}) {
      $band = $('#join-band');
      $band.find('.entourage-name').text('"' + entourage.title +'"');
      $band.find('.created-time').text(entourage.created_at);
      $band.find('.user-picture').attr('src', entourage.author.avatar_url);
      $band.find('.entourage-description').text('"' + entourage.description +'"');
      $band.find('.user-name').text(entourage.author.display_name);
    });
  }

  setTimeout(function () {
    $('body').scrollTop(0);
  }, 3000);
  */
})