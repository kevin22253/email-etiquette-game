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
const storyNodes = [
    { id:1, stage:1, text:"Stickman-style office scene. A stick figure manager behind a desk, arms crossed, looking slightly strict. Another smaller stick figure (the player) stands in front of the desk, looking nervous. Minimalist office elements like a computer and a clock on the wall. Simple bright colors, cartoonish stickman style.", nextNode:2 },
    { id:2, stage:2, text:"Stickman-style close-up of a desk. A stickman hand pointing at a pile of papers labeled 'Project Atlas' and a laptop with a small exclamation mark over it. A stickman clock on the wall shows late afternoon. Cartoonish, simple stick figures and objects, clean minimal background.", nextNode:3 },
    { id:3, stage:3, text:"Stickman-style computer screen showing an email draft. The subject line box highlighted with a blinking cursor. Two small thought bubbles above the player stickman: one says 'URGENT!!!', another says 'Professional subject line'. Minimalist cartoon style, clean white background, simple stick figures.", options:[
        { text:"URGENT!!! NEED APPROVAL NOW", correct:false, nextNode:4 },
        { text:"Urgent: Approval Needed for Project Atlas Report", correct:true, nextNode:4 }
    ]},
    { id:4, stage:4, text:"Stickman-style email draft open on a computer screen. Two options for the first line appear in text boxes above the screen: messy casual vs. polite professional. A small stickman thinking bubble shows the player considering which one to pick. Simple cartoon stickman style, minimal background.", options:[
        { text:'"Hey, I need you to approve this right away."', correct:false, nextNode:5 },
        { text:'"Hi Ms. Sharma, I hope you\'re having a productive day. Could you please take a moment to approve the attached?"', correct:true, nextNode:5 }
    ]},
    { id:5, stage:5, text:"Stickman-style computer screen showing email closing section. Two text options appear above: 'Later,' and 'Best regards,'. The player stickman is looking at the screen with a thinking bubble. Simple, minimalist stick figure cartoon style, clean office background, bright and cheerful colors.", options:[
        { text:'"Later,"', correct:false, nextNode:6 },
        { text:'"Best regards,"', correct:true, nextNode:6 }
    ]},
    { id:6, stage:6, text:"Stickman-style office scene. The player stickman sitting at a desk with a laptop, a stickman client on a video call floating in a small window above. Papers labeled 'Proposal.pdf' on the desk. Simple, minimalist cartoon style with bright colors and clean background.", nextNode:7 },
    { id:7, stage:7, text:"Stickman-style close-up of laptop screen showing email draft. A small pop-up box highlights 'Attach Proposal.pdf'. The player stickman has a thinking bubble showing 'Did I attach it?' Cartoon stick figure style, simple office desk, cheerful colors.", options:[
        { text:'Just hit "Send". You\'re sure you attached it.', correct:false, nextNode:8 },
        { text:'Quickly double-check that "proposal.pdf" is attached.', correct:true, nextNode:8 }
    ]},
    { id:8, stage:8, text:"Stickman-style scene: the player stickman on a phone call, another small stick figure (coworker or office chatter) approaching. The player stickman has a thought bubble with 'Politely ask them to wait' vs 'Ignore them'. Minimalist cartoon style, office background, simple bright colors.", options:[
        { text:"Ignore them", correct:false, nextNode:9 },
        { text:"Politely ask them to wait", correct:true, nextNode:9 }
    ]},
    { id:9, stage:9, text:"Stickman-style phone interface showing voicemail being recorded. The player stickman next to the phone with a thought bubble showing: 'Name, company, reason, and contact number'. Clean, simple cartoon stickman style, minimal background, bright colors.", nextNode:10 },
    { id:10, stage:10, text:"Stickman-style scene of the player stickman holding a phone. Two options displayed: 'Just put them on hold' vs 'Ask permission first'. Minimalist office background, simple cartoon stick figures, bright colors, clear focus on the decision.", options:[
        { text:"Just put them on hold", correct:false, nextNode:11 },
        { text:"Ask permission first", correct:true, nextNode:11 }
    ]},
    { id:11, stage:11, text:"Stickman-style scene showing the player stickman adjusting a laptop camera. A neat, quiet background with a simple desk, chair, and plant. Thought bubble showing 'Test tech, tidy background, good lighting.' Minimalist stickman cartoon style, cheerful colors, clean lines.", nextNode:12 },
    { id:12, stage:12, text:"Stickman-style scene: the player stickman in front of a mirror, wearing a suit jacket over casual pants. Thought bubble with 'Professional but comfortable.' Cartoonish, minimalist style, simple bright colors.", options:[
        { text:"Casual", correct:false, nextNode:13 },
        { text:"Professional but comfortable", correct:true, nextNode:13 }
    ]},
    { id:13, stage:13, text:"Stickman-style laptop screen showing a video call interface. The player stickman is sitting calmly, a clock shows 5–10 minutes early. Small 'Joining early' text above the screen. Clean cartoon stickman style, minimal office background.", options:[
        { text:"Join last minute", correct:false, nextNode:14 },
        { text:"Join 5-10 minutes early", correct:true, nextNode:14 }
    ]},
    { id:14, stage:14, text:"Stickman-style scene: the player stickman on video call with a stickman interviewer visible on the laptop. Thought bubble showing 'Maintain eye contact, don’t multitask.' Minimalist cartoon style, bright colors, clean background.", options:[
        { text:"Multitask", correct:false, nextNode:15 },
        { text:"Stay focused and maintain eye contact", correct:true, nextNode:15 }
    ]},
    { id:15, stage:15, text:"Stickman-style scene: the player stickman smiling and waving at the laptop, text bubble saying 'Thank you for your time!' Clean cartoon stick figure style, minimal background, bright cheerful colors.", nextNode:16 },
    { id:16, stage:16, text:"Stickman-style scene outside an office building. The player stickman is checking a watch, standing calmly, arriving early. Minimalist background with office door, simple bright cartoon colors. Thought bubble: 'Arrive early, plan ahead.'", nextNode:17 },
    { id:17, stage:17, text:"Stickman-style scene inside an office interview room. The player stickman is shaking hands with the interviewer stickman. Both smile. Thought bubble above player: 'Stand tall, confident posture.' Minimalist cartoon style, clean interior, bright cheerful colors.", nextNode:18 },
    { id:18, stage:18, text:"Stickman-style scene at a desk in an interview. Player stickman raising a hand with a small speech bubble: 'Could you tell me more about the team culture?' Interviewer stickman nodding. Simple cartoon stickman style, minimal background.", nextNode:19 },
    { id:19, stage:19, text:"Stickman-style scene: player stickman has a phone tucked away, sitting upright. Small warning icons above: 'No phone, don’t slouch, stay professional.' Minimalist stickman cartoon style, clean office background, bright colors.", nextNode:20 },
    { id:20, stage:20, text:"Stickman-style scene: player stickman sending an email or handing a document to a busy coworker stickman. Thought bubble shows: 'I know you’re busy, could you help me when free?' Cartoon stickman style, minimal office background, clear focus on the interaction.", options:[
        { text:"Demand immediately", correct:false },
        { text:"Politely ask when free", correct:true }
    ]}
];

// Start the game
startGame();
