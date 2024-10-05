class SudokuSolver {

  isValidLength(puzzleString) {
    return puzzleString.length === 81;
  }

  isValidCharacters(puzzleString) {
    const regex = /^[1-9.]+$/;
    return regex.test(puzzleString);
  }

  validatePuzzle(puzzleString) {
    const rows = Array.from({ length: 9 }, () => new Set());
    const cols = Array.from({ length: 9 }, () => new Set());
    const regions = Array.from({ length: 9 }, () => new Set());
  
    for (let i = 0; i < 81; i++) {
      const char = puzzleString[i];
      if (char === ".") continue;
  
      const row = Math.floor(i / 9);
      const col = i % 9;
      const region = Math.floor(row / 3) * 3 + Math.floor(col / 3);
  
      // Check if the current number already exists in the row, column, or region
      if (rows[row].has(char) || cols[col].has(char) || regions[region].has(char)) {
        return false;
      }
  
      // Add the number to the appropriate sets
      rows[row].add(char);
      cols[col].add(char);
      regions[region].add(char);
    }
  
    return true;
  }

  // puzzleArray will be accessed as array[row][column]
  stringToArray(puzzleString) {
    let puzzleArray = [];
    for (let i = 0; i < 81; i += 9) {
      const row = puzzleString.slice(i, i + 9).split('');
      puzzleArray.push(row);
    }
    return puzzleArray;
  }

  arrayToString(puzzleArray) {
    return puzzleArray.flat().join('');
  }

  // For the "check" functions, rows and columns must be given as 0-index
  checkRowPlacement(puzzleArray, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleArray[row][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleArray, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleArray[i][column] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleArray, row, column, value) {
    const startRow = Math.floor(row / 3) * 3;
    const startColumn = Math.floor(column / 3) * 3;
    
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startColumn; j < startColumn + 3; j++) {
        if (puzzleArray[i][j] == value) {
          return false;
        }
      }
    }
    return true;
  }


  isValidPlacement(puzzleArray, row, column, value) {
    return (
      this.checkColPlacement(puzzleArray, row, column, value) && 
      this.checkRowPlacement(puzzleArray, row, column, value) && 
      this.checkRegionPlacement(puzzleArray, row, column, value)
    );
  }

  solve(puzzleString) {
    let sudokuGrid = this.stringToArray(puzzleString);

    const self = this;

    function findEmptyCell() {
      for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
              if (sudokuGrid[row][col] == ".") {
                  return [row, col];
              }
          }
      }
      return null;  // No empty cells, puzzle is solved
    }
    
    // Recursive function that attempts to solve the puzzle
    function solveRecursion() {
      const emptyCell = findEmptyCell();

      // If there's no empty cell, the puzzle is solved
      if (!emptyCell) {
          return true;
      }

      const [row, col] = emptyCell;

      // Try digits from 1 to 9 in the empty cell
      for (let value = 1; value <= 9; value++) {
          if (self.isValidPlacement(sudokuGrid, row, col, value)) {
              // Place the value if it's valid
              sudokuGrid[row][col] = value;

              // Recursively attempt to solve the rest of the grid
              if (solveRecursion()) {
                  return true;
              }

              // If solving fails, reset the cell (backtrack)
              sudokuGrid[row][col] = ".";
          }
      }

      return false;  // Trigger backtracking if no valid number is found
  }

  solveRecursion();
  return this.arrayToString(sudokuGrid);
  }
}

module.exports = SudokuSolver;

