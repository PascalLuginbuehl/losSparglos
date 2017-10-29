"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing a point. */
var V = exports.V = function () {
    /**
     * Create a point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    function V(x, y) {
        _classCallCheck(this, V);

        if (typeof x == "number") {
            this.x = Math.round(x * 10) / 10;
            this.y = Math.round(y * 10) / 10;
        } else {
            var vector = x;
            this.x = Math.round(vector.x * 10) / 10;
            this.y = Math.round(vector.y * 10) / 10;
        }
    }
    /**
     * adds x and y from other vector to this vector and returns a new Vector
     * @param  {V} vector Vector to add from
     * @return {V}        new Vector with result
     */


    _createClass(V, [{
        key: "add",
        value: function add(vector) {
            return new V(Math.round((vector.x + this.x) * 10) / 10, Math.round((vector.y + this.y) * 10) / 10);
        }
        /**
         * subtracts x and y from other vector to this vector and returns a new Vector
         * @param  {V} vector Vector which subtracts
         * @return {V}        new Vector with result
         */

    }, {
        key: "subtract",
        value: function subtract(vector) {
            return new V(Math.round((this.x - vector.x) * 10) / 10, Math.round((this.y - vector.y) * 10) / 10);
        }
        /**
         * scales x and y with a specific number and returns a new Vector
         * @param  {number} s [description]
         * @return {V}        [description]
         */

    }, {
        key: "scale",
        value: function scale(s) {
            return new V(Math.round(this.x * s * 10) / 10, Math.round(this.y * s * 10) / 10);
        }
        /**
         * returns the dot product of both vectors
         * @param  {V}      vector second vector
         * @return {number}        the dot product
         */

    }, {
        key: "dot",
        value: function dot(vector) {
            return this.x * vector.x + this.y * vector.y;
        }
        /**
         * returns the cross product of both vetors
         * @param  {V}      vector second vector
         * @return {number}        the cross product
         */

    }, {
        key: "cross",
        value: function cross(vector) {
            return this.x * vector.y - this.y * vector.x;
        }
        /**
         * returns the smalest values of both vectors
         * @param  {V} vector other vector
         * @return {V}        vector with the smalest x and y coordinates
         */

    }, {
        key: "smalest",
        value: function smalest(vector) {
            var x = this.x < vector.x ? this.x : vector.x,
                y = this.y < vector.y ? this.y : vector.y;
            return new V(x, y);
        }
        /**
         * returns the smalest values of both vectors
         * @param  {V} vector other vector
         * @return {V}        vector with the smalest x and y coordinates
         */

    }, {
        key: "biggest",
        value: function biggest(vector) {
            var x = this.x > vector.x ? this.x : vector.x,
                y = this.y > vector.y ? this.y : vector.y;
            return new V(x, y);
        }
        /**
         * rotates the vector at the position of the specified vector with the provided
         * angle and returns vector with new positon
         * @param  {number} angle  the angle it should rotate
         * @param  {V}      vector the rotation vector
         * @return {V}             the roated vector
         */

    }, {
        key: "rotate",
        value: function rotate(angle, vector) {
            var x = this.x - vector.x;
            var y = this.y - vector.y;
            var x_prime = vector.x + (x * Math.cos(angle) - y * Math.sin(angle));
            var y_prime = vector.y + (x * Math.sin(angle) + y * Math.cos(angle));
            return new V(x_prime, y_prime);
        }
    }, {
        key: "round",
        value: function round() {
            return new V(this.x > 0 ? Math.floor(this.x) : Math.ceil(this.x), this.y > 0 ? Math.floor(this.y) : Math.ceil(this.y));
        }
    }, {
        key: "equal",
        value: function equal(v) {
            return this.x == v.x && this.y == v.y;
        }
    }]);

    return V;
}();
//# sourceMappingURL=Vector.js.map