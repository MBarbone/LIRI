require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');

var action = process.argv[2];                     
var term = process.argv.slice(3).join(" ");

// action will be for what kind of search and term will be what we are searching for. Slice & join used to accomdate searches with more than one more

switch(action){
  case "concert-this":
  bandsInTown(term);
  break;

  case "spotify-this":
  spotify(term);
  break;

  case "movie-this":
  movie(term);
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
        for(let i = 1; i < 4; i++){
          console.log("================= Spotify Search Result " + [i] + " =================" + "\n" +
                      "Song Title: " + songInfo[i].name + "\n" + 
                      "Artist Name: " + songInfo[i].artists[0].name + "\n" +
                      "Spotify Song Link: " + songInfo[i].external_urls.spotify + "\n" +
                      "Album Title: " + songInfo[i].album.name + "\n" +
                      "===========================================================" +  "\n");
      }});
    };





  function movie(term){

    if(!term){
      term = "School of Rock";
      console.log("Oops! You've left the search empty. Let's check out 'School of Rock.'" + "\n")
    };
    
    axios.get("http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy")
    .then(function(response, err) {

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

                if (err) {
                  console.log('Error occurred: ' + err);
                  return;
                };
    });
  };