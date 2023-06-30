var questionsArr = [
    {question: "How many hours in a day?", answer: "24", options: ['10', '6', '18', '24']},
    {question: "Which planet is known for its rings?", answer: "Saturn", options: ['Saturn', 'Mars', 'Earth', 'Neptune']},
    {question: "Which color is 2nd in the rainbow?", answer: "Orange", options: ['Blue', 'Green', 'Orange', 'Purple']},
    {question: "How many legs does an septopus have?", answer: "7", options: ['5', '6', '7', '8']},
    {question: 'What is the english translation for the spanish word "verde"', answer: "Green", options: ['polka', 'Green', 'Ball', 'Travel']}
]

var game = document.getElementById('quiz')
var correctAnswers = 0
var currentScore = 0
var finalScore 
var prevScoreValue = localStorage.getItem('previous-score')
var playedBefore = localStorage.getItem('played')
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
localStorage.setItem('played', false)
startGame()


//Sets up new game
function startGame(){
    
    if(playAgain){
        timer.remove()
        gameContainer.replaceChildren()
        console.log("new game triggered")
        playAgain = false
        
        currentScore = 0
        console.log('final score ' + finalScore)
        //var storedScore = localStorage.getItem('previous-score')
        gameContainer.remove() //clears out prior game to show startbutton
        question.remove()
        questionNum = 0
        localStorage.setItem('previous-score', finalScore)
        
        prevScoreValue = localStorage.getItem('previous-score')
        console.log ("local storage " + prevScoreValue)
        previousScore.innerHTML = ('Previous Score: ' + (prevScoreValue) + '%')
        game.appendChild(previousScore)    
    }

    if(playedBefore){
        previousScore.innerHTML = ('Previous Score: ' + prevScoreValue + '%')
        game.appendChild(previousScore) 
    }
    //startButton.appendChild(startButtonText)
    startButton.setAttribute('id','start-quiz')
    startButton.innerHTML = "Start Quiz!"
    game.appendChild(startButton)  
    startButton.addEventListener('click', newQuestion)
    console.log('current score ' + currentScore)
    
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
        console.log("Timer is counting down")
            if(timeRemaining === 0){
                console.log("question num " + questionNum + "array length = " + questionsArr.length)
                if((questionNum + 1) < questionsArr.length){
                    console.log("1 triggered")
                    gameContainer.replaceChildren()
                    questionNum ++
                    resetTimer()
                    newQuestion()
                } 
                else if((questionNum + 1) == questionsArr.length){
                    console.log("2 triggered")
                    playAgain = true
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
    console.log("Current question number is " + questionNum)

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
    console.log("option clicked ")
    if(optionClicked && ((questionNum + 1) < questionsArr.length)){
        console.log ("array length " + questionsArr.length )
        console.log ("quesiton Num " + questionNum)
        //validate answer
        if (questionsArr[questionNum].answer == this.innerHTML){
            console.log("question " + (questionNum +1) + "is true")
            currentScore++  
            console.log("current score is " + currentScore)  
        }  
        //Increment to next quesiton and reset gameboard with new Q/A
        optionClicked = false
        questionNum++
        gameContainer.replaceChildren()
        console.log(game)
    
        newQuestion()  
    }
    else{
        //Final score calculated and new game is presented to user
        console.log("current score " + currentScore)
        console.log("current question " + questionNum)
        var totalQuestions = questionNum + 1
        console.log("total questions " + totalQuestions)
        playedBefore = localStorage.setItem('played', true)
        finalScore = Math.round((currentScore/(totalQuestions))*100)
        
        console.log(prevScoreValue)
        playAgain = true
        console.log ("local storage " + prevScoreValue)
        previousScore.innerHTML = ('Previous Score: ' + finalScore + '%')
       
        startGame()
    }
    
}
