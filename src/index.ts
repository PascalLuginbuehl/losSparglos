import Game from "./core/Game"
import Render from "./core/Render"

import './css/index.css'
import './images/dirt.png'


const canvas = document.createElement('canvas')
document.body.appendChild(canvas)


const game = new Game()
const render = new Render(canvas, game)
