import { V } from "./Vector";
import { Block } from "./Block";
import { Entity } from "./Entity";
import { Model } from "./Model";
import { Hitbox } from "./Hitbox";
import { Rectangle } from "./Rectangle";
export class Game {
    constructor(configModelArray, configBlockArray) {
        this.models = {};
        this.modelGenerator(configModelArray);
        this.entitiesMap = [];
        this.blockGenerator(configBlockArray);
        configBlockArray.blocks.map(e => {
            if (e.type == "spawnPoint") {
                this.entitiesMap.push(new Entity(new V(e.position), this.models["Player"]));
            }
        });
        this.player = this.entitiesMap[0];
        this.mapSize = new V(10000, 10000);
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false
        };
        window.addEventListener('keydown', e => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key.toLowerCase()] = true;
                this.player.force = this.getVectorFromKeys(this.keys);
                e.preventDefault();
            }
        });
        window.addEventListener('keyup', e => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key.toLowerCase()] = false;
                this.player.force = this.getVectorFromKeys(this.keys);
                e.preventDefault();
            }
        });
        setInterval(this.gameLoop.bind(this), 16);
    }
    modelGenerator(configModelArray) {
        for (let name in configModelArray) {
            let blueprint = configModelArray[name];
            blueprint.textureSize.x *= 32;
            blueprint.textureSize.y *= 32;
            blueprint.textureOrigin.x *= 32;
            blueprint.textureOrigin.y *= 32;
            blueprint.Hitbox = blueprint.Hitbox.map(e => {
                return {
                    min: {
                        x: e.min.x * 32,
                        y: e.min.y * 32
                    },
                    max: {
                        x: e.max.x * 32,
                        y: e.max.y * 32
                    }
                };
            });
            this.models[name] = new Model(new Hitbox(blueprint.Hitbox.map(e => new Rectangle(e))), new V(blueprint.textureOrigin), new V(blueprint.textureSize), blueprint.spriteSheetPath, blueprint.isMovingSprite, blueprint.spriteBobbing);
        }
    }
    blockGenerator(configBlockArray) {
        this.blocksMap = [];
        let blocks = configBlockArray.blocks;
        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i];
            block.position.x *= 32;
            block.position.y *= 32;
            if (block.type != "spawnPoint") {
                this.blocksMap.push(new Block(new V(block.position), this.models[block.type]));
            }
        }
    }
    gameLoop() {
        let delay = 16 / 1000;
        for (let i = 0; i < this.entitiesMap.length; i++) {
            let entity = this.entitiesMap[i];
            if (entity) {
                let acceleration = entity.force.scale(window.gameConfig.entityAcceleration);
                let friction = window.gameConfig.entityFriction;
                entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(friction).round();
                // new position (now check for collision)
                let position = entity.position.add(entity.velocity.scale(delay));
                let collisions = [];
                for (let o = 0; o < this.blocksMap.length; o++) {
                    let block = this.blocksMap[o];
                    if (block) {
                        if (block.collision) {
                            // Collision detection
                            if (entity.checkCollision(block, position)) {
                                collisions.push(block);
                            }
                        }
                    }
                }
                for (let o = 0; o < this.entitiesMap.length; o++) {
                    let entity2 = this.entitiesMap[o];
                    if (entity2 && entity != entity2) {
                        // Collision detection
                        if (entity.checkCollision(entity2, position)) {
                            collisions.push(entity2);
                        }
                    }
                }
                // sets new position or keeps last depending on collision
                if (new Rectangle(new V(0, 0), this.mapSize).checkCollision(new Rectangle(position, entity.model.hitbox.collisionBox.max))) {
                    if (collisions.length > 0) {
                        let newPosition = new V(position.x, position.y);
                        let newVelocity = new V(entity.velocity.x, entity.velocity.y);
                        for (let i = 0; i < collisions.length; i++) {
                            let body = collisions[i];
                            let ret = entity.getCollisionPosition(newPosition, newVelocity, body);
                            newPosition = ret.position;
                            newVelocity = ret.velocity;
                        }
                        entity.position = newPosition;
                        entity.velocity = newVelocity;
                    } else {
                        entity.position = position;
                    }
                } else {
                    entity.velocity = entity.velocity.scale(.1);
                }
            }
        }
    }
    getVectorFromKeys(keys) {
        let v = new V(0, 0);
        if (this.keys.w) {
            v.y--;
        }
        if (this.keys.a) {
            v.x--;
        }
        if (this.keys.s) {
            v.y++;
        }
        if (this.keys.d) {
            v.x++;
        }
        return v;
    }
}
//# sourceMappingURL=Game.js.map