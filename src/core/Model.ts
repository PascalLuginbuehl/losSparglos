import V from "./Vector"
import Hitbox from "./Hitbox"

export default class Model {
  hitbox: Hitbox
  textureOrigin: V
  textureSize: V
  spriteSheet: HTMLImageElement
  spriteSheetPath: string
  isMovingSprite: boolean

  constructor(hitbox: Hitbox, textureOrigin: V, textureSize: V, spriteSheetPath: string, isMovingSprite: boolean = false) {
    this.hitbox = hitbox
    this.textureSize = textureSize
    this.textureOrigin = textureOrigin
    this.spriteSheetPath = spriteSheetPath
    this.isMovingSprite = isMovingSprite
  }


  checkCollision(origin: V, originHitbox: V, model: Model): boolean {
    return this.hitbox.checkCollision(origin, originHitbox, model.hitbox)
  }

  preloadImage(): Promise<void>  {
    let texture = new Image()
    texture.src = this.spriteSheetPath
    this.spriteSheet = texture

    return new Promise((resolve, reject) => {
      texture.addEventListener('load', () => {
        resolve()
      })
    })
  }
}
