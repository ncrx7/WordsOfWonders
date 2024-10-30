import { Container, Sprite, Graphics } from "pixi.js";

export default class letterCell {
    constructor(letterGroup, positionX, positionY, letterObject, rectSprite, game, rightMargin) {
        this.positionX = positionX;
        this.positionY = positionY;
        //this.letterAbove = letterAbove;
        this.rectSprite = rectSprite;
        this.rightMargin = rightMargin;
        this.letterObject = letterObject 
        this.letterGroup = letterGroup;

        game.addChild(rectSprite);
        this.setRectSpritePosition();
        this.setRectScale();
    }

    setRectSpritePosition() {
        if (this.rectSprite) {
            this.rectSprite.x = this.positionX - this.rightMargin;
            //console.log("pos: " + this.rectSprite.x);
            this.rectSprite.y = this.positionY;
        }
    }

    setRectScale()
    {
        this.rectSprite.scale.set(0.3, 0.3);
    }


}