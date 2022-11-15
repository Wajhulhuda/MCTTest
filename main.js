let form = document.getElementById("form");
let category = document.getElementById("category");
let questionNum = document.getElementById("quesno");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");
let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");
let container = document.getElementById("container");
let next = document.getElementById("next");
let options = document.getElementById("quiz-options");
let _checkBtn = document.getElementById("next");
let quiz = document.getElementById("quiz");
let result = document.getElementById("result");
let hourText = document.getElementById("h");
let minuteText = document.getElementById("m");
let secondText = document.getElementById("s");

let correctAnswer = "",
  correctScore = (askedCount = 0);

form.addEventListener("submit", getapicall);
function getapicall(e) {
  e.preventDefault();
  container.style.display = "none";

  let categoryVal = category.value;
  let questionNumVal = questionNum.value;
  let difficultyVal = difficulty.value;
  let typeVal = type.value;

  result.style.display = "none";
  quiz.style.display = "block";
  fetch(
    `https://opentdb.com/api.php?amount=${questionNumVal}&category=${categoryVal}&difficulty=${difficultyVal}&type=${typeVal}`
  )
    .then(convertToJSON)
    .then(getData);
}
let srNo = ["A.", "B.", "C.", "D."];
let count = 1;
function getData(data) {
  _checkBtn.disabled = true;

  checkAnswer();
  let content = data.results[0];
  let questionNumVal = questionNum.value;
  let wrongAns = content.incorrect_answers;
  correctAnswer = content.correct_answer;
  let optionsList = wrongAns;
  document.getElementById(
    "numbe"
  ).innerHTML = ` <i class="fa-solid fa-circle-info"></i> Question No.
  <span id="qun"></span>${count++} of <span id="qtotal">${questionNumVal}</span>`;
  optionsList.splice(
    Math.floor(Math.random() * (wrongAns.length + 1)),
    0,
    correctAnswer
  );

  document.getElementById("questions").innerHTML = "Q. " + content.question;
  options.innerHTML = `
    ${optionsList
      .map(
        (option, index) => `
        <li> ${srNo[index]} <span>${option}</span> </li>
    `
      )
      .join("")}
`;
  selectOption();
}

function selectOption() {
  options.querySelectorAll("li").forEach(function (option) {
    option.addEventListener("click", function () {
      _checkBtn.disabled = false;
      if (options.querySelector(".selected")) {
        const activeOption = options.querySelector(".selected");
        activeOption.classList.remove("selected");
      }
      option.classList.add("selected");
    });
  });
}

function checkAnswer() {
  _checkBtn.disabled = true;
  if (options.querySelector(".selected")) {
    let selectedAnswer = options.querySelector(".selected span").textContent;
    if (selectedAnswer == HTMLDecode(correctAnswer)) {
      correctScore++;
    }
    checkCount();
  }
}

function checkCount() {
  let questionNumVal = questionNum.value;
  askedCount++;

  if (askedCount == questionNumVal) {
    quiz.style.display = "none";
    result.style.display = "block";
    count = 0;
    let score = (correctScore / questionNumVal) * 100;
    document.getElementById(
      "total-ques"
    ).innerHTML = `<p>Total Questions: ${questionNumVal}</p>`;
    document.getElementById(
      "correct-ans"
    ).innerHTML = `<p>Correct Answers: ${correctScore}</p>`;
    document.getElementById(
      "passing-score"
    ).innerHTML = `<p>Passing Score: 60%</p>`;

    if (score <= 100 && score >= 90) {
      document.getElementById(
        "fail-pass"
      ).innerHTML = `<p>Congrates, You PASSED!.</p>`;
      document.getElementById("grad").innerHTML = `<p>Grad: A</p>`;
    } else if (score < 90 && score >= 80) {
      document.getElementById(
        "fail-pass"
      ).innerHTML = `<p>Congrates, You PASSED!.</p>`;
      document.getElementById("grad").innerHTML = `<p>Grad: B</p>`;
    } else if (score < 80 && score >= 70) {
      document.getElementById(
        "fail-pass"
      ).innerHTML = `<p>Congrates, You PASSED!.</p>`;
      document.getElementById("grad").innerHTML = `<p>Grad: C</p>`;
    } else if (score < 70 && score >= 60) {
      document.getElementById(
        "fail-pass"
      ).innerHTML = `<p>Congrates, You PASSED!.</p>`;
      document.getElementById("grad").innerHTML = `<p>Grad: D</p>`;
    } else {
      document.getElementById(
        "fail-pass"
      ).innerHTML = `<p>Sorry, You FAILED!.</p>`;
      document.getElementById("grad").innerHTML = `<p>Grad: F</p>`;
    }
    document.getElementById(
      "your-score"
    ).innerHTML = `<p>Your score: ${score}%.</p>`;
    correctScore = 0;
    askedCount = 0;
  }
}
document.getElementById("again").addEventListener("click", getapicall);
function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}
_checkBtn.addEventListener("click", getapicall);
function convertToJSON(response) {
  return response.json();
}
function ShowHome() {
  container.style.display = "flex";
  result.style.display = "none";
}
document.getElementById("home").addEventListener("click", ShowHome);

//I am shwoing current time.
function countDownFunc() {
  var x = setInterval(function () {
    let currentTimeDate = new Date();
    var hours = currentTimeDate.getHours();
    var minutes = currentTimeDate.getMinutes();
    var seconds = currentTimeDate.getSeconds();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (hours === 12) {
      hours = 12;
    } else {
      hours = hours % 12;
    }
    hours = hours < 10 ? "0" + hours : hours;
    hourText.innerHTML = hours;
    minuteText.innerHTML = minutes;
    secondText.innerHTML = seconds;
  }, 1000);
}
countDownFunc();
