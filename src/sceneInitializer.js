import { Container, Sprite, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letterCellManagerInstance from "./letterCellManager";
import letterManagerInstance from "./letterManager";
import inputEventManagerInstance from "./inputEventManager";
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
        
        letterManagerInstance.setLettersFromWords(WORDS); //DEV-NOTE(Batuhan Uysal): ---I MADE IT LIKE THAT BECAUSE IT WOULD BE EASY FOR DEVELOP IF WE WANT TO MORE THAN ONE LEVEL---

        this.playNowContainer = new Container();
        this.previewWordContainer = new Container();
        this.botLetterContainer = new Container();
    }



    async setInitialScene(gameContainer) {
        //console.log("set scene from scene initiliazer");
        await this.setBackground(gameContainer, 0.2, false);
        await this.setPlayNowContainer(gameContainer, 50);
        await this.setPreviewWordContainer(gameContainer, 400);
        await this.setBotLetterContainer(gameContainer);
        await this.setTopLetterCellContainer(gameContainer);
        await this.setSceneInputEvents(gameContainer);
    }

    async setGameFinishScene(gameContainer) {
        await this.setBackground(gameContainer, 0.2, true);
        await this.setPlayNowContainer(gameContainer, 200);
        await this.setCustomText("Batuhan Uysal", 65, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100, gameContainer);
        await this.setCustomText("Thank you very much ", 40, GAME_WIDTH / 2, GAME_HEIGHT / 2, gameContainer);
        await this.setCustomText("for this great opportunity.", 40, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50, gameContainer);
    }

    setBackground(gameContainer, delayAfterLoadBackground, tint) {
        return new Promise((resolve) => {
            let background = Sprite.from("background");
            background.width = GAME_WIDTH;
            background.height = GAME_HEIGHT;
            gameContainer.addChild(background);

            if(tint) background.tint = 0x555555;
            
            setTimeout(() => {
                resolve();
            }, delayAfterLoadBackground * 1000);
        });
    }

    setPlayNowContainer(gameContainer, bottomMargin) {
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

            gameContainer.addChild(this.playNowContainer);

            uiAnimationManagerInstance.playNowContainerAnimation(this.playNowContainer);

            resolve();
        });
    }

    setPreviewWordContainer(gameContainer, bottomMargin)
    {
        return new Promise((resolve) => {
            let previewBackgroundSprite = Sprite.from("rect");
            previewBackgroundSprite.width = 75;
            previewBackgroundSprite.height = 60;
            previewBackgroundSprite.pivot.set(previewBackgroundSprite.texture.width / 2, previewBackgroundSprite.texture.height / 2);
            previewBackgroundSprite.tint = 0xFF7F00;

            let previewText = new Text("", {
                fontFamily: 'Arial',
                fontSize: 30,
                fill: 0xFFFFFF,
                align: 'center',
            });
            previewText.pivot.set(previewText.width / 2, previewText.height / 2);

            previewBackgroundSprite.position.set(0, 0);
            previewText.position.set(0, 0);

            this.previewWordContainer.pivot.set(0.5, 0.5);
            this.previewWordContainer.position.set(GAME_WIDTH / 2, GAME_HEIGHT - bottomMargin);

            this.previewWordContainer.addChild(previewBackgroundSprite);
            this.previewWordContainer.addChild(previewText);

            gameContainer.addChild(this.previewWordContainer);
            
            this.previewWordContainer.visible = false;

            resolve();
        });
    }

    setBotLetterContainer(gameContainer) {
        return new Promise(async (resolve) => {
            await letterManagerInstance.createLetterHolderCircle(this.botLetterContainer);
            await letterManagerInstance.createLetterShuffleButton(this.botLetterContainer);
            await letterManagerInstance.createLetters(100, 650, this.botLetterContainer);
            gameContainer.addChild(this.botLetterContainer);
            resolve();
        });
    }

    //DEV-NOTE-TODO(BATUHAN UYSAL): ---HERE CAN BE PROCEDURAL BY CREATING A GRID SYSTEM AND INCLUDES LETTER AND CELL
    setTopLetterCellContainer(gameContainer) {
        return new Promise(async (resolve) => {
            await letterCellManagerInstance.CreateLetterCell(gameContainer, GAME_WIDTH / 4 * 1, 20, "G", letterManagerInstance, [WORDS[0], WORDS[1]]); //TODO: DEFINE LETTERMANAGER INSTANCE TO LETTERMANAGER INSTANCE
            await letterCellManagerInstance.CreateLetterCell(gameContainer, GAME_WIDTH / 4 * 2, 20, "O", letterManagerInstance, [WORDS[0]]);
            await letterCellManagerInstance.CreateLetterCell(gameContainer, GAME_WIDTH / 4 * 3, 20, "L", letterManagerInstance, [WORDS[0], WORDS[3]]);
            await letterCellManagerInstance.CreateLetterCell(gameContainer, GAME_WIDTH / 4 * 4, 20, "D", letterManagerInstance, [WORDS[0]]);
            await letterCellManagerInstance.CreateLetterCell(gameContainer, GAME_WIDTH / 4 * 1, 130, "O", letterManagerInstance, [WORDS[1]]);
            await letterCellManagerInstance.CreateLetterCell(gameContainer, GAME_WIDTH / 4 * 3, 130, "O", letterManagerInstance, [WORDS[3]]);
            await letterCellManagerInstance.CreateLetterCell(gameContainer, GAME_WIDTH / 4 * 1, 240, "D", letterManagerInstance, [WORDS[2], WORDS[1]]);
            await letterCellManagerInstance.CreateLetterCell(gameContainer, GAME_WIDTH / 4 * 2, 240, "O", letterManagerInstance, [WORDS[2]]);
            await letterCellManagerInstance.CreateLetterCell(gameContainer, GAME_WIDTH / 4 * 3, 240, "G", letterManagerInstance, [WORDS[2], WORDS[3]]);
            //console.log(letterCellManagerInstance.getCellFromArrayByIndex(1));
            resolve();
        });
    }

    setCustomText(text, fontSize, textPositionX, textPositionY, gameContainer) {
        return new Promise(async (resolve) => {
            const customTextObject = new Text(text, {
                fontFamily: 'Arial',
                fontSize: fontSize,
                fill: 0xFF7F00,
                align: 'center',
            });

            customTextObject.pivot.set(customTextObject.width / 2, customTextObject.height / 2);
            customTextObject.position.set(textPositionX, textPositionY);
            gameContainer.addChild(customTextObject);

            resolve();
        });
    }

    setSceneInputEvents(gameContainer) {
        return new Promise(async (resolve) => {
            inputEventManagerInstance.addEventAllTheLetterObject(letterManagerInstance.letterObjects, gameContainer);
            inputEventManagerInstance.addSceneEvents(gameContainer);
            inputEventManagerInstance.addShuffleEvent(gameContainer);
        });
    }

}

const sceneInitializerInstance = new sceneInitializer();
export default sceneInitializerInstance;