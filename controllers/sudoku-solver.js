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

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

