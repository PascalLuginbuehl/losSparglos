"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Hitbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require("./Vector");

var _Rectangle = require("./Rectangle");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hitbox = exports.Hitbox = function () {
    function Hitbox(rectangles) {
        _classCallCheck(this, Hitbox);

        this.rectangles = rectangles;
        this.collisionBox = this.getCollisionBox();
    }

    _createClass(Hitbox, [{
        key: "checkCollision",
        value: function checkCollision(origin, originHitbox, hitbox) {
            // unaccurate collisiondetection for performence reasons
            var collisionBox = new _Rectangle.Rectangle(this.collisionBox.min.add(originHitbox), this.collisionBox.max);
            var collisionBox2 = new _Rectangle.Rectangle(hitbox.collisionBox.min.add(origin), hitbox.collisionBox.max);
            if (collisionBox.checkCollision(collisionBox2)) {
                // accurate collisionsdetection
                for (var i = 0; i < this.rectangles.length; i++) {
                    for (var o = 0; o < hitbox.rectangles.length; o++) {
                        var otherRect = hitbox.rectangles[o];
                        var thisRect = this.rectangles[i];
                        var rect = new _Rectangle.Rectangle(thisRect.min.add(originHitbox), thisRect.max);
                        var rect2 = new _Rectangle.Rectangle(otherRect.min.add(origin), otherRect.max);
                        if (rect.checkCollision(rect2)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }, {
        key: "getCollisionBox",
        value: function getCollisionBox() {
            var max = new _Vector.V(0, 0);
            for (var i = 0; i < this.rectangles.length; i++) {
                var hitbox = this.rectangles[i];
                max = max.biggest(hitbox.min.add(hitbox.max));
            }
            var min = new _Vector.V(max.x, max.y);
            for (var _i = 0; _i < this.rectangles.length; _i++) {
                min = min.smalest(this.rectangles[_i].min);
            }
            return new _Rectangle.Rectangle(min, max);
        }
    }, {
        key: "drawHitbox",
        value: function drawHitbox(origin, ctx) {
            for (var i = 0; i < this.rectangles.length; i++) {
                this.rectangles[i].drawRectangle(origin, ctx);
            }
        }
    }]);

    return Hitbox;
}();
//# sourceMappingURL=Hitbox.js.map