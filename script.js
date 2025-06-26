document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    body.classList.add('light-theme'); // Default theme

    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
    });

    // Game Data
    const plaqueData = {
        'number-to-city': [
            { question: 'ایران ۶۹', options: ['کرمان', 'یزد', 'بوشهر', 'مرکزی'], answer: 'مرکزی' },
            { question: 'ایران ۱۱', options: ['تهران', 'البرز', 'گیلان', 'مازندران'], answer: 'گیلان' },
            { question: 'ایران ۵۹', options: ['خراسان رضوی', 'خراسان جنوبی', 'گلستان', 'کرمانشاه'], answer: 'گلستان' },
        ],
        'char-to-city': [
            { question: 'حرف "ب" در پلاک برای کدام شهر است؟', options: ['تهران', 'مشهد', 'اصفهان', 'شیراز'], answer: 'مشهد' },
            { question: 'حرف "ق" در پلاک برای کدام شهر است؟', options: ['قم', 'قزوین', 'کرمانشاه', 'سنندج'], answer: 'قزوین' },
        ]
    };

    const flagData = [
        { question: 'این پرچم کدام کشور است؟', image: 'https://flagcdn.com/w320/ir.png', options: ['عراق', 'ایران', 'سوریه', 'افغانستان'], answer: 'ایران' },
        { question: 'این پرچم کدام کشور است؟', image: 'https://flagcdn.com/w320/de.png', options: ['آلمان', 'بلژیک', 'اتریش', 'فرانسه'], answer: 'آلمان' },
        { question: 'این پرچم کدام کشور است؟', image: 'https://flagcdn.com/w320/it.png', options: ['ایتالیا', 'مجارستان', 'ایرلند', 'مکزیک'], answer: 'ایتالیا' },
    ];


    // DOM Elements
    const menu = document.getElementById('menu');
    const gameContainer = document.getElementById('game-container');
    const tabButtons = document.querySelectorAll('.tab-button');
    const plaqueOptions = document.getElementById('plaque-options');
    const modeButtons = document.querySelectorAll('.mode-button');
    const questionEl = document.getElementById('question');
    const imageContainer = document.getElementById('image-container');
    const optionsContainer = document.getElementById('options-container');
    const resultEl = document.getElementById('result');
    const nextQuestionBtn = document.getElementById('next-question');

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let currentGame = 'plaque';
    let currentMode = 'number-to-city';

    // Event Listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentGame = button.dataset.game;
            plaqueOptions.classList.toggle('active', currentGame === 'plaque');
            if (currentGame !== 'plaque') {
                startGame();
            }
        });
    });

    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentMode = button.dataset.mode;
            startGame();
        });
    });

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            displayQuestion();
        } else {
            endGame();
        }
    });

    function startGame() {
        menu.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        currentQuestionIndex = 0;
        score = 0;

        if (currentGame === 'plaque') {
            currentQuestions = plaqueData[currentMode];
        } else { // flag
            currentQuestions = flagData;
        }

        // Shuffle questions
        currentQuestions = currentQuestions.sort(() => Math.random() - 0.5);
        displayQuestion();
    }

    function displayQuestion() {
        resultEl.textContent = '';
        nextQuestionBtn.classList.add('hidden');
        optionsContainer.innerHTML = '';
        imageContainer.innerHTML = '';

        const questionData = currentQuestions[currentQuestionIndex];
        questionEl.textContent = questionData.question;

        if (questionData.image) {
            const img = document.createElement('img');
            img.src = questionData.image;
            imageContainer.appendChild(img);
        }

        // Shuffle options
        const shuffledOptions = questionData.options.sort(() => Math.random() - 0.5);

        shuffledOptions.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.textContent = option;
            optionEl.classList.add('option');
            optionEl.addEventListener('click', () => checkAnswer(option, questionData.answer, optionEl));
            optionsContainer.appendChild(optionEl);
        });
    }

    function checkAnswer(selectedOption, correctAnswer, optionEl) {
        // Disable all options
        document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');

        if (selectedOption === correctAnswer) {
            resultEl.textContent = 'درست!';
            optionEl.classList.add('correct');
            score++;
        } else {
            resultEl.textContent = `اشتباه! پاسخ صحیح: ${correctAnswer}`;
            optionEl.classList.add('incorrect');
        }
        nextQuestionBtn.classList.remove('hidden');
    }

    function endGame() {
        questionEl.textContent = `بازی تمام شد! امتیاز شما: ${score} از ${currentQuestions.length}`;
        optionsContainer.innerHTML = '';
        resultEl.textContent = '';
        nextQuestionBtn.classList.add('hidden');
        imageContainer.innerHTML = '';

        // Show menu again after a delay
        setTimeout(() => {
            menu.classList.remove('hidden');
            gameContainer.classList.add('hidden');
        }, 3000);
    }
});
