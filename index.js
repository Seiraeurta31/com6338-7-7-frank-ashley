var questionsArr = [
    {question: "How many hours in a day?", answer: "24", options: ['10', '6', '18', '24']},
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
var optionB1
var optionB1Text
var optionB2
var optionB2Text
var optionB3
var optionB3Text
var optionB4
var optionB4Text
var timer = document.createElement('P')

//initialize game
gameSetup()
console.log(game)

function gameSetup(){
    if(newGame){
        gameContainer.remove() //clears out prior game to show startbutton
        question.remove()
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


function newQuestion(){
    //remove start button and previous score
    startButton.remove()
    previousScore.remove()

    //create prompt
    questionText = document.createTextNode(questionsArr[questionNum].question)
    console.log(questionText)
    question.appendChild(questionText)
    game.appendChild(question)

     //create gameboard
     game.appendChild(gameContainer)

    //create option buttons inside a container
    optionB1 = document.createElement('BUTTON')
    optionB1Text = document.createTextNode(questionsArr[questionNum].options[0])
    optionB1.appendChild(optionB1Text)
    gameContainer.appendChild(optionB1)

    optionB2 = document.createElement('BUTTON')
    optionB2Text = document.createTextNode(questionsArr[questionNum].options[1])
    optionB2.appendChild(optionB2Text)
    gameContainer.appendChild(optionB2)

    optionB3 = document.createElement('BUTTON')
    optionB3Text = document.createTextNode(questionsArr[questionNum].options[2])
    optionB3.appendChild(optionB3Text)
    gameContainer.appendChild(optionB3)

    optionB4 = document.createElement('BUTTON')
    optionB4Text = document.createTextNode(questionsArr[questionNum].options[3])
    optionB4.appendChild(optionB4Text)
    gameContainer.appendChild(optionB4)
    
}
