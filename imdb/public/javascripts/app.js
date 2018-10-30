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
                    let movie = {title: item["Title"], year: item["Year"], poster: item["Poster"]};
                    console.log(movie);
                    $scope.foundMovies.push(movie);
                });
            });
        }
    };
});
