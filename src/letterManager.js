import { Container, Sprite, Graphics, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letter from "./letter";

class letterManager {
    constructor() {
        if (letterManager.instance) {
            return letterManager.instance;
        }
        else {
            letterManager.instance = this;
        }
        this.letters = [];
        this.letterObjects = [];
    }

    setLetters(words) {
        const uniqueLetters = new Set(); //DEV-NOTE(Batuhan Uysal): ---I WANT TO ONLY ONE SAME CHARACTER IN THE ARRAY SO I USED SET DATA TYPE---

        words.forEach(word => {
            word.split("").forEach(letter => {
                uniqueLetters.add(letter);
            });
        });

        this.letters = Array.from(uniqueLetters);
        console.log("letters chars: " + this.letters);
    }

    createLetters(x, y, game) { //DEV-NOTE(Batuhan Uysal): ---I CREATE A LETTER OBJECT FOR ALL THE LETTER/CHAR---
        return new Promise(async (resolve) => {
            for (let i = 0; i < this.letters.length; i++) {
                const char = this.letters[i];
                const textObject = new Text(char, {
                    fontFamily: 'Arial',
                    fontSize: 74,
                    fill: 0xFF7F00,
                    align: 'center',
                });
                textObject.position.set(x * i, y);
                game.addChild(textObject);
                const letterObject = new letter(char, textObject);
                await new Promise(resolve => setTimeout(resolve, 150));
            }

            resolve();
        });
    }
}

const letterManagerInstance = new letterManager();
export default letterManagerInstance;