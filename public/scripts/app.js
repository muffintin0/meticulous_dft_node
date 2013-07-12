'use strict';

angular.module('Mdft', ['gsfcServices'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/jaguar-forced-optimization',{
      	templateUrl: 'views/gsfc.html',
      	controller: 'GsfcCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
