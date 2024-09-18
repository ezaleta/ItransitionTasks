// MoveLogic.js
import colors from 'yoctocolors';

class MoveLogic {
    constructor(moves) {
        this.moves = moves;
        this.movesNumber = moves.length;
        this.movesToBeat = (this.movesNumber - 1) / 2;
    }

    mod(n, m) {
        return ((n % m) + m) % m;
    }

    getWinningMoves(index) {
        const indices = [];
        for (let n = 1; n <= this.movesToBeat; n++) {
            indices.push((index + n) % this.movesNumber);
        }
        return indices;
    }

    getLosingMoves(index) {
        const indices = [];
        for (let n = 1; n <= this.movesToBeat; n++) {
            indices.push(this.mod(index - n, this.movesNumber));
        }
        return indices;
    }

    matchResult(playerIndex, computerIndex) {
        const playerMove = this.moves[playerIndex];
        const computerMove = this.moves[computerIndex];

        console.log(`Player entered: ${playerMove}`);
        console.log(`Computer entered: ${computerMove}`);

        let result = colors.bgGray(` It's a draw! `);
        const wMoves = this.getWinningMoves(playerIndex);
        const lMoves = this.getLosingMoves(playerIndex);
        if (wMoves.includes(computerIndex)) result = colors.bgGreenBright(' You win! :D ');
        if (lMoves.includes(computerIndex)) result = colors.bgBlue(' You lost :( ');
        return result;
    }

    determineOutcome(playerIndex, computerIndex) {
        let result = ' Draw ';
        const wMoves = this.getWinningMoves(playerIndex);
        const lMoves = this.getLosingMoves(playerIndex);
        if (wMoves.includes(computerIndex)) result = colors.bgGreenBright('  Win  ');
        if (lMoves.includes(computerIndex)) result = colors.bgBlue(' Lose  ');
        return result;
    }
}

export default MoveLogic;
