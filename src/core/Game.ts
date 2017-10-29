import V from "./Vector"
import Block from "./Block"
import Entity from "./Entity"
import Body from "./Body"
import Model from "./Model"
import Hitbox from "./Hitbox"
import Rectangle from "./Rectangle"


interface Keys {
  w: boolean
  a: boolean
  s: boolean
  d: boolean
}

export default class Game {
  entitiesMap: Array<Entity>
  blocksMap: Array<Block>
  mapSize: V
  player: Entity
  keys: Keys
  models: { [s: string]: Model }

  constructor() {
    this.models =  {
      "Player": new Model(
        new Hitbox([new Rectangle(new V(0, 0), new V(16, 16))]),
        "/dirt.png",
        new V(16, 16)
      ),

     "dirt": new Model(
        new Hitbox([new Rectangle(new V(0,0), new V(16,16))]),
        "/dirt.png",
        new V(16, 16)
      )
    }


    this.entitiesMap = [
      new Entity(
        new V(0,0),
        this.models["Player"]
      )
    ]

    this.blocksMap = [
      new Block(
        new V(20,20),
        this.models["dirt"]
      )
    ]

    this.player = this.entitiesMap[0]

    this.mapSize = new V(500, 500)

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
      let key = e.key.toLowerCase()

      if (this.keys.hasOwnProperty(key)) {
        this.keys[key] = false

        this.player.force = this.getVectorFromKeys(this.keys)

        e.preventDefault()
      }
    })


    setInterval(this.gameLoop.bind(this), 16)

  }

  gameLoop() {
    let delay = 16 / 1000


    for (let i = 0; i < this.entitiesMap.length; i++) {
      let entity: Entity = this.entitiesMap[i]
      if (entity) {
        let acceleration: V = entity.force.scale(1500)
        let friction: number = .91
        // let friction: number = .92

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
