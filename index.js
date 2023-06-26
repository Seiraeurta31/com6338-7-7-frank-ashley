var questionsArr = [
    {question: "", answer: "", options: ['', '', '', '']},
    {question: "", answer: "", options: ['', '', '', '']},
    {question: "", answer: "", options: ['', '', '', '']},
    {question: "", answer: "", options: ['', '', '', '']}
]

var game = document.getElementById('quiz')
var questionsAsked = 0
var correctAnswers = 0
var finalScore = 10
var playing = false
var newGame = false
var questionNum = 0
var optionClicked = false
var previousScore = document.createElement("p")
var startButton = document.createElement('BUTTON')
var startButtonText = document.createTextNode("Start Quiz!")
var gameContainer = document.createElement("div")
var question = document.createElement('p')
var questionText

//initialize game
gameSetup()
console.log(game)

function gameSetup(){
    if(newGame){
        gameContainer.remove() //clears out prior game to show startbutton
        var prevScoreText = document.createTextNode(finalScore)
        previousScore.appendChild(prevScoreText)
        game.appendChild(previousScore)  
    }
    //startButton = document.createElement('BUTTON')
    //startButtonText = document.createTextNode("Start Quiz!")
    startButton.appendChild(startButtonText)
    startButton.setAttribute('id', 'start-quiz')
    game.appendChild(startButton)  
    startButton.addEventListener('click', newQuestion)
}

var timer = document.createElement('P')

function newQuestion(){
    //remove start button and previous score
    startButton.remove()
    previousScore.remove()

    //create gameboard
    game.appendChild(gameContainer)
    questionText = document.createTextNode("Start Quiz!")
    question.appendChild(questionText)
    gameContainer.appendChild(question)
}

