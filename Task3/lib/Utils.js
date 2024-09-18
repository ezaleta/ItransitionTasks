function validateMoves(moves) {
    const movesNumber = moves.length;
    const uniqueMoves = new Set(moves);
    const invalidMoves = moves.some(move => move.trim() === '');
    if (movesNumber < 3) throw new Error(`At least 3 moves are required to continue. Moves provided: ${movesNumber}`);
    if (movesNumber % 2 === 0) throw new Error(`An odd number of moves is required, you may try: ${movesNumber - 1} or ${movesNumber + 1} moves.`);
    if (uniqueMoves.size !== moves.length) throw new Error('Duplicate moves found. All moves must be unique.');
    if (invalidMoves) throw new Error('Moves cannot be empty or whitespace.');
}

export { validateMoves };
