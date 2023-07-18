document.getElementById("hideButton").addEventListener("click", () => {
  document.getElementById("randomText").style.display = "none";
});

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Madrid"],
    answer: 0
  },
  {
    question: "What is the capital of Georgia?",
    options: ["Tbilisi", "Rustavi", "Mcxeta", "Qutaisi"],
    answer: 0
  },
  {
    question: "What is the largest country in the world?",
    options: ["Russia", "China", "USA", "Canada"],
    answer: 0
  }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextButton");
const scoreElement = document.getElementById("score");

let currentQuestion = 0;
let score = 0;

const showQuestion = () => {
  const { question, options } = questions[currentQuestion];
  questionElement.textContent = question;
  optionsElement.innerHTML = options.map((option, index) => `<button class="option" data-index="${index}">${option}</button>`).join('');
  optionsElement.querySelectorAll(".option").forEach(option => option.addEventListener("click", checkAnswer));
};

const checkAnswer = event => {
  const selectedOption = event.target;
  const { answer } = questions[currentQuestion];
  const selectedAnswerIndex = parseInt(selectedOption.dataset.index);

  if (selectedAnswerIndex === answer) {
    selectedOption.style.backgroundColor = "green";
    score += 1;
  } else {
    selectedOption.style.backgroundColor = "red";
  }

  optionsElement.querySelectorAll(".option").forEach(option => {
    option.disabled = true;
    option.removeEventListener("click", checkAnswer);
  });

  nextButton.style.display = "block";
};

const showNextQuestion = () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
    nextButton.style.display = "none";
  } else {
    questionElement.textContent = "Quiz completed!";
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    scoreElement.textContent = `Final Score: ${score}`;
  }
};

showQuestion();
nextButton.addEventListener("click", showNextQuestion);
