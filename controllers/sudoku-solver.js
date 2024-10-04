class SudokuSolver {

  validate(puzzleString) {
    const regex = /^[1-9.]+$/;
    return (puzzleString.length === 81 && regex.test(puzzleString))
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

