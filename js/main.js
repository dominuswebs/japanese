window.addEventListener('DOMContentLoaded', (e) => {
	init();
});

var quizData;

function init()
{
	// run all necessary functions
	trainingSelectionHandler();
}

function loadQuizData(file)
{
	let json = loadJson(file);

	json.then(function(data){

		quizData = data;

		prepareQuiz();
	});
}

function trainingSelectionHandler()
{
	let buttons = document.querySelectorAll('.training-option');

	buttons.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			console.log(e.target.id);
		});
	});
}

function questionSelectionHandler()
{
	let answers = document.querySelectorAll('.answer');

	answers.forEach((answer) => {
		answer.addEventListener('click', (e) => {
			validateAnswer(e.target);
		});
	});
}

async function loadJson(file)
{
	return await fetch('./data/' + file + '.json')
	.then(response => response.json())
}

function prepareQuiz()
{
	// hide training options
	document.getElementById('options').style.display = 'none';

	loadQuestions()

}

function loadQuestions()
{
	// empty quiz area
	let quizArea = document.getElementById('quiz-area');
	
	while(quizArea.firstChild)
	{
		parent.removeChild(parent.firstChild);
	}

	// get 3 random questions
	let questions = getRandomQuestions(3);

	// pick one for the correct one
	let correctQuestion = getRandomNumber(2);

	// prepare template

	let html = questionsTemplate(
		questions[correctQuestion]['hiragana'], 
		questions[0]['kanji'], 
		questions[1]['kanji'], 
		questions[2]['kanji']
		);

	quizArea.insertAdjacentHTML('beforeend', html);
}

function getRandomQuestions(nQuestions)
{
	let rQuestions = [];
	// copy array

	let quizDataCopy = [...quizData];



	for(let i = 1; i <= nQuestions; i++)
	{
		let ln = quizDataCopy.length;

		rQuestions.push(quizDataCopy.splice(getRandomNumber(ln), 1)[0]);
	}

	return rQuestions;

}

function getRandomNumber(max)
{
	return Math.floor(Math.random() * max);
}

function questionsTemplate(question, answer1, answer2, answer3) {

	return `<div id="question">
		<div id="question-header">
			${question}
		</div>
		<div class="answers">
			<div class="answer">${answer1}</div>
			<div class="answer">${answer2}</div>
			<div class="answer">${answer3}</div>
		</div>
	</div>`;
} 

loadQuizData('kanji');
