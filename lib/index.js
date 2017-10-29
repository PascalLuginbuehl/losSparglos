import { Game } from "./core/Game";
import { Render } from "./core/Render";
import './css/index.scss';
import './images/dirt.png';
import './images/entities.png';
import './images/blocks.png';
import './images/background.png';
import './images/props.png';
import models from './map/models.json';
import map1 from './map/map1.json';
console.log(map1);
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
document.body.classList.add("container");
window.gameConfig = {
    entityFriction: .91,
    entityAcceleration: 1500,
    drawHitbox: true
};
const game = new Game(models, map1);
const render = new Render(canvas, game);
//# sourceMappingURL=index.js.map