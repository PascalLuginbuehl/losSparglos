export class Model {
    constructor(hitbox, textureOrigin, textureSize, spriteSheetPath, isMovingSprite = false, spriteBobbing = false) {
        this.hitbox = hitbox;
        this.textureSize = textureSize;
        this.textureOrigin = textureOrigin;
        this.spriteSheetPath = spriteSheetPath;
        this.isMovingSprite = isMovingSprite;
        this.spriteBobbing = spriteBobbing;
    }
    checkCollision(origin, originHitbox, model) {
        return this.hitbox.checkCollision(origin, originHitbox, model.hitbox);
    }
    preloadImage() {
        let texture = new Image();
        texture.src = this.spriteSheetPath;
        this.spriteSheet = texture;
        return new Promise((resolve, reject) => {
            texture.addEventListener('load', () => {
                resolve();
            });
        });
    }
}
//# sourceMappingURL=Model.js.map