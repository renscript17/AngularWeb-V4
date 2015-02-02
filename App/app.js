//var app = angular.module('myApp', ['ngRoute','ngGrid'])


var app = angular.module('myApp', ['ngRoute', 'ngTouch', 
    'ui.grid', 'ui.grid.edit', 'googlechart', 'addressFormatter'])

    //'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav', 'addressFormatter'])

angular.module('addressFormatter', []).filter('address', function () {
    return function (input) {
        return input.street + ', ' + input.city + ', ' + input.state + ', ' + input.zip;
    };
})

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        //.when('/grid', {
        //    templateUrl: 'views/grid.html',
        //    controller: 'gridController'
        //})

        .when('/uigridcrud', {
            templateUrl: 'views/uigridcrud.html',
            controller: 'uigridcrudController'
        })

        .when('/uigrid', {
            templateUrl: 'views/uigrid.html',
            controller: 'uigridController'
        })

      .when('/', {
          templateUrl: 'views/home.html',
          controller: 'homeController'
      })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        })

                .when('/basics', {
                    templateUrl: 'views/basics.html',
                    controller: 'basicsController'
                })

                .when('/select', {
                    templateUrl: 'views/select.html',
                    controller: 'selectController'
                })

                .when('/formSubmission', {
                    templateUrl: 'views/formSubmission.html',
                    controller: 'formSubmissionController'
                })

                .when('/chart', {
                    templateUrl: 'views/chart.html',
                    controller: 'chartController'
                })

      .otherwise({
          redirectTo: '/'
      });
}]).value('googleChartApiConfig', {
    version: '1',
    optionalSettings: {
        packages: ['corechart', 'gauge'],
        //language: 'fr'
        language: 'en'
    }
})

.controller('mainController', function ($scope) {
    $scope.message = "Main Content";
});;