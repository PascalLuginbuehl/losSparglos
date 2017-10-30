import { Rectangle } from "./Rectangle"
import { V } from "./Vector"

export class Hitbox {
  protected rectangles: Rectangle[]
  public collisionBox: Rectangle

  constructor(rectangles: Rectangle[]) {
    this.rectangles = rectangles
    this.collisionBox = this.getCollisionBox()
  }

  checkCollision(origin: V, originHitbox: V, hitbox: Hitbox): boolean {
    // unaccurate collisiondetection for performence reasons
    let collisionBox = new Rectangle(this.collisionBox.min.add(originHitbox), this.collisionBox.max)
    let collisionBox2 = new Rectangle(hitbox.collisionBox.min.add(origin), hitbox.collisionBox.max)
    if (collisionBox.checkCollision(collisionBox2)) {
      // accurate collisionsdetection
      for (let i = 0; i < this.rectangles.length; i++) {
        for (let o = 0; o < hitbox.rectangles.length; o++) {
          let otherRect = hitbox.rectangles[o]
          let thisRect = this.rectangles[i]

          let rect = new Rectangle(thisRect.min.add(originHitbox), thisRect.max)
          let rect2 = new Rectangle(otherRect.min.add(origin), otherRect.max)

          if (rect.checkCollision(rect2)) {
            return true
          }
        }
      }
    }

    return false
  }

  getCollisionBox(): Rectangle {
    let max = new V(0, 0)

    for (let i = 0; i < this.rectangles.length; i++) {
      let hitbox = this.rectangles[i]

      max = max.biggest(hitbox.min.add(hitbox.max))
    }

    let min = new V(max.x, max.y)

    for (let i = 0; i < this.rectangles.length; i++) {
      min = min.smalest(this.rectangles[i].min)
    }

    return new Rectangle(min, max)
  }

  public drawHitbox(origin: V, ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rectangles.length; i++) {
      this.rectangles[i].drawRectangle(origin, ctx)
    }
  }
}
