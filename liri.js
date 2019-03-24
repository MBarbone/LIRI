require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var action = process.argv[2];                     
var term = process.argv.slice(3).join(" ");

// action will be for what kind of search and term will be what we are searching for. Slice & join used to accomdate searches with more than one more

switch(action){
  case "concert-this":
  bandsInTown(term);
  break;

  case "spotyify-this":
  spotify(term);
  break;

  case "movie-this":
  oMDB(term);
  break;
};

// do what it says here in switch






// spotify-this
function spotify() {
  
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
    spotify();



  function getMovie(){
  






  }