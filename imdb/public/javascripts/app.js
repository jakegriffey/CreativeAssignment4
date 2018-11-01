var mainApp = angular.module("mainApp", []);

mainApp.controller("searchCtrl", function($scope, $http) {
    $scope.foundMovies = [];
    $scope.favoriteMovies = [];
    $scope.randomMovie = [];
    $scope.searchName = "";
    $scope.showForm = true;
    $scope.header = "Search For a Movie";

    $scope.findMovies = function() {
        $scope.foundMovies = [];
        
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
                     $scope.searchName = "";
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
        $scope.randomMovie = [];
        $scope.favoriteMovies = [];
        $scope.showForm = false;
        $scope.header = "Favorite Movies";
        
        var favoritesURL = "favorites";
        console.log("get favorite movies")   
        $http.get(favoritesURL).then(function(response) {
            $scope.favoriteMovies = response.data;
        });
    };
    
    $scope.getRandom = function() {
        console.log("get Random movies")   
        var randomURL = "random";
        $scope.foundMovies = [];
        $scope.favoriteMovies = [];
        $scope.randomMovie = [];
        $scope.showForm = false;
        $scope.header = "Random Movie From Favorites"
        
        $http.get(randomURL).then(function(response) {
            $scope.randomMovie.push(response.data);
        });
    };
    
    $scope.goHome = function() {
        $scope.foundMovies = [];
        $scope.favoriteMovies = [];
        $scope.randomMovie = [];
        $scope.showForm = true;
        $scope.header = "Search For A Movie";
    };
});
