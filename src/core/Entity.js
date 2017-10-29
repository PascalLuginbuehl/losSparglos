"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Entity = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Body2 = require("./Body");

var _Vector = require("./Vector");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bobbingCurve = 0;

var Entity = exports.Entity = function (_Body) {
    _inherits(Entity, _Body);

    function Entity(position, model) {
        var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _Vector.V(0, 0);
        var velocity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new _Vector.V(0, 0);

        _classCallCheck(this, Entity);

        var _this = _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).call(this, position, model));

        _this.velocity = velocity;
        _this.force = force;
        _this.lastOffset = 0;
        return _this;
    }

    _createClass(Entity, [{
        key: "render",
        value: function render(ctx) {
            var textureOrigin = this.model.textureOrigin;
            var textureSize = this.model.textureSize;
            var position = this.position;
            if (window.gameConfig.drawHitbox) {
                this.model.hitbox.drawHitbox(this.position, ctx);
            }
            if (this.model.isMovingSprite) {
                textureOrigin = new _Vector.V(textureOrigin.x + this.getSpriteOffset() * textureSize.x, textureOrigin.y);
            }
            // console.log(this.velocity)
            if (this.model.spriteBobbing) {
                if (this.velocity.x != 0 || this.velocity.y != 0 || Math.sin(bobbingCurve / 4) - 1 > -.95) {
                    var height = Math.sin(bobbingCurve / 4);
                    position = new _Vector.V(position.x, position.y - Math.round(height * 2.5) - 2.5);
                    bobbingCurve++;
                } else {
                    bobbingCurve = 0;
                }
            }
            // console.log( textureOrigin.x, textureOrigin.y, textureSize.x, textureSize.y, position.x, position.y, this.model.textureSize.x, this.model.textureSize.y)
            ctx.drawImage(this.model.spriteSheet, textureOrigin.x, textureOrigin.y, textureSize.x, textureSize.y, position.x, position.y, this.model.textureSize.x, this.model.textureSize.y);
        }
    }, {
        key: "getSpriteOffset",
        value: function getSpriteOffset() {
            var x = this.force.x,
                y = this.force.y;
            var offset = this.lastOffset;
            if (x > 0) {
                offset = 3;
            } else if (x < 0) {
                offset = 2;
            } else if (y < 0) {
                offset = 1;
            } else if (y > 0) {
                offset = 0;
            }
            this.lastOffset = offset;
            return offset;
        }
    }]);

    return Entity;
}(_Body2.Body);
//# sourceMappingURL=Entity.js.map