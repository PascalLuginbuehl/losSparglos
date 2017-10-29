"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Body = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require("./Vector");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Body class with basic parameters for positon and hitbox, it also provides a function for cehcking collision */
var Body = exports.Body = function () {
    function Body(positon, model) {
        _classCallCheck(this, Body);

        this.position = positon;
        this.model = model;
    }

    _createClass(Body, [{
        key: "checkCollision",
        value: function checkCollision(body) {
            var newPositon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.position;

            return this.model.checkCollision(body.position, newPositon, body.model);
        }
    }, {
        key: "render",
        value: function render(ctx) {
            var textureOrigin = this.model.textureOrigin;
            var textureSize = this.model.textureSize;
            ctx.drawImage(this.model.spriteSheet, textureOrigin.x, textureOrigin.y, textureSize.x, textureSize.y, this.position.x, this.position.y, this.model.textureSize.x, this.model.textureSize.y);
        }
    }, {
        key: "getCollisionPosition",
        value: function getCollisionPosition(newPosition, newVelocity, collidedBody) {
            var returnPosition = new _Vector.V(newPosition.x, newPosition.y);
            var returnVelocity = new _Vector.V(newVelocity.x, newVelocity.y);
            if (this.checkCollision(collidedBody, new _Vector.V(newPosition.x, this.position.y))) {
                returnVelocity.x = 0;
                returnPosition.x = this.position.x;
            }
            if (this.checkCollision(collidedBody, new _Vector.V(this.position.x, newPosition.y))) {
                returnVelocity.y = 0;
                returnPosition.y = this.position.y;
            }
            if (returnPosition.x == newPosition.x && returnPosition.y == newPosition.y) {
                returnVelocity.x = 0;
                returnVelocity.y = 0;
                returnPosition.x = this.position.x;
                returnPosition.y = this.position.y;
            }
            return { position: returnPosition, velocity: returnVelocity };
        }
    }]);

    return Body;
}();
//# sourceMappingURL=Body.js.map