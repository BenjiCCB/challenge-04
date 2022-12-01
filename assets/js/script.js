var startButton = document.querySelector(".start-button");
var introContent = document.querySelector("#intro");
var questionText = document.querySelector(".questionText");
var questionContent = document.querySelector("#questionContent");
var questionAnswers = document.querySelector(".questionAnswers");
var scorePageContent = document.querySelector("#scorePage");
var gameInfoBox = document.querySelector("#gameInfo");
var scoreText = document.querySelector(".scoreText");
var scoreText = document.querySelector(".timerCount");


var button1Span = document.querySelector(".button1-span"); // could do these using parent?
var button2Span = document.querySelector(".button2-span");
var button3Span = document.querySelector(".button3-span");
var button4Span = document.querySelector(".button4-span");

var currentQuestionChoices = [];
var score = 0;


  // // Question object
  // var question1 = {
  //   questionText: "justo. Vinyl risus et at congue massa bicycle non nec justo sapien justo food truck quam quisque in. Odio ultricies before they sold out curabitur orci nec at"
  //   option1: "I'm an answer"
  //   option2: "I'm an answer"
  //   option3: "I'm an answer"
  //   correctAnswer: 3
  // };


var questionArray = [
  "justo. Vinyl risus et at congue massa bicycle non nec justo sapien justo food truck quam quisque in. Odio ultricies before they sold out curabitur orci nec at ",
  "Ipsum sodales PBR nam vitae morbi quam eros VHS vitae non congue commodo odio noise",
  "commodo. Urna artisan sodales ornare proin leo elementum tofu ipsum eu proin maecenas"
]
questionAnswersArray = [2, 1, 3];

//2d array is possible
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


// quiz start
function startQuiz() {
  introContent.remove();
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
    }
    questionId++;
    if(questionId <= questionArray.length){
      renderQuestion();  
    } else{
      console.log("all done");
      scoreText.textContent = score + " of " + (questionId - 1);
      renderScorePage();
    }
    
});

startButton.addEventListener("click", startQuiz);