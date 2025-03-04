// DOM Elements
const homeSection = document.querySelector('.home');
const popupInfo = document.querySelector('.popup-info');
const gameSelection = document.querySelector('.game-selection');
const quizSection = document.querySelector('.quiz');
const resultBox = document.querySelector('.result-box');
const startBtn = document.getElementById('start-btn');
const continueBtn = document.getElementById('continue-btn');
const exitBtn1 = document.getElementById('exit-btn-1');
const exitBtn2 = document.getElementById('exit-btn-2');
const startQuizBtn = document.getElementById('start-quiz-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const goBackBtn1 = document.getElementById('go-back-btn-1');
const goBackBtn2 = document.getElementById('go-back-btn-2');
const closeIcon1 = document.getElementById('close-icon-1');
const closeIcon2 = document.getElementById('close-icon-2');
const categoryCheckboxes = document.querySelectorAll('.category-checklist input[type="checkbox"]');
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const timerElement = document.getElementById('time');
const progressBar = document.querySelector('.progress');
const scoreElement = document.querySelector('.result-text');
const missedQuestionsElement = document.querySelector('.missed-questions');
const toggleAnswersBtn = document.getElementById('toggle-answers-btn');

// Game Variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let missedQuestions = [];

// Quiz Data
const quizData = {
    General: [
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" }
    ],
    Science: [
        { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], answer: "H2O" },
        { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], answer: "300,000 km/s" }
    ],
    History: [
        { question: "Who was the first President of the United States?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], answer: "George Washington" },
        { question: "In which year did World War II end?", options: ["1945", "1939", "1941", "1950"], answer: "1945" }
    ],
    FoodDrink: [
        { question: "What is sushi traditionally wrapped in?", options: ["Seaweed", "Rice", "Noodles", "Bread"], answer: "Seaweed" },
        { question: "What is the main ingredient in guacamole?", options: ["Avocado", "Tomato", "Onion", "Pepper"], answer: "Avocado" }
    ],
    Geography: [
        { question: "Which continent is known as the 'Dark Continent'?", options: ["Africa", "Asia", "South America", "Australia"], answer: "Africa" },
        { question: "Which ocean is the largest?", options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], answer: "Pacific Ocean" }
    ],
    Tribal: [
        { question: "What is the capital of South Africa?", options: ["Cape Town", "Pretoria", "Johannesburg", "Durban"], answer: "Cape Town" },
        { question: "Which river runs through Egypt?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], answer: "Nile" }
    ],
    Sports: [
        { question: "How many players are on a soccer team?", options: ["11", "10", "12", "9"], answer: "11" },
        { question: "Which country hosted the 2016 Summer Olympics?", options: ["Brazil", "Russia", "China", "USA"], answer: "Brazil" }
    ],
    Music: [
        { question: "Who is known as the King of Pop?", options: ["Michael Jackson", "Elvis Presley", "Prince", "Madonna"], answer: "Michael Jackson" },
        { question: "What musical instrument has 88 keys?", options: ["Piano", "Guitar", "Flute", "Violin"], answer: "Piano" }
    ]
};

// Event Listeners
startBtn.addEventListener('click', () => {
    homeSection.classList.add('hide');
    popupInfo.classList.remove('hide');
});

continueBtn.addEventListener('click', () => {
    popupInfo.classList.add('hide');
    gameSelection.classList.remove('hide');
});

startQuizBtn.addEventListener('click', () => {
    const selectedCategories = [];
    categoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });

    if (selectedCategories.length === 0) {
        alert("Please select at least one category.");
        return;
    }

    // Load questions for the selected categories
    loadQuestions(selectedCategories);
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    missedQuestions = [];
    resultBox.classList.add('hide');
    gameSelection.classList.remove('hide');
});

// Go Back Buttons
goBackBtn1.addEventListener('click', () => {
    gameSelection.classList.add('hide');
    homeSection.classList.remove('hide');
});

goBackBtn2.addEventListener('click', () => {
    resultBox.classList.add('hide');
    gameSelection.classList.remove('hide');
});

// Exit Buttons
exitBtn1.addEventListener('click', () => {
    if (confirm("Are you sure you want to exit the quiz?")) {
        location.reload();
    }
});

exitBtn2.addEventListener('click', () => {
    if (confirm("Are you sure you want to exit the quiz?")) {
        location.reload();
    }
});

// Close Icons
closeIcon1.addEventListener('click', () => {
    quizSection.classList.add('hide');
    gameSelection.classList.remove('hide');
});

closeIcon2.addEventListener('click', () => {
    resultBox.classList.add('hide');
    gameSelection.classList.remove('hide');
});

// Toggle Correct Answers
toggleAnswersBtn.addEventListener('click', () => {
    missedQuestionsElement.classList.toggle('hide');
    if (missedQuestionsElement.classList.contains('hide')) {
        toggleAnswersBtn.textContent = "View Correct Answers";
    } else {
        toggleAnswersBtn.textContent = "Hide Correct Answers";
    }
});

// Load Questions
function loadQuestions(selectedCategories) {
    let allQuestions = [];
    selectedCategories.forEach(category => {
        if (quizData[category]) {
            allQuestions = allQuestions.concat(quizData[category]);
        }
    });

    if (allQuestions.length === 0) {
        alert("No questions found for the selected categories.");
        return;
    }

    // Shuffle questions for randomness
    questions = shuffleArray(allQuestions);
    currentQuestionIndex = 0;
    score = 0;
    missedQuestions = [];
    gameSelection.classList.add('hide');
    quizSection.classList.remove('hide');
    loadQuestion();
}

// Load Question
function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestion.options.forEach(option => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', selectAnswer);
        optionsElement.appendChild(button);
    });
    startTimer();
    updateProgressBar();
}

// Select Answer
function selectAnswer(e) {
    const selectedOption = e.target;
    const correctAnswer = questions[currentQuestionIndex].answer;

    // Disable all answer buttons
    Array.from(optionsElement.children).forEach(button => {
        button.disabled = true;
    });

    // Check if the selected answer is correct
    if (selectedOption.textContent === correctAnswer) {
        score++;
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
        missedQuestions.push(questions[currentQuestionIndex]);
    }

    // Stop the timer and show the "Next" button
    clearInterval(timer);
    nextBtn.classList.remove('hide');
}

// Show Result
function showResult() {
    quizSection.classList.add('hide');
    resultBox.classList.remove('hide');
    scoreElement.textContent = `You scored ${score} out of ${questions.length}`;

    // Clear previous missed questions
    missedQuestionsElement.innerHTML = '';

    // Display missed questions
    if (missedQuestions.length > 0) {
        missedQuestions.forEach(question => {
            const div = document.createElement('div');
            div.textContent = `Q: ${question.question} - Correct Answer: ${question.answer}`;
            missedQuestionsElement.appendChild(div);
        });

        // Show the "View Correct Answers" button
        toggleAnswersBtn.classList.remove('hide');
        toggleAnswersBtn.textContent = "View Correct Answers";
    } else {
        // Hide the "View Correct Answers" button if no missed questions
        toggleAnswersBtn.classList.add('hide');
    }

    // Hide missed questions by default
    missedQuestionsElement.classList.add('hide');
}

// Timer
function startTimer() {
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            missedQuestions.push(questions[currentQuestionIndex]);
            nextBtn.classList.remove('hide');
        }
    }, 1000);
}

// Progress Bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Reset State
function resetState() {
    nextBtn.classList.add('hide');
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

// Helper function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}