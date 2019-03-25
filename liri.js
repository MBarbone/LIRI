require("dotenv").config();

var moment = require('moment');
moment().format();

var fs = require("fs");

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');

// action will be for what kind of search and term will be what we are searching for. Slice & join used to accomdate searches with more than one more
var action = process.argv[2];                     
var term = process.argv.slice(3).join(" ");


switch(action){
  case "concert-this":
  concert(term);
  break;

  case "spotify-this-song":
  spotify(term);
  break;

  case "movie-this":
  movie(term);
  break;

  case "do-what-it-says":
  doThis(term);
  break;

};

// do what it says here in switch




// spotify-this
function spotify(term) {
  
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
   

  // if they do not enter a term
  if(!term){
    term = "Paradise City";
    console.log("Oops! You've left the search empty. Let's check out 'Paradise City.'" + "\n")
  };
  
  spotify.search({ type: 'track', query: term}, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      };

      // console.log 3 results
      var songInfo = data.tracks.items;
        for(let i = 1; i < 6; i++){
          console.log("================= Spotify Search Result " + [i] + " =================" + "\n" +
                      "Song Title: " + songInfo[i].name + "\n" + 
                      "Artist Name: " + songInfo[i].artists[0].name + "\n" +
                      "Spotify Song Link: " + songInfo[i].external_urls.spotify + "\n" +
                      "Album Title: " + songInfo[i].album.name + "\n" +
                      "===========================================================" +  "\n");
      }});
    };


    // movie-this
    function movie(term){
      
      if(!term){
        term = "School of Rock";
        console.log("Oops! You've left the search empty. Let's check out 'School of Rock.'" + "\n")
      };
      
      axios.get("http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy")
      .then(function(response, err) {
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        };
        
      var movieResponse = response.data; 
 
      console.log("===========================================================" +  "\n" +
                "Title: " + movieResponse.Title + "\n" +
                "Release Year: " + movieResponse.Year + "\n" +
                "IMdb Rating: " + movieResponse.Ratings[0].Value  + "\n" +
                "Rotten Tomatoes Rating: " + movieResponse.Ratings[1].Value + "\n" +
                "Country of Film Production: " + movieResponse.Country + "\n" +
                "Language of Film: " + movieResponse.Language + "\n" + 
                "Plot: " + movieResponse.Plot + "\n" +
                "Actors: " + movieResponse.Actors);
    });
  };


// concert-this
  function concert(term){

    if(!term){
      term = "John Mayer";
      console.log("Oops! You've left the search empty. Let's check out John Mayer is touring." + "\n")
    };
    
    axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp")
    .then(function(response, err) {
      
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      };

      var concertInfo = response.data;
        for(let i = 1; i < concertInfo.length; i++){
          // if(concertInfo[i] == null){
          //   console.log("Sorry! " + term + " does not have any shows coming up.")
          // };
          console.log("=============" + term +  " Concert Search Result "  + [i] + "==============" + "\n" +
                      "Venue Name: " + concertInfo[i].venue.name + "\n" + 
                      "Venue Location: " + concertInfo[i].venue.city + "\n" +
                      "Concert Date & Time: " + moment(concertInfo[i].datetime).format("MM/DD/YYYY hh:mm A") + "\n" +
                      "==============================================================" +  "\n");
      }});
    };


    
// do-what-it-says
function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data){

    if(err){
      console.log(err);
      return;
    };

    // divide line in random.txt into two parts at "," creating an array with an index at 0 = command and 1 = term to search
    var dataArr = data.split(",");
      
          if (dataArr[0] === "spotify-this-song") {
            var songCheck = dataArr[1].slice(1, -1);
            spotify(songCheck);

          } else if (dataArr[0] === "concert-this") {
            var concertCheck= dataArr[1].slice(1, -1);
            concert(concertCheck);

          } else if(dataArr[0] === "movie-this") {
            var movieCheck = dataArr[1].slice(1, -1);
            movie(movieCheck);
          } 
    
  });
};
  

