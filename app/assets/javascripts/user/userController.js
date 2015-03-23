(function () {
  "use strict";
  angular.module('ChasKids')
  .controller('UserController', function (VenueService, $routeParams, $location, $scope, uiGmapGoogleMapApi) {

    var userCtrl = this;




    // userCtrl.singleVenue = VenueService.getSingleVenue($routeParams.venueId);  (for local)
    if($routeParams.venueId) {
      VenueService.getSingleVenue($routeParams.venueId).success(function (data) {
        userCtrl.singleVenue = data;
        console.log(data);
      });

    }

    // userCtrl.venues = VenueService.getVenues();  (for local)
    VenueService.getVenues().success(function (data) {
      userCtrl.venues = data;
      for( var i = 0; i < userCtrl.venues.length ; i++) {
        VenueService.getCoords(userCtrl.venues[i]);
        console.log('looping ' + i);
    }
  });

    userCtrl.currentIndex = $routeParams.venueId;

    // add comments in detail view
    userCtrl.addComment = function (venue, comment) {
      console.log('inside add comment in ctrl');
      VenueService.addComment(venue, comment);
      console.log('inside add comment in ctrl after VenueService command');
      $scope.comment = {};
    };


    //function to submit suggestions form after validation
    $scope.submitForm = function(isValid) {
        if (isValid) {
          alert('Thank you for submitting your sugestions!');
        };
        $scope.submitted = true;
        $location.path('/');
    };



    uiGmapGoogleMapApi.then(function(maps) {

    });



      $scope.map = {
        center: {
          latitude: 32.8433,
          longitude: -79.9333
        },
        zoom: 12
      }

  })


  // favorites

  .controller('FavoritesController', function(FaveService) {

    var faveCtrl = this;

    FaveService.getFavoriteVenues().success(function (data) {
      faveCtrl.venues = data;
      console.log(data);
    });


    faveCtrl.addFavoriteVenue = function (venue) {
      FaveService.addFavoriteVenue(venue);
      console.log('fave venue added');
    };
    faveCtrl.deleteFavoriteVenue = function (venue) {
      FaveService.deleteFavoriteVenue(venue.id);
    };

  });

})();
