'use strict';

app.controller('uigridcrudController', [
    '$scope', 'contactService', function ($scope, contactService) {

        $scope.gridOptions = {};

        $scope.gridOptions.columnDefs = [
          { name: 'id', enableCellEdit: false, width: '10%' },
          { name: 'name', displayName: 'Name (editable)', width: '20%' },
          { name: 'age', displayName: 'Age', type: 'number', width: '10%' },
          {
              name: 'gender', displayName: 'Gender', editableCellTemplate: 'ui-grid/dropdownEditor', width: '20%',
              cellFilter: 'mapGender', editDropdownValueLabel: 'gender', editDropdownOptionsArray: [
              { id: 1, gender: 'male' },
              { id: 2, gender: 'female' }
              ]
          },
          { name: 'registered', displayName: 'Registered', type: 'date', cellFilter: 'date:"yyyy-MM-dd"', width: '20%' },
          { name: 'address', displayName: 'Address',  width: '30%' },
          {
              name: 'city', displayName: 'Address (even rows editable)', width: '20%',
              cellEditableCondition: function ($scope) {
                  return $scope.rowRenderIndex % 2
              }
          },
          { name: 'isActive', displayName: 'Active', type: 'boolean', width: '10%' },
          {
              name: 'pet', displayName: 'Pet', width: '20%', editableCellTemplate: 'ui-grid/dropdownEditor',
              editDropdownRowEntityOptionsArrayPath: 'foo.bar[0].options', editDropdownIdLabel: 'value'
          }
        ];


        $scope.msg = {};

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                $scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue;
                $scope.$apply();
            });
        };

        contactService.getContacts($scope);
    }
])

app.service('contactService', ['$http', function ($http) {
    this.getContacts = function ($scope) {
        return $http({
            method: "GET",
            url: "../api/contacts",
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            
                for (var i = 0; i < data.length; i++) {
                    data[i].registered = new Date(data[i].registered);
                    data[i].gender = data[i].gender === 'male' ? 1 : 2;
                    if (i % 2) {
                        data[i].pet = 'fish'
                        data[i].foo = { bar: [{ baz: 2, options: [{ value: 'fish' }, { value: 'hamster' }] }] }
                    }
                    else {
                        data[i].pet = 'dog'
                        data[i].foo = { bar: [{ baz: 2, options: [{ value: 'dog' }, { value: 'cat' }] }] }
                    }
                }
                $scope.gridOptions.data = data;

        }).error(function (data) {
            console.log(data);
        });;
    };
}])

.filter('mapGender', function () {
    var genderHash = {
        1: 'male',
        2: 'female'
    };

    return function (input) {
        if (!input) {
            return '';
        } else {
            return genderHash[input];
        }
    };
});

