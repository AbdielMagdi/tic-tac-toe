const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopupBtn = document.getElementById('close-popup');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

// Winning combos
const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Create the board dynamically
function createBoard() {
  board.innerHTML = '';
  gameState.fill(null);
  gameActive = true;
  currentPlayer = 'X';

  for(let i=0; i<9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || gameState[index]) return; // Ignore if game over or cell taken

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    gameActive = false;
    showPopup(`🎉 Player ${currentPlayer} wins!`);
    return;
  }

  if (gameState.every(cell => cell)) {
    gameActive = false;
    showPopup(`🤝 It's a draw!`);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check if current player won
function checkWin() {
  return winConditions.some(condition => {
    return condition.every(i => gameState[i] === currentPlayer);
  });
}

// Show popup message
function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove('hidden');
}

// Hide popup
function hidePopup() {
  popup.classList.add('hidden');
}

// Restart the game
function restartGame() {
  hidePopup();
  createBoard();
}

// Event listeners
restartBtn.addEventListener('click', restartGame);
closePopupBtn.addEventListener('click', hidePopup);

// Initialize
createBoard();
