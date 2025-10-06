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
    
    // Hide all outcome screens
    badOutcomeScreen.classList.add('hide');
    neutralOutcomeScreen.classList.add('hide');
    goodOutcomeScreen.classList.add('hide');
    
    // Show the game container
    gameContainer.classList.remove('hide');
    
    showStoryNode(currentNodeId);
}

function showStoryNode(nodeId) {
    const storyNode = storyNodes.find(node => node.id === nodeId);
    
    // THIS LOGIC IS NOW FULLY CORRECTED FOR YOUR FILENAMES
    const imageName = storyNode.stage >= 10 ? `stage${storyNode.stage}.jpeg` : `stage_${storyNode.stage}.jpeg`;
    storyImageElement.src = imageName;

    storyTextElement.innerText = storyNode.text;

    // Clear old options
    while (optionsButtonsElement.firstChild) {
        optionsButtonsElement.removeChild(optionsButtonsElement.firstChild);
    }
    
    // Check if it's a decision node or a transition node
    if (storyNode.options) {
        storyNode.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionsButtonsElement.appendChild(button);
        });
    } else {
        // This is a transition node, show a "Continue" button
        const button = document.createElement('button');
        button.innerText = 'Continue';
        button.addEventListener('click', () => showStoryNode(storyNode.nextNode));
        optionsButtonsElement.appendChild(button);
    }
}

function selectOption(option) {
    // Add to score if the choice is correct
    if (option.correct) {
        score++;
    }

    // Move to the next node
    if (option.nextNode) {
        showStoryNode(option.nextNode);
    } else {
        // End of the game, show final outcome
        showFinalOutcome();
    }
}

function showFinalOutcome() {
    gameContainer.classList.add('hide');
    
    if (score <= 2) {
        // Bad Outcome
        // CORRECTED FILENAME
        badOutcomeImage.src = 'stage13.jpeg'; 
        badOutcomeScreen.classList.remove('hide');
    } else if (score === 3) {
        // Neutral Outcome
        // CORRECTED FILENAME
        neutralOutcomeImage.src = 'stage14.jpeg';
        neutralOutcomeScreen.classList.remove('hide');
    } else { // Score is 4 or 5
        // Good Outcome
        // CORRECTED FILENAME
        goodOutcomeImage.src = 'stage15.jpeg';
        goodOutcomeScreen.classList.remove('hide');
    }
}


// --- Story Data ---
// Each node has a 'stage' number corresponding to your image file
const storyNodes = [
    // --- SCENARIO 1: The Urgent Request ---
    { id: 1, stage: 1, text: 'You are a Junior Project Coordinator at a large company. Your manager, Ms. Sharma, can be... difficult.', nextNode: 2 },
    { id: 2, stage: 2, text: 'You need to ask her for an urgent approval on a project file before the end of the day.', nextNode: 3 },
    { id: 3, stage: 3, text: 'First, the subject line. How do you get her attention without being unprofessional?', options: [
        { text: 'URGENT!!! NEED APPROVAL NOW', correct: false, nextNode: 4 },
        { text: 'Urgent: Approval Needed for Project Atlas Report', correct: true, nextNode: 4 }
    ]},
    { id: 4, stage: 3, text: 'Next, the opening line. How do you start the email?', options: [
        { text: '"Hey, I need you to approve this right away."', correct: false, nextNode: 5 },
        { text: '"Hi Ms. Sharma, I hope you\'re having a productive day. Could you please take a moment to approve the attached?"', correct: true, nextNode: 5 }
    ]},
    { id: 5, stage: 3, text: 'Finally, the closing. How do you sign off?', options: [
        { text: '"Later,"', correct: false, nextNode: 6 },
        { text: '"Best regards,"', correct: true, nextNode: 6 }
    ]},
    
    // --- SCENARIO 2: The Client Follow-Up ---
    { id: 6, stage: 4, text: 'Your next task. You just finished a successful meeting with a new client, Mr. David Lee. You need to send a follow-up email and attach the proposal.', nextNode: 7 },
    { id: 7, stage: 5, text: 'The most important part of this email is making sure you actually attach the proposal. What do you do just before hitting send?', options: [
        { text: 'Just hit "Send". You\'re sure you attached it.', correct: false, nextNode: 8 },
        { text: 'Quickly double-check that "proposal.pdf" is attached.', correct: true, nextNode: 8 }
    ]},

    // --- SCENARIO 3: The Group Project ---
    { id: 8, stage: 6, text: 'Next up. You\'re leading a college group project and need to email your team about a change to an internal deadline.', nextNode: 9 },
    { id: 9, stage: 7, text: 'How do you make sure the new deadline is clear to everyone in your mixed-audience team?', options: [
        { text: 'Bury the new date in the middle of a long paragraph of text.', correct: false, nextNode: 10 },
        { text: 'Make the new date stand out using bold text: "The new deadline is **Friday, 5 PM**."', correct: true, nextNode: 10 }
    ]},

    // --- SCENARIO 4: The Apology Email ---
    { id: 10, stage: 8, text: 'Uh oh. You\'ve just realized you sent the wrong report to Ms. Davis in Marketing. When you write the apology, what is the best approach?', options: [
        { text: 'Blame the system for being confusing.', correct: false, nextNode: 11 },
        { text: 'Take full responsibility clearly and concisely.', correct: true, nextNode: 11 }
    ]},

    // --- SCENARIO 5: The "Big Ask" ---
    { id: 11, stage: 9, text: 'Final challenge! You need to ask a busy coworker, Mark, for a favor. How do you start your email?', options: [
        { text: '"I need the data by 3 PM today."', correct: false, nextNode: null }, // 'nextNode: null' signals the end
        { text: '"I know you\'re busy, but could you help me with something when you have a moment?"', correct: true, nextNode: null }
    ]}
];

// --- Start the game when the page loads ---
startGame();
