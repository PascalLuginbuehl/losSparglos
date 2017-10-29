"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rectangle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require("./Vector");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = exports.Rectangle = function () {
    function Rectangle(min, max) {
        _classCallCheck(this, Rectangle);

        if (min instanceof _Vector.V) {
            this.min = min;
            this.max = max;
        } else {
            var rect = min;
            this.min = new _Vector.V(rect.min);
            this.max = new _Vector.V(rect.max);
        }
    }

    _createClass(Rectangle, [{
        key: "checkCollision",
        value: function checkCollision(rect) {
            var rectMin = rect.min;
            var thisMin = this.min;
            if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
                return true;
            }
            return false;
        }
    }, {
        key: "drawRectangle",
        value: function drawRectangle(origin, ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
            ctx.fillRect(origin.x + this.min.x, origin.y + this.min.y, this.max.x, this.max.y);
            ctx.fill();
        }
    }]);

    return Rectangle;
}();
//# sourceMappingURL=Rectangle.js.map