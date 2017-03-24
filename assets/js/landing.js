
// *** Landing page JS *** //

$(function () {

  var utmSource = getUrlParameter('utm_source');

  if (utmSource) {
    $('.landing-download-buttons a').each(function() {
      $(this).attr('href', $(this).attr('href') + utmSource);
    });
  }

  var mobileOS = getMobileOperatingSystem();
  if (mobileOS == 'iOS')
    $('.landing-download-buttons .android').hide();
  else if (mobileOS == 'Android')
    $('.landing-download-buttons .apple').hide();

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