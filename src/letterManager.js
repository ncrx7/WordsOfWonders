import { Container, Sprite, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letter from "./letter";
import uiAnimationManagerInstance from "./uiAnimationManager";

//DEV-NOTE(BATUHAN UYSAL): ---I MADE THIS CLASS SINGLETON TO HAVE ONLY ONE INSTANCE TO MANAGE ALL LETTER FROM ONE PLACE ON THE WHOLE GAME---
class letterManager {
    constructor() {
        if (letterManager.instance) {
            return letterManager.instance;
        }
        else {
            letterManager.instance = this;
        }
        this.letters = [];
        this.letterObjects = new Map();
        this.letterFixedPositionsOnScene = [];
        this.shuffleSprite;
        this.isFixedPositionDataDefined = false;
    }

    setLettersFromWords(words) {
        const uniqueLetters = new Set(); //DEV-NOTE(Batuhan Uysal): ---I WANT TO ONLY ONE SAME CHARACTER IN THE ARRAY SO I USED SET DATA TYPE---

        words.forEach(word => {
            word.split("").forEach(letter => {
                uniqueLetters.add(letter);
            });
        });

        this.letters = Array.from(uniqueLetters);
        //console.log("letters chars: " + this.letters);
    }

    setLettersFixedPositionsData() {
        this.letterFixedPositionsOnScene = [[GAME_WIDTH / 4 * 1.3, 550], [GAME_WIDTH / 2 + GAME_WIDTH / 4 * 0.85, 550], [GAME_WIDTH / 2 + GAME_WIDTH / 25, 450], [GAME_WIDTH / 2 + GAME_WIDTH / 25, 630]]
        //console.log("poses: " + this.letterPositions[0][0]);
        this.isFixedPositionDataDefined = true;
    }

    createLetterHolderCircle(botLetterContainer) {
        return new Promise(async (resolve) => {
            let letterHoldercircleSprite = Sprite.from("circle");
            letterHoldercircleSprite.pivot.set(letterHoldercircleSprite.width / 2, letterHoldercircleSprite.height / 2);
            letterHoldercircleSprite.position.set(GAME_WIDTH / 2 + 30, 570);
            letterHoldercircleSprite.scale.set(0.045, 0.045);
            letterHoldercircleSprite.alpha = 0.4;

            botLetterContainer.addChild(letterHoldercircleSprite);

            resolve();
        });
    }

    createLetterShuffleButton(botLetterContainer) {
        return new Promise(async (resolve) => {
            this.shuffleSprite = Sprite.from("shuffle");
            this.shuffleSprite.pivot.set(this.shuffleSprite.width / 2, this.shuffleSprite.height / 2);
            this.shuffleSprite.position.set(GAME_WIDTH / 2 + 30, 570);
            this.shuffleSprite.scale.set(0.07, 0.07);

            botLetterContainer.addChild(this.shuffleSprite);
            
            resolve();
        });
    }

    createLetters(x, y, botLetterContainer) { //DEV-NOTE(Batuhan Uysal): ---I CREATE A LETTER OBJECT FOR ALL THE LETTER/CHAR--- //TODO: LETTER SCALE ANIMATION
        return new Promise(async (resolve) => {
            botLetterContainer.position.x -= 28;

            this.setLettersFixedPositionsData();
            for (let i = 0; i < this.letters.length; i++) {
                const char = this.letters[i];
                const textObject = new Text(char, {
                    fontFamily: 'Arial',
                    fontSize: 50,
                    fill: 0xFF7F00,
                    align: 'center',
                });

                botLetterContainer.addChild(textObject);

                const letterObject = new letter(this.letterFixedPositionsOnScene[i][0], this.letterFixedPositionsOnScene[i][1], char, textObject);
                this.letterObjects.set(char, letterObject);
                //console.log("MAP: " + this.letterObjects.get(char).positionX);
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            resolve();
        });
    }

    shuffleLetters() {
        if (this.isFixedPositionDataDefined) {
            //console.log("shuffle letters!!");
            let positionIndexes = [0, 1, 2, 3];
            for (const letterObject of this.letterObjects.values()) {
                const random = Math.floor(Math.random() * positionIndexes.length);
                const positionIndex = positionIndexes[random];
                if (random > -1 && random < positionIndexes.length) {
                    positionIndexes.splice(random, 1);
                }
                //delete positionIndexes[randomPositionIndex];

                const newLetterObjectPositionX = this.letterFixedPositionsOnScene[positionIndex][0];
                const newLetterObjectPositionY = this.letterFixedPositionsOnScene[positionIndex][1];
                //console.log(newLetterObjectPositionX + "----------" + newLetterObjectPositionY)

                uiAnimationManagerInstance.moveLetterToTarget(letterObject.textObject, newLetterObjectPositionX, newLetterObjectPositionY, 1, () => { })
            }
        }

    }

}

const letterManagerInstance = new letterManager();
export default letterManagerInstance;