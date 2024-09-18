// ComputerPlayer.js
import crypto from 'crypto';

class ComputerPlayer {
    constructor(moves) {
        this.moves = moves;
        this.moveIndex = null;
    }

    chooseMove() {
        this.moveIndex = crypto.randomInt(0, this.moves.length);
    }

    getMove() {
        return this.moves[this.moveIndex];
    }
}

export default ComputerPlayer;
