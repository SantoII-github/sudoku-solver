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
      let regex = /^[A-I][1-9]$/;

      if (!req.body.puzzleString || !req.body.value || !req.body.coordinate) {
        res.json({ error: 'Required field(s) missing' });
        return;
      } else if (!solver.isValidCharacters(puzzleString)) {
        res.json({ error: 'Invalid characters in puzzle' });
        return;
      } else if (!solver.isValidLength(puzzleString)) {
        res.json({ error: 'Expected puzzle to be 81 characters long' })
        return;
      }


      if (regex.test(coordinate)) {
        row = coordinate[0].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        column = coordinate[1] - 1;
      } else {
        res.json({ "error": "Invalid coordinate" })
        return;
      }

      let puzzleGrid = solver.stringToArray(puzzleString);

      if (!solver.checkColPlacement(puzzleGrid, row, column, value)) {
        res.json({
          valid: false,
          conflict: "column"
        })
      } else if (!solver.checkRowPlacement(puzzleGrid, row, column, value)) {
        res.json({
          valid: false,
          conflict: "row"
        })
      } else if (!solver.checkRegionPlacement(puzzleGrid, row, column, value)) {
        res.json({
          valid: false,
          conflict: "region"
        })
      } else {
        res.json({ valid: true })
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
