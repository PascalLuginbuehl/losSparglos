import V from "./Vector";
import Hitbox from "./Hitbox";
import Model from "./Model";

interface updatedValues {
  velocity: V;
  position: V;
}

/** Body class with basic parameters for positon and hitbox, it also provides a function for cehcking collision */
export default class Body {
  public position: V;
  public model: Model;


  constructor(positon: V, model: Model) {
    this.position = positon;
    this.model = model;
  }

  public checkCollision(body: Body, newPositon: V = this.position): boolean {
    return this.model.checkCollision(body.position, newPositon, body.model);
  }


  public render(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.model.texture, 0, 0, this.model.texture.width, this.model.texture.height, Math.round(this.position.x), Math.round(this.position.y), this.model.textureSize.x, this.model.textureSize.y);
  }


  public getCollisionPosition(newPosition: V, newVelocity: V, collidedBody: Body): updatedValues {
    let returnPosition: V = new V(newPosition.x, newPosition.y);
    let returnVelocity: V = new V(newVelocity.x, newVelocity.y);

    if (this.checkCollision(collidedBody, new V(newPosition.x, this.position.y))) {
      returnVelocity.x = 0;
      returnPosition.x = this.position.x
    }

    if (this.checkCollision(collidedBody, new V(this.position.x, newPosition.y))) {
      returnVelocity.y = 0;
      returnPosition.y = this.position.y
    }

    if (returnPosition.x == newPosition.x && returnPosition.y == newPosition.y) {
      returnVelocity.x = 0;
      returnVelocity.y = 0;
      returnPosition.x = this.position.x
      returnPosition.y = this.position.y
    }

    return {position: returnPosition, velocity: returnVelocity};
  }
}
