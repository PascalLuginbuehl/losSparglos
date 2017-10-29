"use strict";

var _Game = require("./core/Game");

var _Render = require("./core/Render");

require("./css/index.scss");

require("./images/dirt.png");

require("./images/entities.png");

require("./images/blocks.png");

require("./images/background.png");

require("./images/props.png");

var _models = require("./map/models.json");

var _models2 = _interopRequireDefault(_models);

var _map = require("./map/map1.json");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_map2.default);
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
document.body.classList.add("container");
window.gameConfig = {
    entityFriction: .91,
    entityAcceleration: 1500,
    drawHitbox: true
};
var game = new _Game.Game(_models2.default, _map2.default);
var render = new _Render.Render(canvas, game);
//# sourceMappingURL=index.js.map