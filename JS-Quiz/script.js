const quizContainer = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultsEl = document.getElementById('results');
const errorEl = document.getElementById('error');
const loader = document.getElementById('loader');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');

let questions = [];
let currentQuestion = 0;
let userAnswers = {};

// Fetch questions from Open Trivia DB API
async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple');
        
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        
        if (data.response_code !== 0) throw new Error('Could not load questions');
        
        return data.results.map(question => ({
            question: decodeHTML(question.question),
            correct: decodeHTML(question.correct_answer),
            options: shuffleArray([...question.incorrect_answers.map(decodeHTML), 
                    decodeHTML(question.correct_answer)])
        }));
    } catch (err) {
        showError(err.message);
        return [];
    }
}

function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionId = `option${index}`;
        const wrapper = document.createElement('div');
        
        wrapper.innerHTML = `
            <input type="radio" name="option" id="${optionId}" value="${option}">
            <label for="${optionId}" class="option-label">${option}</label>
        `;

        const label = wrapper.querySelector('label');
        const radio = wrapper.querySelector('input');
        
        if (userAnswers[currentQuestion] === option) {
            radio.checked = true;
            label.classList.add('selected');
        }

        radio.addEventListener('change', () => selectAnswer(option));
        optionsEl.appendChild(wrapper);
    });

    updateNavigation();
}

function selectAnswer(answer) {
    userAnswers[currentQuestion] = answer;
    document.querySelectorAll('.option-label').forEach(label => 
        label.classList.remove('selected'));
    event.target.closest('.option-label').classList.add('selected');
}

function updateNavigation() {
    currentEl.textContent = currentQuestion + 1;
    totalEl.textContent = questions.length;
    
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === questions.length - 1;
    submitBtn.classList.toggle('hidden', currentQuestion !== questions.length - 1);
}

function showResults() {
    quizContainer.classList.add('hidden');
    resultsEl.classList.remove('hidden');
    
    const correct = Object.entries(userAnswers).reduce((acc, [index, answer]) => 
        acc + (answer === questions[index].correct ? 1 : 0), 0);
    
    document.getElementById('correct').textContent = correct;
    document.getElementById('incorrect').textContent = questions.length - correct;
    document.getElementById('percentage').textContent = 
        ((correct / questions.length) * 100).toFixed(0);
}

async function initializeQuiz() {
    loader.classList.remove('hidden');
    quizContainer.classList.add('hidden');
    resultsEl.classList.add('hidden');
    
    questions = await fetchQuestions();
    
    if (questions.length > 0) {
        loader.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        showQuestion();
    }
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (!userAnswers[currentQuestion]) {
        showError('Please select an answer before proceeding');
        return;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
});

submitBtn.addEventListener('click', () => {
    if (!userAnswers[currentQuestion]) {
        showError('Please select an answer before submitting');
        return;
    }
    showResults();
});

document.getElementById('retryBtn').addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = {};
    initializeQuiz();
});

// Initialize quiz on page load
initializeQuiz();