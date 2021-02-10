

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quezBox = document.querySelector(".quez-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push the questions into availableQuestions Array
function setAvailableQuestions(){
	const totalQuestion = quez.length;
	for (let i=0; i<totalQuestion; i++){
		availableQuestions.push(quez[i])
	}
}

// set question number and question and options
function getNewQuestion(){
	// set question number
	questionNumber.innerHTML = "Question "+(questionCounter+1)+" of "+quez.length;

	// set question question-text
	// get random question
	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)] 
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.q;
	// get the position of 'questionIndex' from the availableQuestions Array
	const index1= availableQuestions.indexOf(questionIndex)
	// remove the 'questionIndex' from the availableQuestions Array, so that the question does not repait
	availableQuestions.splice(index1,1);

	// set options
	// get the length of options
	const optionLen = currentQuestion.options.length
	// push option into availableOptions Array
	for(i=0;i<optionLen;i++){
		availableOptions.push(i)
	}
	optionContainer.innerHTML='';
	let animationDelay = 0.2;
	// create option in html
	for(let i=0;i<optionLen;i++){
		// random option
		const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		// get the position of 'optonIndex' from the availableOptions Array
		const index2 = availableOptions.indexOf(optonIndex);
		// remove the 'optonIndex' from the availableOptions Array, so that the option dose not repaet
		availableOptions.splice(index2,1);
		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[optonIndex];
		option.id = optonIndex;
		option.style.animationDelay = animationDelay + 's';
		animationDelay = animationDelay +0.2;
		option.className = "option";
		optionContainer.appendChild(option)
		option.setAttribute("onclick","getResult(this)")
	}

	questionCounter++
}

// get the result of current attempt question
function getResult(element){
	const id = parseInt(element.id);
	// get the answer by comparing the id of clicked option
	if(id === currentQuestion.answer){
		// set the green color to the correct option
		element.classList.add("correct");
		// add the indicator to correct mark
		updateAnswerIndicator("correct");
		correctAnswers++;
	}
	else{
		// set the red color to the incorrect option
		element.classList.add("wrong");
		// add the indicator to wrong mark
		updateAnswerIndicator("wrong");

		// if the answer  is the incorrect the show the correct option by adding green color the correct option
		const optionLen = optionContainer.children.length;
		for (let i=0; i<optionLen; i++){
			if (parseInt(optionContainer.children[i].id)===currentQuestion.answer){
				optionContainer.children[i].classList.add("correct");
			}
		}

	}
	attempt++;
	unclickableOptions();
}

// make all the options unclickable once the user select a option (RESTRICT the user to change  the option again)
function unclickableOptions(){
	const optionLen = optionContainer.children.length;
	for(let i=0;i<optionLen;i++){
		optionContainer.children[i].classList.add("already-answered");
	}
}

function answersIndicator(){
	answersIndicatorContainer.innerHTML = '';
	const totalQuestion = quez.length;
	for(let i=0;i<totalQuestion;i++){
		const indicator = document.createElement("div");
		answersIndicatorContainer.appendChild(indicator);
	}
}
function updateAnswerIndicator(markType){
	answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
	if(questionCounter === quez.length){
		quezOver();
	}
	else{
		getNewQuestion();
	}
}

function quezOver(){
	// hide quez quezBox
	quezBox.classList.add("hide");
	// show result Box
	resultBox.classList.remove("hide");
	quezResult();
}
// get the quez Result
function quezResult(){
	resultBox.querySelector(".total-question").innerHTML = quez.length;
	resultBox.querySelector(".total-attempt").innerHTML = attempt;
	resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
	resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
	const percentage = (correctAnswers/quez.length)*100;
	resultBox.querySelector(".percentage").innerHTML = percentage.toFixed()+"%";
	resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / "+quez.length;
}

function resetQuez(){
	questionCounter = 0;
	correctAnswers = 0;
	attempt = 0;
}

function tryAgainQuez(){
	// hide the rusultBox
	resultBox.classList.add("hide");
	// show the quezBox
	quezBox.classList.remove("hide");
	resetQuez();
	startQuez();
}

function goToHome(){
	// hide result Box
	resultBox.classList.add("hide");
	// show home box
	homeBox.classList.remove("hide");
	resetQuez();
}

// #### STARTING POINT ####

function startQuez(){

	// hide home box
	homeBox.classList.add("hide");
	// show quez Box
	quezBox.classList.remove("hide");
	// first we will set all questions in availableQuestions Array
	setAvailableQuestions();
	// second we will call getNewQuestion(); function
	getNewQuestion();
	// to create indicators of answers
	answersIndicator();

}


window.onload = function() {
	homeBox.querySelector(".total-question").innerHTML = quez.length;
}