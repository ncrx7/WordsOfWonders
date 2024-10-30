import { Container, Sprite, Graphics, Text, TextStyle } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letterCell from "./letterCell";
import letter from "./letter";
import letterCellManagerInstance from "./letterCellManager";
import letterManagerInstance from "./letterManager";
import inputManagerInstance from "./inputManager";
import uiAnimationManagerInstance from "./uiAnimationManager";

export const WORDS = ["GOLD", "GOD", "DOG", "LOG"];
//DEV-NOTE(BATUHAN UYSAL): ---I MAKE THIS CLASS SINGLETON TO HAVE ONLY ONE INSTANCE FOR UI ANIMATIONS ON THE WHOLE GAME---
class sceneInitializer {
    constructor() {
        if (sceneInitializer.instance) {
            return sceneInitializer.instance; //DEV-NOTE(Batuhan Uysal): ---I DONT WANT TO BROKE THE SINGLETON BECAUSE I DIDNT THROW AN ERROR---
        }
        else {
            sceneInitializer.instance = this;
        }
        //const words = ["GOLD", "GOD", "DOG", "LOG"]; //DEV-NOTE(Batuhan Uysal): ---I MADE IT LIKE THAT BECAUSE IT WOULD BE EASY FOR DEVELOP IF WE WANT TO MORE THAN ONE LEVEL---
        letterManagerInstance.setLettersFromWords(WORDS);

        this.playNowContainer = new Container();
    }



    async SetScene(game) {
        //console.log("set scene from scene initiliazer");
        await this.SetBackground(game, 0.2);
        await this.setPlayNowRect(game, 50);
        await this.SetBotLetterContainer(game);
        await this.SetTopLetterCellContainer(game);
        await this.setInputEvents(game);
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

    setPlayNowRect(game, bottomMargin) {
        return new Promise((resolve) => {
            let playNowRect = Sprite.from("playNowRect");
            playNowRect.width = GAME_WIDTH / 4 * 3;
            playNowRect.height = GAME_HEIGHT / 10;
            playNowRect.pivot.set(playNowRect.texture.width / 2, playNowRect.texture.height / 2);
            
            let playNowText = new Text("PLAY NOW!", {
                fontFamily: 'Arial',
                fontSize: 30,
                fill: 0xFFFFFF,
                align: 'center',
            });

            playNowText.pivot.set(playNowText.width / 2, playNowText.height / 2);

            playNowRect.position.set(0, 0); 
            playNowText.position.set(0, 0);

            this.playNowContainer.pivot.set(0.5, 0.5);
            this.playNowContainer.position.set(GAME_WIDTH / 2, GAME_HEIGHT - bottomMargin);

            this.playNowContainer.addChild(playNowRect);
            this.playNowContainer.addChild(playNowText);

            game.addChild(this.playNowContainer);

            uiAnimationManagerInstance.playNowContainerAnimation(this.playNowContainer);

            resolve();
        });
    }

    SetBotLetterContainer(game) {
        return new Promise(async (resolve) => {
            await letterManagerInstance.createLetters(100, 650, game);

            resolve();
        });
    }

    //DEV-NOTE-TODO(BATUHAN UYSAL): ---HERE CAN BE PROCEDURAL BY CREATING A GRID SYSTEM AND INCLUDES LETTER AND CELL
    SetTopLetterCellContainer(game) {
        return new Promise(async (resolve) => {
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 1, 20, "G", letterManagerInstance, [WORDS[0], WORDS[1]]); //TODO: DEFINE LETTERMANAGER INSTANCE TO LETTERMANAGER INSTANCE
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 2, 20, "O", letterManagerInstance, [WORDS[0]]);
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 3, 20, "L", letterManagerInstance, [WORDS[0], WORDS[3]]);
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 4, 20, "D", letterManagerInstance, [WORDS[0]]);
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 1, 130, "O", letterManagerInstance, [WORDS[1]]);
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 3, 130, "O", letterManagerInstance, [WORDS[3]]);
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 1, 240, "D", letterManagerInstance, [WORDS[2], WORDS[1]]);
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 2, 240, "O", letterManagerInstance, [WORDS[2]]);
            await letterCellManagerInstance.CreateLetterCell(game, GAME_WIDTH / 4 * 3, 240, "G", letterManagerInstance, [WORDS[2], WORDS[3]]);
            //console.log(letterCellManagerInstance.getCellFromArrayByIndex(1));
            resolve();
        });
    }

    setInputEvents(game) {
        return new Promise(async (resolve) => {
            inputManagerInstance.addEventAllTheLetterObject(letterManagerInstance.letterObjects, game);
            inputManagerInstance.addSceneEvents(game);
            inputManagerInstance.addShuffleEvent(game);
        });
    }


}

const sceneInitializerInstance = new sceneInitializer();
export default sceneInitializerInstance;