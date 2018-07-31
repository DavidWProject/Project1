

var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
        myIndex = 1
    }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}

var myInde = 0;
carouse();

function carouse() {
    var i;
    var x = document.getElementsByClassName("mySides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myInde++;
    if (myInde > x.length) {
        myInde = 1
    }
    x[myInde - 1].style.display = "block";
    setTimeout(carouse, 2000); // Change image every 2 seconds
}

//Recipe API

var queryURL = "https://api.edamam.com/search?q=chicken&app_id=0c8956d4&app_key=f6e0fb536a06a548b0e38056ceba81fa";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  //For Health Labels
  console.log(response.hits[0].recipe.healthLabels)
});