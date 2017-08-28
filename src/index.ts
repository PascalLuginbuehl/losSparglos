class Render {
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = this.canvas.getContext('2d');
    this.ctx = ctx


    canvas.height = 500
    canvas.width = 500


    ctx.rect(20,20,150,100);
    ctx.stroke();
  }
}


const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const render = new Render(canvas)
console.log(render)
