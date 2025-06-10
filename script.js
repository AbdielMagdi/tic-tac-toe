const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Create grid
function initBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = `${currentPlayer}'s Move`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    gameActive = false;
    scores[currentPlayer]++;
    updateScores();
    setTimeout(() => {
      alert(`🎉 Player ${currentPlayer} Wins!`);
      initBoard();
    }, 100);
    return;
  }

  if (!gameState.includes("")) {
    gameActive = false;
    setTimeout(() => {
      alert("It's a draw!");
      initBoard();
    }, 100);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s Move`;
}

// Check winning condition
function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c];
  });
}

// Reset scores
function resetGame() {
  scores = { X: 0, O: 0 };
  updateScores();
  currentPlayer = "X";
  initBoard();
}

// Update score table
function updateScores() {
  scoreX.textContent = scores["X"];
  scoreO.textContent = scores["O"];
}

resetButton.addEventListener("click", resetGame);
initBoard();
