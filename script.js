// script.js

import { categoryMap, africaQuizData, foodDrinkQuizData, carsQuizData } from './questions.js';

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
const loadingElement = document.querySelector('.loading');
const goBackBtn1 = document.getElementById('go-back-btn-1');
const goBackBtn2 = document.getElementById('go-back-btn-2');
const quizHeader = document.querySelector('.quiz-header h2');


// Game Variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let missedQuestions = [];
let answerSelected = false;

// Event Listeners
startBtn.addEventListener('click', () => {
    homeSection.classList.add('hide');
    popupInfo.classList.remove('hide');
});

continueBtn.addEventListener('click', () => {
    popupInfo.classList.add('hide');
    gameSelection.classList.remove('hide');
});

startQuizBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
closeIcon1.addEventListener('click', confirmExit);
closeIcon2.addEventListener('click', confirmExit);
goBackBtn1.addEventListener('click', goBackToHome);
goBackBtn2.addEventListener('click', goBackToGameSelection);
exitBtn1.addEventListener('click', confirmExit);
exitBtn2.addEventListener('click', confirmExit);
toggleAnswersBtn.addEventListener('click', toggleAnswers);

async function startQuiz() {
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (selectedCategories.length === 0) {
        alert("Please select at least one category.");
        return;
    }

    loadingElement.classList.remove('hide');
    questions = await fetchQuestions(selectedCategories);
    loadingElement.classList.add('hide');

    if (questions.length === 0) {
        alert("Failed to load questions. Please try again.");
        return;
    }

    currentQuestionIndex = 0;
    score = 0;
    missedQuestions = [];
    gameSelection.classList.add('hide');
    quizSection.classList.remove('hide');
    loadQuestion();
}


async function fetchApiQuestions(category, difficulty, amount = 5) {
    const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    
    // Timeout after 5 seconds
    const timeout = 5000;
    const fetchPromise = fetch(apiUrl);
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
    );

    try {
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
    }
}

async function fetchQuestions(selectedCategories) {
    let questions = [];
    for (const category of selectedCategories) {
        const apiCategoryId = categoryMap[category];
        const apiQuestions = await fetchApiQuestions(apiCategoryId, "medium", 10);
        const transformedQuestions = transformApiQuestions(apiQuestions, category);
        questions = questions.concat(transformedQuestions);
    }

    if (selectedCategories.includes("Geography") || selectedCategories.includes("Tribal")) {
        questions = questions.concat(africaQuizData);
    }

    if (selectedCategories.includes("FoodDrink")) {
        questions = questions.concat(foodDrinkQuizData);
    }
    if (selectedCategories.includes("Cars")) {
        questions = questions.concat(carsQuizData);
    }

    return questions.filter(question => selectedCategories.includes(question.category));
}




function transformApiQuestions(apiQuestions, category) {
    return apiQuestions.map(question => ({
        type: question.type === "multiple" ? "multiple-choice" : "true-false",
        question: decodeHtmlEntities(question.question),
        options: question.type === "multiple" ? shuffleArray([...question.incorrect_answers, question.correct_answer]) : ["True", "False"],
        answer: question.correct_answer,
        category: category
    }));
}

function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}



function loadQuestion() {
    resetState();
    clearInterval(timer);
    answerSelected = false;
    const currentQuestion = questions[currentQuestionIndex];
    quizHeader.textContent = `Quiz - Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    switch (currentQuestion.type) {
        case "multiple-choice":
            loadMultipleChoiceQuestion(currentQuestion);
            break;
        case "true-false":
            loadTrueFalseQuestion(currentQuestion);
            break;
        case "fill-in-the-blank":
            loadFillInTheBlankQuestion(currentQuestion);
            break;
        default:
            console.error("Unknown question type:", currentQuestion.type);
            return;
    }

    startTimer();
    updateProgressBar();
}

function loadMultipleChoiceQuestion(question) {
    question.options.forEach(option => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option, question.answer));
        optionsElement.appendChild(button);
    });
}

function loadTrueFalseQuestion(question) {
    const trueButton = document.createElement('div');
    trueButton.classList.add('option');
    trueButton.textContent = "True";
    trueButton.addEventListener('click', () => selectAnswer("True", question.answer));
    optionsElement.appendChild(trueButton);

    const falseButton = document.createElement('div');
    falseButton.classList.add('option');
    falseButton.textContent = "False";
    falseButton.addEventListener('click', () => selectAnswer("False", question.answer));
    optionsElement.appendChild(falseButton);
}

function loadFillInTheBlankQuestion(question) {
    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "Type your answer here...";
    input.classList.add('fill-in-blank');
    optionsElement.appendChild(input);

    const submitButton = document.createElement('button');
    submitButton.textContent = "Submit";
    submitButton.addEventListener('click', () => {
        const userAnswer = input.value.trim();
        selectAnswer(userAnswer, question.answer);
    });
    optionsElement.appendChild(submitButton);
}

function selectAnswer(userAnswer, correctAnswer) {
    if (answerSelected) return;
    answerSelected = true;

    Array.from(optionsElement.children).forEach(button => {
        button.removeEventListener('click', selectAnswer);
        button.style.pointerEvents = 'none';
    });

    // Normalize answers for comparison
    const normalizedUserAnswer = userAnswer.toString().toLowerCase().trim();
    const normalizedCorrectAnswer = correctAnswer.toString().toLowerCase().trim();

    console.log("User Answer:", normalizedUserAnswer); // Debugging
    console.log("Correct Answer:", normalizedCorrectAnswer); // Debugging

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
        score++;
        console.log("Correct! Score:", score); // Debugging
    } else {
        missedQuestions.push(questions[currentQuestionIndex]);
        console.log("Incorrect! Missed Questions:", missedQuestions); // Debugging
    }

    clearInterval(timer);
    nextBtn.classList.remove('hide');
}



function showResult() {
    quizSection.classList.add('hide');
    resultBox.classList.remove('hide');
    scoreElement.textContent = `You scored ${score} out of ${questions.length}`;

    missedQuestionsElement.innerHTML = '';
    if (missedQuestions.length > 0) {
        missedQuestions.forEach((question, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                <p><strong>Correct Answer:</strong> ${question.answer}</p>
                <hr>
            `;
            missedQuestionsElement.appendChild(div);
        });
        toggleAnswersBtn.classList.remove('hide');
    } else {
        toggleAnswersBtn.classList.add('hide');
    }

    missedQuestionsElement.classList.add('hide');
}

function startTimer() {
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answerSelected) {
                missedQuestions.push(questions[currentQuestionIndex]);
            }
            nextBtn.classList.remove('hide');
            nextBtn.click();
        }
    }, 1000);
}


function updateProgressBar() {
    if (!progressBar) {
        console.error("Progress bar element not found!");
        return;
    }
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function resetState() {
    nextBtn.classList.add('hide');
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    missedQuestions = [];
    resultBox.classList.add('hide');
    gameSelection.classList.remove('hide');
}

function confirmExit() {
    if (confirm("Are you sure you want to exit the quiz?")) {
        location.reload();
    }
}

function goBackToHome() {
    gameSelection.classList.add('hide');
    homeSection.classList.remove('hide');
}

function goBackToGameSelection() {
    resultBox.classList.add('hide');
    gameSelection.classList.remove('hide');
}

function toggleAnswers() {
    missedQuestionsElement.classList.toggle('hide');
    if (missedQuestionsElement.classList.contains('hide')) {
        toggleAnswersBtn.textContent = "View Correct Answers";
    } else {
        toggleAnswersBtn.textContent = "Hide Correct Answers";
    }
}