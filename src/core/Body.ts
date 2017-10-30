import { Hitbox } from "./Hitbox"
import { Model } from "./Model"
import { V } from "./Vector"

// Fixed collision bug

interface IUpdatedValues {
  velocity: V
  position: V
}

/** Body class with basic parameters for positon and hitbox, it also provides a function for cehcking collision */
export class Body {
  position: V
  model: Model

  constructor(positon: V, model: Model) {
    this.position = positon
    this.model = model
  }

  checkCollision(body: Body, newPositon: V = this.position): boolean {
    return this.model.checkCollision(body.position, newPositon, body.model)
  }

  render(ctx: CanvasRenderingContext2D): void {
    let textureOrigin = this.model.textureOrigin
    let textureSize = this.model.textureSize

    ctx.drawImage(
      this.model.spriteSheet,
      textureOrigin.x,
      textureOrigin.y,
      textureSize.x,
      textureSize.y,
      this.position.x,
      this.position.y,
      this.model.textureSize.x,
      this.model.textureSize.y
    )
  }

  getCollisionPosition(newPosition: V, newVelocity: V, collidedBody: Body): IUpdatedValues {
    let returnPosition: V = new V(newPosition.x, newPosition.y)
    let returnVelocity: V = new V(newVelocity.x, newVelocity.y)

    if (this.checkCollision(collidedBody, new V(newPosition.x, this.position.y))) {
      returnVelocity.x = 0
      returnPosition.x = this.position.x
    }

    if (this.checkCollision(collidedBody, new V(this.position.x, newPosition.y))) {
      returnVelocity.y = 0
      returnPosition.y = this.position.y
    }

    if (returnPosition.x === newPosition.x && returnPosition.y === newPosition.y) {
      returnVelocity.x = 0
      returnVelocity.y = 0
      returnPosition.x = this.position.x
      returnPosition.y = this.position.y
    }

    return {position: returnPosition, velocity: returnVelocity}
  }
}
