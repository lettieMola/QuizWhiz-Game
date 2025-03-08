// questions.js

// Category Mapping to Open Trivia API Categories
export const categoryMap = {
    General: 9, // General Knowledge
    Science: 17, // Science & Nature
    History: 23, // History
    FoodDrink: 6, // Food & Drink
    Geography: 22, // Geography
    Tribal: 20, // Mythology (Placeholder for Tribal Knowledge)
    Sports: 21, // Sports
    Music: 12, // Music
    Cars: 6 // Cars (placeholder ID)
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
    },
    {
        type: "multiple-choice",
        question: "Which of these is NOT a type of pasta?",
        options: ["Fettuccine", "Rigatoni", "Quinoa", "Penne"],
        answer: "Quinoa",
        category: "FoodDrink"
    },
    {
        type: "true-false",
        question: "Sushi is a traditional Japanese dish that always includes raw fish.",
        answer: false,
        category: "FoodDrink"
    },
    {
        type: "fill-in-the-blank",
        question: "The process of making beer is called __________.",
        answer: "brewing",
        category: "FoodDrink"
    },
    {
        type: "multiple-choice",
        question: "What is the primary ingredient in hummus?",
        options: ["Chickpeas", "Lentils", "Black Beans", "Peas"],
        answer: "Chickpeas",
        category: "FoodDrink"
    },
    {
        type: "true-false",
        question: "Red wine is typically served chilled.",
        answer: false,
        category: "FoodDrink"
    },
    {
        type: "fill-in-the-blank",
        question: "The French dish 'Boeuf Bourguignon' is traditionally made with __________ wine.",
        answer: "red",
        category: "FoodDrink"
    },
    {
        type: "multiple-choice",
        question: "Which country is known for inventing the sandwich?",
        options: ["France", "Italy", "England", "Germany"],
        answer: "England",
        category: "FoodDrink"
    },
    {
        type: "true-false",
        question: "Matcha is a type of powdered green tea.",
        answer: true,
        category: "FoodDrink"
    },
    {
        type: "fill-in-the-blank",
        question: "The process of turning milk into cheese is called __________.",
        answer: "fermentation",
        category: "FoodDrink"
    }
];


export const carsQuizData = [
    {
        type: "multiple-choice",
        question: "Which company is known for manufacturing the Mustang?",
        options: ["Ford", "Chevrolet", "Dodge", "Toyota"],
        answer: "Ford",
        category: "Cars"
    },
    {
        type: "true-false",
        question: "Tesla was the first company to produce electric cars.",
        answer: false,
        category: "Cars"
    },
    {
        type: "fill-in-the-blank",
        question: "The __________ is the fastest production car in the world.",
        answer: "Bugatti Chiron",
        category: "Cars"
    },
    {
        type: "multiple-choice",
        question: "Which car brand has a logo featuring a prancing horse?",
        options: ["Ferrari", "Lamborghini", "Porsche", "Aston Martin"],
        answer: "Ferrari",
        category: "Cars"
    },
    {
        type: "true-false",
        question: "The first car was invented by Karl Benz.",
        answer: true,
        category: "Cars"
    },
    {
        type: "fill-in-the-blank",
        question: "The __________ is the best-selling car of all time.",
        answer: "Toyota Corolla",
        category: "Cars"
    },
    {
        type: "multiple-choice",
        question: "Which car is known as the 'King of the Road'?",
        options: ["Ford Mustang", "Chevrolet Corvette", "Porsche 911", "BMW M3"],
        answer: "Chevrolet Corvette",
        category: "Cars"
    },
    {
        type: "true-false",
        question: "Hybrid cars use both gasoline and electric power.",
        answer: true,
        category: "Cars"
    },
    {
        type: "fill-in-the-blank",
        question: "The __________ is the most expensive car ever sold at auction.",
        answer: "Bugatti La Voiture Noire",
        category: "Cars"
    },
    {
        type: "multiple-choice",
        question: "Which car brand is known for its slogan 'The Ultimate Driving Machine'?",
        options: ["BMW", "Mercedes-Benz", "Audi", "Lexus"],
        answer: "BMW",
        category: "Cars"
    },
    {
        type: "true-false",
        question: "The Lamborghini Aventador is a hybrid car.",
        answer: false,
        category: "Cars"
    },
    {
        type: "fill-in-the-blank",
        question: "The __________ is the first mass-produced car.",
        answer: "Ford Model T",
        category: "Cars"
    }
];