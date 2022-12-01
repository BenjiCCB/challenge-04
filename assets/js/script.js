var startButton = document.querySelector(".start-button");
var introContent = document.querySelector("#intro");
var questionText = document.querySelector(".questionText");
var questionContent = document.querySelector(".questionContent");
var questionAnswers = document.querySelector(".questionAnswers");

var button1Span = document.querySelector(".button1-span"); // could do these using parent?
var button2Span = document.querySelector(".button2-span");
var button3Span = document.querySelector(".button3-span");
var button4Span = document.querySelector(".button4-span");

var score;


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
  questionId = 2; // need to create a seperate 'render question' function

  var currentQuestionChoices = [];

  for (var i = 0; i < 4; i++) { 
    currentQuestionChoices[i] = questionChoicesArray[questionId-1][i]
    console.log(currentQuestionChoices[i])
  }

  questionText.textContent = questionArray[questionId - 1];

  button1Span.textContent = currentQuestionChoices[0]; // maybe create a storage array of 'current question choices' and load them in somehow
  button2Span.textContent = currentQuestionChoices[1];
  button3Span.textContent = currentQuestionChoices[2];
  button4Span.textContent = currentQuestionChoices[3];
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
    questionId++; // call render question function
});

startButton.addEventListener("click", startQuiz);