class SudokuSolver {

  isValidLength(puzzleString) {
    return puzzleString.length === 81;
  }

  isValidCharacters(puzzleString) {
    const regex = /^[1-9.]+$/;
    return regex.test(puzzleString);
  }

  validate(puzzleString) {
    return ( this.isValidLength(puzzleString) && this.isValidCharacters(puzzleString) );
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
      for (let j = startColumn; j < startColumn + 3; i++) {
        if (puzzleArray[i][j] == value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

