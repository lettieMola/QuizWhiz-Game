// questions.js

// Category Mapping to Open Trivia API Categories
export const categoryMap = {
    General: 9, // General Knowledge
    Science: 17, // Science & Nature
    History: 23, // History
    FoodDrink: 5, // Food & Drink
    Geography: 22, // Geography
    Tribal: 20, // Mythology (Placeholder for Tribal Knowledge)
    Sports: 21, // Sports
    Music: 12 // Music
};

// Custom Africa Quiz Data
export const africaQuizData = [
    {
        type: "multiple-choice",
        question: "What is the capital of Nigeria?",
        options: ["Lagos", "Abuja", "Kano", "Ibadan"],
        answer: "Abuja",
        category: "Geography"
    },
    {
        type: "true-false",
        question: "The Nile River is the longest river in Africa.",
        answer: true,
        category: "Geography"
    },
    {
        type: "fill-in-the-blank",
        question: "Mount Kilimanjaro is located in __________.",
        answer: "Tanzania",
        category: "Geography"
    },
    {
        type: "multiple-choice",
        question: "Which country is known as the 'Pearl of Africa'?",
        options: ["Kenya", "Uganda", "Ghana", "South Africa"],
        answer: "Uganda",
        category: "Geography"
    },
    {
        type: "true-false",
        question: "The Sahara Desert is the largest desert in Africa.",
        answer: true,
        category: "Geography"
    }
];

// Custom Food and Drinks Quiz Data
export const foodDrinkQuizData = [
    {
        type: "multiple-choice",
        question: "What is the main ingredient in guacamole?",
        options: ["Avocado", "Tomato", "Onion", "Pepper"],
        answer: "Avocado",
        category: "FoodDrink"
    },
    {
        type: "true-false",
        question: "Espresso contains more caffeine than a regular cup of coffee.",
        answer: false,
        category: "FoodDrink"
    },
    {
        type: "fill-in-the-blank",
        question: "The traditional Italian pizza originated in the city of __________.",
        answer: "Naples",
        category: "FoodDrink"
    }
];