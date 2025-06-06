// Navigation Script
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

function showApp(appName) {
    // Hide all app sections
    const allSections = document.querySelectorAll('.app-section');
    allSections.forEach(section => section.classList.remove('active'));
    
    // Show selected app
    document.getElementById(appName + '-app').classList.add('active');
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

// Number Multiplier Functions
function displaySelection() {
    const operation = document.getElementById("operation").value;
    const selectionDisplay = document.getElementById("selection-display");
    selectionDisplay.innerHTML = operation;
}

function calculateResult() {
    const inputElement = document.getElementById("inputNumber");
    const inputValue = parseFloat(inputElement.value);
    const operationElement = document.getElementById("operation");
    const operation = operationElement.value;
    const resultElement = document.getElementById("calculation-result");
    
    if (isNaN(inputValue)) {
        resultElement.textContent = "Invalid input. Please enter a number.";
        return;
    }
    
    let result;
    let operationText;
    
    if (operation === "double") {
        result = inputValue * 2;
        operationText = "doubled";
    } else if (operation === "triple") {
        result = inputValue * 3;
        operationText = "tripled";
    }
    
    resultElement.textContent = `${inputValue} ${operationText} = ${result.toFixed(2)}`;
}

function clearResult() {
    document.getElementById("inputNumber").value = "";
    document.getElementById("calculation-result").innerHTML = "";
}

// Magic 8 Ball Functions
const answers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

let historyItems = [];

function getRandomAnswer() {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
}

function shakeBall() {
    const question = document.getElementById('question').value.trim();
    const ball = document.getElementById('ball');
    const answerElement = document.getElementById('answer');
    const questionDisplay = document.getElementById('question-display');
    const questionInput = document.getElementById('question');
    
    if (question === '') {
        alert('Please ask a question first!');
        return;
    }

    answerElement.textContent = '8';
    
    ball.style.transform = 'translateX(-5px)';
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 100);
    setTimeout(() => { ball.style.transform = 'translateX(-5px)'; }, 200);
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 300);
    setTimeout(() => { ball.style.transform = 'translateX(0)'; }, 400);
    
    setTimeout(() => {
        const randomAnswer = getRandomAnswer();
        answerElement.textContent = randomAnswer;
        questionDisplay.textContent = `"${question}"`;
        questionDisplay.style.opacity = 1;
        addToHistory(question);
    }, 500);
    
    questionInput.value = '';
}

function resetBall() {
    document.getElementById('answer').textContent = '8';
    document.getElementById('question-display').textContent = '';
    document.getElementById('question-display').style.opacity = 0;
    document.getElementById('question').value = '';
}

function addToHistory(question) {
    historyItems.unshift(question);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const questionHistory = document.getElementById('question-history');
    questionHistory.innerHTML = '';
    
    historyItems.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'history-item';
        listItem.textContent = question;
        questionHistory.appendChild(listItem);
    });
}

function clearHistory() {
    historyItems = [];
    updateHistoryDisplay();
}

// Task List Functions
let tasks = [];

const randomTasks = [
    "Take a short walk",
    "Drink a glass of water",
    "Stretch for 5 minutes",
    "Practice deep breathing for 2 minutes",
    "Stand up and move around for 5 minutes",
    "Do a quick meditation session",
    "Write in a gratitude journal",
    "Have a healthy snack",
    "Rest your eyes for 2 minutes",
    "Fix your posture",
    "Do a quick workout",
    "Call a friend or family member",
    "Take a short nap",
    "Listen to calming music",
    "Drink a cup of tea",
    "Practice mindfulness for 5 minutes",
    "Step outside for fresh air",
    "Do a quick stretching routine"
];

const taskInput = document.getElementById('task-input');
const priorityInput = document.getElementById('priority-input');
const taskList = document.getElementById('task-list');

function addTask() {
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;
    
    if (taskText === '') {
        alert('Please enter a task first!');
        return;
    }
    
    const task = [taskText, priority];
    tasks.push(task);
    sortTasksByPriority();
    updateTaskDisplay();
    clearInput();
}

function addRandomTask() {
    const randomIndex = Math.floor(Math.random() * randomTasks.length);
    const randomTask = randomTasks[randomIndex];
    taskInput.value = randomTask;
    priorityInput.focus();
}

function sortTasksByPriority() {
    tasks.sort(function(a, b) {
        return a[1] - b[1];
    });
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

taskInput.onkeydown = handleKeyPress;

function clearInput() {
    taskInput.value = '';
    priorityInput.value = '3';
    taskInput.focus();
}

function updateTaskDisplay() {
    taskList.innerHTML = '';
    
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const taskText = task[0];
        const priority = task[1];
        
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        
        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';
        
        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        taskTextElement.innerHTML = `<span class="priority-indicator priority-${priority}"></span>${taskText}`;
        
        const priorityText = document.createElement('span');
        priorityText.className = 'priority-text';
        priorityText.textContent = `Priority: ${priority}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.setAttribute('onclick', `deleteTask(${i})`);
        
        taskDetails.appendChild(taskTextElement);
        taskDetails.appendChild(priorityText);
        
        listItem.appendChild(taskDetails);
        listItem.appendChild(deleteButton);
        
        taskList.appendChild(listItem);
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskDisplay();
}

function clearTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        updateTaskDisplay();
    }
}

updateTaskDisplay();

// Countdown Timer Functions
let timerDisplay;
let motivationDisplay;
let secondsInput;
let startBtn;
let resetBtn;
let statusDisplay;
let countdown;
let timeLeft;
let phraseIndex = 0;

const motivationalPhrases = [
    "Every second counts!",
    "You're making progress!",
    "Keep going, you're doing great!",
    "Stay focused, stay strong!",
    "You've got this!",
    "One step at a time!",
    "Believe in yourself!",
    "Success is just ahead!",
    "Don't give up now!",
    "The best is yet to come!",
    "Each moment brings you closer to your goal!",
    "Small steps lead to big results!",
    "Your determination is inspiring!",
    "Progress happens one second at a time!",
    "Keep that momentum going!"
];

window.addEventListener('load', function() {
    timerDisplay = document.getElementById('timer');
    motivationDisplay = document.getElementById('motivation');
    secondsInput = document.getElementById('seconds');
    startBtn = document.getElementById('startBtn');
    resetBtn = document.getElementById('resetBtn');
    statusDisplay = document.getElementById('status');
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startCountdown() {
    const seconds = parseInt(secondsInput.value);

    if (isNaN(seconds) || seconds <= 0) {
        statusDisplay.textContent = "Please enter a valid number of seconds";
        return;
    }
    
    startBtn.disabled = true;
    secondsInput.disabled = true;
    statusDisplay.textContent = "Countdown in progress...";
    
    timeLeft = seconds;
    updateTimerDisplay();
    
    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft % 5 === 0 || timeLeft === seconds - 1) {
            phraseIndex = (phraseIndex + 1) % motivationalPhrases.length;
            motivationDisplay.textContent = motivationalPhrases[phraseIndex];
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "00:00";
            motivationDisplay.textContent = "🎉 Congratulations! You've completed the countdown!";
            startBtn.disabled = false;
            secondsInput.disabled = false;
            statusDisplay.textContent = "Countdown complete!";
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = "00:00";
    motivationDisplay.textContent = "Enter seconds and start the timer for motivation!";
    startBtn.disabled = false;
    secondsInput.disabled = false;
    statusDisplay.textContent = "";
    secondsInput.value = "30";
}

// NATO Converter Functions
const natoLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const natoWords = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel",
                    "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa",
                    "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray",
                    "Yankee", "Zulu", "One", "Two", "Three", "Four", "Five", "Six", 
                    "Seven", "Eight", "Nine", "Zero"];

function chToNato(ch) {
    const upperCh = ch.toUpperCase();
    const index = natoLetters.indexOf(upperCh);
    if (index !== -1) {
        return natoWords[index];
    }
    return ch;
}

function wordToNato(word) {
    const characters = word.split("");
    const natoCharacters = characters.map(ch => chToNato(ch));
    return natoCharacters.join(" ");
}

function sentenceToNato(sentence) {
    const words = sentence.split(" ");
    const natoWords = words.map(word => wordToNato(word));
    return natoWords.join(" ");
}

function verbalize() {
    const inputString = document.getElementById("inputString").value;
    const natoResult = sentenceToNato(inputString);
    document.getElementById("natoResult").textContent = natoResult;
}

function clearNATOInputs() {
    document.getElementById("inputString").value = "";
    document.getElementById("natoResult").textContent = "";
}

// Calculator Functions
let memory = 0;
let currentInput = "0";
let currentOperator = null;
let leftOperand = null;
let waitingForRightOperand = false;
let lastOperation = "";
let calculationDone = false;

const display = document.getElementById('display');
const history = document.getElementById('history');

display.value = "0";

function evaluateExpression(expression) {
    if (!isNaN(expression)) {
        return parseFloat(expression);
    }
    
    const tokens = [];
    let currentNumber = '';
    
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (['+', '-', '*', '/'].includes(char)) {
            if (currentNumber) {
                tokens.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            tokens.push(char);
        } else {
            currentNumber += char;
        }
    }
    
    if (currentNumber) {
        tokens.push(parseFloat(currentNumber));
    }
    
    // Process multiplication and division
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '*' || tokens[i] === '/') {
            const left = tokens[i - 1];
            const right = tokens[i + 1];
            const result = tokens[i] === '*' ? left * right : left / right;
            tokens[i - 1] = result;
            tokens.splice(i, 2);
            i -= 2;
        }
    }
    
    // Process addition and subtraction
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = tokens[i + 1];
        if (operator === '+') {
            result += operand;
        } else if (operator === '-') {
            result -= operand;
        }
    }
    
    return result;
}

function appendToDisplay(value) {
    if (calculationDone && !isNaN(value)) {
        clearDisplay();
        calculationDone = false;
    } else if (calculationDone) {
        calculationDone = false;
    }
    
    if (waitingForRightOperand) {
        display.value = value;
        waitingForRightOperand = false;
    } else {
        if (display.value === "0" && value !== ".") {
            display.value = value;
        } else {
            display.value += value;
        }
    }
    
    currentInput = display.value;
}

function clearDisplay() {
    display.value = "0";
    currentInput = "0";
}

function clearAll() {
    clearDisplay();
    history.textContent = "";
    leftOperand = null;
    currentOperator = null;
    waitingForRightOperand = false;
    lastOperation = "";
}

function clearMemory() {
    memory = 0;
}

function recallMemory() {
    display.value = memory;
    currentInput = display.value;
}

function addToMemory() {
    try {
        const result = evaluateExpression(display.value);
        const number = parseFloat(result);
        memory += number;
    } catch (e) {
        display.value = "Error";
    }
}

function subtractFromMemory() {
    try {
        const result = evaluateExpression(display.value);
        const number = parseFloat(result);
        memory -= number;
    } catch (e) {
        display.value = "Error";
    }
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
    currentInput = display.value;
}

function calculate() {
    try {
        if (currentOperator === "pow" && leftOperand !== null) {
            const rightOperand = parseFloat(display.value);
            history.textContent = `${leftOperand}^${rightOperand}`;
            display.value = Math.pow(leftOperand, rightOperand);
            leftOperand = null;
            currentOperator = null;
        } else {
            history.textContent = display.value;
            display.value = evaluateExpression(display.value);
        }
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
}

// Contacts App Functions
let contactsData = {
    "contacts": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "555-123-4567",
            "type": "personal"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@company.com",
            "phone": "555-987-6543",
            "type": "work"
        },
        {
            "id": 3,
            "name": "Bob Johnson",
            "email": "bob@family.net",
            "phone": "555-555-5555",
            "type": "family"
        }
    ]
};

function displayContacts(contacts = contactsData.contacts) {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    
    if (contacts.length === 0) {
        contactsList.innerHTML = '<p>No contacts found.</p>';
        return;
    }
    
    contacts.forEach(contact => {
        const div = document.createElement('div');
        div.className = 'contact-card';
        div.innerHTML = `
            <h3>${contact.name}</h3>
            <p>Email: ${contact.email}</p>
            <p>Phone: ${contact.phone}</p>
            <p>Type: ${contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}</p>
        `;
        contactsList.appendChild(div);
    });
}

function updateJSONDisplay() {
    const jsonContent = document.getElementById('json-content');
    jsonContent.textContent = JSON.stringify(contactsData, null, 4);
}

function searchContacts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (!searchTerm) {
        displayContacts();
        return;
    }
    
    const filteredContacts = contactsData.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm) ||
                contact.type.toLowerCase().includes(searchTerm);
    });
    
    displayContacts(filteredContacts);
}

function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const type = document.getElementById('type').value;
    
    let newId;
    if (contactsData.contacts.length > 0) {
        const maxId = Math.max(...contactsData.contacts.map(function(c) { 
            return c.id; 
        }));
        newId = maxId + 1;
    } else {
        newId = 1;
    }
    
    const newContact = {
        id: newId,
        name,
        email,
        phone,
        type
    };
    
    contactsData.contacts.push(newContact);
    document.getElementById('contact-form').reset();
    displayContacts();
    updateJSONDisplay();
    alert('Contact added successfully!');
    switchTab('view');
    
    return false;
}

function resetSearch() {
    document.getElementById('search-input').value = '';
    displayContacts();
}

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(tabId)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        if (content.id === `${tabId}-contacts` || content.id === `${tabId}-contact` || content.id === `${tabId}-view`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    if (tabId === 'json') {
        updateJSONDisplay();
    }
}

// Initialize contacts on load
window.addEventListener('load', function() {
    displayContacts();
    updateJSONDisplay();
});