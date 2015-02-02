'use strict';

//angular ui-grid: celledit
//app.controller('gridController', ['$scope', '$http', '$q', '$interval', function ($scope, $http, $q, $interval) {

//    $scope.gridOptions = {};

//    $scope.gridOptions.columnDefs = [
//      { name: 'id', enableCellEdit: false },
//      { name: 'name', displayName: 'Name (editable)' },
//      { name: 'gender' },
//      { name: 'age', displayName: 'Age', type: 'number' },
//      { name: 'registered', displayName: 'Registered', type: 'date', cellFilter: 'date:"yyyy-MM-dd"' },
//      { name: 'address', displayName: 'Address', type: 'object', cellFilter: 'address' },
//      {
//          name: 'address.city', displayName: 'Address (even rows editable)',
//          cellEditableCondition: function ($scope) {
//              return $scope.rowRenderIndex % 2
//          }
//      },
//      { name: 'isActive', displayName: 'Active', type: 'boolean' }
//    ];

//    $scope.saveRow = function (rowEntity) {
//        // create a fake promise - normally you'd use the promise returned by $http or $resource
//        var promise = $q.defer();
//        $scope.gridApi.rowEdit.setSavePromise($scope.gridApi.grid, rowEntity, promise.promise);

//        // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
//        $interval(function () {
//            if (rowEntity.gender === 'male') {
//                promise.reject();
//            } else {
//                promise.resolve();
//            }
//        }, 3000, 1);
//    };

//    $scope.gridOptions.onRegisterApi = function (gridApi) {
//        //set gridApi on scope
//        $scope.gridApi = gridApi;
//        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
//    };

//    $http.get('/data/500_complex.json')
//    .success(function (data) {
//        for (i = 0; i < data.length; i++) {
//            data[i].registered = new Date(data[i].registered);
//        }
//        $scope.gridOptions.data = data;
//    });

//}]);


//angular ui-grid: basic usage
//app.controller('gridController', ['$scope', function ($scope) {

//    $scope.myData = [
//      {
//          "firstName": "Cox",
//          "lastName": "Carney",
//          "company": "Enormo",
//          "employed": true
//      },
//      {
//          "firstName": "Lorraine",
//          "lastName": "Wise",
//          "company": "Comveyer",
//          "employed": false
//      },
//      {
//          "firstName": "Nancy",
//          "lastName": "Waters",
//          "company": "Fuelton",
//          "employed": false
//      }
//    ];
//}]);



// ng-grid
app.controller('gridController', ['$scope', 'gridService', function ($scope, gridService) {
    
        console.log('GridController called .................');
        $scope.myData = [{
            "EmployeeId": "1",
            "firstname": "Misko",
            "lastname": "Havery",
            "company": "Google",
            "project": "AngularJS"
        }, {
            "EmployeeId": "2",
            "firstname": "Itay",
            "lastname": "Herskovits",
            "company": "Backand",
            "project": "Backand.REST"
        }, {
            "EmployeeId": "3",
            "firstname": "Relly",
            "lastname": "Rivlin",
            "company": "Backand",
            "project": "Backand.AngularJS"
        }];



    //    gridService.getContributors().then(function(data) {
    //        $scope.myData = data;
    //});

        $scope.gridOptions = {
            data: 'myData',
            enableRowSelection: true,
            enableCellEditOnFocus: true,
            showSelectionCheckbox: true,
            showFooter: true,
            columnDefs: [{
                field: 'EmployeeId',
                displayName: 'Id',
                enableCellEdit: false
            }, {
                field: 'firstname',
                displayName: 'First Name',
                enableCellEdit: true
            }, {
                field: 'lastname',
                displayName: 'Last Name',
                enableCellEdit: true
            }]
        };

        $scope.$on('ngGridEventEndCellEdit', function(evt){
            console.log(evt.targetScope.row.entity);  // the underlying data bound to the row
            // Detect changes and send entity to REST server

            gridService.saveContributor(evt.targetScope.row.entity);
        });

        $scope.addItem = function() {
            $scope.myData.push({});
        }



}])

app.service('gridService', ['$http', '$q',
    function ($http, $q) {

        var contributorsFile = '../App/data/contributors.json';
        var contributors = [];

        function getContributors() {
            var deferred = $q.defer();

            if (contributors.length === 0) {

                //$http.get(contributorsFile)
                //    .then(function(result) {
                //        contributors = result.data;
                //        deferred.resolve(contributors);
                //    }, function(error) {
                //        deferred.reject(error);
                //    });

                $http({
                    method: "GET",
                    url: contributorsFile,
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (result) {
                            contributors = result.data;
                            deferred.resolve(contributors);
                }).error(function (error) {
                            deferred.reject(error);
                });


            } else {
                return $q.when(contributors);
            }


            return deferred.promise;
        }

        function saveContributor(contributor) {

            $http.post('../api/UpdateEmployee', contributor).success(function () {
                console.log("SAVE success !!!!");
            }).error(function () {
                console.log("SAVE Error !!!!");
            });
        }

        return {
            //getContributors: getContributors,
            saveContributor: saveContributor
        };
    }
]);