import V from "./Vector"
import Hitbox from "./Hitbox"

export default class Model {
  public hitbox: Hitbox
  public texture: HTMLImageElement
  public textureSize: V
  public texturePath: string

  constructor(hitbox: Hitbox, texturePath: string, textureSize: V) {
    this.hitbox = hitbox
    this.textureSize = textureSize
    this.texturePath = texturePath
  }


  public checkCollision(origin: V, originHitbox: V, model: Model): boolean {
    return this.hitbox.checkCollision(origin, originHitbox, model.hitbox);
  }

  preloadImage(): Promise<void> {
    this.texture = new Image();
    this.texture.src = this.texturePath

    return new Promise((resolve, reject) => {
      this.texture.addEventListener('load', () => {
        resolve()
      })
    })
  }
}
