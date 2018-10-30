var express = require('express');
var router = express.Router();
var request = require("request")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile("index.html", {root: "public"});
});

router.get("/findMovies", function(req, res, next) {
    var url = "http://www.omdbapi.com/?s=" + req.query.q +"&apikey=eb0b8f22";
    //var url = "http://www.omdbapi.com/?s=Interstellar&apikey=eb0b8f22";
    console.log(url);
    request(url).pipe(res);
});

module.exports = router;
