import Game from "./core/Game"
import Render from "./core/Render"

import './css/index.scss'
import './images/dirt.png'
import './images/entities.png'
import './images/blocks.png'
import './images/background.png'
import './images/props.png'


const canvas = document.createElement('canvas')
document.body.appendChild(canvas)


const game = new Game()
const render = new Render(canvas, game)
