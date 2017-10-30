import { Body } from "./Body"
import { Model } from "./Model"
import { V } from "./Vector"

// Player centers, seperate block rendering

export class Block extends Body {
  public collision: boolean

  constructor(position: V, model: Model, collision: boolean = true) {
    super(position, model)
    this.collision = collision
  }
}
