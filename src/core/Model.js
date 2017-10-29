'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = exports.Model = function () {
    function Model(hitbox, textureOrigin, textureSize, spriteSheetPath) {
        var isMovingSprite = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var spriteBobbing = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        _classCallCheck(this, Model);

        this.hitbox = hitbox;
        this.textureSize = textureSize;
        this.textureOrigin = textureOrigin;
        this.spriteSheetPath = spriteSheetPath;
        this.isMovingSprite = isMovingSprite;
        this.spriteBobbing = spriteBobbing;
    }

    _createClass(Model, [{
        key: 'checkCollision',
        value: function checkCollision(origin, originHitbox, model) {
            return this.hitbox.checkCollision(origin, originHitbox, model.hitbox);
        }
    }, {
        key: 'preloadImage',
        value: function preloadImage() {
            var texture = new Image();
            texture.src = this.spriteSheetPath;
            this.spriteSheet = texture;
            return new Promise(function (resolve, reject) {
                texture.addEventListener('load', function () {
                    resolve();
                });
            });
        }
    }]);

    return Model;
}();
//# sourceMappingURL=Model.js.map