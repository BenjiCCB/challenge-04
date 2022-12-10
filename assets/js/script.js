// intro page content
var startButton = document.querySelector(".start-button");
var introContent = document.querySelector("#intro");

// question page content
var questionText = document.querySelector(".questionText");
var questionContent = document.querySelector("#questionContent");
var questionAnswers = document.querySelector(".questionAnswers");

var button1Span = document.querySelector(".button1-span"); // could do these using parent?
var button2Span = document.querySelector(".button2-span");
var button3Span = document.querySelector(".button3-span");
var button4Span = document.querySelector(".button4-span");

var indicatorDiv = document.querySelector(".responseIndicator");
var indicatorText = document.querySelector(".indicatorText");

var currentQuestionChoices = [];
var score = 0;

// info box content
var gameInfoBox = document.querySelector("#gameInfo");
var scoreText = document.querySelector(".scoreText");

var timeEl = document.querySelector(".timerCount");
var secondsLeft = 60;
timeEl.textContent = secondsLeft;

// score page content
var scorePageContent = document.querySelector("#scorePage");
var saveButton = document.querySelector(".saveButton");
var nameInput = document.querySelector("#nameInput");
var nameEntryUL = document.querySelector(".nameEntriesUL");
var scorePageText = document.querySelector(".scorePageText");
var scorePageForm = document.querySelector(".scorePageForm");
var retakeQuizButton = document.querySelector(".retake-quiz-button");

// -------------------------------------------

// Questions info

// questions
var questionArray = [
  "A series of values or objects stored sequentially to facilitate access and processing is known as a(n):",
  "A type of variable that indicates whether a given value is either true or false is called a(n):",
  "A block of code that, when called, performs specific actions detailed within it is referred to as a:",
  "A tool used from the browser window to view, diagnose, and manipulate code within the DOM is called the:",
  "A markup element used to identify and manipulate multiple HTML elements using a shared identifier is a(n):",
]
// correct answers
var questionAnswersArray = [2, 1, 3, 2, 4];

// question choices (2d array) 
questionChoicesArray = [
  // Question 1
  ["Elephant", 
  "Array",
  "Lion",
  "Monkey"
  ], 
  
  // Question 2
  ["Boolean", 
  "Apple",
  "Banana",
  "Kumquat"
  ], 

  // Question 3
  ["Car", 
  "Plane",
  "Function",
  "Train"
  ], 

  // Question 4
  ["Square", 
  "Console",
  "Circle",
  "Triangle"
  ],

  // Question 5
  ["London", 
  "Paris",
  "Berlin",
  "Class"
  ],

]

// -------------------------------------------

// quiz start
function startQuiz() {
  introContent.remove();
  setTime();
  questionContent.style.display = 'inline';
  gameInfoBox.style.display = 'inline';
  questionId = 1;
  renderQuestion();
}

// render question
function renderQuestion() {

  scoreText.textContent = score + " of " + (questionId - 1);
  questionText.textContent = questionArray[questionId - 1];

  for (var i = 0; i < 4; i++) { 
    currentQuestionChoices[i] = questionChoicesArray[questionId-1][i];
  }

  button1Span.textContent = currentQuestionChoices[0];
  button2Span.textContent = currentQuestionChoices[1];
  button3Span.textContent = currentQuestionChoices[2];
  button4Span.textContent = currentQuestionChoices[3];
}

// process choice
questionAnswers.addEventListener("click", function(event){
    console.log(event.target.value);
    indicatorDiv.style.display = 'block';

    if(event.target.value == questionAnswersArray[questionId-1]){
      console.log("nice job")
      indicatorText.textContent = "You nailed it"
      const myTimeout = setTimeout(clearIndicator, 1500);
      score++
    } else {
      console.log("incorrect answer")
      indicatorText.textContent = "Incorrect answer"
      const myTimeout = setTimeout(clearIndicator, 1500);
      secondsLeft -= 10;
    // check timer
      if(secondsLeft <= 0){
        window.alert("Your time has expired!");
        console.log("Timer has expired");
        renderScorePage();
      }
    }
    questionId++;

    // check question number
    if(questionId <= questionArray.length){
      renderQuestion();  
    } else{
      console.log("all done");
      scoreText.textContent = score + " of " + (questionId - 1);
      renderScorePage();
    }  
});

function clearIndicator() {
  indicatorDiv.style.display = 'none';
}

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls score page render
      renderScorePage();
    }
  }, 1000);
}

// render score page
function renderScorePage(){
  questionContent.style.display = 'none';
  scoreText.textContent = score + " of " + (questionArray.length);
  timeEl.parentElement.style.display = 'none';
  scorePageContent.style.display = 'block';
}

// process score, sending to/from local storage
function storeInfo(event){
  event.preventDefault();
  scorePageForm.style.display = 'none';

  // pull from / add to local storage
  var percentageScore = ((score / questionArray.length)).toFixed(2)*100;

  var currentUserScore = {
    userName: nameInput.value,
    userScore: percentageScore,
  };

  var userScoresArray = JSON.parse(localStorage.getItem("userScores")) || [];
  userScoresArray.push(currentUserScore);
  localStorage.setItem("userScores", JSON.stringify(userScoresArray));

  // render to screen
  scorePageText.setAttribute("style", "color:purple; font-size: 1.7em; font-weight: bold");
  scorePageText.textContent = "See high scores below:";

  var scoresArraySorted = userScoresArray;
  scoresArraySorted.sort((firstItem, secondItem) => secondItem.userScore - firstItem.userScore);
  console.log(scoresArraySorted);

  for(var i = 0; i < 10 && i < userScoresArray.length; i++){
    var userScoreName = scoresArraySorted[i].userName;
    var userScoreScore = scoresArraySorted[i].userScore;
    
    var userScoreLI = document.createElement("li");
    nameEntryUL.appendChild(userScoreLI);

    var nameSpan = document.createElement("span");
    nameSpan.textContent = userScoreName + "... ";
    nameSpan.className = "nameSpan";
    userScoreLI.appendChild(nameSpan);

    var scoreSpan = document.createElement("span");
    scoreSpan.textContent = userScoreScore + "%";
    scoreSpan.className = "scoreSpan";
    userScoreLI.appendChild(scoreSpan);
  }
  retakeQuizButton.style.display = 'inline';  
}

function resetQuiz(event){
  location.reload();
}



startButton.addEventListener("click", startQuiz);
saveButton.addEventListener("click", storeInfo);
retakeQuizButton.addEventListener("click", resetQuiz);