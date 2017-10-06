
// *** Main page JS *** //

$(function () {

  var apiUrl = 'https://api.entourage.social/api/v1/public';
  if (window.location.hostname == 'entourage-landingpages-preprod.herokuapp.com' || window.location.hostname == 'localhost')
    apiUrl = 'https://entourage-back-preprod.herokuapp.com/api/v1/public';
  
  $.get(apiUrl + '/stats.json', function( data ) {
    $("#assos_number").text(data["organizations"]);
  });


  // Hide wrong OS button //

  var mobileOS = getMobileOperatingSystem();

  if (mobileOS == 'iOS')
    $('.android-download-btn').hide();
  else if (mobileOS == 'Android')
    $('.apple-download-btn').hide();


  // Get and display Entourage's details //

  var searchToken = /\/entourages\/([a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12})/.exec(window.location.pathname);
  if (searchToken) {

    $band = $('#join-band');
    
    $.get(apiUrl + '/entourages/' + searchToken[1], function({entourage}) {
      var html = '<p class="need-you"><b class="user-name">' + entourage.author.display_name + '</b> a besoin de toi !</p>';
      html += '<div class="entourage-card">';
      html += '<h1 class="entourage-name">' + entourage.title + '</h1>';
      html += '<p class="entourage-info">';
      if (entourage.author.avatar_url)
        html += '<i class="user-picture" style="background-image: url(' + entourage.author.avatar_url + ')"></i>';
      html += '<span class="user-name">' + entourage.author.display_name + '</span>';
      html += '<span class="created-time"> - ' + entourage.created_at + '</span>';
      if (entourage.approximated_location)
        html += ', <span>' + entourage.approximated_location + '</span>';
      html += '</p>';

      if (entourage.description.length)
        html += '<p class="entourage-description">' + entourage.description + '</p>';

      html += '</div>';
      html += '<p class="join">Rejoins dès maintenant son action solidaire en téléchargeant l\'application Entourage !</p>';
      html += '<div class="buttons">';
      html += '<a href="https://itunes.apple.com/fr/app/entourage-reseau-civique/id1072244410?mt=8" target="_blank" title="Télécharger sur l\'App Store d\'Apple">';
      html += '<img src="/assets/img/download-iphone.png" alt="L\'application Entourage est disponible sur Iphone">';
      html += '</a>';
      html += '<a href="https://play.google.com/store/apps/details?id=social.entourage.android" target="_blank" title="Télécharger sur Google Play">';
      html += '<img src="/assets/img/download-android.png" alt="L\'application Entourage est disponible sur Android">';
      html += '</a>';
      html += '</div><a class="close-band">X Fermer</a>';
      html += '</div>';

      $band.html(html).slideDown();
      $band.find('a.close-band').on('click', function(){
        $band.slideUp();
      });
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


  /* Tracking events */
  $('.apple-download-btn').add('.android-download-btn').on('click', function(e){
    fbq('track', 'ViewContent');
  });

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

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
  }

  return "unknown";
}