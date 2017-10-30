import { Body } from "./Body"
import { Hitbox } from "./Hitbox"
import { Model } from "./Model"
import { Rectangle } from "./Rectangle"
import { V } from "./Vector"

export class Entity extends Body {
  velocity: V
  force: V
  lastOffset: number
  spriteBobbingCurve: number
  lastMovingDirection: V

  constructor(position: V, model: Model, force: V = new V(0, 0), velocity: V = new V(0, 0)) {
    super(position, model)

    this.spriteBobbingCurve = 0
    this.velocity = velocity
    this.force = force
    this.lastMovingDirection = new V(1, 0)

    this.lastOffset = 0
  }

  render(ctx: CanvasRenderingContext2D) {
    let textureOrigin = this.model.textureOrigin
    let textureSize = this.model.textureSize
    let position = this.position

    if (window.gameConfig.drawHitbox) {
      this.model.hitbox.drawHitbox(this.position, ctx)
    }

    if (this.model.isMovingSprite) {
      textureOrigin = new V(textureOrigin.x + this.getSpriteOffset() * textureSize.x, textureOrigin.y)
    }

    if (this.model.spriteBobbing) {

      if (this.velocity.x !== 0 || this.velocity.y !== 0 || Math.sin(this.spriteBobbingCurve / 4) - 1 > -.95) {
        let height = Math.sin(this.spriteBobbingCurve / 4)
        position = new V(position.x, position.y - Math.round(height * 2.5) - 2.5)
        this.spriteBobbingCurve++
      } else {
        this.spriteBobbingCurve = 0
      }
    }

    ctx.drawImage(
      this.model.spriteSheet,
      textureOrigin.x,
      textureOrigin.y,
      textureSize.x,
      textureSize.y,
      position.x,
      position.y,
      this.model.textureSize.x,
      this.model.textureSize.y
    )
  }

  getSpriteOffset(): number {
    let x = this.force.x
    let y = this.force.y



    let offset = this.lastOffset

    if (x > 0) {
      offset = 3
    } else if (x < 0) {
      offset = 2
    } else if (y < 0) {
      offset = 1
    } else if (y > 0) {
      offset = 0
    }

    this.lastOffset = offset
    return offset
  }
}
