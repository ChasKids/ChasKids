(function () {
  "use strict";
  angular.module('ChasKids')
  .factory('VenueService', ['$http', '$location', '$interval', '$routeParams', function($http, $location, $interval, $routeParams) {


    var url = '/venues';
    // var url = 'http://localhost:3000/venues';

    // var url = 'https://totspot.herokuapp.com/venues';

    // var venues = [];

    var getVenues = function () {
      return $http.get('/venues.json');
    };

    var getSingleVenue = function (id) {
      return $http.get('/venues/' + id +'.json')
    };

    var addVenue = function (venue) {
      $http.post('/venues.json', venue).success(function(){
        $location.path('/adminlist');
      });
    };

    var deleteVenue = function (id) {
      $http.delete('/venues/' + id + '.json').success(function(){
        $location.path('/adminlist')
      });
    };



  //comments


    var addComment = function (venue, comment) {
      venue.comments.push(comment);
      $http.post('/venues/' + venue.id + '/comments.json', comment).success(function(){
      });

    };


// Google Map

  var getCoords = function (venue) {
    $http.get('/venues/' + venue.id +'.json').success(function(){
      venue.coords = {};
      venue.coords.longitude = venue.longitude;
      venue.coords.latitude = venue.latitude;
    });
  };

//edit Venue

  var editVenue = function (venue, id) {
    $http.put('/venues/' + id + '.json', venue).success(function(){
      $location.path('/adminlist');
    });

};

    return {
      getVenues: getVenues,
      getSingleVenue: getSingleVenue,
      addVenue: addVenue,
      deleteVenue: deleteVenue,
      editVenue: editVenue,
      addComment: addComment,
      getCoords: getCoords
    };
  }])
  .factory('FaveService', ['$http', '_', '$rootScope', '$routeParams', function ($http, _, $rootScope, $routeParams) {

    // var url = 'http://tiy-fee-rest.herokuapp.com/collections/totspotfaves';
    var favorites = [];
    // var url = '/favorites';

    var addFavoriteVenue = function (venue) {

      $http.post('/venues/' + venue.id + '/favorite.json', venue);
      $rootScope.$broadcast('favorite:created');
    };

    var getFavoriteVenues = function () {
      return $http.get('/favorites.json');
    };

    var deleteFavoriteVenue = function (id, venue) {
      $http.delete('/favorites/' + id + '.json').success(function(){
        console.log(id);
      });

    };


    return {
      getFavoriteVenues: getFavoriteVenues,
      addFavoriteVenue: addFavoriteVenue,
      deleteFavoriteVenue: deleteFavoriteVenue,

    };

  }]);
})();
