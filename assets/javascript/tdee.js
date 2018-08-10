console.log("you are here now");


function TDEE(data) {
	this.weight = data.weight || 60
	this.height = data.height || 180
	this.age = data.age || 25
	this.sex = data.sex || 'male'
	this.bodyType = data.bodyType || 'ectomorph'
	this.numberOfWorkouts = data.numberOfWorkouts || 3
	this.durationOfWorkout = data.durationOfWorkout || 45
	this.ratios = data.ratios || {
		protein: 35,
		carb: 45,
		fat: 20
	}
}

// Basal Metabolic Rate - calculated using the Harris-Benedict equations
TDEE.prototype.calculateBMR = function () {
	var weightFactor = 9.99 // weight in KG
	var heightFactor = 6.25 // heigh in CM
	var ageFactor = 4.92 // age in Years

	var result = ((weightFactor * this.weight) + (heightFactor * this.height) - (ageFactor * this.age))

	return Math.floor(this.sex == 'male' ? result + 5 : result - 161) //male+5, female-161
}

// calories used during physical activity
TDEE.prototype.calculateTEA = function () {
	// strength exercises consume 7 - 9 kcal/minute
	var kcalpm = 9
	// EPOC calories used after workout, ~ 4% - 7% total calories intake
	var percentOfBMR = Math.floor((7 * this.calculateBMR()) / 100)
	var EPOC = (this.numberOfWorkouts * percentOfBMR)
	// console.log(EPOC)

	// 3x60 mins x 9kcal + EPOC(3x(0.07 x calculateBMR))
	// results are divided by number of weekdays
	return Math.floor((this.numberOfWorkouts * this.durationOfWorkout * kcalpm + EPOC) / 7)
}

// NEAT - thermogenesis not including workouts
TDEE.prototype.calculateNEAT = function () {
	var body = {
		endomorph: 400, // endomorph 200-400 kcal
		ectomorph: 900, // ectomorph 700-900 kcal
		mesomorph: 500 // mesomorph 400-500 kcal
	}

	return body[this.bodyType]
}

TDEE.prototype.getMacronutrients = function () {
	var calories = this.getTotal()
	return {
		protein: Math.floor(calories * this.ratios.protein / 100 / 4),
		carb: Math.floor(calories * this.ratios.carb / 100 / 4),
		fat: Math.floor(calories * this.ratios.fat / 100 / 9)
	}
}

TDEE.prototype.getTotal = function () {
	var BMR = this.calculateBMR()
	var TEA = this.calculateTEA()
	var NEAT = this.calculateNEAT()
	var total = BMR + TEA + NEAT
	// postmeal thermogenesis
	var TEF = Math.floor(total / 10)

	return total + TEF
}

var ratios = [{
		name: 'high-carb for bodybuilding',
		carb: 50, // 40-60
		protein: 30, // 25-35
		fat: 20 // 15-25
	},
	{
		name: 'moderate-carb for maitenance',
		carb: 40, // 30-50
		protein: 30, // 25-35
		fat: 30 // 25-35
	},
	{
		name: 'low-carb for reduction',
		carb: 20, // 10-20
		protein: 50, // 40-50
		fat: 30 // 30-40
	}
]

/*

var ageInput;

var qmmr = {
	weight: 84.8,
	height: 184,
	age: ageInput,                        //34
	sex: 'male',
	bodyType: 'mesomorph',
	numberOfWorkouts: 4,
	durationOfWorkout: 120,
	ratios: ratios[0]
}*/

var gender = '';

function myGender(id) {
	console.log("gender button pressed");

	if (id === 'male') {
		$("#male").css('opacity', ".5");
		$("#female").css('opacity', "1");
	}

	if (id === 'female') {
		$('#female').css('opacity', ".5");
		$("#male").css('opacity', "1");
	}

	gender = id;
}

function mySubmit() {

	var bodytype = '';

	if ($('#endomorph').is(':checked')) {
		bodytype = 'endomorph'
	}
	if ($('#ectomorph').is(':checked')) {
		bodytype = 'ectomorph'
	}
	if ($('#mesomorph').is(':checked')) {
		bodytype = 'mesomorph'
	}

	console.log(gender);

	var ageInput = document.getElementById("age").value;

	var feetHolder = document.getElementById("feet").value;
	var inchesHolder = document.getElementById("inches").value;
	var weightHolder = document.getElementById("weight").value;



	var workoutInput = document.getElementById("inlineFormCustomSelect").value;
	var durationInput = document.getElementById("duration").value;



	var heightInput = ((Number(feetHolder) * 12) + Number(inchesHolder)) * 2.54;
	console.log("toootall" + heightInput);


	var weightInput = weightHolder * 0.453592;



	var qmmr = {
		weight: weightInput,
		height: 184,
		age: ageInput, //34
		sex: gender,
		bodyType: bodytype,
		numberOfWorkouts: workoutInput,
		durationOfWorkout: durationInput,
		ratios: ratios[0]
	}


	var tdee = new TDEE(qmmr)
	console.log('BMR: ', tdee.calculateBMR())
	console.log('TEA: ', tdee.calculateTEA())
	console.log('NEAT: ', tdee.calculateNEAT())
	console.log('TOTAL: ' + tdee.getTotal() + ' kcal')
	console.log('Chosen ratio -> ' + qmmr.ratios.name + ':')
	console.log('carb: ' + qmmr.ratios.carb + '%')
	console.log('protein: ' + qmmr.ratios.protein + '%')
	console.log('fat: ' + qmmr.ratios.fat + '%')
	console.log('Your daily macronutrients:')
	console.log('Proteins: ' + tdee.getMacronutrients().protein + 'g')
	console.log('Carbs: ' + tdee.getMacronutrients().carb + 'g')
	console.log('Fats: ' + tdee.getMacronutrients().fat + 'g')
	console.log('Bodytype: ' + qmmr.bodyType)
	console.log('Sex: ' + qmmr.sex)


}

$("#submit-btn").on("click", function () {
	$(".recipe-portion").fadeIn("slow");
	$(".recipe-labels").hide();
});

$(".recipe-btn").on("click", function () {
	$(".recipe-labels").show();
	$(".generated-recipe").fadeIn("slow");
	var recipeType = $(this).val();
	console.log(recipeType);

	$(document).on("click", ".button_su_inner1", function () {

		$(".generated-recipe").empty(); 

		var healthRestriction = $(this).val(); 

		$(".button_su_inner").on("click", function () {
			var foodType = $(this).val();
			// Recipe API
			recipeSearch();

			function recipeSearch() {


				var queryURL = "https://api.edamam.com/search?q=" + foodType + "&app_id=0c8956d4&app_key=f6e0fb536a06a548b0e38056ceba81fa&diet=" + recipeType + "&healthLabels=" + healthRestriction;

				$.ajax({
					url: queryURL,
					method: "GET"
				}).then(function (response) {

					results = response.hits;
					for (var i = 0; i < results.length; i++) {
						console.log(results[i].recipe);
						console.log(results[i].recipe.label);
						var Div = $("<div>");
						var RName = $("<h1>").text(RecipeName).addClass("recipe-name");
						var RecipeName = results[i].recipe.label;
						var RecipeImg = results[i].recipe.image;
						var RecipeLink = results[i].recipe.url;
						var image = $("<img>").attr("src", RecipeImg).addClass("img-food");
						var link = $("<a>").attr("href", RecipeLink).addClass("img-link");

						Div.append(RName);
						Div.append(image);
						Div.append(link);
						link.text("Recipe Link: " + RecipeLink);

						$(".generated-recipe").append(Div);

					}
				});

			};
		})
		
	
		// var queryURL = "https://api.edamam.com/search?q=chicken&app_id=0c8956d4&app_key=f6e0fb536a06a548b0e38056ceba81fa&diet=balanced&healthLabels=" + healthRestriction;
		// var healthRestriction = $(this).val(); 
	
		// $.ajax({
		// 	url: queryURL,
		// 	method: "GET"
		// }).then(function (response) {
	
		// 	results = response.hits;
		// 	for (var i = 0; i < results.length; i++) {
		// 		console.log(results[i].recipe);
		// 		console.log(results[i].recipe.label);
		// 		var Div = $("<div>");
		// 		var RName = $("<h1>").text(RecipeName).addClass("recipe-name");
		// 		var RecipeName = results[i].recipe.label;
		// 		var RecipeImg = results[i].recipe.image;
		// 		var RecipeLink = results[i].recipe.url;
		// 		var image = $("<img>").attr("src", RecipeImg).addClass("img-food");
		// 		var link = $("<a>").attr("href", RecipeLink).addClass("img-link");
	
		// 		Div.append(RName);
		// 		Div.append(image);
		// 		Div.append(link);
		// 		link.text("Recipe Link: " + RecipeLink);
	
		// 		$(".generated-recipe").prepend(Div);
	
		// 	}
		// });
	}); 

	$("input.custom-ingredients").keypress(function (e) {
		var customIngredient = $(this).val();
		if (e.which == 13) {

			customIngredient = $(this).val();
			$(".button_container").append('<div class="button_su"><span class="su_button_circle"></span><button href="#" class="button_su_inner" value="' + customIngredient + '"><span class="button_text_container">' + customIngredient + '</span></button></div>');

			$(".button_su_inner").on("click", function () {
				var foodType = $(this).val();
				var foodRestriction = 
				console.log(foodType);
				// Recipe API
				recipeSearch();

				function recipeSearch() {


					var queryURL = "https://api.edamam.com/search?q=" + foodType + "&app_id=0c8956d4&app_key=f6e0fb536a06a548b0e38056ceba81fa&diet=" + recipeType;

					$.ajax({
						url: queryURL,
						method: "GET"
					}).then(function (response) {

						results = response.hits;
						for (var i = 0; i < results.length; i++) {
							console.log(results[i].recipe);
							console.log(results[i].recipe.label);
							var Div = $("<div>");
							var RName = $("<h1>").text(RecipeName).addClass("recipe-name");
							var RecipeName = results[i].recipe.label;
							var RecipeImg = results[i].recipe.image;
							var RecipeLink = results[i].recipe.url;
							var image = $("<img>").attr("src", RecipeImg).addClass("img-food");
							var link = $("<a>").attr("href", RecipeLink).addClass("img-link");

							Div.append(RName);
							Div.append(image);
							Div.append(link);
							link.text("Recipe Link: " + RecipeLink);

							$(".generated-recipe").append(Div);

						}
					});

				};
			})
		}
	});
	$(".button_su_inner").on("click", function () {
		var foodType = $(this).val();
		console.log(foodType);
		// Recipe API
		recipeSearch();

		function recipeSearch() {


			var queryURL = "https://api.edamam.com/search?q=" + foodType + "&app_id=0c8956d4&app_key=f6e0fb536a06a548b0e38056ceba81fa&diet=" + recipeType;

			$.ajax({
				url: queryURL,
				method: "GET"
			}).then(function (response) {

				results = response.hits;
				for (var i = 0; i < results.length; i++) {
					console.log(results[i].recipe);
					console.log(results[i].recipe.label);
					var Div = $("<div>");
					var RName = $("<h1>").text(RecipeName).addClass("recipe-name");
					var RecipeName = results[i].recipe.label;
					var RecipeImg = results[i].recipe.image;
					var RecipeLink = results[i].recipe.url;
					var image = $("<img>").attr("src", RecipeImg).addClass("img-food");
					var link = $("<a>").attr("href", RecipeLink).addClass("img-link");

					Div.append(RName);
					Div.append(image);
					Div.append(link);
					link.text("Recipe Link: " + RecipeLink);

					$(".generated-recipe").prepend(Div);

				}
			});

		};

	})
})

// $(document).on("click", ".button_su_inner1", function () {

// 	$(".generated-recipe").empty(); 

// 	var queryURL = "https://api.edamam.com/search?q=chicken&app_id=0c8956d4&app_key=f6e0fb536a06a548b0e38056ceba81fa&diet=balanced&healthLabels=" + healthRestriction;
// 	var healthRestriction = $(this).val(); 

// 	$.ajax({
// 		url: queryURL,
// 		method: "GET"
// 	}).then(function (response) {

// 		results = response.hits;
// 		for (var i = 0; i < results.length; i++) {
// 			console.log(results[i].recipe);
// 			console.log(results[i].recipe.label);
// 			var Div = $("<div>");
// 			var RName = $("<h1>").text(RecipeName).addClass("recipe-name");
// 			var RecipeName = results[i].recipe.label;
// 			var RecipeImg = results[i].recipe.image;
// 			var RecipeLink = results[i].recipe.url;
// 			var image = $("<img>").attr("src", RecipeImg).addClass("img-food");
// 			var link = $("<a>").attr("href", RecipeLink).addClass("img-link");

// 			Div.append(RName);
// 			Div.append(image);
// 			Div.append(link);
// 			link.text("Recipe Link: " + RecipeLink);

// 			$(".generated-recipe").prepend(Div);

// 		}
// 	});
// }); 





$(".button_su_inner").mouseenter(function (e) {
	var parentOffset = $(this).offset();

	var relX = e.pageX - parentOffset.left;
	var relY = e.pageY - parentOffset.top;
	$(this).prev(".su_button_circle").css({
		"left": relX,
		"top": relY
	});
	$(this).prev(".su_button_circle").removeClass("desplode-circle");
	$(this).prev(".su_button_circle").addClass("explode-circle");

});

$(".button_su_inner").mouseleave(function (e) {

	var parentOffset = $(this).offset();

	var relX = e.pageX - parentOffset.left;
	var relY = e.pageY - parentOffset.top;
	$(this).prev(".su_button_circle").css({
		"left": relX,
		"top": relY
	});
	$(this).prev(".su_button_circle").removeClass("explode-circle");
	$(this).prev(".su_button_circle").addClass("desplode-circle");

});

$(".button_su_inner1").mouseenter(function (e) {
	var parentOffset = $(this).offset();

	var relX = e.pageX - parentOffset.left;
	var relY = e.pageY - parentOffset.top;
	$(this).prev(".su_button_circle").css({
		"left": relX,
		"top": relY
	});
	$(this).prev(".su_button_circle").removeClass("desplode-circle");
	$(this).prev(".su_button_circle").addClass("explode-circle");

});

$(".button_su_inner1").mouseleave(function (e) {

	var parentOffset = $(this).offset();

	var relX = e.pageX - parentOffset.left;
	var relY = e.pageY - parentOffset.top;
	$(this).prev(".su_button_circle").css({
		"left": relX,
		"top": relY
	});
	$(this).prev(".su_button_circle").removeClass("explode-circle");
	$(this).prev(".su_button_circle").addClass("desplode-circle");

});