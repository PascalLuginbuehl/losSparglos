import { DebugConsole } from "./DebugConsole"
import { Game } from "./Game"

export class Render {
  ctx: CanvasRenderingContext2D
  mapCtx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  mapCanvas: HTMLCanvasElement
  game: Game
  masterSprite: HTMLImageElement

  constructor(canvas: HTMLCanvasElement, game: Game) {
    this.canvas = canvas
    const ctx = this.canvas.getContext('2d')
    this.ctx = ctx
    this.game = game

    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight

    window.addEventListener('resize', () => {
      canvas.width = document.documentElement.clientWidth
      canvas.height = document.documentElement.clientHeight
    })

    // Map canvas
    this.mapCanvas = document.createElement('canvas')
    this.mapCanvas.height = this.game.mapSize.x
    this.mapCanvas.width = this.game.mapSize.y

    this.mapCtx = this.mapCanvas.getContext('2d')

    // Preload images
    Promise.all(Object.keys(this.game.models).map((e) => this.game.models[e].preloadImage())).then(() => {
      this.mapCtx.rect(0, 0, this.mapCanvas.height, this.mapCanvas.width)
      let image = new Image()
      image.src = "./images/background.png"
      image.addEventListener('load', () => {

        let pattern = ctx.createPattern(image, 'repeat')
        this.mapCtx.fillStyle = pattern
        this.mapCtx.fill()

        for (let i = 0; i < this.game.blocksMap.length; i++) {
          this.game.blocksMap[i].render(this.mapCtx)
        }

        setInterval(this.renderLoop.bind(this), 16)
      })
    })

    let debug = new DebugConsole()
    debug.addCheckbox("Hitbox", window.gameConfig.drawHitbox, (e) => {
      window.gameConfig.drawHitbox = e
    })

    debug.addNumber("Acceleration", window.gameConfig.entityAcceleration, (e) => {
      window.gameConfig.entityAcceleration = e
    })

    debug.addNumber("Fritiction", window.gameConfig.entityFriction, (e) => {
      window.gameConfig.entityFriction = e
    })
  }

  private renderLoop(): void {
    // Cleare everything
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Save position for rotation/ translation, so player always stays in center
    this.ctx.save()

    // Translate to cneter of thing
    this.ctx.translate(
      Math.round(this.game.player.position.x) * -1 + Math.round(this.canvas.width / 2),
      Math.round(this.game.player.position.y) * -1  + Math.round(this.canvas.height / 2)
    )

    // Draw map, to safe performence
    this.ctx.drawImage(this.mapCanvas, 0, 0)

    // draw all entities
    for (let i = 0; i < this.game.entitiesMap.length; i++) {
      this.game.entitiesMap[i].render(this.ctx)
    }

    // restore translation to go back to normal
    this.ctx.restore()

    // Default js call to reload screen
    requestAnimationFrame(() => null)
  }
}
