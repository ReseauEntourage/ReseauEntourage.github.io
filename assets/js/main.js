
// *** Main page JS *** //

$(function () {
  $.get( "https://api.entourage.social/api/v1/stats.json", function( data ) {
    $("#assos_number").text(data["organizations"])
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
    $band.find('.user-name').text('Augustin');
    $band.slideDown();
    $.get( "https://api.entourage.social/api/v1/public/entourage.json?token=" + entourageToken, function({entourage}) {
      $band = $('#join-band');
      $band.find('.entourage-name').text('"' + entourage.title +'"');
      $band.find('.created-time').text(entourage.created_at);
      $band.find('.user-picture').attr('src', entourage.author.avatar_url);
      $band.find('.entourage-description').text('"' + entourage.description +'"');
      $band.find('.user-name').text(entourage.author.display_name);
      $band.slideDown();
    });

    $('.navbar-toggle').on('click', function(){
      $band.toggle();
      $('body').scrollTop(0);
    });
  }

  $('.close-overlay').on('click', function(){
    $('#overlay').fadeOut();
    $('body').removeClass('with-overlay');
  });
});