'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      let value = req.body.value;
      let coordinate = req.body.coordinate;
      let row, column;
      let coordRegex = /^[A-I][1-9]$/;
      let valueRegex = /^[1-9]$/

      if (!req.body.puzzle || !req.body.value || !req.body.coordinate) {
        res.json({ error: 'Required field(s) missing' });
        return;
      } else if (!solver.isValidCharacters(puzzleString)) {
        res.json({ error: 'Invalid characters in puzzle' });
        return;
      } else if (!solver.isValidLength(puzzleString)) {
        res.json({ error: 'Expected puzzle to be 81 characters long' })
        return;
      }

      if (!valueRegex.test(value)) {
        res.json({ error: 'Invalid value'})
        return;
      } else if (!coordRegex.test(coordinate)) {
        res.json({ "error": "Invalid coordinate" })
        return;
      } else {
        row = coordinate[0].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        column = coordinate[1] - 1;
      }

      let puzzleGrid = solver.stringToArray(puzzleString);
      let conflict = [];
      if (puzzleGrid[row][column] == value) {
        puzzleGrid[row][column] = ".";
      }
      if (!solver.checkRowPlacement(puzzleGrid, row, column, value)) {
          conflict.push("row")
      }
      if (!solver.checkColPlacement(puzzleGrid, row, column, value)) {
        conflict.push("column")
      } 
      if (!solver.checkRegionPlacement(puzzleGrid, row, column, value)) {
        conflict.push("region")
      }

      if (conflict.length === 0) {
        res.json({ valid: true })
      } else {
        res.json({ valid: false, conflict})
      } 

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;

      if (!puzzleString) {
        res.json({ error: 'Required field missing' });
        return;
      } else if (!solver.isValidCharacters(puzzleString)) {
        res.json({ error: 'Invalid characters in puzzle' });
        return;
      } else if (!solver.isValidLength(puzzleString)) {
        res.json({ error: 'Expected puzzle to be 81 characters long' })
        return;
      } else if (!solver.validatePuzzle(puzzleString)) {
        res.json({ error: 'Puzzle cannot be solved' })
        return;
      }
      
      let solution = solver.solve(puzzleString);
      res.json({solution});
    });
};
