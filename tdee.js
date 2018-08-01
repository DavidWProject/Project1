console.log("you are here now");

function TDEE (data) {
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
		mesomorph: 500  // mesomorph 400-500 kcal
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

var ratios = [
	{
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

function mySubmit()
{

	var ageInput = document.getElementById("age").value;
	
	var feetHolder = document.getElementById("feet").value;
	var inchesHolder = document.getElementById("inches").value;
	var weightHolder = document.getElementById("weight").value;



	var workoutInput= document.getElementById("inlineFormCustomSelect").value;
	var durationInput = document.getElementById("duration").value;



	var heightInput = ((Number(feetHolder)*12)+Number(inchesHolder))*2.54;
	console.log("toootall"+heightInput);


	var weightInput = weightHolder * 0.453592;

   

    var qmmr = {
        weight: weightInput,
        height: 184,
        age: ageInput,                        //34
        sex: 'male',
        bodyType: 'mesomorph',
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


}