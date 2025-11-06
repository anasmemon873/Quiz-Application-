var firebaseConfig = {
    apiKey: "AIzaSyDO_KmeGNJdaz7CiEeGjoNS6me4eyy6LAo",
    authDomain: "quiz-app-fmp-f011b.firebaseapp.com",
    projectId: "quiz-app-fmp-f011b",
    storageBucket: "quiz-app-fmp-f011b.firebasestorage.app",
    messagingSenderId: "308654442861",
    appId: "1:308654442861:web:5b4edeb3b49d9388657264"
};

var app = firebase.initializeApp(firebaseConfig);
var db = firebase.database();

const questions = [
    {
        question: "What is the main programming language for the web?",
        answers: [
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
        
    },
    {
        question: "In what year did the Titanic sink?",
        answers: [
            { text: "1912", correct: true },
            { text: "1905", correct: false },
            { text: "1918", correct: false },
            { text: "1923", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Michelangelo", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "O2", correct: false },
            { text: "NaCl", correct: false }
        ]
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            { text: "China", correct: false },
            { text: "Japan", correct: true },
            { text: "South Korea", correct: false },
            { text: "Thailand", correct: false }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Diamond", correct: true },
            { text: "Iron", correct: false },
            { text: "Quartz", correct: false }
        ]
    },
    {
        question: "Who was the first President of the United States?",
        answers: [
            { text: "Abraham Lincoln", correct: false },
            { text: "George Washington", correct: true },
            { text: "Thomas Jefferson", correct: false },
            { text: "John Adams", correct: false }
        ]
    },
    {
        question: "What is the currency of Japan?",
        answers: [
            { text: "Won", correct: false },
            { text: "Yen", correct: true },
            { text: "Ringgit", correct: false },
            { text: "Baht", correct: false }
        ]
    },
    {
        question: "Which element has the atomic number 1?",
        answers: [
            { text: "Helium", correct: false },
            { text: "Hydrogen", correct: true },
            { text: "Oxygen", correct: false },
            { text: "Carbon", correct: false }
        ]
    },
    {
        question: "What is the longest river in the world?",
        answers: [
            { text: "Amazon", correct: false },
            { text: "Nile", correct: true },
            { text: "Yangtze", correct: false },
            { text: "Mississippi", correct: false }
        ]
    },
    {
        question: "In which year did World War II end?",
        answers: [
            { text: "1945", correct: true },
            { text: "1939", correct: false },
            { text: "1950", correct: false },
            { text: "1941", correct: false }
        ]
    },
    {
        question: "What is the square root of 144?",
        answers: [
            { text: "10", correct: false },
            { text: "12", correct: true },
            { text: "14", correct: false },
            { text: "16", correct: false }
        ]
    }
];

var questionTextElement = document.getElementById('question-text');
var answerButtonsElement = document.getElementById('answer-buttons');
var nextButton = document.getElementById('next-btn');
var progressText = document.getElementById('progress-text');
var resultArea = document.getElementById('result-area');
var finalScoreText = document.getElementById('final-score');
var restartButton = document.getElementById('restart-btn');
var quizContent = document.getElementById('quiz-content'); 

var currentQuestionIndex = 0;
var score = 0;
var answerSelected = false;

var quizResults = []; 

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function handleNextQuestion() {
    if (answerSelected) {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }
}

nextButton.addEventListener('click', handleNextQuestion);
restartButton.addEventListener('click', startQuiz);

function startQuiz() {
    shuffleArray(questions);
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;
    quizResults = []; 
    
    resultArea.classList.add('hidden');
    quizContent.classList.remove('hidden');
    
    nextButton.textContent = 'Next Round';
    nextButton.disabled = true;

    showQuestion();
}

function showQuestion() {
    resetState(); 

    const currentQuestion = questions[currentQuestionIndex];
    
    questionTextElement.textContent = currentQuestion.question;
    progressText.textContent = `Round ${currentQuestionIndex + 1} of ${questions.length}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    
    nextButton.disabled = true;
    answerSelected = false;
}

function selectAnswer(e) {
    if (answerSelected) return;

    const selectedBtn = e.target;
    
    const isCorrect = selectedBtn.dataset.correct === 'true';
    const currentQuestion = questions[currentQuestionIndex];

    const correctAnswerText = currentQuestion.answers.find(a => a.correct).text;
    
    quizResults.push({
        question: currentQuestion.question,
        userAnswer: selectedBtn.textContent, 
        correctAnswer: correctAnswerText,
        isCorrect: isCorrect
    });
    
    if (isCorrect) {
        score++;
        selectedBtn.classList.add('correct');
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    
        if (button.dataset.correct === 'true') {
          
            if (!button.classList.contains('incorrect')) {
                 button.classList.add('correct');
            }
        }
    });

    nextButton.disabled = false;
    answerSelected = true;

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = 'View Results';
    }
}

function saveQuizResults() {
    const totalQuestions = questions.length;
    
    const sessionData = {
        timestamp: new Date().toLocaleString(),
        score: score,
        totalQuestions: totalQuestions,
        detailedResults: quizResults
    };
    
    db.ref('quiz_sessions').push(sessionData)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Scores Saved!',
                text: 'Your challenge scores have been saved successfully.',
            });
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Save Failed!',
                text: 'Unable to save your scores. Try again soon.',
            });
        });
}

function showResult() {
    const PASSING_SCORE = 8; 
    const totalQuestions = questions.length;

    quizContent.classList.add('hidden');
    
    finalScoreText.innerHTML = ''; 

    const scoreSummary = document.createElement('h5');
    scoreSummary.textContent = `Points Earned: ${score} / ${totalQuestions}`;
    finalScoreText.appendChild(scoreSummary);

    if (score >= PASSING_SCORE) {
        const passMessage = document.createElement('p');
        passMessage.textContent = "Awesome! You've conquered the challenge.";
        finalScoreText.appendChild(passMessage);
        passMessage.style.color = 'green';
        passMessage.style.marginTop = '10px';
    } else {
  
        const failMessage = document.createElement('p');
        failMessage.textContent = "Not quite there! Give it another shot.";
        finalScoreText.appendChild(failMessage);
        failMessage.style.color = 'red';
        failMessage.style.marginTop = '10px';
    }
    
    resultArea.classList.remove('hidden');

    saveQuizResults(); 
}

startQuiz();