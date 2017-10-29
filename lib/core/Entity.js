import { Body } from "./Body";
import { V } from "./Vector";
let bobbingCurve = 0;
export class Entity extends Body {
    constructor(position, model, force = new V(0, 0), velocity = new V(0, 0)) {
        super(position, model);
        this.velocity = velocity;
        this.force = force;
        this.lastOffset = 0;
    }
    render(ctx) {
        let textureOrigin = this.model.textureOrigin;
        let textureSize = this.model.textureSize;
        let position = this.position;
        if (window.gameConfig.drawHitbox) {
            this.model.hitbox.drawHitbox(this.position, ctx);
        }
        if (this.model.isMovingSprite) {
            textureOrigin = new V(textureOrigin.x + this.getSpriteOffset() * textureSize.x, textureOrigin.y);
        }
        // console.log(this.velocity)
        if (this.model.spriteBobbing) {
            if (this.velocity.x != 0 || this.velocity.y != 0 || Math.sin(bobbingCurve / 4) - 1 > -.95) {
                let height = Math.sin(bobbingCurve / 4);
                position = new V(position.x, position.y - Math.round(height * 2.5) - 2.5);
                bobbingCurve++;
            } else {
                bobbingCurve = 0;
            }
        }
        // console.log( textureOrigin.x, textureOrigin.y, textureSize.x, textureSize.y, position.x, position.y, this.model.textureSize.x, this.model.textureSize.y)
        ctx.drawImage(this.model.spriteSheet, textureOrigin.x, textureOrigin.y, textureSize.x, textureSize.y, position.x, position.y, this.model.textureSize.x, this.model.textureSize.y);
    }
    getSpriteOffset() {
        let x = this.force.x,
            y = this.force.y;
        let offset = this.lastOffset;
        if (x > 0) {
            offset = 3;
        } else if (x < 0) {
            offset = 2;
        } else if (y < 0) {
            offset = 1;
        } else if (y > 0) {
            offset = 0;
        }
        this.lastOffset = offset;
        return offset;
    }
}
//# sourceMappingURL=Entity.js.map