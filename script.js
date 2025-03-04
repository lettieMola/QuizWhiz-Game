const startBtn = document.querySelector(".start-btn");
const gameSelectionBtns = document.querySelectorAll(".game-selection-btn");
const goBackBtn = document.querySelector(".go-back-btn");
const homeSection = document.querySelector(".home");
const gameSelectionSection = document.querySelector(".game-selection");
const appSection = document.querySelector(".app");
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const continueBtn = document.querySelector('.continue-btn');
const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultBox = document.querySelector(".result-box");
const resultText = document.querySelector(".result-text");
const restartBtn = document.querySelector(".restart-btn");
const questionNumber = document.querySelector(".question-number");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let time = 30;

// Start Quiz Button Event Listener
startBtn.addEventListener("click", () => {
    homeSection.style.display = "none"; // Hide home section
    popupInfo.style.display = "block"; // Show quiz guide popup
});

// Exit Quiz Button Event Listener
exitBtn.addEventListener('click', () => {
    alert("Exiting the quiz...");
    location.reload(); // Reloads the page
});

// Continue Button Event Listener
continueBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    popupInfo.style.display = 'none'; // Hide quiz guide popup
    gameSelectionSection.style.display = 'block'; // Show game selection
});

// Game Selection Button Event Listeners
gameSelectionBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const selectedCategory = e.target.dataset.category;
        loadQuestions(selectedCategory);
        gameSelectionSection.style.display = "none"; // Hide game selection
        appSection.style.display = "block"; // Show quiz app
        showQuestion(); // Show first question
    });
});

// Go Back Button Event Listener
goBackBtn.addEventListener("click", () => {
    gameSelectionSection.style.display = "none"; // Hide game selection
    homeSection.style.display = "block"; // Show home section
});

// Next Button Event Listener
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
});

// Restart Button Event Listener
restartBtn.addEventListener("click", () => {
    resultBox.style.display = 'none'; // Hide result box
    appSection.style.display = 'block'; // Show quiz app
    resetGame(); // Reset the game
});


// Add these variables at the top of your JavaScript
const cancelBtn = document.querySelector(".cancel-btn");

// Restart Button Event Listener
restartBtn.addEventListener("click", () => {
    resultBox.style.display = 'none'; // Hide result box
    appSection.style.display = 'block'; // Show quiz app
    resetGame(); // Reset the game
});

// Go Back to Game Selection Button Event Listener
goBackBtn.addEventListener("click", () => {
    resultBox.style.display = 'none'; // Hide result box
    gameSelectionSection.style.display = 'block'; // Show game selection
});

// Cancel Quiz Button Event Listener
cancelBtn.addEventListener("click", () => {
    const confirmCancel = confirm("Are you sure you want to cancel the quiz?");
    if (confirmCancel) {
        location.reload(); // Reloads the page to return to the main menu
    }
});

// Show Score Function
function showScore() {
    appSection.style.display = 'none'; // Hide quiz app
    resultBox.style.display = 'block'; // Show result box
    resultText.innerText = `You scored ${score} out of ${questions.length}`;
}

function loadQuestions(category) {
    const allQuestions = {
        Tribal: [
            { question: "What is the capital of South Africa?", answers: [{ text: "Cape Town", correct: true }, { text: "Pretoria", correct: false }, { text: "Johannesburg", correct: false }, { text: "Durban", correct: false }] },
            { question: "Which river runs through Egypt?", answers: [{ text: "Nile", correct: true }, { text: "Amazon", correct: false }, { text: "Yangtze", correct: false }, { text: "Mississippi", correct: false }] },
        ],
        Sports: [
            { question: "How many players are on a soccer team?", answers: [{ text: "11", correct: true }, { text: "10", correct: false }, { text: "12", correct: false }, { text: "9", correct: false }] },
            { question: "Which country hosted the 2016 Summer Olympics?", answers: [{ text: "Brazil", correct: true }, { text: "Russia", correct: false }, { text: "China", correct: false }, { text: "USA", correct: false }] },
        ],
        Music: [
            { question: "Who is known as the King of Pop?", answers: [{ text: "Michael Jackson", correct: true }, { text: "Elvis Presley", correct: false }, { text: "Prince", correct: false }, { text: "Madonna", correct: false }] },
            { question: "What musical instrument has 88 keys?", answers: [{ text: "Piano", correct: true }, { text: "Guitar", correct: false }, { text: "Flute", correct: false }, { text: "Violin", correct: false }] },
        ],
        FoodDrink: [
            { question: "What is sushi traditionally wrapped in?", answers: [{ text: "Seaweed", correct: true }, { text: "Rice", correct: false }, { text: "Noodles", correct: false }, { text: "Bread", correct: false }] },
            { question: "What is the main ingredient in guacamole?", answers: [{ text: "Avocado", correct: true }, { text: "Tomato", correct: false }, { text: "Onion", correct: false }, { text: "Pepper", correct: false }] },
        ],
        Geography: [
            { question: "Which continent is known as the 'Dark Continent'?", answers: [{ text: "Africa", correct: true }, { text: "Asia", correct: false }, { text: "South America", correct: false }, { text: "Australia", correct: false }] },
            { question: "Which ocean is the largest?", answers: [{ text: "Pacific Ocean", correct: true }, { text: "Atlantic Ocean", correct: false }, { text: "Indian Ocean", correct: false }, { text: "Arctic Ocean", correct: false }] },
        ],
        History: [
            { question: "Who was the first President of the United States?", answers: [{ text: "George Washington", correct: true }, { text: "Thomas Jefferson", correct: false }, { text: "Abraham Lincoln", correct: false }, { text: "John Adams", correct: false }] },
            { question: "What year did World War II end?", answers: [{ text: "1945", correct: true }, { text: "1944", correct: false }, { text: "1946", correct: false }, { text: "1943", correct: false }] },
        ],
        Work: [
            { question: "What does HR stand for?", answers: [{ text: "Human Resources", correct: true }, { text: "High Revenue", correct: false }, { text: "Home Repair", correct: false }, { text: "Health Risks", correct: false }] },
            { question: "What is a resume?", answers: [{ text: "A summary of your skills and experience", correct: true }, { text: "A type of cover letter", correct: false }, { text: "A job description", correct: false }, { text: "An interview format", correct: false }] },
        ]
    };
    questions = allQuestions[category];
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showScore(); // Show score if no more questions are left
        return;
    }
    resetState();
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    questionNumber.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
        showCorrectAnswer();
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block"; // Show next button
    clearInterval(timerInterval); // Stop the timer
}

function showCorrectAnswer() {
    const correctAnswer = questions[currentQuestionIndex].answers.find(answer => answer.correct);
    const buttons = Array.from(answerButtons.children);
    buttons.forEach(button => {
        if (button.innerText === correctAnswer.text) {
            button.classList.add("correct");
        }
    });
}

function startTimer() {
    time = 30; // Reset timer
    timerElement.innerText = time;
    timerInterval = setInterval(() => {
        time--;
        timerElement.innerText = time;
        if (time <= 0) {
            clearInterval(timerInterval);
            showCorrectAnswer();
            Array.from(answerButtons.children).forEach(button => {
                button.disabled = true;
            });
            nextButton.style.display = "block"; // Show next button
        }
    }, 1000);
}

function showScore() {
    appSection.style.display = 'none'; // Hide quiz app
    resultBox.style.display = 'block'; // Show result box
    resultText.innerText = `You scored ${score} out of ${questions.length}`;
}

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    resetState();
    resultBox.style.display = 'none'; // Hide result box
    showQuestion(); // Show first question again
}

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.start-btn');
    const continueBtn = document.querySelector('.continue-btn');
    const popupInfo = document.querySelector('.popup-info');
    const gameSelection = document.querySelector('.game-selection');
    const appSection = document.querySelector('.app');
    const resultBox = document.querySelector('.result-box');

    // Handle Start Quiz button click
    startBtn.addEventListener('click', () => {
        // Hide welcome section
        document.querySelector('.home').style.display = 'none';
        // Show the popup info
        popupInfo.style.display = 'block';
        // Set the popup as active to show it
        popupInfo.classList.add('active');
    });

    // Handle Continue button in popup
    continueBtn.addEventListener('click', () => {
        // Hide popup info
        popupInfo.style.display = 'none';
        // Show game selection section
        gameSelection.style.display = 'block';
    });

    // Handle game category selection
    const gameSelectionBtns = document.querySelectorAll('.game-selection-btn');
    gameSelectionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedCategory = e.target.getAttribute('data-category');
            // Here you can implement your logic to load questions based on the selected category
            console.log(`Selected Category: ${selectedCategory}`);
            // Hide game selection and show quiz application
            gameSelection.style.display = 'none';
            appSection.style.display = 'block';
            // Start the quiz here (initialize questions, timer, etc.)
            startQuiz();
        });
    });

    // Function to start the quiz
    function startQuiz() {
        // Hide result box and show the quiz section
        resultBox.style.display = 'none';
        appSection.style.display = 'block';
        // Initialize quiz logic here (e.g., load first question)
        loadQuestion();
    }

    // Example function to load questions (to be implemented)
    function loadQuestion() {
        // Logic to load questions goes here
        console.log('Loading question...');
    }
    
    // Handle next button click
    document.getElementById('next-btn').addEventListener('click', () => {
        // Logic for what happens when the next button is clicked
        // For example, loading the next question or showing results
        loadNextQuestion();
    });

    // Example function to load next question (to be implemented)
    function loadNextQuestion() {
        // Logic to load the next question goes here
        console.log('Loading next question...');
    }

    // Handle the restart quiz button click
    document.querySelector('.restart-btn').addEventListener('click', () => {
        // Reset the quiz state and restart the game
        startQuiz();
    });

    

    // Handle the cancel button click
    document.querySelector('.cancel-btn').addEventListener('click', () => {
        // Hide the result box and show the welcome section
        resultBox.style.display = 'none';
        document.querySelector('.home').style.display = 'block';
    });
});
