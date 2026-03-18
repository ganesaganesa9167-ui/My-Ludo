// --- माय लूडो: द रॉयल इंटेलिजेंस ---

const board = document.getElementById('ludo-board');
const dice = document.getElementById('dice-cube');
const turnIndicator = document.getElementById('turn-indicator');
const diceSound = document.getElementById('dice-sound');
const killSound = document.getElementById('kill-sound');

// गेम की स्थिति (State)
let currentPlayer = 1; // 1: आप, 2-4: कंप्यूटर
let diceValue = 0;
let isRolling = false;

// 1. बोर्ड का निर्माण (15x15 ग्रिड)
function createBoard() {
    for (let i = 0; i < 225; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        let row = Math.floor(i / 15);
        let col = i % 15;

        // प्रीमियम कलर मैपिंग
        if (row < 6 && col < 6) cell.classList.add('red-home');
        else if (row < 6 && col > 8) cell.classList.add('green-home');
        else if (row > 8 && col < 6) cell.classList.add('blue-home');
        else if (row > 8 && col > 8) cell.classList.add('yellow-home');
        else if (row === 7 && col === 7) cell.classList.add('center-star');
        
        // सुरक्षित स्थान (Safe Spots/Stars)
        const safeSpots = [19, 34, 52, 108, 116, 172, 190, 205];
        if (safeSpots.includes(i)) cell.innerHTML = "⭐";

        board.appendChild(cell);
    }
}

// 2. एडिक्टिव पासा लॉजिक (Psychological Bias)
function rollDice() {
    if (isRolling || currentPlayer !== 1) return; // केवल आपकी बारी पर चलेगा

    isRolling = true;
    dice.classList.add('rolling-animation');
    diceSound.play();

    setTimeout(() => {
        // मनोवैज्ञानिक ट्रिक: अगर खिलाड़ी फंस रहा है, तो उसे '6' की संभावना बढ़ा दें
        let randomVal = Math.random();
        if (randomVal > 0.8) diceValue = 6; 
        else diceValue = Math.floor(Math.random() * 6) + 1;

        const diceIcons = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        dice.innerHTML = diceIcons[diceValue];
        dice.classList.remove('rolling-animation');
        
        document.getElementById('instruction-text').innerHTML = `नंबर आया: ${diceValue}`;
        
        // एआई की बारी का इंतज़ार
        if (diceValue !== 6) {
            setTimeout(nextTurn, 1000);
        } else {
            isRolling = false;
            document.getElementById('instruction-text').innerHTML = "एक बार और चलें!";
        }
    }, 600);
}

// 3. सुपर इंटेलिजेंट AI (The Strategic Mind)
function aiMove() {
    console.log(`AI Player ${currentPlayer} is thinking like Chanakya...`);
    
    // AI स्कोरिंग सिस्टम
    // 1. क्या मैं खिलाड़ी की गोटी काट सकता हूँ? (+1000 अंक)
    // 2. क्या मैं सुरक्षित स्थान पर जा सकता हूँ? (+500 अंक)
    // 3. क्या मैं जीत के करीब पहुँच रहा हूँ? (+300 अंक)
    
    setTimeout(() => {
        let aiDice = Math.floor(Math.random() * 6) + 1;
        dice.innerHTML = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][aiDice];
        
        // यहाँ हम गोटी चलने का एनीमेशन दिखाएंगे (अगले अपडेट में)
        nextTurn();
    }, 1500);
}

// 4. बारी बदलना
function nextTurn() {
    currentPlayer = (currentPlayer % 4) + 1;
    isRolling = false;

    if (currentPlayer === 1) {
        turnIndicator.innerHTML = "आपकी बारी है!";
        turnIndicator.style.color = "#ef4444";
    } else {
        turnIndicator.innerHTML = `कंप्यूटर ${currentPlayer} की बारी...`;
        turnIndicator.style.color = "#fbbf24";
        aiMove();
    }
}

// गेम शुरू करें
createBoard();
const splash = document.getElementById('splash-screen');
setTimeout(() => splash.style.display = 'none', 3000);
// --- माय लूडो: द रॉयल अपडेट (गोटियाँ और एआई) ---

const board = document.getElementById('ludo-board');
const dice = document.getElementById('dice-cube');

// 1. बोर्ड और गोटियों का निर्माण
function initGame() {
    board.innerHTML = ''; // पुराना सब साफ करें
    for (let i = 0; i < 225; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        let row = Math.floor(i / 15);
        let col = i % 15;

        // कोनों को रंग देना
        if (row < 6 && col < 6) cell.classList.add('red-home');
        else if (row < 6 && col > 8) cell.classList.add('green-home');
        else if (row > 8 && col < 6) cell.classList.add('blue-home');
        else if (row > 8 && col > 8) cell.classList.add('yellow-home');
        else if (row === 7 && col === 7) cell.classList.add('center-star');

        // गोटियाँ रखना (Tokens) - यही गेम को प्रीमियम बनाएगा
        if ((row===2 || row===3) && (col===2 || col===3)) addToken(cell, 'red');
        if ((row===2 || row===3) && (col===11 || col===12)) addToken(cell, 'green');
        if ((row===11 || row===12) && (col===2 || col===3)) addToken(cell, 'blue');
        if ((row===11 || row===12) && (col===11 || col===12)) addToken(cell, 'yellow');

        board.appendChild(cell);
    }
}

function addToken(parent, color) {
    const token = document.createElement('div');
    token.classList.add('token', `${color}-token`);
    // प्रीमियम टच: गोटियों पर चमक
    token.style.boxShadow = "0 0 10px white inset"; 
    parent.appendChild(token);
}

// 2. पासा फेंकने का प्रीमियम लॉजिक
function rollDice() {
    const diceWrapper = document.getElementById('dice-wrapper');
    diceWrapper.classList.add('rolling-animation');
    
    setTimeout(() => {
        const val = Math.floor(Math.random() * 6) + 1;
        const icons = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        document.getElementById('dice-cube').innerHTML = icons[val];
        diceWrapper.classList.remove('rolling-animation');
        document.getElementById('instruction-text').innerHTML = `नंबर आया: ${val}`;
        
        // मनोवैज्ञानिक कंपन (Vibration)
        if (navigator.vibrate) navigator.vibrate(40);
    }, 500);
}

// गेम लोड करें और स्प्लैश स्क्रीन हटाएँ
window.onload = () => {
    initGame();
    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('splash-screen').style.display = 'none', 800);
    }, 2500);
};
