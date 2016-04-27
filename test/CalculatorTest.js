var assert = require('chai').assert;

var Calculator = require('./Calculator');

describe('Calculator', function () {
    describe('#add()', function () {
        it('should return 2 when adding 1 and 1', function () {
            for (var i = Math.pow(10, 8); i--;) {}
            assert.equal(2, Calculator.add(1, 1));
        });
    });

    describe('#sub()', function () {
        it('should return 2 when substracting 3 to 5', function () {
            assert.equal(2, Calculator.sub(5, 3));
        });
    });

    describe('#mul()', function () {
        describe('nested1', function () {
            it('should return 24 when multiplying 6 and 4', function () {
                for (var i = Math.pow(10, 9); i--;) {}
                assert.equal(24, Calculator.mul(6, 4));
            });
        });
        describe('nested2', function () {
            it('should return 0 when multiplying 6 and 0', function () {
                assert.equal(0, Calculator.mul(6, 0));
            });
        });
    });
    describe('#div()', function () {
        it('should return 4 when dividing 5 by 1', function () {
            assert.equal(4, Calculator.div(4, 1));
        });
        it('should return 2 when dividing 10 by 5', function () {
            for (var i = Math.pow(10, 8); i--;) {}
            assert.equal(2, Calculator.div(10, 5));
        });
        it('should return 1 when dividing 5 by 5', function () {
            for (var i = Math.pow(10, 8); i--;) {}
            assert.equal(1, Calculator.div(5, 5));
        });
    });
    describe('#lol()', function () {
        it('should say "lol"', function () {
            assert.equal('lol', 'lol');
        });
    });
});