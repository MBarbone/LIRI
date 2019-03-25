# LIRI-BOT
### LIRI is a text-recognition command line node app that takes in user input and commands and gives you back data based off the following parameters:

- spotify-this-song
- movie-this
- concert-this
- do-what-it-says


### How Liri works:

- Simply type "Node Liri <command> <movie/artist/concert you want to search for>

#### Node Liri spotify-this-song <song-name> will return five results matching your song as well as the following information:

- Song Title
- Artist Name
- Spotify Song Link (opens spotify web player to song)
- Album Title

#### Node Liri movie-this <movie-title> will return the following information about the searched movie:

- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Rotten Tomatoes Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.

#### Node Liri concert-this <artist-name> will return the following information about the artist's upcoming concerts:

- Name of the venue
- Venue location
- Date of the Event (use moment to format this as "MM/DD/YYYY")

#### Node liri do-what-it-says will use the command from the "random.txt" file. 

- It will run spotify-this-song for “I Want it That Way”. Changing the command to one of the others will run those as well.

#### Technologies used:
- Spotify API
- OMDB API
- Bands In Town API
- Node.js
- Javascript
- Moment JS
- NPM packages
