import Body from "./Body"
import V from "./Vector"
import Model from "./Model"
import Rectangle from "./Rectangle"
import Hitbox from "./Hitbox"


export default class Entity extends Body {
  public velocity: V
  public force: V

  constructor(position: V, model: Model, force: V = new V(0, 0), velocity: V = new V(0, 0)) {
    super(position, model)

    this.velocity = velocity
    this.force = force
  }

  render(ctx: CanvasRenderingContext2D) {
    let width = this.model.texture.width
    let height = this.model.texture.height

    ctx.drawImage(this.model.texture, 0, 0, width, height, Math.round(this.position.x), Math.round(this.position.y), this.model.textureSize.x, this.model.textureSize.y);
  }
}
