//Variables for each of the HTML tags that the application will interact with.
var submitBtn = document.querySelector("#submit");
//Questions, answer choices, and correct answers.
var questions = [
   {
   question: "Which of the following is a correct IF statement?",
   choices: ["if i == 3 then", "if i = 3", "if (i == 3)", "if i = 3 then"], 
   answer: "if (i == 3)"
   },
   { 
   question: "JavaScript can be placed in:", 
   choices: ["the <head> section", "the <body> section>", "inside of a <div>", "it can go in the <head> or the <body> section"], 
   answer: "it can go in the <head> or the <body> section" 
   }, 
   { 
   question: "Comments may be added in JavaScript by:", 
   choices: ["'entering a comment like this.'", "//entering a comment like this.", "/*entering a comment like this.", "<!--entering a comment like this.--!>"], 
   answer: "//entering a comment like this." 
   }, 
   { 
   question: "Whent an HTML element is clicked by the user, which of the following events occurs?", 
   choices: ["function", "onclick", "onchange", "var click"], 
   answer: "onclick" 
   }
]

//Response buttons for the question choices.
var btnOne = document.querySelector("#question_one")
var btnTwo = document.querySelector("#question_two")
var btnThree = document.querySelector("#question_three")
var btnFour = document.querySelector("#question_four")

//Hides player initials box in beginning of quiz.
document.querySelector("#inputName").classList.add("hide")
//Hides question choice buttons before hitting start.
document.querySelector("#questionButtons").classList.add("hide")
//Timer 'starting' time in seconds.
var count = 60
//Timer function from below ..
document.querySelector("#timer").innerHTML = count;

var position = -1;
//Starting score.
var currentScore = 0
//Starts quiz.
var startBtn = document.querySelector("#startButton")
//Displays intro to quiz.
var questionText = document.querySelector("#questionHeader")
//Stores player's score
var highScores = JSON.parse(localStorage.getItem("scores")) || []
scoreChart();
//
startBtn.addEventListener("click", function (event) {
   scoreUpdate();
   document.querySelector("#questionButtons").classList.remove("hide")
   nextQwestion();
   if(count>-1){
      setInterval(timer,1000)
   }
   else{
      clearInterval(timer)
      console.log("time is less than 0")
      document.querySelector("#questionHeader").classList.add("hide")
      document.querySelector("#questionButtons").classList.add("hide")
      document.querySelector("#inputName").classList.remove("hide")
   }
})


//Uses function below to check user's answer.
btnOne.addEventListener("click", checkAnswer)
btnTwo.addEventListener("click", checkAnswer)
btnThree.addEventListener("click", checkAnswer)
btnFour.addEventListener("click", checkAnswer)
//Quiz ends & user prompted to enter their initials.
submitBtn.addEventListener("click", function (event) {
   
   console.log(event.target)
   console.log(document.querySelector("#name_field").value)
   event.preventDefault();
   var userScore={
      name:document.querySelector("#name_field").value,
      score:currentScore
   }
   highScores.push(userScore);
   localStorage.setItem("scores",JSON.stringify(highScores))

})
//Functions in play..
//Timer.
function timer() {
         count--
         if (count > -1) {
            document.querySelector("#timer").innerHTML = count;
         }
}
//Answer check.
function checkAnswer(event) {
   if (event.target.innerText === questions[position].answer) {
      currentScore++;
      console.log(score)
      nextQwestion();
      scoreUpdate();
   }

}

//This runs through the questions.
function nextQwestion() {
   position++;
   questionText.innerHTML = questions[position].question
   btnOne.innerText = questions[position].choices[0]
   btnTwo.innerText = questions[position].choices[1]
   btnThree.innerText = questions[position].choices[2]
   btnFour.innerText = questions[position].choices[3]
   startBtn.innerHTML = "Next!"
}
//
function scoreUpdate() {
   document.querySelector("#score").innerHTML = currentScore
}
//
function scoreChart(){
   for(i=0;i<highScores.length;i++){
      document.querySelector("#scoreChart").innerHTML+="<tr><td>"+highScores[i].name+"</td>"+"<td>"+highScores[i].score+"</td>"
   }
}