// --- गोटियों के साथ प्रीमियम बोर्ड ---
function initGame() {
    const board = document.getElementById('ludo-board');
    if (!board) return;

    board.innerHTML = ''; 
    for (let i = 0; i < 225; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        let row = Math.floor(i / 15);
        let col = i % 15;

        // घरों के रंग
        if (row < 6 && col < 6) cell.classList.add('red-home');
        else if (row < 6 && col > 8) cell.classList.add('green-home');
        else if (row > 8 && col < 6) cell.classList.add('blue-home');
        else if (row > 8 && col > 8) cell.classList.add('yellow-home');
        
        // --- यहाँ गोटियाँ (Tokens) खड़ी करेंगे ---
        // लाल गोटियाँ
        if ((row === 2 || row === 3) && (col === 2 || col === 3)) createToken(cell, 'red');
        // हरी गोटियाँ
        if ((row === 2 || row === 3) && (col === 11 || col === 12)) createToken(cell, 'green');
        // नीली गोटियाँ
        if ((row === 11 || row === 12) && (col === 2 || col === 3)) createToken(cell, 'blue');
        // पीली गोटियाँ
        if ((row === 11 || row === 12) && (col === 11 || col === 12)) createToken(cell, 'yellow');

        board.appendChild(cell);
    }
}

function createToken(parent, color) {
    const token = document.createElement('div');
    token.classList.add('token', `${color}-token`);
    // प्रीमियम इफ़ेक्ट: चमक और परछाई
    token.style.cssText = `
        width: 80%; height: 80%; border-radius: 50%; 
        border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        background: radial-gradient(circle at 30% 30%, white 0%, ${color} 70%);
    `;
    parent.appendChild(token);
            }
        
