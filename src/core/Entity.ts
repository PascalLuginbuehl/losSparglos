import { Body } from "./Body"
import { V } from "./Vector"
import { Model } from "./Model"
import { Rectangle } from "./Rectangle"
import { Hitbox } from "./Hitbox"

let bobbingCurve: number = 0

export class Entity extends Body {
  velocity: V
  force: V
  lastOffset: number

  constructor(position: V, model: Model, force: V = new V(0, 0), velocity: V = new V(0, 0)) {
    super(position, model)

    this.velocity = velocity
    this.force = force

    this.lastOffset = 0
  }

  render(ctx: CanvasRenderingContext2D) {
    let textureOrigin = this.model.textureOrigin
    let textureSize = this.model.textureSize
    let position = this.position

    if (this.model.isMovingSprite) {
      textureOrigin = new V(textureOrigin.x + this.getSpriteOffset() * textureSize.x, textureOrigin.y)
    }

    console.log(this.velocity)
    if (this.model.spriteBobbing) {
      if (this.velocity.x != 0 || this.velocity.y != 0 || Math.sin(bobbingCurve / 4) - 1 > -.95) {
        let height = Math.sin(bobbingCurve / 4)
        position = new V(position.x, position.y - Math.round(height * 2.5) - 2.5)
        bobbingCurve++
      } else {
        bobbingCurve = 0
      }
    }

    ctx.drawImage(this.model.spriteSheet, textureOrigin.x, textureOrigin.y, textureSize.x, textureSize.y, position.x, position.y, this.model.textureSize.x, this.model.textureSize.y)
  }


  getSpriteOffset(): number {
    let x = this.force.x
      , y = this.force.y

    let offset = this.lastOffset

    if(x > 0) {
      offset = 3
    } else if(x < 0) {
      offset = 2
    } else if(y < 0) {
      offset = 1
    } else if(y > 0) {
      offset = 0
    }

    this.lastOffset = offset
    return offset
  }
}
