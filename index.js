var questionsArr = [
    {question: "How many hours in a day?", answer: "24", options: ['10', '6', '18', '24']},
    {question: "Which planet is known for its rings?", answer: "Saturn", options: ['Saturn', 'Mars', 'Earth', 'Neptune']},
    {question: "Which color is 2nd in the rainbow?", answer: "Orange", options: ['Blue', 'Green', 'Orange', 'Purple']},
    {question: "How many legs does an septopus have?", answer: "7", options: ['5', '6', '7', '8']},
    {question: 'What is the english translation for the spanish word "verde"', answer: "Green", options: ['polka', 'Green', 'Ball', 'Travel']}
]

var game = document.getElementById('quiz')
var currentScore = 0
var finalScore = 0
var prevScoreValue = localStorage.getItem('previous-score')
var playedBefore = localStorage.getItem('playedBefore')
var playAgain = false
var questionNum = 0
var optionClicked = false
var previousScore = document.createElement("p")
var startButton = document.createElement('BUTTON')
var gameContainer = document.createElement("div")
var question = document.createElement('p')
var optionButton
var timer = document.createElement('p')
var timeRemaining = 30
var timerId

//initialize game
startGame()

//Sets up new game
function startGame(){

    //if played before, show previous score to player
    if(playedBefore){
        prevScoreValue = localStorage.getItem('previous-score')
        previousScore.innerHTML = ('Previous Score: ' + prevScoreValue + '%')
        game.appendChild(previousScore) 
    }

    //resets game
    if(playAgain){
        
        updatePlayerStatus() // saves previous score
        timer.remove()
        playAgain = false
        currentScore = 0
        gameContainer.remove() 
        question.remove()
        questionNum = 0 
    }

    //Creates start button
    startButton.setAttribute('id','start-quiz')
    startButton.innerHTML = "Start Quiz!"
    game.appendChild(startButton)  
    startButton.addEventListener('click', newQuestion)   
}

//Create option buttons from question array
function optionButtons() {
    for (let i = 0; i < questionsArr[questionNum].options.length; i++) {
       optionButton = document.createElement('BUTTON')
       optionButton.innerHTML = questionsArr[questionNum].options[i]
       optionButton.addEventListener('click', validate, optionClicked = true)
       gameContainer.appendChild(optionButton)
    }
}

//Game timer
function startTimer(){
    timerId = setInterval(function(){
        timeRemaining --
        timer.innerHTML = timeRemaining
            //if time runs out 
            if(timeRemaining === 0){
                resetTimer()
                //questions remaining
                if((questionNum + 1) < questionsArr.length){
                    gameContainer.replaceChildren()
                    questionNum ++
                    newQuestion()
                } 
                //last question
                else if((questionNum + 1) == questionsArr.length){
                    playAgain = true
                    updatePlayerStatus()
                    startGame() 
                }   
            } 
        }, 1000)
}

//Reset timer (when option is clicked or time runs out/new question)
function resetTimer(){
    timeRemaining = 30
    clearInterval(timerId)
    timer.innerHTML = ""
}

//Presents new question/options to user
function newQuestion(){

    startTimer()

    //If first round of game (remove start button and previous score)
    if(questionNum == 0){
        startButton.remove()
        previousScore.remove()
    }

    //Create and present question prompt to user
    question.innerHTML = questionsArr[questionNum].question
    game.appendChild(question)

    //Create container to hold/format option buttons
    game.appendChild(gameContainer)
    
    //Create and present option buttons to user
    optionButtons()

    //present timer to user
    timer.innerHTML = timeRemaining
    game.appendChild(timer) 
}

//Validate option selected by user
function validate(){
    resetTimer()
    //validate answer and increase score if correct
    if (questionsArr[questionNum].answer == this.innerHTML){
        currentScore++  
    }  

    //if remaining questions present new question
    if((questionNum + 1) < questionsArr.length){
        questionNum++
        gameContainer.replaceChildren()
        newQuestion()  
    }
    //if last question, update score and reset game
    else if((questionNum +1) == questionsArr.length){
        updatePlayerStatus()
        startGame()
    }  
}

//store 
function updatePlayerStatus(){
    var totalQuestions = questionsArr.length
    finalScore = Math.round((currentScore/(totalQuestions))*100)
    localStorage.setItem('previous-score', finalScore)

    playAgain = true
    //store new value played, and then set to variable for replay
    localStorage.setItem('playedBefore', true)
    playedBefore = localStorage.getItem('playedBefore', true)

}
