const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite("/api/solve route", () => {
        test("Solve a puzzle with valid puzzle string", (done) => {
            let testData = {
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            }
            let expectedSolution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
    
            chai
              .request(server)
              .post('/api/solve')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.solution, expectedSolution);
              })
            done();
        });

        test("Solve a puzzle with missing puzzle string", (done) => {
            let testData = {}
    
            chai
              .request(server)
              .post('/api/solve')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field missing');
              })
            done();
        });

        test("Solve a puzzle with invalid characters", (done) => {
            let testData = {
                puzzle: '???fe/x!sol.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            }
    
            chai
              .request(server)
              .post('/api/solve')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid characters in puzzle');
              })
            done();
        });

        test("Solve a puzzle with incorrect length", (done) => {
            let testData = {
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3.'
            }
    
            chai
              .request(server)
              .post('/api/solve')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
              })
            done();
        });

        test("Solve a puzzle that cannot be solved", (done) => {
            let testData = {
                puzzle: '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            }
    
            chai
              .request(server)
              .post('/api/solve')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Puzzle cannot be solved');
              })
            done();
        });
    });

    suite("/api/check route", () => {
        test("Check a puzzle placement with all fields", (done) => {
            let testData = {
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1', 
                value: 7
            }
    
            chai
              .request(server)
              .post('/api/check')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isTrue(res.body.valid);
              })
            done();
        });

        test("Check a puzzle placement with single placement conflict", (done) => {
            let testData = {
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1', 
                value: 6
            }
    
            chai
              .request(server)
              .post('/api/check')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isFalse(res.body.valid);
                assert.equal(res.body.conflict.length, 1);
                assert.include(res.body.conflict, 'column');
              })
            done();
        });

        test("Check a puzzle placement with multiple placement conflicts", (done) => {
            let testData = {
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1', 
                value: 9
            }
    
            chai
              .request(server)
              .post('/api/check')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isFalse(res.body.valid);
                assert.equal(res.body.conflict.length, 2);
                assert.include(res.body.conflict, 'row');
                assert.include(res.body.conflict, 'region');
              })
            done();
        });

        test("Check a puzzle placement with all placement conflicts", (done) => {
            let testData = {
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1', 
                value: 5
            }
    
            chai
              .request(server)
              .post('/api/check')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isFalse(res.body.valid);
                assert.equal(res.body.conflict.length, 3);
                assert.include(res.body.conflict, 'row');
                assert.include(res.body.conflict, 'column');
                assert.include(res.body.conflict, 'region');
              })
            done();
        });

        test("Check a puzzle placement with missing required fields", (done) => {
            let testData = {
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                value: 5
            }
    
            chai
              .request(server)
              .post('/api/check')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field(s) missing');
              })
            done();
        });

        test("Check a puzzle placement with invalid characters", (done) => {
            let testData = {
                puzzle: '???fe/x!sol.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: 5
            }
    
            chai
              .request(server)
              .post('/api/check')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid characters in puzzle');
              })
            done();
        });

        test("Check a puzzle placement with incorrect length", (done) => {
            let testData = {
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945',
                coordinate: 'A1',
                value: 5
            }
    
            chai
              .request(server)
              .post('/api/check')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
              })
            done();
        });

        test("Check a puzzle placement with invalid placement coordinate", (done) => {
            let testData = {
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: '27',
                value: 5
            }
    
            chai
              .request(server)
              .post('/api/check')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid coordinate');
              })
            done();
        });

        test("Check a puzzle placement with invalid placement coordinate", (done) => {
            let testData = {
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'A1',
                value: 95
            }
    
            chai
              .request(server)
              .post('/api/check')
              .send(testData)
              .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid value');
              })
            done();
        });
    });
});

