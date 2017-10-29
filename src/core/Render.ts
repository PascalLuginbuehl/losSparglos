import Game from "./Game"
import V from "./Vector"

export default class Render {
  ctx: CanvasRenderingContext2D
  mapCtx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  mapCanvas: HTMLCanvasElement
  game: Game


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

    this.mapCanvas = document.createElement('canvas')
    this.mapCanvas.height = this.game.mapSize.x
    this.mapCanvas.width = this.game.mapSize.y

    this.mapCtx = this.mapCanvas.getContext('2d')

    const MULTI = 20
    // Collision detection test
    let V1 = new V(7 , 2)
    let V2 = new V(1, 7)
    let P = new V(2, 2)

    ctx.fillStyle = "#FF0000"
    ctx.fillRect(P.x * MULTI,P.y * MULTI,1,1)

    ctx.fillStyle = "#000000"
    ctx.beginPath()
    ctx.moveTo(V1.x * MULTI,V1.y * MULTI)
    ctx.lineTo(V2.x * MULTI,V2.y * MULTI)
    ctx.stroke()



    let n = new V((V2.subtract(V1).x / V2.subtract(V1).y)  * -1, (V2.subtract(V1).y / V2.subtract(V1).x))
    let result = new V(n.y * (P.subtract(V1).x / P.subtract(V1).y), n.x * (P.subtract(V1).x / P.subtract(V1).y))
    // let result = new V(
    //   1 / V1.subtract(V2).y * V1.subtract(V2).x * P.subtract(V1).y,
    //   1 / V1.subtract(V2).x * V1.subtract(V2).y * P.subtract(V1).x,
    // )

    console.log(result)


    ctx.fillStyle = "#FF0000"
    ctx.fillRect(result.add(P).x * MULTI, result.add(P).y * MULTI,1,1)


    // Preload images images
    Promise.all(Object.keys(this.game.models).map((e) => this.game.models[e].preloadImage())).then(() => {
      // this.mapCtx.rect(0, 0, this.mapCanvas.height, this.mapCanvas.width);
      // this.mapCtx.fillStyle = this.game.map.background;
      // this.mapCtx.fill();

      for (let i = 0; i < this.game.blocksMap.length; i++) {
        this.game.blocksMap[i].render(this.mapCtx);
      }

      // setInterval(this.renderLoop.bind(this), 16)
    })
  }

  private renderLoop(): void {
    // Cleare everything
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Save position for rotation/ translation, so player always stays in center
    this.ctx.save()

    // Translate to cneter of thing
    // this.ctx.translate(Math.round(this.cameraEntity.position.x) * -1 + Math.round(this.canvas.width/2), Math.round(this.cameraEntity.position.y) * -1  + Math.round(this.canvas.height/2))

    // Draw map, to safe performence
    this.ctx.drawImage(this.mapCanvas, 0, 0)

    // draw all entities
    for (let i = 0; i < this.game.entitiesMap.length; i++) {
      this.game.entitiesMap[i].render(this.ctx)
    }

    // restore translation to go back to normal
    this.ctx.restore()

    // Default js call to reload screen
    requestAnimationFrame(() => {})
  }
}
