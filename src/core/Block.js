import { Body } from "./Body";
export class Block extends Body {
    constructor(position, model, collision = true) {
        super(position, model);
        this.collision = collision;
    }
}
//# sourceMappingURL=Block.js.map