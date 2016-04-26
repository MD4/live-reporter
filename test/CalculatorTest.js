var assert = require('chai').assert;

var Calculator = require('./Calculator');

describe('Calculator', function () {
    describe('#add()', function () {
        it('should return 2 when adding 1 and 1', function () {
            assert.equal(2, Calculator.add(1, 1));
        });
    });
    describe('#sub()', function () {
        it('should return 2 when substracting 3 to 5', function () {
            assert.equal(2, Calculator.sub(5, 3));
        });
    });
    describe('#mul()', function () {
        it('should return 24 when multiplying 6 and 4', function () {
            assert.equal(24, Calculator.mul(6, 4));
        });
    });
    describe('#div()', function () {
        it('should return 2 when dividing 10 by 5', function () {
            assert.equal(2, Calculator.div(10, 5));
        });
    });
});