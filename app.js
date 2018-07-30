var queryURL = "https://api.edamam.com/search?q=chicken&app_id=0c8956d4&app_key=f6e0fb536a06a548b0e38056ceba81fa";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  //For Health Labels
  console.log(response.hits[0].recipe.healthLabels)
});

