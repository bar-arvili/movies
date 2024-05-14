let apiKey = "beeabbdc" 

function searchMovieData() {
    const userInput = document.getElementById("userInput").value;
      if (!userInput) {
      alert("Please type in the movie title");
      return;
    }
    let url = `https://www.omdbapi.com/?t=${userInput}&apikey=${apiKey}`;
  
    fetch(url)
      .then(function(response){
          return response.json();
      })
      .then(function(movieData){
        if (movieData.Response === "False") {
          console.error("Movie not found:",  movieData.Error);
          alert("Movie not found, try different name");
          return;
        }
        
        clearAllMovieDetails();
        
        document.querySelector("img").src = movieData.Poster;
        const paragraphs = document.querySelectorAll("p");
        paragraphs[0].innerHTML = `Title: ${movieData.Title}`;
        paragraphs[1].innerHTML = `Genre: ${movieData.Genre}`;
        paragraphs[2].innerHTML = `Year: ${movieData.Year}`;
        paragraphs[3].innerHTML = `Plot: ${movieData.Plot}`;
        paragraphs[4].innerHTML = `Director: ${movieData.Director}`;
        paragraphs[5].innerHTML = `Actors: ${movieData.Actors}`;
  
        let ratingsContent = "";
        if (movieData.Ratings) {
          for (let rating of movieData.Ratings) {
            ratingsContent += `<p>Source: ${rating.Source}, Value: ${rating.Value}</p>`;
          }
        }
        document.getElementById("ratings").innerHTML = ratingsContent;
      })
  }
  
  function removeAllMovieDetails() {
    document.querySelector("img").src = "";
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(p => p.innerHTML = "");
    document.getElementById("ratings").innerHTML = "";
  }
  
  function clearAllMovieDetails() {
    if (userInput.value === "") {
      removeAllMovieDetails();
    }
  }