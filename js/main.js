window.addEventListener('DOMContentLoaded', (e) => {
	init();
});

let _quizData;
let _quizType = '';
let _quizSelected = '';

function init()
{
	// run all necessary functions
	loadMenu();
}

function loadQuizData(quiz)
{
	// if the id is a combination of file and option
	if(quiz.includes('-'))
	{
		let path = quiz.split('-');

		let json = loadJson(path[0]);

		json.then(function(data){

			_quizData = data[path[1]];

			prepareQuiz(quiz);
		});

	} else {

		let json = loadJson(quiz);

		json.then(function(data){

			_quizData = data;

			prepareQuiz(quiz);
		});
	}

}

function trainingSelectionHandler()
{
	let buttons = document.querySelectorAll('.training-option');

	buttons.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			
			if(Array.isArray(_menuOptions[e.target.id]))
			{
				_quizType = e.target.id;
				loadMenu(_menuOptions[e.target.id]);
			} else {
				loadQuizData(e.target.id);
			}
		});
	});
}

function questionSelectionHandler(correctAnswer)
{
	let answers = document.querySelectorAll('.answer');

	answers.forEach((answer) => {
		answer.addEventListener('click', (e) => {
			validateAnswer(correctAnswer, e.target);
		});
	});
}

async function loadJson(file)
{
	return await fetch('./data/' + file + '.json')
	.then(response => response.json())
}

function prepareQuiz(quiz)
{
	// hide training options
	document.getElementById('options').style.display = 'none';
	// reset score
	document.getElementById('score').innerText = '';
	
	_quizSelected = quiz;

	loadQuestions();
}

function loadQuestions()
{
	// empty quiz area
	let quizArea = document.getElementById('quiz-area');

	while(quizArea.firstChild)
	{
		quizArea.removeChild(quizArea.firstChild);
	}

	// get 3 random questions
	let questions = getRandomQuestions(3);

	// pick one for the correct one
	let correctQuestion = getRandomNumber(2);

	// prepare template

	let html = questionsTemplate(
		questions[correctQuestion][_quizSettings[_quizSelected]['display']], 
		questions[0][_quizSettings[_quizSelected]['options']], 
		questions[1][_quizSettings[_quizSelected]['options']], 
		questions[2][_quizSettings[_quizSelected]['options']]
		);

	quizArea.insertAdjacentHTML('beforeend', html);

	questionSelectionHandler(questions[correctQuestion][_quizSettings[_quizSelected]['options']]);
}

function getRandomQuestions(nQuestions)
{
	let rQuestions = [];
	// copy array

	let quizDataCopy = [..._quizData];

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

function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}

function validateAnswer(value, selection)
{
	if(value === selection.innerText)
	{
		updateScore(1);
	} else {
		updateScore(0);
	}

	loadQuestions();
}

function updateScore(val)
{
	let score = document.getElementById('score');

	if(score.innerText)
	{
		let temp = score.innerText.split('/');
		score.innerText = (parseInt(temp[0]) + val) + '/' + (parseInt(temp[1]) + 1);

		temp = score.innerText.split('/');

		updateScoreStyle((temp[0]/temp[1]).toFixed(2));

	} else {
		// first question
		score.innerText = val + '/1';

		let temp = score.innerText.split('/');

		updateScoreStyle((temp[0]/temp[1]).toFixed(2));
	}
}

function updateScoreStyle(ratio)
{
	let score = document.getElementById('score');

	switch(true)
	{
		case ratio > 0.8:

			score.style.color = '#008080';

		break; 

		case ratio > 0.6:

			score.style.color = '#40E0D0';

		break;

		case ratio == 0.5:

			score.style.color = '#FF6347';

		break;

		case ratio > 0.4:

			score.style.color = '#FF0000';

		break;

		case ratio > 0.2:

			score.style.color = '#DC143C';

		break;

		default:

			score.style.color = '#8B0000';
	}
}

function loadMenu(menu = null)
{
	// empty menu area
	let menuArea = document.getElementById('options');

	while(menuArea.firstChild)
	{
		menuArea.removeChild(menuArea.firstChild);
	}

	let menuOptions;

	// not initial menu
	if(menu)
	{
		menuOptions = menu;
	}
	else {
		menuOptions = Object.keys(_menuOptions);
	}

	menuOptions.forEach((option) => {
		let html = menuOptionsTemplate(option);
		menuArea.insertAdjacentHTML('beforeend', html);
	});

	trainingSelectionHandler();
}

function menuOptionsTemplate(value)
{
	if(_quizType)
	{
		return `<div id="${_quizType}-${value}" class="training-option">${value}</div>`;
	}

	return `<div id="${value}" class="training-option">${value}</div>`;
}

function questionsTemplate(question, answer1, answer2, answer3) 
{

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