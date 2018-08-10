var id = 0;
var eng = [];


function showWorkout(){
    $("#nutritionPage").hide();
    $("#workoutPage").show();

    id = 0;
    eng = [];

    workout();
    console.log(eng)


   
}

var eng = [];

var queryURL = 'https://wger.de/api/v2/exercise/?format=json'
var size = 0;



console.log("workouts loaded");
function workout() {

    console.log("workouts query");
    
    for (let i = 1; i<27; i++)
    {
        GetMyResourceData(queryURL)
        var res = queryURL.substring(0, 44) + "&page="+i;
        queryURL = res;
    }

    function GetMyResourceData(queryURL){

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            for (i = 0; i<20; i++)
            {
                if(response.results[i].language === 2)
                    { 
                        id++
                        eng[id] = new Object;
                        eng[id].language = response.results[i].language;
                        eng[id].name = response.results[i].name;
                        eng[id].id = response.results[i].id;
                        eng[id].description = response.results[i].description;
                        eng[id].category = response.results[i].category;
                    }     
            }
        });

    }
}

function searchWorkout(){

    var input = $("#workoutInput").val();
    
    console.log(eng.length)

    var labelDiv = "#response"+i;
    $(labelDiv).empty();

    var str = "Hello world, welcome to the universe.";
    var n = str.includes("world");

    
    var stop = 0;

    for(i = 1; i < eng.length; i++)
    {
        if(eng[i].name.includes(input))
        {
            var nameDiv = "#wr"+stop;
            $(nameDiv).text(eng[i].name);
            $(nameDiv).show();
            

            var labelDiv = "#workout"+stop;
            $(labelDiv).append("Name: "+eng[i].name + "<br>")
            $(labelDiv).append("Category: "+eng[i].category + "<br>")
            $(labelDiv).append("Description: "+eng[i].description + "<br>")
   
            stop++;
            
            if(stop === 20)
            i = eng.length;   
        }
    }

}
    var lastButton = '';
    $('a[data-toggle="list"]').on('shown.bs.tab', function (e) {
        e.target // newly activated tab
        e.relatedTarget // previous active tab
    })


    $('#workoutList a').on('click', function (e) {
        
        $(lastButton).css("background-color", "white");
        
        lastButton = this;
        $(this).css("background-color", "rgb(224, 75, 30)");
        e.preventDefault()
        $(this).tab('show')
        console.log(this);
    })


