const board = document.getElementById('board');
const message = document.getElementById('message');
const reset = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
const gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function startNewGame() {
    gameState.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
    board.innerHTML = '';
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick, { once: true });
        board.appendChild(cell);
    }
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (!gameActive || gameState[index]) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
    } else if (gameState.every(cell => cell)) {
        message.textContent = `It's a draw! 🤝`;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

reset.addEventListener('click', startNewGame);

startNewGame();

