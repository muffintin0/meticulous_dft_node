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
      .when('/jaguar-forced-optimization/:id', {
      	templateUrl: 'views/gsfc-detail.html', 
      	controller: GsfcDetailCtrl
      })
      .otherwise({
        redirectTo: '/'
      });
  });
