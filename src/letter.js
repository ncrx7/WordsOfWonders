import { Container, Sprite, Graphics, Text } from "pixi.js";

export default class letter {
    constructor(positionX, positionY, letterChar, textObject) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.letterChar = letterChar;
        this.textObject = textObject;

        this.setTextPosition();
    }

    setTextPosition() {
        if (this.textObject) {
            this.textObject.x = this.positionX;
            //console.log("pos: " + this.textObject.x);
            this.textObject.y = this.positionY;
        }
    }

    setTextScale()
    {
        this.rectSprite.scale.set(0.3, 0.3);
    }

    getLetter()
    {
        return "this.textObject.text";
    }
}