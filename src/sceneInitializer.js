import { Container, Sprite, Graphics, Text, TextStyle } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letterCell from "./letterCell";
import letter from "./letter";
import letterCellManagerInstance from "./letterCellManager";
import letterManagerInstance from "./letterManager";


//DEV-NOTE(BATUHAN UYSAL): ---I MAKE THIS CLASS SINGLETON TO HAVE ONLY ONE INSTANCE FOR UI ANIMATIONS ON THE WHOLE GAME---
class sceneInitializer {
    constructor() {
        if (sceneInitializer.instance) {
            return sceneInitializer.instance; //DEV-NOTE(Batuhan Uysal): ---I DONT WANT TO BROKE THE SINGLETON BECAUSE I DIDNT THROW AN ERROR---
        }
        else {
            sceneInitializer.instance = this;
        }
        const words = ["GOLD", "GOD", "DOG", "LOG"]; //DEV-NOTE(Batuhan Uysal): ---I MADE IT LIKE THAT BECAUSE IT WOULD BE EASY FOR DEVELOP IF WE WANT TO MORE THAN ONE LEVEL---
        letterManagerInstance.setLetters(words);
        //console.log("scene initializer instantiated" + letters.length);
    }



    async SetScene(game) {
        console.log("set scene from scene initiliazer");
        await this.SetBackground(game, 1);
        await this.SetBotLetterContainer(game);
        await this.SetTopLetterCellContainer(game);
    }

    SetBackground(game, delayAfterLoadBackground) {
        return new Promise((resolve) => {
            let background = Sprite.from("background");
            background.width = GAME_WIDTH;
            background.height = GAME_HEIGHT;
            game.addChild(background);

            setTimeout(() => {
                resolve();
            }, delayAfterLoadBackground * 500);
        });
    }

     SetBotLetterContainer(game)
    {
        return new Promise(async (resolve) => {
            await letterManagerInstance.createLetters(100, 650, game);
            
            resolve();
        });
    } 

    //DEV-NOTE-TODO(BATUHAN UYSAL): ---HERE CAN BE PROCEDURAL BY CREATING A GRID SYSTEM AND INCLUDES LETTER AND CELL
    SetTopLetterCellContainer(game) {
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

    CreateLetter(game, letterChar, x, y)
    {
        const text = new Text(letterChar, {
            fontFamily: 'Arial',
            fontSize: 74,
            fill: 0xFF7F00,
            align: 'center',
        });
        text.position.set(x, y);
        game.addChild(text);
        const letterObject = new letter(letterChar, text);
    }

   
}

const sceneInitializerInstance = new sceneInitializer();
export default sceneInitializerInstance;