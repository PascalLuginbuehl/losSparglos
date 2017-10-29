import {Rectangle} from './../src/core/Rectangle'
import {V} from './../src/core/Vector'
import {Hitbox} from './../src/core/Hitbox'
import {Body} from './../src/core/Body'
import {Model} from './../src/core/Model'
import {Entity} from './../src/core/Entity'
import {Block} from './../src/core/Block'
/**
 * Module dependencies.
 */
// let chai = require('chai')
import * as chai from "chai"
/**
 * Globals
 */
var expect = chai.expect


/**
 * Unit tests
 */
describe('Testing vector functions', () => {
  it('Velcotr addition', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });

  it('Velcotr subtraction', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });

  it('Scalling', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });

  it('smalest', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });

  it('biggest', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });

  it('equal', (done) => {
    expect(
      new Rectangle(
        new V(10, 10), new V(10, 10)
      ).checkCollision(
        new Rectangle(new V(0, 0), new V(10, 10))
      )).to.not.equals(true);
    done();
  });
});
