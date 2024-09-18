// Player.js
import readlineSync from 'readline-sync';

class Player {
    getInput(promptText) {
        return readlineSync.question(promptText).trim();
    }

    isValidChoice(input, maxInput) {
        const choice = parseInt(input, 10);
        return (!isNaN(choice) && choice >= 0 && choice <= maxInput) || input === '?';
    }
}

export default Player;
