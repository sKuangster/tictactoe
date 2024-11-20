let grid = document.getElementById("grid");
const size = 9;  // Grid size (3x3, can be adjusted)
const lengthAndWidth = Math.sqrt(size); // Calculate the grid dimensions (should be 3x3 for a 9-cell game)
const idTwoDArray = [];  // Array to store positions for rows and columns
const markedTwoDArray = [];  // Array to store marked positions

let player1 = "O";
let player2 = "X";
let currentPlayer = player1;

function initializeBoard() {
    grid.innerHTML = '';

    for (let i = 0; i < lengthAndWidth; i++) {
        idTwoDArray[i] = [];
        markedTwoDArray[i] = [];
        for (let j = 0; j < lengthAndWidth; j++) {
            const button = document.createElement("button");
            const id = `btn-${i}-${j}`;
            button.id = id;
            button.classList.add("select-none", "border", "bg-blue-200", "text-2xl", "font-bold", "hover:bg-blue-300", "w-16", "h-16");

            idTwoDArray[i][j] = { id, row: i, col: j };

            markedTwoDArray[i][j] = 0;

            button.addEventListener("click", function () {
                if (!checkIfMarked(i, j)) {
                    markCell(i, j);
                    checkVictory(i, j);
                    switchPlayer();
                }
            });

            grid.appendChild(button);
        }
    }
}

function checkIfMarked(row, col) {
    return markedTwoDArray[row][col] !== 0;
}

function markCell(row, col) {
    markedTwoDArray[row][col] = currentPlayer;
    const button = document.getElementById(`btn-${row}-${col}`);
    button.textContent = currentPlayer;
}

function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1; // Switch to the next player
}

function resetGame() {
    for (let i = 0; i < lengthAndWidth; i++) {
        for (let j = 0; j < lengthAndWidth; j++) {
            markedTwoDArray[i][j] = 0;
        }
    }
    grid.innerHTML = ""
    initializeBoard();
}

function checkVictory(row, col) {
    if (checkRow(row) || checkColumn(col) || checkDiagonal()) {
        grid.innerHTML = ""
        const button = document.createElement("button")
        button.setAttribute("type", "button")
        button.classList = "col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center inline-flex justify-center"
        button.textContent = "Play Again?"
        grid.appendChild(button)
        button.addEventListener("click", function()
        {
            resetGame();
        })
    }
}

function checkRow(row) {
    for (let col = 0; col < lengthAndWidth; col++) {
        if (markedTwoDArray[row][col] !== currentPlayer) {
            return false;
        }
    }
    return true; // All cells in the row are marked by the current player
}

function checkColumn(col) {
    for (let row = 0; row < lengthAndWidth; row++) {
        if (markedTwoDArray[row][col] !== currentPlayer) {
            return false;
        }
    }
    return true; // All cells in the column are marked by the current player
}

function checkDiagonal() {
    // Check the main diagonal
    let mainDiagonal = true;
    for (let i = 0; i < lengthAndWidth; i++) {
        if (markedTwoDArray[i][i] !== currentPlayer) {
            mainDiagonal = false;
            break;
        }
    }

    // Check the anti-diagonal
    let antiDiagonal = true;
    for (let i = 0; i < lengthAndWidth; i++) {
        if (markedTwoDArray[i][lengthAndWidth - 1 - i] !== currentPlayer) {
            antiDiagonal = false;
            break;
        }
    }

    return mainDiagonal || antiDiagonal; // If any diagonal is fully marked, return true
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function () {
    resetGame(); // Reset the game when the reset button is clicked
});

initializeBoard(); // Initialize the board on page load
