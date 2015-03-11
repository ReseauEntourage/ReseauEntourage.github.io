// When the user clicks the marker, an info window opens.

var map;
var lastOpenMarker=null;
var lastOpenWindow=null;

function initialize() {

  var encounters = [ {
            "id": 81,
            "date": "2014-10-13T21:12:00.000+02:00",
            "latitude": 48.851811,
            "longitude": 2.335968,
            "user_id": 4,
            "user_name": "Romain",
            "street_person_name": "Pablo",
            "message": "Voici le beau message audio de Pablo : http://youtu.be/f5-9ew-Rw3s",
            "voice_message": "http://youtu.be/f5-9ew-Rw3s"
        },
        {
            "id": 68,
            "date": "2014-10-11T18:51:15.000+02:00",
            "latitude": 48.8712568125142,
            "longitude": 2.33136908565056,
            "user_id": 1,
            "user_name": "Entourage",
            "street_person_name": "Michel",
            "message": "La vie est belle",
            "voice_message": null
        },
        {
            "id": 69,
            "date": "2014-10-11T20:22:25.000+02:00",
            "latitude": 48.8759571201786,
            "longitude": 2.33727747754614,
            "user_id": 1,
            "user_name": "Entourage",
            "street_person_name": "bebert ",
            "message": "Coucou ",
            "voice_message": null
        },
        {
            "id": 107,
            "date": "2014-11-28T12:53:15.000+01:00",
            "latitude": 48.8667828315671,
            "longitude": 2.30354050007208,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "Daniel ",
            "message": "Cherchait un regard bienveillant et â manger\nAi partagé un sourire et une partie de mon dejeuner \nNous avons peu échangé car il parlait peu francais ",
            "voice_message": null
        },
        {
            "id": 82,
            "date": "2014-10-27T21:09:00.000+01:00",
            "latitude": 46.852253670305,
            "longitude": 2.33663553153799,
            "user_id": 3,
            "user_name": "Dominique",
            "street_person_name": "laurent",
            "message": "Je suis sdf, rue Felibien, si vous avez des vêtements chauds pour l'hiver, bonne pioche et merci",
            "voice_message": ""
        },
        {
            "id": 75,
            "date": "2014-10-13T20:46:00.000+02:00",
            "latitude": 48.8560898973607,
            "longitude": 2.32746785566647,
            "user_id": 6,
            "user_name": "Jean-Marc",
            "street_person_name": "patrick",
            "message": "On sait faire un bon café ! \r\nmessage vocal sur : https://soundcloud.com/dominique-lequepeys/sets/patrickstthomasdaquin",
            "voice_message": "https://soundcloud.com/dominique-lequepeys/sets/patrickstthomasdaquin"
        },
        {
            "id": 86,
            "date": "2014-10-27T19:30:00.000+01:00",
            "latitude": 48.8533699,
            "longitude": 2.334114,
            "user_id": 3,
            "user_name": "Dominique",
            "street_person_name": "Cedo",
            "message": "message vocal : \r\nhttps://soundcloud.com/dominique-lequepeys/sets/cedo\r\nou \r\nhttps://www.dropbox.com/s/6gnis34ww0vbd07/C%C3%A9do.m4a?dl=0",
            "voice_message": "https://www.dropbox.com/s/6gnis34ww0vbd07/C%C3%A9do.m4a?dl=0"
        },
        {
            "id": 84,
            "date": "2014-10-20T21:21:00.000+02:00",
            "latitude": 48.8522078060117,
            "longitude": 2.33663553153799,
            "user_id": 4,
            "user_name": "Romain",
            "street_person_name": "Germain",
            "message": "https://soundcloud.com/dominique-lequepeys/sets/germain",
            "voice_message": "https://soundcloud.com/dominique-lequepeys/sets/germain"
        },
        {
            "id": 87,
            "date": "2014-10-20T20:10:00.000+02:00",
            "latitude": 48.851727,
            "longitude": 2.335709,
            "user_id": 3,
            "user_name": "Dominique",
            "street_person_name": "Nicolas",
            "message": "https://soundcloud.com/dominique-lequepeys/sets/nicolas",
            "voice_message": "https://soundcloud.com/dominique-lequepeys/sets/nicolas"
        },
        {
            "id": 76,
            "date": "2014-10-13T21:43:00.000+02:00",
            "latitude": 48.8509149346226,
            "longitude": 2.3308142096913,
            "user_id": 6,
            "user_name": "Jean-Marc",
            "street_person_name": "John tiger",
            "message": "https://soundcloud.com/dominique-lequepeys/sets/john-tiger",
            "voice_message": "https://soundcloud.com/dominique-lequepeys/sets/john-tiger"
        },
        {
            "id": 94,
            "date": "2014-11-13T23:05:35.000+01:00",
            "latitude": 48.8835519060369,
            "longitude": 2.3272970297379,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "Jean-Claude",
            "message": "Croisé sur mon trajet pour aller au bureau \nIl m arrive parfois de le croiser. Ce matin je me suis arrêtée et nous avons discuté quelques minutes.",
            "voice_message": null
        },
        {
            "id": 95,
            "date": "2014-11-16T16:36:17.000+01:00",
            "latitude": 48.8588311778011,
            "longitude": 2.35809319933971,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "jean",
            "message": "",
            "voice_message": null
        },
        {
            "id": 97,
            "date": "2014-11-16T16:38:00.000+01:00",
            "latitude": 48.8611977162195,
            "longitude": 2.35718255714797,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "david",
            "message": "Pas du tout en forme aujourd hui \nÂ beaucoup changé depuis 3 mois et est encore plus en galère ",
            "voice_message": null
        },
        {
            "id": 99,
            "date": "2014-11-16T16:39:24.000+01:00",
            "latitude": 48.8582217568069,
            "longitude": 2.35789349518673,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "patrick ",
            "message": "Heureux d annoncer son déménagement ",
            "voice_message": null
        },
        {
            "id": 103,
            "date": "2014-11-18T09:11:22.000+01:00",
            "latitude": 48.8912284455924,
            "longitude": 2.34739920754201,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "Hugo ",
            "message": "Hugo avait besoin de manger avec son amie \nLui ai donné un TR\nNous avons discuté un peu \nJ étais chargée et il m a aidée à porter mes sacs ",
            "voice_message": null
        },
        {
            "id": 104,
            "date": "2014-11-26T20:46:00.000+01:00",
            "latitude": 48.8561990583553,
            "longitude": 2.32749636358809,
            "user_id": 16,
            "user_name": "Arthur",
            "street_person_name": "Patrice ",
            "message": "Patrice vous souhaite une bonne soirée et une bonne nuit !\r\nmessage vocal : https://soundcloud.com/dominique-lequepeys/patrice",
            "voice_message": ""
        },
        {
            "id": 102,
            "date": "2014-11-16T16:42:00.000+01:00",
            "latitude": 48.8583,
            "longitude": 2.3576,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "Anna",
            "message": "Habite seule dans le quartier\r\nElle a accepté de dejeuner avec nous ",
            "voice_message": ""
        },
        {
            "id": 101,
            "date": "2014-11-16T16:41:00.000+01:00",
            "latitude": 48.8582,
            "longitude": 2.3578,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "robert",
            "message": "Est venu donner un coup de mains sérieux pour la cuisine ",
            "voice_message": ""
        },
        {
            "id": 100,
            "date": "2014-11-16T16:41:00.000+01:00",
            "latitude": 48.8581,
            "longitude": 2.3579,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "fabrice ",
            "message": "Â la recherche d une photo où il chantait â rome ",
            "voice_message": ""
        },
        {
            "id": 98,
            "date": "2014-11-16T16:38:00.000+01:00",
            "latitude": 48.8611,
            "longitude": 2.3571,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "sabrina",
            "message": "En colère aujourd hui",
            "voice_message": ""
        },
        {
            "id": 96,
            "date": "2014-11-16T16:36:00.000+01:00",
            "latitude": 48.8588,
            "longitude": 2.358,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "panini",
            "message": "",
            "voice_message": ""
        },
        {
            "id": 108,
            "date": "2014-12-07T13:55:19.000+01:00",
            "latitude": 48.855835910048,
            "longitude": 2.42135047820901,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "Jacqueline ",
            "message": "Au congrès de l ecologie humaine\nLui est présenté la personne en charge de l alvéole personnes de la rue car elle souhaite exprimer son point de vue ",
            "voice_message": null
        },
        {
            "id": 109,
            "date": "2014-12-19T10:26:42.000+01:00",
            "latitude": 48.8519272443923,
            "longitude": 2.33630067122579,
            "user_id": 6,
            "user_name": "Jean-Marc",
            "street_person_name": "Pierrot, Laurent, Jean et Cyril",
            "message": "",
            "voice_message": null
        },
        {
            "id": 110,
            "date": "2014-12-19T10:28:39.000+01:00",
            "latitude": 48.8587317103975,
            "longitude": 2.34588942490738,
            "user_id": 6,
            "user_name": "Jean-Marc",
            "street_person_name": "Pierrot, Laurent, Jean et Cyril",
            "message": "",
            "voice_message": null
        },
        {
            "id": 111,
            "date": "2015-01-15T00:00:05.000+01:00",
            "latitude": 48.8455884971393,
            "longitude": 2.34141293870138,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "sophie",
            "message": "Pour la soirée mensuelle des anniversaires â la moquette",
            "voice_message": null
        },
        {
            "id": 112,
            "date": "2015-01-15T00:00:34.000+01:00",
            "latitude": 48.8455884971393,
            "longitude": 2.34141293870138,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "jean pierre",
            "message": "Que je b avais pas croisé depuis un moment ",
            "voice_message": null
        },
        {
            "id": 113,
            "date": "2015-01-15T00:00:47.000+01:00",
            "latitude": 48.8455884971393,
            "longitude": 2.34141293870138,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "isabelle",
            "message": "Qui chsbteur",
            "voice_message": null
        },
        {
            "id": 114,
            "date": "2015-01-15T00:01:14.000+01:00",
            "latitude": 48.8455884971393,
            "longitude": 2.34141293870138,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "Christian ",
            "message": "Qui etait dàns une petite forme ",
            "voice_message": null
        },
        {
            "id": 115,
            "date": "2015-01-15T00:01:48.000+01:00",
            "latitude": 48.8455884971393,
            "longitude": 2.34141293870138,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "olivier",
            "message": "Qui m â compter ses récits de jeunesse ",
            "voice_message": null
        },
        {
            "id": 67,
            "date": "2014-10-11T18:33:56.000+02:00",
            "latitude": 48.8621099473717,
            "longitude": 2.34554665096407,
            "user_id": 1,
            "user_name": "Entourage",
            "street_person_name": "Michel",
            "message": "Dans la rue",
            "voice_message": null
        },
        {
            "id": 74,
            "date": "2014-10-12T21:17:09.000+02:00",
            "latitude": 48.8718413984539,
            "longitude": 2.38869024068658,
            "user_id": 3,
            "user_name": "Dominique",
            "street_person_name": "Sylvain ",
            "message": "On a discuté de politique",
            "voice_message": null
        },
        {
            "id": 136,
            "date": "2015-01-30T12:18:31.000+01:00",
            "latitude": 48.8702772980279,
            "longitude": 2.3072778221877,
            "user_id": 1,
            "user_name": "Entourage",
            "street_person_name": "jean",
            "message": "Message",
            "voice_message": "https://api.soundcloud.com/tracks/188618292"
        },
        {
            "id": 144,
            "date": "2015-01-30T16:15:28.000+01:00",
            "latitude": 48.8763044797995,
            "longitude": 2.31906208387125,
            "user_id": 6,
            "user_name": "Jean-Marc",
            "street_person_name": "Jacques",
            "message": "",
            "voice_message": "https://api.soundcloud.com/tracks/188643542/stream"
        },
        {
            "id": 152,
            "date": "2015-02-06T09:33:47.000+01:00",
            "latitude": 48.8576067605212,
            "longitude": 2.3469306767279,
            "user_id": 6,
            "user_name": "Jean-Marc",
            "street_person_name": "Martine",
            "message": "",
            "voice_message": "https://api.soundcloud.com/tracks/189752405/stream"
        },
        {
            "id": 156,
            "date": "2015-02-14T12:15:36.000+01:00",
            "latitude": 45.14676551,
            "longitude": 5.83955714000002,
            "user_id": 6,
            "user_name": "Jean-Marc",
            "street_person_name": "Joseph Wresinsky",
            "message": "Je recommande à tous la lecture du livre \"L'hommr qui déclara la guerre à la misère\" chez Albin Michel, bip de Joseph Wresinski fondateur d'ATD Quart Monde",
            "voice_message": "https://api.soundcloud.com/tracks/191082827/stream"
        },
        {
            "id": 157,
            "date": "2015-02-16T18:53:14.000+01:00",
            "latitude": 48.871093862286,
            "longitude": 2.30742706024417,
            "user_id": 3,
            "user_name": "Dominique",
            "street_person_name": "Maxime ",
            "message": "",
            "voice_message": "https://api.soundcloud.com/tracks/191441446/stream"
        },
        {
            "id": 158,
            "date": "2015-02-16T20:47:12.000+01:00",
            "latitude": 48.8740710605701,
            "longitude": 2.29949543195957,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "Valentin",
            "message": "\n",
            "voice_message": "https://api.soundcloud.com/tracks/191461809/stream"
        },
        {
            "id": 159,
            "date": "2015-02-16T20:50:07.000+01:00",
            "latitude": 48.8740710605857,
            "longitude": 2.29949543195957,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "Nicolas",
            "message": "",
            "voice_message": "https://api.soundcloud.com/tracks/191462356/stream"
        },
        {
            "id": 160,
            "date": "2015-02-16T23:13:35.000+01:00",
            "latitude": 48.8739162258585,
            "longitude": 2.29978581433144,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "Élie ",
            "message": "Très belle discussion sur les thèmes de Société, sur la manière dont on peut se rejoindre malgré la différence ",
            "voice_message": ""
        },
        {
            "id": 166,
            "date": "2015-02-23T08:22:56.000+01:00",
            "latitude": 48.8588224368964,
            "longitude": 2.35792201123549,
            "user_id": 10,
            "user_name": "Florence",
            "street_person_name": "Arlette ",
            "message": "Rencontre poignante avec Arlette à la recherche urgente d un toit .... Ai pris son téléphone, lui ai laissé le mien et lui ai donné quelques contacts....\n",
            "voice_message": ""
        }
    ];

    var entourageBackURL = 'http://entourage-back.herokuapp.com/map?token=0cb4507e970462ca0b11320131e96610&limit=0&distance=1&latitude=48.8464021&longitude=2.332417';
    $.get(entourageBackURL, function( data ) {
      console.log( data );
    });

  var centerLatlng = new google.maps.LatLng(48.8740710605701,2.28949543195957);
  var mapOptions = {
    zoom: 13,
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

      map.setCenter(pos);
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
      return '<h1 id="firstHeading" class="firstHeading">'
        +e.user_name+' & '+e.street_person_name
        +'</h1>';
    }

    var getVocalMessage = function(e){
      if(e.voice_message==null || e.voice_message ==="")
        return "";
      if(e.voice_message.search("soundcloud")==-1) {
        return '<br/>Message vocal : <a target="_blank" href="'+e.voice_message+'">'+e.voice_message+'</a>';
      }
      return '<iframe width="100%" height="166" scrolling="no" frameborder="no" '+
      'src="https://w.soundcloud.com/player/?url='+e.voice_message+
      '&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true'+
      '&amp;show_reposts=false"></iframe>';
    }

    var getTwitterMessage = function(e) {
      return 'Rencontre avec '+e.street_person_name+", via l'application Entourage "+
      e.voice_message+
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
          getTitle(e)+
          getMessage(e)+
          '</div>';

      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      var encounter_img = "/images/rencontre2.png";
      if(e.voice_message!==null && e.voice_message.search('soundcloud')!==-1) {
        encounter_img = "/images/rencontre.png";
      }

      var marker = new google.maps.Marker({
          position: myLatlng,
          icon: encounter_img,
          map: map,
          title: 'Entourage'
      });

      var openMarker = function(marker) {
        if(lastOpenMarker!=null) {
          lastOpenWindow.close(map,lastOpenMarker);
        }
        infowindow.open(map,marker);
        lastOpenMarker = marker;
        lastOpenWindow = infowindow;
      }

      google.maps.event.addListener(marker, 'click', function() {
        if(lastOpenMarker!=null) {
          lastOpenWindow.close(map,lastOpenMarker);
        }
        infowindow.open(map,marker);
        lastOpenMarker = marker;
        lastOpenWindow = infowindow;
      });

      if(e.id==encounter) {
        map.setCenter(myLatlng);
        openMarker(marker);
      }

  });
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

