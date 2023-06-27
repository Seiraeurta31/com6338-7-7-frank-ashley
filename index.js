var questionsArr = [
    {question: "How many hours in a day?", answer: "24", options: ['10', '6', '18', '24']},
    {question: "Which planet is known for its rings?", answer: "Saturn", options: ['Saturn', 'Mars', 'Earth', 'Neptune']},
    {question: "Which color is 2nd in the rainbow?", answer: "Orange", options: ['Blue', 'Green', 'Orange', 'Purple']},
    {question: "How many legs does an septopus have?", answer: "7", options: ['5', '6', '7', '8']},
    {question: 'What is the english translation for the spanish word "verde"', answer: "Green", options: ['polka', 'Green', 'Ball', 'Travel']}
]

var game = document.getElementById('quiz')
var questionsAsked = 0
var correctAnswers = 0
var currentScore = 0
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
var optionB1 = document.createElement('BUTTON')
var optionB2 = document.createElement('BUTTON')
var optionB3 = document.createElement('BUTTON')
var optionB4 = document.createElement('BUTTON')
var timer = document.createElement('p')
var timeRemaining = 30
var timeText 
var timerId


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
    startButton.appendChild(startButtonText)
    startButton.setAttribute('id', 'start-quiz')
    game.appendChild(startButton)  
    startButton.addEventListener('click', newQuestion)
}

var startTimer = function(){
    timerId = setInterval(function(){
        timeRemaining --
        timer.innerHTML = timeRemaining
        console.log("counting down ")
            if(timeRemaining === 0){
                resetTimer()
            } 
        }, 1000)
}

var resetTimer = function(){
    timeRemaining = 30
    clearInterval(timerId)
    timer.innerHTML = ""
    //start
}

//new question
function newQuestion(){
    startTimer()
    console.log("question number " + questionNum)
    console.log("option clicked " + optionClicked)
    //if first round
    if(questionNum == 0){
        startButton.remove()
        previousScore.remove()
    }

    //create question prompt to user
    console.log(questionText)
    question.innerHTML = questionsArr[questionNum].question
    game.appendChild(question)

    //create container for option buttons
    game.appendChild(gameContainer)

    
    //create option buttons inside a container
    //optionB1 = document.createElement('BUTTON')
    optionB1.innerHTML = questionsArr[questionNum].options[0]
    gameContainer.appendChild(optionB1)
    optionB1.addEventListener('click', validate, optionClicked = true)

    //optionB2 = document.createElement('BUTTON')
    optionB2.innerHTML = questionsArr[questionNum].options[1]
    gameContainer.appendChild(optionB2)
    optionB2.addEventListener('click', validate, optionClicked = true)

    //optionB3 = document.createElement('BUTTON')
    optionB3.innerHTML = questionsArr[questionNum].options[2]
    gameContainer.appendChild(optionB3)
    optionB3.addEventListener('click', validate, optionClicked = true)

    //optionB4 = document.createElement('BUTTON')
    optionB4.innerHTML = questionsArr[questionNum].options[3]
    gameContainer.appendChild(optionB4)
    optionB4.addEventListener('click', validate, optionClicked = true) 

    timeText = document.createTextNode(timeRemaining)
    timer.appendChild(timeText)
    game.appendChild(timer) 
 
}

function validate(){
    resetTimer()
    console.log("option clicked " + optionClicked)
    if(optionClicked && ((questionNum) <= questionsArr.length)){
        if (questionsArr[questionNum].answer == this.innerHTML){
            currentScore++  
            console.log(currentScore)  
        }    
    }
    optionClicked = false
    questionNum++
    game.replaceChildren()

    newQuestion()

    //if last question
        //if answered correctly 
            //increase score
            //start new game
    
}
