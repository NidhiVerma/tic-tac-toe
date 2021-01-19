const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn;
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("#board");
const winningMessageElement = document.querySelector(".winning-message");
const dataWinningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.querySelector("#restartButton");
restartButton.addEventListener("click", handleRestart);

// start game
startGame();

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    // once: true will restrict eventListener restrict to trigger only once
    cell.addEventListener("click", handleClick, { once: true });
  });
  //  set board hover state
  setBoardHoverClass();
}

// event listener for cell click
function handleClick(e) {
  const cell = e.target; // get clicked cell reference
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    console.log("winner");
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
  setBoardHoverClass();

  console.log("clicked");
}

// place cell marker
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// swap player turn
function swapTurns() {
  circleTurn = !circleTurn;
}

// change board hover state
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

//  check if there's a winning combination
function checkWin(currentClass) {
  return WINNING_COMBOS.some((combo) => {
    // at least one combo exists for which the inner function returns true
    return combo.every((index) => {
      // every combo element has same class
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// check if there's a draw
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// function to end game
function endGame(draw) {
  if (draw) {
    dataWinningMessageText.innerText = "Draw!";
  } else {
    let winningPlayer = circleTurn ? "O" : "X";
    dataWinningMessageText.innerText = `${winningPlayer} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

// restart button event listener
function handleRestart(e) {
  console.log("Restart Game");
  winningMessageElement.classList.remove("show");
  clearBoard();
  startGame();
}

// clear board for new game
function clearBoard() {
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
  });
}
