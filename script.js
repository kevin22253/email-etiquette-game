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
    
    const imageName = `stage_${storyNode.stage}.jpeg`;
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
    
    if (score <= 10) {
        badOutcomeImage.src = 'stage_21.jpeg';
        badOutcomeScreen.classList.remove('hide');
    } else if (score <= 15) {
        neutralOutcomeImage.src = 'stage_22.jpeg';
        neutralOutcomeScreen.classList.remove('hide');
    } else {
        goodOutcomeImage.src = 'stage_23.jpeg';
        goodOutcomeScreen.classList.remove('hide');
    }
}

// --- Story Data ---
// Each node has a 'stage' number corresponding to your image file
const storyNodes = [
    // --- SCENARIO 1: The Urgent Request ---
    { id: 1, stage: 1, text: 'You enter the office. Your manager, Ms. Sharma, is behind her desk, arms crossed, looking strict. You feel a little nervous about the tasks ahead.', nextNode: 2 },
    { id: 2, stage: 2, text: 'On your desk lies the Project Atlas file. You need her approval before the end of the day. Time is ticking.', nextNode: 3 },
    { id: 3, stage: 3, text: 'First, the email subject line. How do you get her attention without being unprofessional?', options: [
        { text: 'URGENT!!! NEED APPROVAL NOW', correct: false, nextNode: 4 },
        { text: 'Urgent: Approval Needed for Project Atlas Report', correct: true, nextNode: 4 }
    ]},
    { id: 4, stage: 4, text: 'Now the opening line. How do you start your email to sound polite but prompt?', options: [
        { text: '"Hey, I need you to approve this right away."', correct: false, nextNode: 5 },
        { text: '"Hi Ms. Sharma, I hope you\'re having a productive day. Could you please take a moment to approve the attached?"', correct: true, nextNode: 5 }
    ]},
    { id: 5, stage: 5, text: 'Finally, the closing line. How do you sign off to keep it professional?', options: [
        { text: '"Later,"', correct: false, nextNode: 6 },
        { text: '"Best regards,"', correct: true, nextNode: 6 }
    ]},

    // --- SCENARIO 2: The Client Follow-Up ---
    { id: 6, stage: 6, text: 'You just finished a video call with a client, Mr. David Lee. You need to send a follow-up email with the proposal attached.', nextNode: 7 },
    { id: 7, stage: 7, text: 'Before sending, what do you do to ensure everything is correct?', options: [
        { text: 'Just hit "Send". You\'re sure you attached it.', correct: false, nextNode: 8 },
        { text: 'Quickly double-check that "proposal.pdf" is attached.', correct: true, nextNode: 8 }
    ]},
    { id: 8, stage: 8, text: 'While on a call, a coworker interrupts you. How do you handle the situation?', options: [
        { text: 'Ignore them and continue talking to the client.', correct: false, nextNode: 9 },
        { text: 'Politely ask them to wait until the call is finished.', correct: true, nextNode: 9 }
    ]},
    { id: 9, stage: 9, text: 'You need to leave a voicemail for another client. How do you structure it?', options: [
        { text: 'Say your name and hang up quickly.', correct: false, nextNode: 10 },
        { text: 'Include your name, company, reason for calling, and a callback number.', correct: true, nextNode: 10 }
    ]},
    { id: 10, stage: 10, text: 'A colleague calls while you are leaving a voicemail. How should you handle it?', options: [
        { text: 'Just put them on hold without explanation.', correct: false, nextNode: 11 },
        { text: 'Ask politely if you can call back after finishing.', correct: true, nextNode: 11 }
    ]},

    // --- SCENARIO 3: Online Interview Etiquette ---
    { id: 11, stage: 11, text: 'You have an online interview scheduled. How do you prepare your workspace?', options: [
        { text: 'Ignore the background and hope it looks fine.', correct: false, nextNode: 12 },
        { text: 'Test your tech, tidy your background, and ensure good lighting.', correct: true, nextNode: 12 }
    ]},
    { id: 12, stage: 12, text: 'How do you dress for a professional online interview?', options: [
        { text: 'Casual T-shirt and shorts are fine.', correct: false, nextNode: 13 },
        { text: 'Wear a professional top, but keep it comfortable.', correct: true, nextNode: 13 }
    ]},
    { id: 13, stage: 13, text: 'When do you join the video call?', options: [
        { text: 'Right at the start time.', correct: false, nextNode: 14 },
        { text: '5–10 minutes early to show punctuality.', correct: true, nextNode: 14 }
    ]},
    { id: 14, stage: 14, text: 'During the interview, how do you stay engaged?', options: [
        { text: 'Multitask and check your phone.', correct: false, nextNode: 15 },
        { text: 'Maintain eye contact and focus on the interviewer.', correct: true, nextNode: 15 }
    ]},
    { id: 15, stage: 15, text: 'The interview ends. How do you leave on a positive note?', options: [
        { text: 'Close your laptop silently and leave.', correct: false, nextNode: 16 },
        { text: 'Smile and thank the interviewer for their time.', correct: true, nextNode: 16 }
    ]},

    // --- SCENARIO 4: In-Person Interview ---
    { id: 16, stage: 16, text: 'You arrive at the company for an in-person interview. How do you plan your arrival?', options: [
        { text: 'Show up just in time.', correct: false, nextNode: 17 },
        { text: 'Arrive early and plan ahead.', correct: true, nextNode: 17 }
    ]},
    { id: 17, stage: 17, text: 'During the interview, how do you project confidence?', options: [
        { text: 'Slouch and avoid eye contact.', correct: false, nextNode: 18 },
        { text: 'Stand tall, smile, and shake hands confidently.', correct: true, nextNode: 18 }
    ]},
    { id: 18, stage: 18, text: 'You have a chance to ask questions. What do you do?', options: [
        { text: 'Stay silent; no questions are needed.', correct: false, nextNode: 19 },
        { text: 'Ask thoughtful questions about the team and role.', correct: true, nextNode: 19 }
    ]},
    { id: 19, stage: 19, text: 'How do you avoid mistakes during the interview?', options: [
        { text: 'Keep your phone out and multitask.', correct: false, nextNode: 20 },
        { text: 'Put your phone away, sit upright, and stay professional.', correct: true, nextNode: 20 }
    ]},
    { id: 20, stage: 20, text: 'Finally, you need to send a request to a busy coworker. How do you ask?', options: [
        { text: '"I need the data by 3 PM today."', correct: false, nextNode: null },
        { text: '"I know you\'re busy, but could you help me with this when you have a moment?"', correct: true, nextNode: null }
    ]}
];

// Start the game
startGame();
