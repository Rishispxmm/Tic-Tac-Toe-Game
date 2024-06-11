// script.js

const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');
const cells = document.querySelectorAll('[data-cell]');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const closeButton = document.getElementById('closeButton');

let currentPlayer = 'X';
let gameActive = true;
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;

    if (cell.innerText !== '' || !gameActive) {
        return;
    }

    cell.innerText = currentPlayer;
    if (checkWin()) {
        gameStatus.innerText = `${currentPlayer} wins!`;
        showWinnerPopup(`${currentPlayer} wins!`);
        gameActive = false;
    } else if (checkDraw()) {
        gameStatus.innerText = 'Draw!';
        showWinnerPopup('Draw!');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.innerText = `It's ${currentPlayer}'s turn`;
    }
};

const checkWin = () => {
    return winConditions.some(condition => {
        return condition.every(index => {
            return cells[index].innerText === currentPlayer;
        });
    });
};

const checkDraw = () => {
    return Array.from(cells).every(cell => {
        return cell.innerText !== '';
    });
};

const restartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.innerText = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerText = '';
    });
    hideWinnerPopup();
};

const showWinnerPopup = (message) => {
    winnerMessage.innerText = message;
    winnerPopup.style.display = 'flex';
};

const hideWinnerPopup = () => {
    winnerPopup.style.display = 'none';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
closeButton.addEventListener('click', hideWinnerPopup);

gameStatus.innerText = `It's ${currentPlayer}'s turn`;
