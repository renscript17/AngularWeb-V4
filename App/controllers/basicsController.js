'use strict';

app.controller('basicsController', [
        '$scope', function($scope) {
            // Initialize the model variables
            $scope.firstName = "John";
            $scope.lastName = "Doe";

            // Define utility functions
            $scope.getFullName = function() {
                return $scope.firstName + " " + $scope.lastName;
            };
        }
    ]
);

//////////////////////////////////////////////////////
//nested controllers

app.controller('firstControllerScope', [
        '$scope', function($scope) {
// Initialize the model variables
$scope.firstName = "John";

    }]
);


app.controller('secondControllerScope', [
    '$scope', function($scope) {
        // Initialize the model variables
        $scope.lastName = "Doe";

        // Define utility functions
        $scope.getFullName = function () {
            return $scope.firstName + " " + $scope.lastName;
        };
    }]
);


app.controller('thirdControllerScope', [
    '$scope', function($scope) {
        // Initialize the model variables
        $scope.middleName = "Al";
        $scope.lastName = "Smith";

        // Define utility functions
        $scope.getFullName = function () {
            return $scope.firstName + " " + $scope.middleName + " " + $scope.lastName;
        };
    }]
);


app.controller('firstControllerObj', [
    '$scope', function($scope) {
        // Initialize the model object
        $scope.firstModelObj = {
            firstName: "John"
        };
    }]
);


app.controller('secondControllerObj', [
    '$scope', function($scope) {
        // Initialize the model object
        $scope.secondModelObj = {
            lastName: "Doe"
        };

        // Define utility functions
        $scope.getFullName = function () {
            return $scope.firstModelObj.firstName + " " +
                $scope.secondModelObj.lastName;
        };
    }]
);


app.controller('thirdControllerObj', [
    '$scope', function($scope) {
        // Initialize the model object
        $scope.thirdModelObj = {
            middleName: "Al",
            lastName: "Smith"
        };

        // Define utility functions
        $scope.getFullName = function () {
            return $scope.firstModelObj.firstName + " " +
                $scope.thirdModelObj.middleName + " " +
                $scope.thirdModelObj.lastName;
        };
    }]
);