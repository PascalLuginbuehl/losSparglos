'use strict';

var _Rectangle = require('./../src/core/Rectangle');

var _Vector = require('./../src/core/Vector');

var _chai = require('chai');

var chai = _interopRequireWildcard(_chai);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Globals
 */
var expect = chai.expect;
/**
 * Unit tests
 */

/**
 * Module dependencies.
 */
// let chai = require('chai')
describe('Testing vector functions', function () {
    it('Velcotr addition', function (done) {
        expect(new _Rectangle.Rectangle(new _Vector.V(10, 10), new _Vector.V(10, 10)).checkCollision(new _Rectangle.Rectangle(new _Vector.V(0, 0), new _Vector.V(10, 10)))).to.not.equals(true);
        done();
    });
    it('Velcotr subtraction', function (done) {
        expect(new _Rectangle.Rectangle(new _Vector.V(10, 10), new _Vector.V(10, 10)).checkCollision(new _Rectangle.Rectangle(new _Vector.V(0, 0), new _Vector.V(10, 10)))).to.not.equals(true);
        done();
    });
    it('Scalling', function (done) {
        expect(new _Rectangle.Rectangle(new _Vector.V(10, 10), new _Vector.V(10, 10)).checkCollision(new _Rectangle.Rectangle(new _Vector.V(0, 0), new _Vector.V(10, 10)))).to.not.equals(true);
        done();
    });
    it('smalest', function (done) {
        expect(new _Rectangle.Rectangle(new _Vector.V(10, 10), new _Vector.V(10, 10)).checkCollision(new _Rectangle.Rectangle(new _Vector.V(0, 0), new _Vector.V(10, 10)))).to.not.equals(true);
        done();
    });
    it('biggest', function (done) {
        expect(new _Rectangle.Rectangle(new _Vector.V(10, 10), new _Vector.V(10, 10)).checkCollision(new _Rectangle.Rectangle(new _Vector.V(0, 0), new _Vector.V(10, 10)))).to.not.equals(true);
        done();
    });
    it('equal', function (done) {
        expect(new _Rectangle.Rectangle(new _Vector.V(10, 10), new _Vector.V(10, 10)).checkCollision(new _Rectangle.Rectangle(new _Vector.V(0, 0), new _Vector.V(10, 10)))).to.not.equals(true);
        done();
    });
});
//# sourceMappingURL=vectors.js.map