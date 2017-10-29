'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Render = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debugConsole = require('./debugConsole');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Render = exports.Render = function () {
    function Render(canvas, game) {
        var _this = this;

        _classCallCheck(this, Render);

        this.canvas = canvas;
        var ctx = this.canvas.getContext('2d');
        this.ctx = ctx;
        this.game = game;
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
        window.addEventListener('resize', function () {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;
        });
        this.mapCanvas = document.createElement('canvas');
        this.mapCanvas.height = this.game.mapSize.x;
        this.mapCanvas.width = this.game.mapSize.y;
        this.mapCtx = this.mapCanvas.getContext('2d');
        // Preload images images
        Promise.all(Object.keys(this.game.models).map(function (e) {
            return _this.game.models[e].preloadImage();
        })).then(function () {
            _this.mapCtx.rect(0, 0, _this.mapCanvas.height, _this.mapCanvas.width);
            var image = new Image();
            image.src = "./images/background.png";
            image.addEventListener('load', function () {
                var pattern = ctx.createPattern(image, 'repeat');
                _this.mapCtx.fillStyle = pattern;
                _this.mapCtx.fill();
                for (var i = 0; i < _this.game.blocksMap.length; i++) {
                    _this.game.blocksMap[i].render(_this.mapCtx);
                }
                setInterval(_this.renderLoop.bind(_this), 16);
            });
        });
        var debug = new _debugConsole.debugConsole();
        debug.addCheckbox("Hitbox", window.gameConfig.drawHitbox, function (e) {
            window.gameConfig.drawHitbox = e;
        });
        debug.addNumber("Acceleration", window.gameConfig.entityAcceleration, function (e) {
            window.gameConfig.entityAcceleration = e;
        });
        debug.addNumber("Fritiction", window.gameConfig.entityFriction, function (e) {
            window.gameConfig.entityFriction = e;
        });
    }

    _createClass(Render, [{
        key: 'renderLoop',
        value: function renderLoop() {
            // Cleare everything
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // Save position for rotation/ translation, so player always stays in center
            this.ctx.save();
            // Translate to cneter of thing
            this.ctx.translate(Math.round(this.game.player.position.x) * -1 + Math.round(this.canvas.width / 2), Math.round(this.game.player.position.y) * -1 + Math.round(this.canvas.height / 2));
            // Draw map, to safe performence
            this.ctx.drawImage(this.mapCanvas, 0, 0);
            // draw all entities
            for (var i = 0; i < this.game.entitiesMap.length; i++) {
                this.game.entitiesMap[i].render(this.ctx);
            }
            // restore translation to go back to normal
            this.ctx.restore();
            // Default js call to reload screen
            requestAnimationFrame(function () {});
        }
    }]);

    return Render;
}();
//# sourceMappingURL=Render.js.map