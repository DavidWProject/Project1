
console.log("nutrition loaded")

var APPID = 'a140ced0';

var APPKEY = 'a9dfddddf58d190c766af7c2dd0f143c';

//var queryURL = "https://api.nutritionix.com/v1_1/searchappId="+APPID+"&appKey="+APPKEY;
var search = "chicken%20breast";

var searchParams =""
var searchType = 'basic';
var servingSize = '';

if (searchType === 'basic')
{
    searchParams = "nf_total_fat,nf_total_carbohydrate,nf_protein,nf_serving_size_unit,nf_serving_size_qty,nf_serving_weight_grams"
}



var caloriesToAdd;
var fatToAdd;
var carbsToAdd;
var proteinToAdd;

var foodObjects = [];

function myFunction() {

    event.preventDefault();

    var input = $("#foodInput").val();
    search = input.replace(" ", "%20");
    var queryURL = "https://api.nutritionix.com/v1_1/search/"+search+"?results=0:20&fields=item_name,brand_name,item_id,"+searchParams+"&appId=a140ced0&appKey=a9dfddddf58d190c766af7c2dd0f143c"

    
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {


        console.log(response);


        for(i = 0; i<10; i++)
        {
            var item_id = response.hits[i].fields.item_id;


            var nameDiv = "#name"+i;
            $(nameDiv).text(response.hits[i].fields.item_name);
            $(nameDiv).show();

            foodObjects[i] = new Object;
    
            foodObjects[i].item_name = response.hits[i].fields.item_name;

            foodObjects[i].serving_size_unit = response.hits[i].fields.nf_serving_size_unit;
            foodObjects[i].serving_size = response.hits[i].fields.nf_serving_size_qty;
            foodObjects[i].serving_weight = response.hits[i].fields.nf_serving_weight_grams;
            foodObjects[i].item_name = response.hits[i].fields.item_name;
            foodObjects[i].total_fat = response.hits[i].fields.nf_total_fat;
            foodObjects[i].total_carbohydrate = response.hits[i].fields.nf_total_carbohydrate;
            foodObjects[i].total_protein = response.hits[i].fields.nf_protein;
            

            

            var labelDiv = "#response"+i;
            $(labelDiv).empty();
            $(labelDiv).append(foodObjects[i].item_name+"<br>");
            $(labelDiv).append("Seving: "+foodObjects[i].serving_size_unit+foodObjects[i].serving_size+" - "+foodObjects[i].serving_weight+"g <br>");
            $(labelDiv).append("Fat: "+foodObjects[i].total_fat+"g <br>");
            $(labelDiv).append("Carbs: "+foodObjects[i].total_carbohydrate+"g <br>");
            $(labelDiv).append("Protein: "+foodObjects[i].total_protein+"g <br>");
            
 

            var e =$ ('<input/>').attr({
                type: "text",
                class: "input-group-append",
                id: i,
                value: i,
            });

            servingSize = $("#servingInput").val();
            
             
            
            
            var r=$('<input/>').attr({
                type: "button",
                onclick: "addToDiet(this.id)",
                class: "btn btn-success",
                id: i,
                value: 'Add to Diet Plan'
            });

 
            
            

            $(labelDiv).append(e);
            $(labelDiv).append(r); 

            /*
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon2">@example.com</span>
            </div>
            </div>)*/

            
           
        

        }

        
        
        

      });

    
}




var lastButton = '';
$('a[data-toggle="list"]').on('shown.bs.tab', function (e) {
    e.target // newly activated tab
    e.relatedTarget // previous active tab
  })


$('#myList a').on('click', function (e) {
    
    $(lastButton).css("background-color", "white");
    
    lastButton = this;
    $(this).css("background-color", "yellow");
    e.preventDefault()
    $(this).tab('show')
    console.log(this);
  })


  function doSomething(url){
    console.log("download " + url);
}

function addToDiet(id)
{
    console.log(foodObjects[id].item_name);
    foodObjects[id].serving_size_unit
    foodObjects[id].serving_size
    foodObjects[id].serving_weight 
    foodObjects[id].item_name 
    foodObjects[id].total_fat 
    foodObjects[id].total_carbohydrate 
    foodObjects[id].total_protein
}