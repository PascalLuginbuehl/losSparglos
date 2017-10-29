/** Class representing a point. */
export default class V {
  public x: number;
  public y: number;

  /**
   * Create a point.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   */
  constructor (x: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * adds x and y from other vector to this vector and returns a new Vector
   * @param  {V} vector Vector to add from
   * @return {V}        new Vector with result
   */
  add(vector: V): V {
    return new V((vector.x + this.x), (vector.y + this.y));
  }

  /**
   * subtracts x and y from other vector to this vector and returns a new Vector
   * @param  {V} vector Vector which subtracts
   * @return {V}        new Vector with result
   */
  subtract(vector: V): V {
    return new V((this.x - vector.x), (this.y - vector.y));
  }

  /**
   * scales x and y with a specific number and returns a new Vector
   * @param  {number} s [description]
   * @return {V}        [description]
   */
  scale(s: number): V {
    return new V((this.x * s), (this.y * s));
  }

  /**
   * returns the dot product of both vectors
   * @param  {V}      vector second vector
   * @return {number}        the dot product
   */
  dot(vector: V): number {
    return (this.x * vector.x + this.y * vector.y);
  }


  /**
   * returns the cross product of both vetors
   * @param  {V}      vector second vector
   * @return {number}        the cross product
   */
  cross(vector: V) {
    return (this.x * vector.y - this.y * vector.x);
  }

  /**
   * returns the smalest values of both vectors
   * @param  {V} vector other vector
   * @return {V}        vector with the smalest x and y coordinates
   */
  smalest(vector: V): V {
    let x = this.x < vector.x ? this.x : vector.x
      , y = this.y < vector.y ? this.y : vector.y;
    return new V(x, y);
  }


  /**
   * returns the smalest values of both vectors
   * @param  {V} vector other vector
   * @return {V}        vector with the smalest x and y coordinates
   */
  biggest(vector: V): V {
    let x = this.x > vector.x ? this.x : vector.x
      , y = this.y > vector.y ? this.y : vector.y;
    return new V(x, y);
  }

  /**
   * rotates the vector at the position of the specified vector with the provided
   * angle and returns vector with new positon
   * @param  {number} angle  the angle it should rotate
   * @param  {V}      vector the rotation vector
   * @return {V}             the roated vector
   */
  rotate(angle: number, vector: V): V {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    let x_prime = vector.x + ((x * Math.cos(angle)) - (y * Math.sin(angle)));
    let y_prime = vector.y + ((x * Math.sin(angle)) + (y * Math.cos(angle)));

    return new V(x_prime, y_prime);
  }


  public round(): V {
    return new V(this.x > 0 ? Math.floor(this.x) : Math.ceil(this.x), this.y > 0 ? Math.floor(this.y) : Math.ceil(this.y));
  }


  public equal(v: V): boolean {
    return (this.x == v.x && this.y == v.y);
  }
}
