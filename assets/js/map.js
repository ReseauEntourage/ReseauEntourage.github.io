
angular.module('entourageApp', [])
  .factory('googleMapsInitializer', function($window, $q){

    // maps loader deferred object
    var mapsDefer = $q.defer();

    // Google's url for async maps initialization accepting callback function
    var asyncUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyATSImG1p5k6KydsN7sESLVM2nREnU7hZk&libraries=places&callback=';

    // async loader
    var asyncLoad = function(asyncUrl, callbackName) {
      var script = document.createElement('script');
      script.src = asyncUrl + callbackName;
      document.body.appendChild(script);
    };

    // callback function - resolving promise after maps successfully loaded
    $window.googleMapsInitialized = function () {
        mapsDefer.resolve();
    };

    // loading google maps
    asyncLoad(asyncUrl, 'googleMapsInitialized');

    return {
        // usage: Initializer.mapsInitialized.then(callback)
        mapsInitialized : mapsDefer.promise
    };
  })
  .controller('MapController', ['$scope', '$filter', '$http', 'googleMapsInitializer', function($scope, $filter, $http, googleMapsInitializer) {
    map = this

    map.actions = [];
    map.infoWindow = null;
    map.currentAction = null;
    map.loaded = false;
    map.registrationToggle = false;

    // size of marker icons
    map.actionIcon = {
      meters: 250,
      pixels: null
    };

    // default parameters of our map (centered on France)
    map.mapObjectParams = {
      maxZoom: 15,
      zoom: 6,
      center: {
        lat: 48.8588376,
        lng: 2.2773456
      },
      disableDefaultUI: true
    };

    map.init = function(position) {

      // center the map on the user position (if given)
      if (position && position.coords)
      {
        map.mapObjectParams.zoom = 13;
        map.mapObjectParams.center.lat = position.coords.latitude;
        map.mapObjectParams.center.lng = position.coords.longitude;
      }

      map.mapObject = new google.maps.Map(document.getElementById('map-container'), map.mapObjectParams);

      // get the list of actions
      $.ajax({
        type: "GET",
        url: "assets/downloads/entourages.csv",
        dataType: "text",
        success: function(data) {
          actions = $.csv.toObjects(data);

          for (var i = 0; i < Object.keys(actions).length; i++) {
            var action = actions[i];
            if (action.status != 'open')
              continue;

            action.created_at = new Date(action.created_at);

            action.latLng = new google.maps.LatLng(action.Latitude, action.Longitude);

            // create marker
            action.marker = new google.maps.Marker({
              id: map.actions.length - 1,
              position: action.latLng,
              map: map.mapObject,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillOpacity: 0,
                strokeWeight: 0
              },
              animation: google.maps.Animation.DROP
            });

            // draw custom marker icon
            map.drawIcon(action);

            // display action title when marker hovered
            action.marker.addListener('mouseover', map.showTitle);
            
            // show detailed action window when marker clicked
            action.marker.addListener('click', map.showAction);

            map.actions.push(action);
          }

          // redraw all icons when zoom changes
          google.maps.event.addListener(map.mapObject, 'zoom_changed', map.drawIcon);

          map.initSearchbox();

          // remove loader
          map.loaded = true;

          $scope.$apply();
        }
      });
    };

    map.initSearchbox = function() {
      var searchBox = new google.maps.places.SearchBox(document.getElementById('map-search-input'));

      searchBox.addListener('places_changed', function() {
        console.info('places_changed');
        var places = searchBox.getPlaces();

        if (places.length == 0)
          return;
        else {
          console.info(places[0]);
          map.mapObject.setZoom(13);
          map.mapObject.setCenter(places[0].geometry.location);  
        }
      });
    }

    map.drawIcon = function(action) {
      if (action)
        lat = action.latLng.lat();
      else
        lat = map.actions[0].latLng.lat();
      map.actionIcon.pixels = metersToPixels(map.actionIcon.meters, lat);
      $('#inline-style').text('.gm-style > div > div .gmnoprint {width: ' + map.actionIcon.pixels + 'px !important;height: ' + map.actionIcon.pixels + 'px !important;margin: -' + (map.actionIcon.pixels/2) + 'px !important; transform-origin: ' + (map.actionIcon.pixels/3) + 'px ' + (map.actionIcon.pixels/3) + 'px;}');
    }

    metersToPixels = function(meters, lat) {
      return meters / (156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, map.mapObject.getZoom()));
    }

    map.showTitle = function(marker) {
      if (map.infoWindow)
        map.infoWindow.close();

      map.infoWindow = new google.maps.InfoWindow({
        pixelOffset: new google.maps.Size(0, map.actionIcon.pixels / -2),
        content: '<div class="gm-info-window"><b>' + map.actions[this.id].title + '</b><span>Par <a>' + map.actions[this.id].first_name + '</a>, le ' + $filter('date')(map.actions[this.id].created_at, 'dd/MM') + '</span></div>'
      });
      map.infoWindow.open(map.mapObject, this);
    }

    map.showAction = function(marker) {
      map.currentAction = map.actions[this.id];
      $scope.$apply();
    }

    map.register = function() {
      if (map.phone && map.phone.replace(/\s/g, '').match(/^[\+33]?0?[0-9]{9}/i))
      {
        map.invitationSent = true;
        delete map.registrationError;
      }
      else
      {
        map.registrationError = 'Votre numéro ne semble pas correct';
      }
      $scope.$apply();
    }


    // initialize the map when GoogleMaps script is loaded
    googleMapsInitializer.mapsInitialized.then(function(){

      if (navigator.geolocation)

        // ask user position
        navigator.geolocation.getCurrentPosition(map.init, map.init)

      else
        map.init();
    });
  }]);
