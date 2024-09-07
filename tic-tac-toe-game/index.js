const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restartBtn");
const statusText = document.getElementById("statusText");
const changeModeBtn = document.getElementById("darkMode");
const changeStyle = document.getElementById("themeStyleSheet");
changeModeBtn.addEventListener("click", changeModeCSS);

let currentPlayer = "X";
let options = ["", "", "", "", "", "", "", "", ""];
let running = false;
let mode = "light";
const winningOption = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

initializeGame();

function initializeGame() {
  cells.forEach((c) => c.addEventListener("click", optionClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.innerText = `Player ${currentPlayer} chance`;
  running = !running;
}

function optionClicked() {
  const optionClicked = this.getAttribute("cellNumber");
  if (options[optionClicked] !== "" || !running) return;
  options[optionClicked] = currentPlayer;

  this.innerText = currentPlayer;
  const result = checkWon();
  if (result) {
    statusText.innerText = `Player ${currentPlayer} wins.`;
    running = !running;
  } else {
    const optionsLeft = options?.filter((o) => o === "");
    if (optionsLeft.length === 0) {
      statusText.innerText = "Match drawn!";
      running = !running;
      return;
    }
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    statusText.innerText = `Player ${currentPlayer} chance`;
  }
}

function restartGame() {
  // 1. Unoptimised way page reloads --> window.location.reload();
  cells.forEach((c) => (c.innerText = ""));
  options = ["", "", "", "", "", "", "", "", ""];
  running = !running;
  currentPlayer = "X";
  statusText.innerText = `Player ${currentPlayer} chance`;
}

function checkWon() {
  for (let i = 0; i < winningOption.length; i++) {
    const winPosition = winningOption[i];
    if (
      options[winPosition[0]] === currentPlayer &&
      options[winPosition[1]] === currentPlayer &&
      options[winPosition[2]] === currentPlayer
    ) {
      return true;
    }
  }
}

function changeModeCSS() {
  if (mode === "light") {
    mode = "dark";
    changeStyle.setAttribute("href", "styledark.css");
    this.innerHTML = '<i class="ri-moon-fill"></i>';
  } else {
    mode = "light";
    changeStyle.setAttribute("href", "style.css");
    this.innerHTML = '<i class="ri-moon-line"></i>';
  }
}
