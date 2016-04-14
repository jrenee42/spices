var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.toggleSearch = false;
    $scope.results = [];

    $http.get('http://localhost:3000/spices/').then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is availablesuccessCallback, errorCallback);
        console.log(response);
        $scope.spiceList = response.data;
    });


    $scope.showSearchBox = function(e) {
        var searchBox = $('#searchTerm');
        searchBox.css('width', 20);
        $scope.toggleSearch = true;

        TweenLite.to(searchBox, .75, {
            'width': 225
        });
    };

    $scope.gotoLink = function(which) {
        console.log("here", which);
        window.open($scope.results[which].page, '_blank');

    }

    $scope.closeSearch = function(e) {
        $scope.toggleSearch = false;

        $('body').attr("layout-align", "center center");
        //also erase search results too!

        $scope.results= [];
    };
    var searchBox = $('#searchTerm');

    searchBox.on('keydown', function(event) {
        if (event.keyCode == 13) {

            var searchTerm = $(this).val();
            console.log("pressed return: " + searchTerm);
            $scope.results = [];

            $('body').attr("layout-align", "start center");

            var api = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
            var cb = '&callback=JSON_CALLBACK';
            var page = 'http://en.wikipedia.org/?curid=';

            $http.jsonp(api + searchTerm + cb)
                .success(function(data) {

                    var results = data.query.pages;
                    angular.forEach(results, function(v, k) {
                        console.log(v);
                        console.log("k", k);
                        $scope.results.push({
                            title: v.title,
                            body: v.extract,
                            page: page + v.pageid
                        })
                    })
                });
        }
    });

}]);
