;

var map;
var lastEncounter = 0;
var encounterList = new Map;

function initialize() {

  if(window.location.hash !="") {
    encounter=window.location.hash.substring(1);
  }

  var centerLatlng = new google.maps.LatLng(48.8740710605701,2.28949543195957);
  var mapOptions = {
    zoom: 15,
    center: centerLatlng
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var infowindow = new google.maps.Marker({
        map: map,
        position: pos,
        icon: '/images/here.png'
      });

      if(encounter>0) {
        //console.log(encounter);
      } else {
        map.setCenter(pos);
      }
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

  encounters.forEach(function(e) {
    var myLatlng = new google.maps.LatLng(e.latitude, e.longitude); //48.8740710605701,2.28949543195957);//48.8393523,2.3361957);
    var mapOptions = {
      zoom: 13,
      center: myLatlng
    };

    var getTitle = function(e) {
      return e.user_name+' a rencontré '+e.street_person_name;
    }

    var getHTMLTitle = function(e) {
      return '<h1 id="firstHeading" class="firstHeading">'
        +getTitle(e)
        +'</h1>';
    }

    var getTwitterLink = function(e) {
        return "http://entourage.social/encounters/"+e.id;
    }

    var getVocalMessage = function(e){
      if(e.voice_message==null || e.voice_message ==="")
        return "";
      /*if(e.voice_message.search("soundcloud")==-1 || e.voice_message.search("api.soundcloud")==-1) {
        return '<br/>Message vocal : <a target="_blank" href="'+e.voice_message+'">'+e.voice_message+'</a>';
      }*/
      return '<iframe width="100%" height="166" scrolling="no" frameborder="no" '+
      'src="https://w.soundcloud.com/player/?url='+e.voice_message+
      '&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true'+
      '&amp;show_reposts=false"></iframe>';
    }

    var getTwitterMessage = function(e) {
      return 'Rencontre avec '+e.street_person_name+", via l'application Entourage "+
      getTwitterLink(e)+
      ' @R_Entour';
    }

    /*var getFacebookButton =function(e) {
      return '<div id="fb-'+e.id+'"class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="100" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>';
    }
    */

    var getMessage = function(e) {
      return '<div id="bodyContent">'+
          '<div id=twitter-msg-entourage><a class="twitter-hashtag-button" href="https://twitter.com/intent/tweet?button_hashtag=entourage&text='+
          encodeURI(getTwitterMessage(e))+'" data-related="twitter"> Tweet #entourage </a></div>'+
          //getFacebookButton(e)+
          '<p>'+e.message+'</p>'+getVocalMessage(e)+
          '</div>';
    }

    var contentString = '<div id="content">'+
          '</div>'+
          getHTMLTitle(e)+
          getMessage(e)+
          '</div>';

      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      var encounter_img = "/images/rencontre2.png";
      if(e.voice_message!==null && e.voice_message.search('soundcloud')!==-1) {
        encounter_img = "/images/rencontre.png";
      }

      var titleFormat = "#";

      var parseTitleForId = function (newtitle) {
        return parseInt(newtitle.replace(titleFormat,""));
      }

      var setTitleFromId = function (newid) {
        return titleFormat+newid;
      }

      var marker = new google.maps.Marker({
          position: myLatlng,
          icon: encounter_img,
          map: map,
          title: setTitleFromId(e.id)+": "+getTitle(e)
      });
      encounterList.set(e.id, {marker:marker, infoWindow: infowindow});

      var openMarker = function(marker, newid) {
        if(lastEncounter!=0) {
          console.log(lastEncounter);
          var enc  = encounterList.get(parseInt(lastEncounter));
          if(enc) {
            enc.infoWindow.close(map);
            lastEncounter = 0;
          }
        }
        infowindow.open(map,marker);
        lastEncounter=newid;
      }

      google.maps.event.addListener(marker, 'click', function() {
        window.location.hash="#"+parseTitleForId(marker.title);
      });

      if(e.id==encounter) {
        map.setCenter(myLatlng);
        openMarker(marker, encounter);
      }

  });
}

function hashchanged(){
  if((lastEncounter) &&(lastEncounter!=0)) {
      var enc  = encounterList.get(parseInt(lastEncounter));
      if(enc) {
        enc.infoWindow.close(map);
      }
      lastEncounter = 0;
  }
  if(window.location.hash=="")
    return;
  lastEncounter = window.location.hash.substring(1);
  var en = encounterList.get(parseInt(lastEncounter));
  if(en) {
    en.infoWindow.open(map,en.marker);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Erreur: Pas de service de Géolocation.';
  } else {
    var content = 'Erreur: Votre naviguateur ne supporte pas la géolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(48.8393523,2.3161957),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
window.onhashchange = hashchanged;

// BEGIN SMOOTH SCROOLING
function bindSmoothScrolling() {
  // from https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        $('html,body').animate({
          scrollTop: $target.offset().top
        }, 1000);
        return false;
      }
    }
  });
}
// END SMOOTH SCROOLING

jQuery(document).ready(function ( $ ) {
  // BEGIN CALLS
  // END CALLS

  // BEGIN BINDS
  bindSmoothScrolling();
  //bindGoogleMap();
  // END BINDS

  // BEGIN MANUAL BINDS
  // END MANUAL BINDS
});
