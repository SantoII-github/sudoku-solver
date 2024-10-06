const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
let solver = new Solver;

suite('Unit Tests', () => {
    suite("Sudoku Solver functions", () => {
        test("Valid Puzzle string of 81 characters", (done) => {
            let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.isTrue(solver.isValidLength(puzzleString));
            done();
        });

        test("Puzzle string with invalid characters", (done) => {
            let puzzleString = '..??.5.1.hi.4....2ff2..re..1...69.83.9.....6.6test...9......1945....4.37.4.3..6..';
            assert.isFalse(solver.isValidCharacters(puzzleString));
            done();
        });

        test("Puzzle string not 81 characters in length", (done) => {
            let puzzleString_short = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......19..';
            let puzzleString_long = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6....45';
            assert.isFalse(solver.isValidLength(puzzleString_short));
            assert.isFalse(solver.isValidLength(puzzleString_long));
            done();
        });

        test("Valid row placement", (done) => {
            let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let puzzleGrid = solver.stringToArray(puzzleString)
            assert.isTrue(solver.checkRowPlacement(puzzleGrid, 0, 0, 3));
            done();
        });
        
        test("Invalid row placement", (done) => {
            let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let puzzleGrid = solver.stringToArray(puzzleString)
            assert.isFalse(solver.checkRowPlacement(puzzleGrid, 0, 0, 9));
            done();
        });

        test("Valid column placement", (done) => {
            let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let puzzleGrid = solver.stringToArray(puzzleString)
            assert.isTrue(solver.checkColPlacement(puzzleGrid, 0, 0, 9));
            done();
        });
        
        test("Invalid column placement", (done) => {
            let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let puzzleGrid = solver.stringToArray(puzzleString)
            assert.isFalse(solver.checkColPlacement(puzzleGrid, 0, 0, 8));
            done();
        });

        test("Valid region placement", (done) => {
            let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let puzzleGrid = solver.stringToArray(puzzleString)
            assert.isTrue(solver.checkRegionPlacement(puzzleGrid, 0, 0, 1));
            done();
        });
        
        test("Invalid region placement", (done) => {
            let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let puzzleGrid = solver.stringToArray(puzzleString)
            assert.isFalse(solver.checkRegionPlacement(puzzleGrid, 0, 0, 8));
            done();
        });

        test("Valid puzzle strings pass the solver", (done) => {
            puzzlesAndSolutions.forEach(element => {
                assert.isTrue(solver.validatePuzzle(element[0]));
                assert.equal(solver.solve(element[0]), element[1]);    
            });
            done();
        });

        test("Invalid puzzle strings fail the solver", (done) => {
            let puzzleString = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.isFalse(solver.validatePuzzle(puzzleString));
            done();
        });

        test("Solver returns the expected solution for an incomplete puzzle", (done) => {
            let puzzleString = '.....5.1.85.4....2432......1...6..83.9.....6.62.71...9......1.4.....4.37.4.3..6..';
            let puzzleSolution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
            assert.isTrue(solver.validatePuzzle(puzzleString));
            assert.equal(solver.solve(puzzleString), puzzleSolution);
            done();
        });
    });
});
