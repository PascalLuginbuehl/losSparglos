import { V, Vector } from "./Vector"
import { Block } from "./Block"
import { Entity } from "./Entity"
import { Body } from "./Body"
import { Model } from "./Model"
import { Hitbox } from "./Hitbox"
import { Rectangle, RectangleInterace } from "./Rectangle"
import { debugConsole } from "./debugConsole"

export interface configInterface {
  entityFriction: number,
  drawHitbox: boolean,
}


interface Keys {
  w: boolean
  a: boolean
  s: boolean
  d: boolean
}



export interface configModelArray {
  [modelName: string]: {
    Hitbox: Array<RectangleInterace>,
    textureOrigin: Vector,
    textureSize: Vector,
    spriteSheetPath : string,
    isMovingSprite?: boolean,
    spriteBobbing?: boolean
  }
}

export class Game {
  entitiesMap: Array<Entity>
  blocksMap: Array<Block>
  mapSize: V
  player: Entity
  keys: Keys
  models: { [s: string]: Model }

  constructor(configModelArray: configModelArray) {
    this.models = {}
    this.modelGenerator(configModelArray)

    this.entitiesMap = [
      new Entity(
        new V(0,0),
        this.models["Player"]
      )
    ]

    this.blocksMap = [
      new Block(
        new V(32,32),
        this.models["dirt"]
      )
    ]

    this.player = this.entitiesMap[0]

    this.mapSize = new V(10000, 10000)

    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
    }

    window.addEventListener('keydown', (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = true

        this.player.force = this.getVectorFromKeys(this.keys)

        e.preventDefault()
      }
    })

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.key)) {
        this.keys[e.key] = false

        this.player.force = this.getVectorFromKeys(this.keys)

        e.preventDefault()
      }
    })


    setInterval(this.gameLoop.bind(this), 16)
  }

  modelGenerator(configModelArray: configModelArray) {
    for (let name in configModelArray) {
      let blueprint = configModelArray[name]

      this.models[name] = new Model(
        new Hitbox(blueprint.Hitbox.map((e) => new Rectangle(e))),
        new V(blueprint.textureOrigin),
        new V(blueprint.textureSize),
        blueprint.spriteSheetPath
      )
    }
  }


  gameLoop() {
    let delay = 16 / 1000


    for (let i = 0; i < this.entitiesMap.length; i++) {
      let entity: Entity = this.entitiesMap[i]
      if (entity) {
        let acceleration: V = entity.force.scale(1500)
        let friction: number = .91

        entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(friction).round()

        // new position (now check for collision)
        let position: V = entity.position.add(entity.velocity.scale(delay))

        let collisions: Array<Body> = []

        for (let o = 0; o < this.blocksMap.length; o++) {
          let block: Block = this.blocksMap[o]
          if (block) {

            if (block.collision) {
              // Collision detection
              if (entity.checkCollision(block, position)) {
                collisions.push(block)
              }
            }
          }
        }

        for (let o = 0; o < this.entitiesMap.length; o++) {
          let entity2: Entity = this.entitiesMap[o]
          if (entity2 && entity != entity2) {

            // Collision detection
            if (entity.checkCollision(entity2, position)) {
              collisions.push(entity2)
            }
          }
        }


        // sets new position or keeps last depending on collision
        if (new Rectangle(new V(0, 0), this.mapSize).checkCollision(new Rectangle(position, entity.model.hitbox.collisionBox.max))) {
          if (collisions.length > 0) {
              let newPosition: V = new V(position.x, position.y)
              let newVelocity: V = new V(entity.velocity.x, entity.velocity.y)

              for (let i = 0; i < collisions.length; i++) {
                let body = collisions[i]
                let ret = entity.getCollisionPosition(newPosition, newVelocity, body)
                newPosition = ret.position
                newVelocity = ret.velocity
              }
              entity.position = newPosition
              entity.velocity = newVelocity
          } else {
            entity.position = position
          }
        } else {
          entity.velocity = entity.velocity.scale(.1)
        }
      }
    }
  }

  getVectorFromKeys(keys: Keys): V {
    let v = new V(0, 0)

    if (this.keys.w) {
      v.y--
    }

    if (this.keys.a) {
      v.x--
    }

    if (this.keys.s) {
      v.y++
    }

    if (this.keys.d) {
      v.x++
    }

    return v
  }
}
