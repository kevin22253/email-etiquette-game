// --- HTML Element References ---
const gameContainer = document.getElementById('game-container');
const storyImageElement = document.getElementById('story-image');
const storyTextElement = document.getElementById('story-text');
const optionsButtonsElement = document.getElementById('options-buttons');

const badOutcomeScreen = document.getElementById('bad-outcome');
const neutralOutcomeScreen = document.getElementById('neutral-outcome');
const goodOutcomeScreen = document.getElementById('good-outcome');

const badOutcomeImage = document.getElementById('bad-outcome-image');
const neutralOutcomeImage = document.getElementById('neutral-outcome-image');
const goodOutcomeImage = document.getElementById('good-outcome-image');

// --- Game State Variables ---
let score = 0;
let currentNodeId = 1;

// --- Game Logic ---
function startGame() {
    score = 0;
    currentNodeId = 1;
    
    badOutcomeScreen.classList.add('hide');
    neutralOutcomeScreen.classList.add('hide');
    goodOutcomeScreen.classList.add('hide');
    
    gameContainer.classList.remove('hide');
    showStoryNode(currentNodeId);
}

function showStoryNode(nodeId) {
    const storyNode = storyNodes.find(node => node.id === nodeId);
    
    const imageName = storyNode.stage >= 10 ? `stage${storyNode.stage}.jpeg` : `stage_${storyNode.stage}.jpeg`;
    storyImageElement.src = imageName;

    storyTextElement.innerText = storyNode.text;

    // Clear old options
    optionsButtonsElement.innerHTML = '';
    
    if (storyNode.options) {
        storyNode.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionsButtonsElement.appendChild(button);
        });
    } else {
        const button = document.createElement('button');
        button.innerText = 'Continue';
        button.addEventListener('click', () => showStoryNode(storyNode.nextNode));
        optionsButtonsElement.appendChild(button);
    }
}

function selectOption(option) {
    if (option.correct) score++;
    if (option.nextNode) showStoryNode(option.nextNode);
    else showFinalOutcome();
}

// --- Updated for 20 questions ---
function showFinalOutcome() {
    gameContainer.classList.add('hide');
    
    const totalQuestions = storyNodes.filter(n => n.options).length;
    const badThreshold = Math.floor(totalQuestions * 0.4);     // 0-40% correct = Bad
    const neutralThreshold = Math.floor(totalQuestions * 0.7); // 41-70% correct = Neutral
    // Above 70% = Good

    if (score <= badThreshold) {
        badOutcomeImage.src = 'stage_21.jpeg'; 
        badOutcomeScreen.classList.remove('hide');
    } else if (score <= neutralThreshold) {
        neutralOutcomeImage.src = 'stage_22.jpeg';
        neutralOutcomeScreen.classList.remove('hide');
    } else {
        goodOutcomeImage.src = 'stage_23.jpeg';
        goodOutcomeScreen.classList.remove('hide');
    }
}

// --- Story Data ---
// You’ll need to add questions 12-20 here, each with stage, text, options
// Example new node format:
const storyNodes = [
    { id: 1, stage: 1, text: 'Your first scenario...', nextNode: 2 },
    { id: 2, stage: 2, text: 'Second scenario...', options: [
        { text: 'Wrong choice', correct: false, nextNode: 3 },
        { text: 'Correct choice', correct: true, nextNode: 3 }
    ]},
    // ... add nodes 3-20 similarly
];

// --- Start Game ---
startGame();
