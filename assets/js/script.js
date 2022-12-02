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

var currentQuestionChoices = [];
var score = 0;

// score page content
var scorePageContent = document.querySelector("#scorePage");

// game info box
var gameInfoBox = document.querySelector("#gameInfo");
var scoreText = document.querySelector(".scoreText");

var timeEl = document.querySelector(".timerCount");
var secondsLeft = 60;
timeEl.textContent = secondsLeft;

// score page info
var saveButton = document.querySelector(".saveButton");
var nameInput = document.querySelector("#nameInput");
var nameEntryUL = document.querySelector(".nameEntriesUL");
var scorePageText = document.querySelector(".scorePageText");
var scorePageForm = document.querySelector(".scorePageForm");

// var retakeQuizButton = document.querySelector(".retake-quiz-button");

// -------------------------------------------

// Questions info

// questions
var questionArray = [
  "justo. Vinyl risus et at congue massa bicycle non nec justo sapien justo food truck quam quisque in. Odio ultricies before they sold out curabitur orci nec at ",
  "Ipsum sodales PBR nam vitae morbi quam eros VHS vitae non congue commodo odio noise",
  "commodo. Urna artisan sodales ornare proin leo elementum tofu ipsum eu proin maecenas"
]
// correct answers
var questionAnswersArray = [2, 1, 3];

// question choices (2d array) 
questionChoicesArray = [
  // Question 1
  ["Question 1 choice 1", 
  "Question 1 choice 2",
  "Question 1 choice 3",
  "Question 1 choice 4"
  ], 
  
  // Question 2
  ["Question 2 choice 1", 
  "Question 2 choice 2",
  "Question 3 choice 3",
  "Question 3 choice 4"
  ], 

  // Question 3
  ["Question 2 choice 1", 
  "Question 2 choice 2",
  "Question 3 choice 3",
  "Question 3 choice 4"
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

// render score page
function renderScorePage(){
  questionContent.style.display = 'none';
  scoreText.textContent = score + " of " + (questionArray.length);
  timeEl.parentElement.style.display = 'none'; // alt = var timeElDiv = document.querySelector(".counter");
  scorePageContent.style.display = 'block';
}

// process choice
questionAnswers.addEventListener("click", function(event){
    console.log(event.target.value);
    if(event.target.value == questionAnswersArray[questionId-1]){
      console.log("nice job")
      score++
    } else {
      console.log("you suck")
      secondsLeft -= 10;
    // check timer
      if(secondsLeft <= 0){
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

// process score, sending to/from local storage
function storeInfo(event){
  event.preventDefault();
  scorePageForm.style.display = 'none';

  // pull from / add to local storage
  var percentageScore = ((score / questionArray.length)).toFixed(2)*100; // **ADD TO SCREEN**

  var currentUserScore = {
    userName: nameInput.value,
    userScore: percentageScore,
  };

  var userScoresArray = JSON.parse(localStorage.getItem("userScores")) || [];
  userScoresArray.push(currentUserScore);
  localStorage.setItem("userScores", JSON.stringify(userScoresArray));

  // render to screen
  scorePageText.textContent = "See high scores below";

  var scoresArraySorted = userScoresArray;
  scoresArraySorted.sort((firstItem, secondItem) => secondItem.userScore - firstItem.userScore);
  console.log(scoresArraySorted);

  for(var i = 0; i < 10 && i < userScoresArray.length; i++){
    var userScoreName = scoresArraySorted[i].userName;
    var userScoreScore = scoresArraySorted[i].userScore;
    
    var userScoreLI = document.createElement("li");
    userScoreLI.textContent = userScoreName + "... " + userScoreScore + "%" ;
    nameEntryUL.appendChild(userScoreLI);

    
  }

}

// function resetQuiz(event){
//   questionId
// }

startButton.addEventListener("click", startQuiz);
saveButton.addEventListener("click", storeInfo);
// retakeQuizButton.addEventListener("click", resetQuiz);