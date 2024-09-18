// HelpTable.js
import Table from 'cli-table3';
import MoveLogic from './MoveLogic.js';

class HelpTable {
    constructor(moves) {
        this.moves = moves;
        this.moveLogic = new MoveLogic(moves);
    }

    displayHelpTable() {
        const outcomeMatrix = this.generateMatrix();
        const table = new Table({
            head: ['PC \\ User', ...this.moves],
            style: { head: ['magenta'] }
        });

        for (let i = 0; i < this.moves.length; i++) {
            const row = [this.moves[i]];
            for (let j = 0; j < this.moves.length; j++) {
                row.push(outcomeMatrix[j][i]); // Swap indices to align correctly
            }
            table.push(row);
        }

        console.log('\nResult Table:');
        console.log(table.toString());
    }

    generateMatrix() {
        const movesNumber = this.moves.length;
        const matrix = [];

        for (let i = 0; i < movesNumber; i++) {
            const row = [];
            for (let j = 0; j < movesNumber; j++) {
                const outcome = this.moveLogic.determineOutcome(i, j);
                row.push(outcome);
            }
            matrix.push(row);
        }

        return matrix;
    }
}

export default HelpTable;
