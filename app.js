// Set up game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

// Get DOM elements
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetButtonClick);

// Handle cell click events
function handleCellClick(e) {
  const cellIndex = e.target.id;

  // Return if cell is already filled or game is over
  if (board[cellIndex] || isGameOver()) return;

  // Update game state and UI
  board[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  // Check for winner and switch player
  if (isWinner()) {
    alert(`${currentPlayer} wins!`);
  } else if (isTie()) {
    alert(`It's a tie!`);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Handle reset button click events
function handleResetButtonClick() {
  // Reset game state and UI
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
}

// Check if there is a winner
function isWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombos.some(combo => {
    return combo.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

// Check if the game is a tie
function isTie() {
  return board.every(cell => {
    return cell !== '';
  });
}

// Check if the game is over
function isGameOver() {
  return isWinner() || isTie();
}
