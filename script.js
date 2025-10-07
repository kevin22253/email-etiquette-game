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
    if (!storyNode) return;

    const imageName = `stage_${storyNode.stage}.jpeg`;
    storyImageElement.src = imageName;

    storyTextElement.innerText = storyNode.text;

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

    if (score <= 6) {
        badOutcomeImage.src = 'stage_13.jpeg';
        badOutcomeScreen.classList.remove('hide');
    } else if (score <= 13) {
        neutralOutcomeImage.src = 'stage_14.jpeg';
        neutralOutcomeScreen.classList.remove('hide');
    } else {
        goodOutcomeImage.src = 'stage_15.jpeg';
        goodOutcomeScreen.classList.remove('hide');
    }
}

// --- Story Nodes (20 Questions, detailed) ---
const storyNodes = [
    { id: 1, stage: 1, text: 'You are a Junior Project Coordinator at a large company. Your manager, Ms. Sharma, is highly detail-oriented but very busy. Today she has a tight schedule and multiple urgent tasks.' , nextNode: 2 },
    { id: 2, stage: 2, text: 'You need urgent approval for the Project Atlas report to meet the client deadline. You want her attention but don’t want to come off as demanding.', nextNode: 3 },
    { id: 3, stage: 3, text: 'Choose a subject line that will make her notice your email without seeming rude or aggressive.', options: [
        { text: 'URGENT!!! NEED APPROVAL NOW', correct: false, nextNode: 4 },
        { text: 'Urgent: Approval Needed for Project Atlas Report', correct: true, nextNode: 4 }
    ]},
    { id: 4, stage: 3, text: 'Now decide the opening line. You want to be polite but clear about the urgency.', options: [
        { text: '"Hey, approve this now."', correct: false, nextNode: 5 },
        { text: '"Hi Ms. Sharma, I hope you\'re having a productive day. Could you please take a moment to approve the attached?"', correct: true, nextNode: 5 }
    ]},
    { id: 5, stage: 3, text: 'Finally, pick a closing that maintains professionalism.', options: [
        { text: '"Later,"', correct: false, nextNode: 6 },
        { text: '"Best regards,"', correct: true, nextNode: 6 }
    ]},
    { id: 6, stage: 4, text: 'After sending the email, you prepare for a client meeting with Mr. David Lee. He expects a proposal follow-up by today.' , nextNode: 7 },
    { id: 7, stage: 5, text: 'Before sending, check if the attachment is included.', options: [
        { text: 'Just send it, trust memory', correct: false, nextNode: 8 },
        { text: 'Double-check that "proposal.pdf" is attached', correct: true, nextNode: 8 }
    ]},
    { id: 8, stage: 5, text: 'Decide the tone for your follow-up email.', options: [
        { text: 'Casual and brief', correct: false, nextNode: 9 },
        { text: 'Professional, polite, and concise', correct: true, nextNode: 9 }
    ]},
    { id: 9, stage: 6, text: 'Your college group project team also needs a deadline update. How should you inform them?', nextNode: 10 },
    { id: 10, stage: 7, text: 'Communicate the new deadline effectively.', options: [
        { text: 'Bury it in a long paragraph', correct: false, nextNode: 11 },
        { text: 'Highlight clearly: "The new deadline is **Friday, 5 PM**"', correct: true, nextNode: 11 }
    ]},
    { id: 11, stage: 7, text: 'Do you send a friendly reminder to ensure everyone notices?', options: [
        { text: 'No reminder', correct: false, nextNode: 12 },
        { text: 'Yes, a polite reminder', correct: true, nextNode: 12 }
    ]},
    { id: 12, stage: 8, text: 'Oops! You sent the wrong report to Ms. Davis in Marketing. How should you start your apology?', options: [
        { text: 'Blame the system', correct: false, nextNode: 13 },
        { text: 'Take full responsibility', correct: true, nextNode: 13 }
    ]},
    { id: 13, stage: 8, text: 'Include the correct report?', options: [
        { text: 'No', correct: false, nextNode: 14 },
        { text: 'Yes, attach correct report', correct: true, nextNode: 14 }
    ]},
    { id: 14, stage: 9, text: 'You need a favor from busy coworker Mark. How do you start your email?', options: [
        { text: '"I need the data by 3 PM today."', correct: false, nextNode: 15 },
        { text: '"I know you\'re busy, but could you help me when you have a moment?"', correct: true, nextNode: 15 }
    ]},
    { id: 15, stage: 9, text: 'Do you follow up politely if no response?', options: [
        { text: 'Ignore it', correct: false, nextNode: 16 },
        { text: 'Send a polite reminder', correct: true, nextNode: 16 }
    ]},
    { id: 16, stage: 10, text: 'Organize a team meeting to clarify project tasks.', options: [
        { text: 'Cancel without notice', correct: false, nextNode: 17 },
        { text: 'Notify all team members politely', correct: true, nextNode: 17 }
    ]},
    { id: 17, stage: 10, text: 'Share meeting notes for reference?', options: [
        { text: 'No, rely on memory', correct: false, nextNode: 18 },
        { text: 'Yes, share notes with everyone', correct: true, nextNode: 18 }
    ]},
    { id: 18, stage: 11, text: 'Send weekly status report to manager on time?', options: [
        { text: 'Skip or delay', correct: false, nextNode: 19 },
        { text: 'Send on time', correct: true, nextNode: 19 }
    ]},
    { id: 19, stage: 11, text: 'Do you thank your manager for assistance?', options: [
        { text: 'Never', correct: false, nextNode: 20 },
        { text: 'Always show gratitude', correct: true, nextNode: 20 }
    ]},
    { id: 20, stage: 12, text: 'Final challenge: demonstrate full email etiquette, clarity, and professionalism.', options: [
        { text: 'Ignore rules', correct: false, nextNode: null },
        { text: 'Follow all best practices', correct: true, nextNode: null }
    ]}
];

// --- Start the game ---
startGame();
