var startButton = document.querySelector(".start-button");
var introContent = document.querySelector("#intro");
var questionText = document.querySelector(".questionText");
var questionContent = document.querySelector(".questionContent");
var questionArray = [];

var questionAnswers = document.querySelector(".questionAnswers");

  // // Question object
  // var question1 = {
  //   questionText: "justo. Vinyl risus et at congue massa bicycle non nec justo sapien justo food truck quam quisque in. Odio ultricies before they sold out curabitur orci nec at"
  //   option1: "I'm an answer"
  //   option2: "I'm an answer"
  //   option3: "I'm an answer"
  //   correctAnswer: 3
  // };


questionArray = [
  "justo. Vinyl risus et at congue massa bicycle non nec justo sapien justo food truck quam quisque in. Odio ultricies before they sold out curabitur orci nec at ",
  "Ipsum sodales PBR nam vitae morbi quam eros VHS vitae non congue commodo odio noise",
  "commodo. Urna artisan sodales ornare proin leo elementum tofu ipsum eu proin maecenas"
]


// quiz start
function startQuiz() {
  introContent.remove();
  questionContent.style.display = 'inline';
  questionText.textContent = questionArray[0];
}

startButton.addEventListener("click", startQuiz);

// process choice
questionAnswers.addEventListener("click", function(event){
    console.log(event.target.value);
});
