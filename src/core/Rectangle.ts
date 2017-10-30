import { V, Vector } from "./Vector"

export interface RectangleInterace {
  min: Vector | V,
  max: Vector | V
}

export class Rectangle implements RectangleInterace {
  min: V
  max: V

  constructor(min: V | RectangleInterace, max?: V) {
    if (min instanceof V) {
      this.min = min
      this.max = max
    } else {
      let rect = min
      this.min = new V(rect.min)
      this.max = new V(rect.max)
    }
  }

  checkCollision(rect: Rectangle): boolean {
    let rectMin = rect.min
    let thisMin = this.min

    if (thisMin.x < rectMin.x + rect.max.x && this.max.x + thisMin.x > rectMin.x && thisMin.y < rect.max.y + rectMin.y && this.max.y + thisMin.y > rectMin.y) {
      return true
    }

    return false
  }

  drawRectangle(origin: V, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)"
    ctx.fillRect(origin.x + this.min.x, origin.y + this.min.y, this.max.x, this.max.y)
    ctx.fill()
  }
}
