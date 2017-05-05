
// *** Main page JS *** //
angular.module('entourageApp', [])
  .factory('googleMapsInitializer', function($window, $q){

    // maps loader deferred object
    var mapsDefer = $q.defer();

    // Google's url for async maps initialization accepting callback function
    var asyncUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyATSImG1p5k6KydsN7sESLVM2nREnU7hZk&callback=';

    // async loader
    var asyncLoad = function(asyncUrl, callbackName) {
      var script = document.createElement('script');
      //script.type = 'text/javascript';
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
  .controller('MapController', ['$scope', '$http', 'googleMapsInitializer', function($scope, $http, googleMapsInitializer) {
    map = this
    map.actions = [];
    map.infoWindow = null;
    map.currentAction = null;
    map.actionDiameterMeter = 250;
    map.loaded = false;

    map.initMap = function(position) {
      console.info(position);

      var params = {
        maxZoom: 15,
        zoom: 6,
        center: {
          lat: 48.8588376,
          lng: 2.2773456
        }
      };

      if (position)
      {
        params.zoom = 13;
        params.center.lat = position.coords.latitude;
        params.center.lng = position.coords.longitude;
      }

      map.mapObject = new google.maps.Map(document.getElementById('map-container'), params);

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

            action.latLng = new google.maps.LatLng(action.Latitude, action.Longitude);

            map.calculateRadius(action);

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

            action.infoWindow = '<div class="gm-info-window"><b>' + action.title + '</b><span>Par <a>' + action.first_name + '</a></span></div>';

            action.marker.addListener('mouseover', map.showTitle);
            action.marker.addListener('click', map.showAction);
            map.actions.push(action);
          }

          google.maps.event.addListener(map.mapObject, 'zoom_changed', map.calculateRadius);

          map.loaded = true;
          $('#page-title').fadeOut();
        }
      });
    };

    map.calculateRadius = function(action) {
      if (action)
        lat = action.latLng.lat();
      else
        lat = map.actions[0].latLng.lat();
      map.actionDiameterPixel = map.actionDiameterMeter / (156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, map.mapObject.getZoom()));
      $('#inline-style').text('.gm-style > div > div .gmnoprint {width: ' + map.actionDiameterPixel + 'px !important;height: ' + map.actionDiameterPixel + 'px !important;margin: -' + (map.actionDiameterPixel/2) + 'px !important; transform-origin: ' + (map.actionDiameterPixel/3) + 'px ' + (map.actionDiameterPixel/3) + 'px;}');
    }

    map.showTitle = function(marker) {
      if (map.infoWindow)
        map.infoWindow.close();
      map.infoWindow = new google.maps.InfoWindow({
        pixelOffset: new google.maps.Size(0, map.actionDiameterPixel / -2),
        content: map.actions[this.id].infoWindow
      });
      map.infoWindow.open(map.mapObject, this);
    }

    map.showAction = function(marker) {
      console.info('marker clicked', this);
      map.currentAction = map.actions[this.id];
      $scope.$apply();
    }

    map.getLocation = function() {
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(map.initMap);
      else
        map.initMap()
    }

    googleMapsInitializer.mapsInitialized
      .then(function(){
          map.getLocation();
      });
  }]);
