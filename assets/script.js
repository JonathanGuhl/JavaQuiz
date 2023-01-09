// Main Screen Global Variables ---- (ALL GLOBAL VARIABLES LINES 2-93) ----
var startScreen = document.getElementById("startScreen");
var startQuizButton = document.getElementById("quizButton");
var highScoresEl = document.getElementById("highScores");

// Quiz Questions Variables
var quizContainer = document.getElementById("quizContainer");
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questionsIndex");
var answerA = document.getElementById("a");
var answerB = document.getElementById("b");
var answerC = document.getElementById("c");
var answerD = document.getElementById("d");
var answerFeedback = document.getElementById("feedback");
// End of Game Variables 
var endOfGame = document.getElementById("endOfGameContainer");
var finalScoreEl = document.getElementById("finalScore");
var scoreSaveEl = document.getElementById("scoreSave");
var scoreSubmitEl = document.getElementById("scoreSubmit");
// Saved Scores Variables
var scoresContainer = document.getElementById("scoresContainer");
var scoreInput = document.getElementById("initials");
var scoresListEl = document.getElementById("scoresList");
var userNamesEl = document.getElementById("userNames");
var userScoresEl = document.getElementById("userScores");
//Game Restart Variables
var replayContainer = document.getElementById("replay");
// Quiz Questions Array
var quizQuestions = [{
    question: "In what way would you involve JavaScript code in an HTML file?",
        answerA: "Inline",
        answerB: "Internal",
        answerC: "External",
        answerD: "All of the Above",
        correctAnswer: "d"},
   {
    question: "Which keyword exits a function?",
        answerA: "var",
        answerB: "return",
        answerC: "switch",
        answerD: "function",
        correctAnswer: "b"},
    {
    question: "A JavaScript function is executed with ___ after the name of the function",
        answerA: "( )",
        answerB: "[ ]",
        answerC: "{ }",
        answerD: "< >",
        correctAnswer: "a"},
    {
    question: "Which one isn't a Javascript Operator?",
        answerA: "Function Operator",
        answerB: "Logical Operator",
        answerC: "Assignment Operator",
        answerD: "Arithmetic Operator",
        correctAnswer: "a"},
    {
    question: "JavaScript has ___ Datatypes?",
        answerA: "4",
        answerB: "10",
        answerC: "8",
        answerD: "16",
        correctAnswer: "c"},  
    {
    question: "Array Indexes start with a variable of ____",
        answerA: "0",
        answerB: "1",
        answerC: "2",
        answerD: "3",
        correctAnswer: "a"},
    {
    question: "Arrays are special types of _____?",
        answerA: "methods",
        answerB: "functions",
        answerC: "events",
        answerD: "objects",
        correctAnswer: "d"},
    {
    question: "Boolean has what data type?",
        answerA: "String",
        answerB: "Number",
        answerC: "Undefined",
        answerD: "True/False",
        correctAnswer: "d"},
    ];
// Timer Variables
var timeLeft = 60; 
var timerInterval; 
// Question Variables
var questionsIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var score = 0;
var correct; 
//-------------------------------------------------------------------------
// Populator for questions with answers
function questionGenerator(){
    endOfGame.style.display = "none";
    if (currentQuestionIndex === questionsIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<ul>" + currentQuestion.question + "<ul>";
    answerA.innerHTML = currentQuestion.answerA;
    answerB.innerHTML = currentQuestion.answerB;
    answerC.innerHTML = currentQuestion.answerC;
    answerD.innerHTML = currentQuestion.answerD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    endOfGame.style.display = "none";
    startScreen.style.display = "none";
    questionGenerator();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time Left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizContainer.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    startScreen.style.display = "none";
    quizContainer.style.display = "none";
    endOfGame.style.display = "flex";
    clearInterval(timerInterval);
    scoreSaveEl.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// 
scoreSubmitEl.addEventListener("click", function highscore(){
    if(scoreSaveEl.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = scoreSaveEl.value.trim();
        var userScores = {
            name : currentUser,
            score : score,
        };
    
        endOfGame.style.display = "none";
        scoresContainer.style.display = "flex";
        scoresListEl.style.display = "block";
        replayContainer.style.display = "flex";
        
        savedHighscores.push(userScores);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        displayHighScores();

    }
    
});

// Pulls date from local storage and displays user Initials and Scores
function displayHighScores(){
    userNamesEl.innerHTML = "";
    userScoresEl.innerHTML = "";
    var localScores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<localScores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = localScores[i].name;
        newScoreSpan.textContent =localScores[i].score;
        userNamesEl.appendChild(newNameSpan);
        userScoresEl.appendChild(newScoreSpan);
    }
}

// 
function showHighScore(){
    startScreen.style.display = "none";
    quizContainer.style.display = "none";
    endOfGame.style.display = "none";
    scoresContainer.style.display = "inline-block";
    scoreSaveEl.style.display = "column";
    replayContainer.style.display = "flex";

    displayHighScores();
}

// Clear Local Storage
function clearScores(){
    window.localStorage.clear();
    userNamesEl.textContent = "";
    userScoresEl.textContent = "";
}

// Resets 
function replayQuiz(){
    scoresContainer.style.display = "none";
    endOfGame.style.display = "none";
    replayContainer.style.display ="none";
    startScreen.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function optionChosen(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    answerFeedback.style.display = "block"
    let p = document.createElement("p");
    answerFeedback.appendChild(p);
// Will hide feedback for answer after one second
    setTimeout(function(){
        p.style.display = "none";
    }, 1000);

    if (answer == correct && currentQuestionIndex !== questionsIndex){
        score++;
        p.textContent = "--Correct ✅";
        currentQuestionIndex++;
        questionGenerator();
    
    } else if (answer !== correct && currentQuestionIndex !== questionsIndex){
        p.textContent = "--Incorrect ❌";
        timeLeft = timeLeft - 10; 
        currentQuestionIndex++;
        questionGenerator();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);
highScoresEl.addEventListener("click",showHighScore);






