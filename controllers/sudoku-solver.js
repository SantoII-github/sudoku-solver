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

