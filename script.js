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
    
    const imageName = storyNode.stage >= 21 ? `stage${storyNode.stage}.jpeg` : `stage_${storyNode.stage}.jpeg`;
    storyImageElement.src = imageName;

    storyTextElement.innerText = storyNode.text;

    // Clear old options
    while (optionsButtonsElement.firstChild) {
        optionsButtonsElement.removeChild(optionsButtonsElement.firstChild);
    }
    
    if (storyNode.options) {
        storyNode.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionsButtonsElement.appendChild(button);
        });
    } else if (storyNode.nextNode) {
        const button = document.createElement('button');
        button.innerText = 'Continue';
        button.addEventListener('click', () => showStoryNode(storyNode.nextNode));
        optionsButtonsElement.appendChild(button);
    } else {
        // End of the game
        showFinalOutcome();
    }
}

function selectOption(option) {
    if (option.correct) score++;

    if (option.nextNode) {
        showStoryNode(option.nextNode);
    } else {
        showFinalOutcome();
    }
}

function showFinalOutcome() {
    gameContainer.classList.add('hide');
    
    if (score <= 8) {
        badOutcomeImage.src = 'stage_21.jpeg';
        badOutcomeScreen.classList.remove('hide');
    } else if (score <= 14) {
        neutralOutcomeImage.src = 'stage_22.jpeg';
        neutralOutcomeScreen.classList.remove('hide');
    } else {
        goodOutcomeImage.src = 'stage_23.jpeg';
        goodOutcomeScreen.classList.remove('hide');
    }
}

// --- Story Data ---
const storyNodes = [
    { id: 1, stage: 1, text: 'You are a Junior Project Coordinator at a large company. Your manager, Ms. Sharma, can be... difficult.', nextNode: 2 },
    { id: 2, stage: 2, text: 'You need urgent approval for a project file before the end of the day.', nextNode: 3 },
    { id: 3, stage: 3, text: 'First, the subject line. How do you get her attention without being unprofessional?', options: [
        { text: 'URGENT!!! NEED APPROVAL NOW', correct: false, nextNode: 4 },
        { text: 'Urgent: Approval Needed for Project Atlas Report', correct: true, nextNode: 4 }
    ]},
    { id: 4, stage: 4, text: 'Next, the opening line. How do you start the email?', options: [
        { text: '"Hey, I need you to approve this right away."', correct: false, nextNode: 5 },
        { text: '"Hi Ms. Sharma, I hope you\'re having a productive day. Could you please take a moment to approve the attached?"', correct: true, nextNode: 5 }
    ]},
    { id: 5, stage: 5, text: 'Finally, the closing. How do you sign off?', options: [
        { text: '"Later,"', correct: false, nextNode: 6 },
        { text: '"Best regards,"', correct: true, nextNode: 6 }
    ]},
    { id: 6, stage: 6, text: 'You finished a successful meeting with a new client. You need to send a follow-up email and attach the proposal.', nextNode: 7 },
    { id: 7, stage: 7, text: 'The most important part is making sure you actually attach the proposal. What do you do?', options: [
        { text: 'Just hit "Send". You\'re sure you attached it.', correct: false, nextNode: 8 },
        { text: 'Quickly double-check that "proposal.pdf" is attached.', correct: true, nextNode: 8 }
    ]},
    { id: 8, stage: 8, text: 'How should you greet the client in your follow-up?', options: [
        { text: '"Hey David, thanks."', correct: false, nextNode: 9 },
        { text: '"Dear Mr. Lee, it was a pleasure meeting you today."', correct: true, nextNode: 9 }
    ]},
    { id: 9, stage: 9, text: 'How do you close the email professionally?', options: [
        { text: '"Bye."', correct: false, nextNode: 10 },
        { text: '"Looking forward to your feedback. Best regards,"', correct: true, nextNode: 10 }
    ]},
    { id: 10, stage: 10, text: 'You are leading a college group project and need to email your team about a change to an internal deadline.', nextNode: 11 },
    { id: 11, stage: 11, text: 'How do you make sure the new deadline is clear?', options: [
        { text: 'Bury it in a long paragraph.', correct: false, nextNode: 12 },
        { text: 'Make the new date bold: "The new deadline is **Friday, 5 PM**."', correct: true, nextNode: 12 }
    ]},
    { id: 12, stage: 12, text: 'Someone didn’t reply to your email. What do you do?', options: [
        { text: 'Ignore it.', correct: false, nextNode: 13 },
        { text: 'Send a polite reminder.', correct: true, nextNode: 13 }
    ]},
    { id: 13, stage: 13, text: 'One member replies angrily. How do you respond?', options: [
        { text: 'Reply angrily back.', correct: false, nextNode: 14 },
        { text: 'Stay professional and calm.', correct: true, nextNode: 14 }
    ]},
    { id: 14, stage: 14, text: 'You accidentally sent the wrong report to Ms. Davis in Marketing.', options: [
        { text: 'Blame the system.', correct: false, nextNode: 15 },
        { text: 'Take full responsibility clearly and concisely.', correct: true, nextNode: 15 }
    ]},
    { id: 15, stage: 15, text: 'How soon should you send the apology?', options: [
        { text: 'Wait a few days.', correct: false, nextNode: 16 },
        { text: 'Send it immediately.', correct: true, nextNode: 16 }
    ]},
    { id: 16, stage: 16, text: 'Do you offer a solution in your apology?', options: [
        { text: 'No, just apologize.', correct: false, nextNode: 17 },
        { text: 'Yes, suggest the correct report.', correct: true, nextNode: 17 }
    ]},
    { id: 17, stage: 17, text: 'You need to ask a busy coworker, Mark, for a favor.', options: [
        { text: '"I need the data by 3 PM today."', correct: false, nextNode: 18 },
        { text: '"I know you\'re busy, but could you help me with something when you have a moment?"', correct: true, nextNode: 18 }
    ]},
    { id: 18, stage: 18, text: 'Mark responds that he’s busy. How do you continue?', options: [
        { text: 'Complain.', correct: false, nextNode: 19 },
        { text: 'Offer flexibility and thank him.', correct: true, nextNode: 19 }
    ]},
    { id: 19, stage: 19, text: 'You finally receive the data. How do you close the conversation?', options: [
        { text: '"Finally, thanks."', correct: false, nextNode: 20 },
        { text: '"Thank you very much for your help."', correct: true, nextNode: 20 }
    ]},
    { id: 20, stage: 20, text: 'End of the workday. You reflect on how your communication skills affected outcomes.', nextNode: null }
];

// --- Start the game when the page loads ---
startGame();
