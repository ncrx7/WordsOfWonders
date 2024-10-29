import { Container, Sprite, Graphics, Text, Assets } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letter from "./letter";

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
        this.letterPositions = [];
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

    setLettersFixedPositionsData()
    {
        this.letterPositions = [ [GAME_WIDTH / 4 * 1.3, 550], [GAME_WIDTH / 2 + GAME_WIDTH / 4 * 0.85, 550], [GAME_WIDTH / 2 + GAME_WIDTH / 25, 450], [GAME_WIDTH / 2 + GAME_WIDTH / 25, 630] ]
        //console.log("poses: " + this.letterPositions[0][0]);
        
    }

    createLetters(x, y, game) { //DEV-NOTE(Batuhan Uysal): ---I CREATE A LETTER OBJECT FOR ALL THE LETTER/CHAR--- //TODO: LETTER SCALE ANIMATION
        return new Promise(async (resolve) => {
            
            //TODO: HERE WILL BE MOVE
            let letterHoldercircleSprite = Sprite.from("circle");
            letterHoldercircleSprite.pivot.set(letterHoldercircleSprite.width / 2, letterHoldercircleSprite.height / 2);
            letterHoldercircleSprite.position.set(GAME_WIDTH / 2 + 30, 570);
            letterHoldercircleSprite.scale.set(0.045, 0.045);
            letterHoldercircleSprite.alpha = 0.4;

            let letterContainer = new Container();
            game.addChild(letterContainer);
            letterContainer.addChild(letterHoldercircleSprite);
            letterContainer.position.x -= 28;

            this.setLettersFixedPositionsData();
            for (let i = 0; i < this.letters.length; i++) {
                const char = this.letters[i];
                const textObject = new Text(char, {
                    fontFamily: 'Arial',
                    fontSize: 50,
                    fill: 0xFF7F00,
                    align: 'center',
                });

                //textObject.eventMode = 'static';
                //textObject.cursor = 'pointer';
                //textObject.on("pointer")
                letterContainer.addChild(textObject);
        
                const letterObject = new letter(this.letterPositions[i][0], this.letterPositions[i][1], char, textObject);
                this.letterObjects.set(char, letterObject);
                //console.log("MAP: " + this.letterObjects.get(char).positionX);
                await new Promise(resolve => setTimeout(resolve, 300));
            }
                
            resolve();
        });
    }
}

const letterManagerInstance = new letterManager();
export default letterManagerInstance;