var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.toggleSearch = false;
    $scope.results = [];

    $scope.sortKey = "name";
    $scope.sortReverse = false;
    
    function getData(){
        $http.get('http://localhost:3000/spices/').then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is availablesuccessCallback, errorCallback);
            console.log(response);
            $scope.spiceList = response.data;
        });
    };
    
    getData();
    
    $scope.cols = [ "name", "date"];

    $scope.showArrow = function(direction, colKey) {
        if (direction){
            return colKey === $scope.sortKey && !$scope.sortReverse;
        } else {
            return colKey === $scope.sortKey && $scope.sortReverse;
        }
    };

    $scope.doSorting = function(colKey){
        //if already sorting on this column, toggle the direction
        //else, make it be ascending (not reverse)

        if ($scope.sortKey === colKey){
            $scope.sortReverse = !$scope.sortReverse;
        } else {
            $scope.sortReverse = false;
            $scope.sortKey = colKey;
        }
    };
        
    $scope.editSpice = function(spice){
//        var actualSpice = $scope.spiceList.find(function(spice){
  //          return spice.id === id;
    //    });
        
        console.log("would edit a spice here:", spice);
    };

    $scope.deleteSpice = function(spice){
//        $http.delete('http://localhost:3000/spices/'+ $scope.spiceList[index].id).then(function successCallback(response) {
            
         $http.delete('http://localhost:3000/spices/'+ spice.id).then(function successCallback(response) {            console.log("success");
            getData();
        }, function errorCallback(response) {
    // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("failure to add a spice :(");
        });
    }
    
    $scope.addSpice = function(){
        var spice = {name: $scope.name, date:$scope.myDate};

        $http.post('http://localhost:3000/spices/', spice).then(function successCallback(response) {
            console.log("success");
            getData();
        }, function errorCallback(response) {
    // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("failure to add a spice :(");
        });
    };

}]);

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});


app.controller('headerController', function($scope) {
    //here for the showUp/showDown to have a place to be 'called' from; all done via isolate scope
});

app.directive('myHeader', function() {
    
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'showUp': '&',
            'showDown': '&'
        },
        controller: 'headerController',
        controllerAs: 'header',
        bindToController: true,
        templateUrl: 'http://localhost:8000/header.html'
    };
});
