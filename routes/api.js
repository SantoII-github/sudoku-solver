'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

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
      }
      
      let solution = solver.solve(puzzleString);
      res.json({solution});
    });
};
