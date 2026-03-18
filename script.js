function rollDice() {
    let value = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-value').innerHTML = value;
    alert("पासे पर आया: " + value);
}
