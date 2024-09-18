// Game.js
import Player from './Player.js';
import ComputerPlayer from './ComputerPlayer.js';
import MoveLogic from './MoveLogic.js';
import HmacGenerator from './HmacGenerator.js';
import HelpTable from './HelpTable.js';
import { validateMoves } from './utils.js';
import colors from 'yoctocolors';

class Game {
    constructor(moves) {
        this.moves = moves;
        this.player = new Player();
        this.computer = new ComputerPlayer(moves);
        this.moveLogic = new MoveLogic(moves);
        this.hmacGenerator = new HmacGenerator();
        this.helpTable = new HelpTable(moves);
    }

    startGame() {
        try {
            validateMoves(this.moves);
            this.startRound();
        } catch (error) {
            console.error('Validation Error: ', colors.red(error.message));
            process.exit(1);
        }
    }

    startRound() {
        this.computer.chooseMove();
        const computerMove = this.computer.getMove();
        const secretKey = this.hmacGenerator.generateSecretKey();
        const hmac = this.hmacGenerator.generateHmac(secretKey, computerMove);

        console.log(`HMAC: ${hmac}`);
        this.displayMenu();
        this.promptUser(computerMove, secretKey);
    }

    displayMenu() {
        console.log('Available moves:');
        this.moves.forEach((move, index) => {
            console.log(colors.yellow(`${index + 1} - ${move}`));
        });
        console.log(
            colors.magenta(`0 - Exit
? - Help`)
        );
    }

    promptUser(computerMove, secretKey) {
        const userInput = this.player.getInput('Enter your move: ');
        if (this.player.isValidChoice(userInput, this.moves.length)) {
            if (userInput === '0') {
                console.log('Exiting the game...');
                process.exit(0);
            } else if (userInput === '?') {
                this.helpTable.displayHelpTable();
                this.startRound();
            } else {
                const playerMoveIndex = parseInt(userInput, 10) - 1;
                const playerMove = this.moves[playerMoveIndex];

                const result = this.moveLogic.matchResult(playerMoveIndex, this.computer.moveIndex);
                console.log(result);
                console.log(`HMAC key: ${secretKey.toString('hex')}`);
                console.log(`||*************************************************************************||\n`);
                this.keepPlaying();
            }
        } else {
            console.log(colors.red('Invalid input. Try again using any of the options above.'));
            this.promptUser(computerMove, secretKey);
        }
    }

    keepPlaying() {
        const playAgain = this.player.getInput('Play again? (Enter "y" to continue/ Enter any key to exit): ').toLowerCase();
        if (playAgain === 'y') {
            this.startRound();
        } else {
            console.log('Thanks for playing!');
            process.exit(0);
        }
    }
}

export default Game;
