import { Container, Sprite, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";

//DEV-NOTE(BATUHAN UYSAL): ---I MAKE THIS CLASS SINGLETON TO HAVE ONLY ONE INSTANCE FOR UI ANIMATIONS ON THE WHOLE GAME---
class sceneInitializer {
    constructor() {
        if (sceneInitializer.instance) {
            return sceneInitializer.instance;
        }
        else {
            sceneInitializer.instance = this;
        }
    }

    async SetScene(game) {
        console.log("set scene from scene initiliazer")
        await this.SetBackground(game, 1);
        await this.SetTopLetterContainer(game);
    }

    SetBackground(game, delayAfterLoadBackground) {
        return new Promise((resolve) => {
            let background = Sprite.from("background");
            background.width = GAME_WIDTH;
            background.height = GAME_HEIGHT;
            game.addChild(background);

            setTimeout(() => {
                resolve();
            }, delayAfterLoadBackground * 1000);
        });
    }

    //DEV-NOTE-TODO(BATUHAN UYSAL): ---HERE CAN BE PROCEDURAL BY CREATING A GRID SYSTEM AND INCLUDES LETTER AND CELL
    SetTopLetterContainer(game) {
        return new Promise(async (resolve) => {
            await this.CreateLetterCell(game);
            await this.CreateLetterCell(game);
            await this.CreateLetterCell(game);
            resolve();
        });
    }

    CreateLetterCell(game) {
        return new Promise((resolve) => {
            let letterCellSprite = Sprite.from("rect");
            game.addChild(letterCellSprite);

            setTimeout(() => {
                resolve();
            }, 400);
        });
    }
}

const sceneInitializerInstance = new sceneInitializer();
export default sceneInitializerInstance;