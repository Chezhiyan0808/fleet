let expect    = require("chai").expect;
let utils = require("../utils/misc");


describe("Fibonacci Series Generator", function() {
    describe("series with only prime numbers", function() {
        it("positive scenario", function() {
            let series = utils.generateFibanocciSeries(10, true)
            expect(series).to.deep.equal(["1","1","2","3","5","13","89","233","1597","28657"]);
        });
        it("negative scenario", function() {
            let series = utils.generateFibanocciSeries(10, true)
            expect(series).to.deep.not.equal(["1","1","2","3","5","8","13","21","34","54"]);
        });
    });

    describe("series contains all numbers", function() {
        it("positive scenario", function() {
            let series = utils.generateFibanocciSeries(10, false)
            expect(series).to.deep.equal(["1","1","2","3","5","8","13","21","34","55"]);
        });
        it("negative scenario", function() {
            let series = utils.generateFibanocciSeries(10, false)
            expect(series).to.deep.not.equal(["1","1","2","3","5","8","13","21","34","54"]);
        });
    });
});