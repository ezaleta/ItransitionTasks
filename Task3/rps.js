import Game from './lib/Game.js';

const moves = process.argv.slice(2);

if (moves.length === 0) {
    console.error('No moves provided. Usage example: node rps.js Rock Paper Scissors');
    process.exit(1);
}

const game = new Game(moves);
game.startGame();
