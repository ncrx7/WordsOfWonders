import { Container, Sprite, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letterCell from "./letterCell";
import letterCellManagerInstance from "./letterCellManager";


//DEV-NOTE(BATUHAN UYSAL): ---I MAKE THIS CLASS SINGLETON TO HAVE ONLY ONE INSTANCE FOR UI ANIMATIONS ON THE WHOLE GAME---
class sceneInitializer {
    constructor() {
        if (sceneInitializer.instance) {
            return sceneInitializer.instance; //DEV-NOTE(Batuhan Uysal): ---I DONT WANT TO BROKE THE SINGLETON BECAUSE I DIDNT THROW AN ERROR---
        }
        else {
            sceneInitializer.instance = this;
        }
    }

    async SetScene(game) {
        console.log("set scene from scene initiliazer");
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
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 1, 20, "K");
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 2, 20, "D");
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 3, 20, "Z");
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 4, 20, "Z");
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 1, 130, "Z");
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 3, 130, "Z");
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 1, 240, "Z");
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 2, 240, "Z");
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 3, 240, "Z");
            console.log(letterCellManagerInstance.getCellFromArrayByIndex(1));
            resolve();
        });
    }

   
}

const sceneInitializerInstance = new sceneInitializer();
export default sceneInitializerInstance;