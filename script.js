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
    
    // Set the correct image
    storyImageElement.src = `stage_${storyNode.stage}.jpeg`;

    storyTextElement.innerText = storyNode.text;

    // Clear old options
    optionsButtonsElement.innerHTML = '';
    
    // Decision node or continue
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
    if (option.nextNode) {
        showStoryNode(option.nextNode);
    } else {
        showFinalOutcome();
    }
}

function showFinalOutcome() {
    gameContainer.classList.add('hide');
    
    if (score <= 6) { // Low score → Bad outcome
        badOutcomeImage.src = 'stage_21.jpeg';
        badOutcomeScreen.classList.remove('hide');
    } else if (score <= 14) { // Medium → Neutral
        neutralOutcomeImage.src = 'stage_22.jpeg';
        neutralOutcomeScreen.classList.remove('hide');
    } else { // High → Good outcome
        goodOutcomeImage.src = 'stage_23.jpeg';
        goodOutcomeScreen.classList.remove('hide');
    }
}

// --- Story Nodes (20 stages) ---
const storyNodes = [
    { id: 1, stage: 1, text: 'You are a Junior Project Coordinator at a large company. Your manager, Ms. Sharma, can be... difficult.', nextNode: 2 },
    { id: 2, stage: 2, text: 'You need to ask her for an urgent approval on a project file before the end of the day.', nextNode: 3 },
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

    { id: 6, stage: 6, text: 'Client follow-up time! You just finished a successful meeting with a new client, Mr. David Lee. You need to attach the proposal.', nextNode: 7 },
    { id: 7, stage: 7, text: 'Before sending, what do you do?', options: [
        { text: 'Just hit "Send". You\'re sure it\'s attached.', correct: false, nextNode: 8 },
        { text: 'Double-check that "Proposal.pdf" is attached.', correct: true, nextNode: 8 }
    ]},
    { id: 8, stage: 8, text: 'You are on a phone call, but a coworker interrupts. What do you do?', options: [
        { text: 'Ignore them and continue.', correct: false, nextNode: 9 },
        { text: 'Politely ask them to wait.', correct: true, nextNode: 9 }
    ]},
    { id: 9, stage: 9, text: 'Leaving a voicemail for the client. What should you include?', options: [
        { text: 'Just your name.', correct: false, nextNode: 10 },
        { text: 'Name, company, reason, and contact number.', correct: true, nextNode: 10 }
    ]},
    { id: 10, stage: 10, text: 'Putting someone on hold. What is the best approach?', options: [
        { text: 'Just put them on hold.', correct: false, nextNode: 11 },
        { text: 'Ask permission first.', correct: true, nextNode: 11 }
    ]},

    { id: 11, stage: 11, text: 'Preparing for an online interview. What should you check first?', options: [
        { text: 'Laptop camera and background.', correct: true, nextNode: 12 },
        { text: 'Ignore tech issues.', correct: false, nextNode: 12 }
    ]},
    { id: 12, stage: 12, text: 'How should you dress?', options: [
        { text: 'Casual T-shirt.', correct: false, nextNode: 13 },
        { text: 'Professional but comfortable.', correct: true, nextNode: 13 }
    ]},
    { id: 13, stage: 13, text: 'Joining the call, when do you arrive?', options: [
        { text: 'Join exactly on time.', correct: false, nextNode: 14 },
        { text: 'Join 5-10 minutes early.', correct: true, nextNode: 14 }
    ]},
    { id: 14, stage: 14, text: 'During the call, how do you behave?', options: [
        { text: 'Maintain eye contact, stay focused.', correct: true, nextNode: 15 },
        { text: 'Multitask during call.', correct: false, nextNode: 15 }
    ]},
    { id: 15, stage: 15, text: 'Ending the call politely, what do you say?', options: [
        { text: '"Bye."', correct: false, nextNode: 16 },
        { text: '"Thank you for your time!"', correct: true, nextNode: 16 }
    ]},

    { id: 16, stage: 16, text: 'In-person interview: arriving early, what do you do?', options: [
        { text: 'Arrive just on time.', correct: false, nextNode: 17 },
        { text: 'Arrive early, plan ahead.', correct: true, nextNode: 17 }
    ]},
    { id: 17, stage: 17, text: 'Projecting confidence: how do you behave?', options: [
        { text: 'Slouch and avoid eye contact.', correct: false, nextNode: 18 },
        { text: 'Stand tall, shake hands confidently.', correct: true, nextNode: 18 }
    ]},
    { id: 18, stage: 18, text: 'Asking thoughtful questions, what should you do?', options: [
        { text: 'No questions.', correct: false, nextNode: 19 },
        { text: 'Ask relevant questions about the team.', correct: true, nextNode: 19 }
    ]},
    { id: 19, stage: 19, text: 'Avoid mistakes during the interview, what should you avoid?', options: [
        { text: 'Use your phone, slouch.', correct: false, nextNode: 20 },
        { text: 'Sit upright, phone away, stay professional.', correct: true, nextNode: 20 }
    ]},
    { id: 20, stage: 20, text: 'Final Big Ask: How do you approach a busy coworker?', options: [
        { text: '"I need this done now."', correct: false, nextNode: null },
        { text: '"I know you’re busy, could you help me when free?"', correct: true, nextNode: null }
    ]}
];

// --- Start the game ---
startGame();
