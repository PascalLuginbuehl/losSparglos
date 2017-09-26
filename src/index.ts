import { Game, configInterface } from "./core/Game"
import { Render } from "./core/Render"

import './css/index.scss'
import './images/dirt.png'
import './images/entities.png'
import './images/blocks.png'
import './images/background.png'
import './images/props.png'


const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
document.body.classList.add("container")

declare global {
  interface Window { gameConfig: configInterface }
}

window.gameConfig = {
  entityFriction: 1
}

const game = new Game()
const render = new Render(canvas, game)
