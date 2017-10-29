"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require("./Vector");

var _Block = require("./Block");

var _Entity = require("./Entity");

var _Model = require("./Model");

var _Hitbox = require("./Hitbox");

var _Rectangle = require("./Rectangle");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
    function Game(configModelArray, configBlockArray) {
        var _this = this;

        _classCallCheck(this, Game);

        this.models = {};
        this.modelGenerator(configModelArray);
        this.entitiesMap = [];
        this.blockGenerator(configBlockArray);
        configBlockArray.blocks.map(function (e) {
            if (e.type == "spawnPoint") {
                _this.entitiesMap.push(new _Entity.Entity(new _Vector.V(e.position), _this.models["Player"]));
            }
        });
        this.player = this.entitiesMap[0];
        this.mapSize = new _Vector.V(10000, 10000);
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false
        };
        window.addEventListener('keydown', function (e) {
            if (_this.keys.hasOwnProperty(e.key)) {
                _this.keys[e.key.toLowerCase()] = true;
                _this.player.force = _this.getVectorFromKeys(_this.keys);
                e.preventDefault();
            }
        });
        window.addEventListener('keyup', function (e) {
            if (_this.keys.hasOwnProperty(e.key)) {
                _this.keys[e.key.toLowerCase()] = false;
                _this.player.force = _this.getVectorFromKeys(_this.keys);
                e.preventDefault();
            }
        });
        setInterval(this.gameLoop.bind(this), 16);
    }

    _createClass(Game, [{
        key: "modelGenerator",
        value: function modelGenerator(configModelArray) {
            for (var name in configModelArray) {
                var blueprint = configModelArray[name];
                blueprint.textureSize.x *= 32;
                blueprint.textureSize.y *= 32;
                blueprint.textureOrigin.x *= 32;
                blueprint.textureOrigin.y *= 32;
                blueprint.Hitbox = blueprint.Hitbox.map(function (e) {
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
                this.models[name] = new _Model.Model(new _Hitbox.Hitbox(blueprint.Hitbox.map(function (e) {
                    return new _Rectangle.Rectangle(e);
                })), new _Vector.V(blueprint.textureOrigin), new _Vector.V(blueprint.textureSize), blueprint.spriteSheetPath, blueprint.isMovingSprite, blueprint.spriteBobbing);
            }
        }
    }, {
        key: "blockGenerator",
        value: function blockGenerator(configBlockArray) {
            this.blocksMap = [];
            var blocks = configBlockArray.blocks;
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                block.position.x *= 32;
                block.position.y *= 32;
                if (block.type != "spawnPoint") {
                    this.blocksMap.push(new _Block.Block(new _Vector.V(block.position), this.models[block.type]));
                }
            }
        }
    }, {
        key: "gameLoop",
        value: function gameLoop() {
            var delay = 16 / 1000;
            for (var i = 0; i < this.entitiesMap.length; i++) {
                var entity = this.entitiesMap[i];
                if (entity) {
                    var acceleration = entity.force.scale(window.gameConfig.entityAcceleration);
                    var friction = window.gameConfig.entityFriction;
                    entity.velocity = entity.velocity.add(acceleration.scale(delay)).scale(friction).round();
                    // new position (now check for collision)
                    var position = entity.position.add(entity.velocity.scale(delay));
                    var collisions = [];
                    for (var o = 0; o < this.blocksMap.length; o++) {
                        var block = this.blocksMap[o];
                        if (block) {
                            if (block.collision) {
                                // Collision detection
                                if (entity.checkCollision(block, position)) {
                                    collisions.push(block);
                                }
                            }
                        }
                    }
                    for (var _o = 0; _o < this.entitiesMap.length; _o++) {
                        var entity2 = this.entitiesMap[_o];
                        if (entity2 && entity != entity2) {
                            // Collision detection
                            if (entity.checkCollision(entity2, position)) {
                                collisions.push(entity2);
                            }
                        }
                    }
                    // sets new position or keeps last depending on collision
                    if (new _Rectangle.Rectangle(new _Vector.V(0, 0), this.mapSize).checkCollision(new _Rectangle.Rectangle(position, entity.model.hitbox.collisionBox.max))) {
                        if (collisions.length > 0) {
                            var newPosition = new _Vector.V(position.x, position.y);
                            var newVelocity = new _Vector.V(entity.velocity.x, entity.velocity.y);
                            for (var _i = 0; _i < collisions.length; _i++) {
                                var body = collisions[_i];
                                var ret = entity.getCollisionPosition(newPosition, newVelocity, body);
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
    }, {
        key: "getVectorFromKeys",
        value: function getVectorFromKeys(keys) {
            var v = new _Vector.V(0, 0);
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
    }]);

    return Game;
}();
//# sourceMappingURL=Game.js.map