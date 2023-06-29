let questions = [
  {
    question: "Wer hat HTML erfunden?",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners-Lee",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question: "Was bedeutet das HTML Tag &lt;a&gt;?",
    answer_1: "Text Fett",
    answer_2: "Container",
    answer_3: "Ein Link",
    answer_4: "Kursiv",
    right_answer: 3,
  },
  {
    question: "Wie bindet man eine Webseite in eine Webseite ein?",
    answer_1: "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
    answer_2: "&lt;iframe&gt",
    answer_3: "&lt;frame&gt",
    answer_4: "&lt;frameset&gt;",
    right_answer: 2,
  },
  {
    question: "Wie stellt man Text am BESTEN fett dar?",
    answer_1: "&lt;strong&gt",
    answer_2: "CSS nutzen",
    answer_3: "&lt;bold&gt",
    answer_4: "&lt;b&gt;",
    right_answer: 1,
  },
  {
    question: "Welches Attribut kann man NICHT für Textarea verwenden?",
    answer_1: "readonly",
    answer_2: "max",
    answer_3: "from",
    answer_4: "spellcheck",
    right_answer: 1,
  },
  {
    question:
      "Wie wählst du alle Elemente vom Typ &lt;a&gt mit dem Attribut title aus?",
    answer_1: "a[title]{...}",
    answer_2: "a > title {...}",
    answer_3: "a.title {...}",
    answer_4: "a=title {...}",
    right_answer: 4,
  },
  {
    question: "Wie definiert man in JavaScript eine Variable?",
    answer_1: "let 100 = rate;",
    answer_2: "100 = let rate;",
    answer_3: "rate = 100;",
    answer_4: "let rate = 100;",
    right_answer: 4,
  },
];

let currentQuestion = 0;
let correctAnswers = 0;
let AUDIO_SUCESS = new Audio("audio/success.mp3");
let AUDIO_FAIL = new Audio("audio/wrong.mp3");

function init() {
  questionAmount();
  showQuestion();
}

function correctAnswersAmount() {
  let correct = document.getElementById("correctanswers");
  correct.innerHTML = correctAnswers;
}

function questionAmount() {
  let amount = document.getElementById("amountQuestions");
  let outof = document.getElementById("outof");
  outof.innerHTML = questions.length;
  amount.innerHTML = questions.length;
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progress-bar").style = `width: ${percent}%`;
  document.getElementById("progress-bar").innerHTML = `${percent}%`;
}

function updateQuestion() {
  let question = questions[currentQuestion];
  document.getElementById("currentQuestion").innerHTML = currentQuestion + 1;
  document.getElementById("questiontxt").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function answer(id) {
  let answer = questions[currentQuestion]["right_answer"];
  let idOfAnswer = `answer_${answer}`;
  if (id.slice(7) == answer) {
    // if right answer selected
    AUDIO_SUCESS.play();
    document.getElementById(id).parentNode.classList.add("bg-success");
    correctAnswers++;
  } else {
    AUDIO_FAIL.play();
    document.getElementById(id).parentNode.classList.add("bg-danger");
    document.getElementById(idOfAnswer).parentNode.classList.add("bg-success");
  }
  document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById("next-btn").disabled = true;
  resetAnswerButtons();
  showQuestion();
  correctAnswersAmount();
}

function resetAnswerButtons() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
  currentQuestion = 0;
  correctAnswers = 0;
  questionAmount();
  showQuestion();
  document.getElementById("endscreen").style = "display: none;";
  document.getElementById("questionBody").style = "";
}

function showEndScreen() {
  document.getElementById("endscreen").style = "height: 70vh";
  document.getElementById("questionBody").style = "display: none";
}
