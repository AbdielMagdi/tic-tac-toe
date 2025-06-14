// DOM hooks
const boardEl   = document.getElementById("board");
const statusEl  = document.getElementById("status");
const resetBtn  = document.getElementById("reset");
const scoreXEl  = document.getElementById("scoreX");
const scoreOEl  = document.getElementById("scoreO");

// game state
let cells,           // NodeList of .cell elements
    state,           // array of 9 strings  ("", "X", or "O")
    currentPlayer,   // "X" | "O"
    active;          // game running?

let scores = {X:0,O:0};

// winning patterns
const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

/* ----------  initialise / reset board  ---------- */
function init(){
  // clear previous grid
  boardEl.innerHTML="";
  // create 9 cells
  for(let i=0;i<9;i++){
    const cell=document.createElement("div");
    cell.className="cell";
    cell.dataset.index=i;
    cell.addEventListener("click",handleMove);
    boardEl.appendChild(cell);
  }
  // cache NodeList after creation
  cells=document.querySelectorAll(".cell");
  // set initial state
  state=Array(9).fill("");
  currentPlayer="X";
  active=true;
  statusEl.textContent="X's Move";
}

function handleMove(e){
  const idx = +e.target.dataset.index;
  if (!active || state[idx]) return;

  state[idx] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    active = false;
    scores[currentPlayer]++;
    updateScoreboard();
    showModal(`🎉 ${currentPlayer} Wins!`);
    return;
  }

  if (state.every(c => c)) {
    active = false;
    showModal("🤝 It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `${currentPlayer}'s Move`;
}



/* ----------  detect winning pattern  ---------- */
function checkWin(){
  return wins.some(p=>{
    const [a,b,c]=p;
    return state[a]&&state[a]===state[b]&&state[a]===state[c];
  });
}

/* ----------  update scoreboard  ---------- */
function updateScoreboard(){
  scoreXEl.textContent=scores.X;
  scoreOEl.textContent=scores.O;
}

/* ----------  reset button  ---------- */
resetBtn.addEventListener("click",()=>{
  scores={X:0,O:0};
  updateScoreboard();
  init();
});

/* ----------  bootstrap  ---------- */
init();
const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modal-message");
const nextBtn = document.getElementById("nextRoundBtn");

function showModal(message) {
  modalMsg.textContent = message;
  modal.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  init(); // start next round
});
