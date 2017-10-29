const Rectangle = require('./../src/core/Rectangle').Rectangle, V = require('./../src/core/Vector').V, Hitbox = require('./../src/core/Hitbox').Hitbox, Body = require('./../src/core/Hitbox').Body, Model = require('./../src/core/Hitbox').Model, Entity = require('./../src/core/Hitbox').Entity, Block = require('./../src/core/Hitbox').Block;
/**
 * Module dependencies.
 */
require('chai');
/**
 * Globals
 */
var expect = chai.expect;
/**
 * Unit tests
 */
describe('Testing vector functions', () => {
    it('Velcotr addition', (done) => {
        expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
        done();
    });
    it('Velcotr subtraction', (done) => {
        expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
        done();
    });
    it('Scalling', (done) => {
        expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
        done();
    });
    it('smalest', (done) => {
        expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
        done();
    });
    it('biggest', (done) => {
        expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
        done();
    });
    it('equal', (done) => {
        expect(new Rectangle(new V(10, 10), new V(10, 10)).checkCollision(new Rectangle(new V(0, 0), new V(10, 10)))).to.not.equals(true);
        done();
    });
});
//# sourceMappingURL=vectors.js.map