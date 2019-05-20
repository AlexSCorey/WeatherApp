const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl: 'pages/home.html',
      controller:'homeController'
    })
    .when('/forecast/', {
      templateUrl: 'pages/forecast.html',
      controller:'forecastController'
    })
})

weatherApp.service('cityService', function() {

  this.city = 'New York'

})

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

  $scope.city = cityService.city

  $scope.$watch('city', function () {
    cityService.city = $scope.city
  })

}]);
weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {

  $scope.city = cityService.city

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=01f3f2594b2d91ae81a110b28c98bab7", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" } });

  $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2, units: "metric"});
  console.log($scope.weatherResult);

}]);


