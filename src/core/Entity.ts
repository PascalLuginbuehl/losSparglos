import Body from "./Body"
import V from "./Vector"
import Model from "./Model"
import Rectangle from "./Rectangle"
import Hitbox from "./Hitbox"


export default class Entity extends Body {
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

    if (this.model.isMovingSprite) {
      textureOrigin = new V(textureOrigin.x + this.getSpriteOffset() * textureSize.x, textureOrigin.y)
    }

    ctx.drawImage(this.model.spriteSheet, textureOrigin.x, textureOrigin.y, textureSize.x, textureSize.y, this.position.x, this.position.y, this.model.textureSize.x, this.model.textureSize.y)
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
