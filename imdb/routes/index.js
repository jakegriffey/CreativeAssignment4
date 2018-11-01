var express = require('express');
var router = express.Router();
var request = require("request")

var favoriteMovies = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile("index.html", { root: "public" });
});

router.get("/findMovies", function(req, res, next) {
  var url = "http://www.omdbapi.com/?s=" + req.query.q + "&apikey=eb0b8f22";
  //var url = "http://www.omdbapi.com/?s=Interstellar&apikey=eb0b8f22";
  console.log(url);
  request(url).pipe(res);
});

router.post("/addToFavorites", function(req, res, next) {
  let movie = req.body;
  let found = false
  favoriteMovies.forEach(function(item) {
    if(item.title == movie.title && item.year == movie.year && item.poster == movie.poster) {
      found = true;
    }
  });
  
  if(!found) {
    favoriteMovies.push(movie);
  }

  console.log("adding to favorite movies");
  console.log(favoriteMovies);
  res.end('{"success": "Update Successfull", "status": 200}');
});

router.get("/favorites", function(req, res, next) {
  res.send(favoriteMovies);
});

router.get("/random", function(req, res, next) {
  var size = favoriteMovies.length;
  if (size != 0) {
    var randomNum = Math.floor(Math.random() * size);
    var movie = favoriteMovies[randomNum];
    res.send(movie);
  }
});

module.exports = router;
