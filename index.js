/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 *
 * Winner has to be decided and has to be flashed
 *
 * Extra points will be given for the Creativity
 *
 * Use of Google is not encouraged
 *
 */
let grid = [];
const GRID_LENGTH = 3;
let turn = "X";

function initializeGrid() {
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    const tempArray = [];
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      tempArray.push(0);
    }
    grid.push(tempArray);
  }
}

function getRowBoxes(colIdx) {
  let rowDivs = "";

  for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
    let additionalClass = "darkBackground";
    let content = "";
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      additionalClass = "lightBackground";
    }
    const gridValue = grid[colIdx][rowIdx];
    if (gridValue === 1) {
      content = '<span class="cross">X</span>';
    } else if (gridValue === 2) {
      content = '<span class="cross">O</span>';
    }
    rowDivs =
      rowDivs +
      '<div colIdx="' +
      colIdx +
      '" rowIdx="' +
      rowIdx +
      '" class="box ' +
      additionalClass +
      '">' +
      content +
      "</div>";
  }
  return rowDivs;
}

function getColumns() {
  let columnDivs = "";
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    let coldiv = getRowBoxes(colIdx);
    coldiv = '<div class="rowStyle">' + coldiv + "</div>";
    columnDivs = columnDivs + coldiv;
  }
  return columnDivs;
}

function renderMainGrid() {
  const parent = document.getElementById("grid");
  const columnDivs = getColumns();
  parent.innerHTML = '<div class="columnsStyle">' + columnDivs + "</div>";
}

function checkRows() {
  for (let i = 0; i < GRID_LENGTH; i++) {
    let win1 = 0;
    let win2 = 0;
    for (let j = 0; j < GRID_LENGTH; j++) {
      if (grid[i][j] === 1) {
        win1++;
      } else if (grid[i][j] === 2) {
        win2++;
      }
    }
    if (win1 === 3) {
      setGameWon(1);
    }
    if (win2 === 3) {
      setGameWon(2);
    }
  }
}

function checkColumns() {
  for (let i = 0; i < GRID_LENGTH; i++) {
    let win1 = 0;
    let win2 = 0;
    for (let j = 0; j < GRID_LENGTH; j++) {
      if (grid[j][i] === 1) {
        win1++;
      } else if (grid[j][i] === 2) {
        win2++;
      }
    }
    if (win1 === 3) {
      setGameWon(1);
    }
    if (win2 === 3) {
      setGameWon(2);
    }
  }
}

function checkDiagonals() {
  let win1 = 0;
  let win2 = 0;
  for (let i = 0; i < GRID_LENGTH; i++) {
    if (grid[i][i] === 1) {
      win1++;
    } else if (grid[i][i] === 2) {
      win2++;
    }
    if (win1 === 3) {
      setGameWon(1);
    }
    if (win2 === 3) {
      setGameWon(2);
    }
  }

  win1 = 0;
  win2 = 0;
  for (let i = 0; i < GRID_LENGTH; i++) {
    let j = GRID_LENGTH - 1 - i;
    if (grid[i][j] === 1) {
      win1++;
    } else if (grid[i][j] === 2) {
      win2++;
    }
    if (win1 === 3) {
      setGameWon(1);
    }
    if (win2 === 3) {
      setGameWon(2);
    }
  }
}

function isGameWon() {
  checkRows();
  checkColumns();
  checkDiagonals();
}

function setGameWon(player) {
  const parent = document.getElementById("grid");
  let winner = "";
  if (player === 1) {
    winner = "You";
  } else {
    winner = "Computer";
  }
  parent.innerHTML = `<div class="columnsStyle"><h3>${winner} Won !!!</h3><button onclick="resetGame()">Reset</button></div>`;
  let infoDiv = document.getElementById("infoDiv");
  infoDiv.style.display = "none";
}

function computerClick() {
  var rowIdx = Math.floor(Math.random() * 3);
  var colIdx = Math.floor(Math.random() * 3);
  if (grid[colIdx][rowIdx] === 0) {
    let newValue = 2;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    isGameWon();
  } else {
    computerClick();
  }
}

function onBoxClick() {
  var rowIdx = this.getAttribute("rowIdx");
  var colIdx = this.getAttribute("colIdx");
  let newValue = 1;
  grid[colIdx][rowIdx] = newValue;
  renderMainGrid();
  addClickHandlers();
  isGameWon();
  setTimeout(function() {
    computerClick();
  }, 400);
}

function addClickHandlers() {
  var boxes = document.getElementsByClassName("box");
  for (var idx = 0; idx < boxes.length; idx++) {
    boxes[idx].addEventListener("click", onBoxClick, false);
  }
}

function resetGame() {
  grid = [];
  initializeGrid();
  renderMainGrid();
  addClickHandlers();
  let infoDiv = document.getElementById("infoDiv");
  infoDiv.style.display = "flex";
}

resetGame();
