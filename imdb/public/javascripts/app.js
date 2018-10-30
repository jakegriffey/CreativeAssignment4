var mainApp = angular.module("mainApp", []);

mainApp.controller("searchCtrl", function($scope, $http) {
    $scope.foundMovies = [];
    $scope.searchName = "";

    $scope.findMovies = function() {
        if ($scope.searchName.length != 0) {
            console.log("Getting movies");
            var url = "findMovies?q=" + $scope.searchName;
            $http.get(url).then(function(response) {
                let data = response.data;
                let searchData = data.Search;
                console.log(searchData);
                searchData.forEach(function(item) {
                    let movie = { title: item["Title"], year: item["Year"], poster: item["Poster"] };
                    console.log(movie);
                    $scope.foundMovies.push(movie);
                });
            });
        }
    };

    $scope.addToFavorites = function(movie) {
        var addURL = "addToFavorites";
        
        $http({
            url: addURL,
            method: "POST",
            data: movie
        }).success(function(data, status, headers, config) {
            console.log("Post worked");
        }).error(function(data, status, headers, config) {
            console.log("Post failed");
        });
    };
    
    $scope.getFavorites = function() {
        $scope.foundMovies = [];
        var favoritesURL = "favorites";
        
        $http.get(favoritesURL).then(function(response) {
            $scope.foundMovies = response;
        });
    };
    
    $scope.getRandom = function() {
        var randomURL = "random";
        $scope.foundMovies = [];
        
        $http.get(randomURL).then(function(response) {
            $scope.foundMovies.push(response);
        });
    };
});
