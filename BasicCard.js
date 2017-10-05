var inquirer = require("inquirer");
var questions = require("./basic.json");

//array to hold flashcard objects
var flashcardArray = [];

//constructor function for creating flash cards
function Flashcard(front, back) {
	this.front = front;
	this.back = back;
};

//creating question objects and pushing to flashcardArray
for (i = 0; i < questions.length; i++) {
var newFlashcard = new Flashcard(
	questions[i].front, questions[i].back
);
flashcardArray.push(newFlashcard);
// console.log("here's a new array item " + flashcardArray);

}

//counts the number of correct answers
var correct = 0;

//setting up a recursive function to ask each of the questions in the array
//using inquirer npm to ask questions
var askQuestion = function (questionsAsked) {
	if (questionsAsked < flashcardArray.length) {
		inquirer.prompt([
			{
				type: "input",
				message: flashcardArray[questionsAsked].front  + "\nAnswer: ", 
				name: "answer"		
			}
		//confirm whether the user's answer is correct or not
		]).then(function(answers){
				
				if (answers.answer === flashcardArray[questionsAsked].back) {
					console.log("you are correct");
					correct++;
				}
				else {
					console.log("Wrong, the correct answer is: " + flashcardArray[questionsAsked].back);
				}

				questionsAsked++;
				askQuestion(questionsAsked);
			});
	}
	else {
		console.log("Questions you got correct: " + correct);
		console.log("game over");
	//ask if user wants to play again	
		inquirer.prompt([
			{
				type: "confirm",
				message: "Would you like to play again?",
				name: "playAgain"		
			}
		]).then(function(play){
			if (play.playAgain === false) {
				console.log("Goodbye");
			}
			else {
				console.log("Let's play again");
				askQuestion(0);
			}
		})
	}
};
askQuestion(0);
