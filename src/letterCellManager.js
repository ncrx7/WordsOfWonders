import { Container, Sprite, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letterCell from "./letterCell";

//DEV-NOTE(BATUHAN UYSAL): ---I MADE THIS CLASS SINGLETON TO HAVE ONLY ONE INSTANCE TO MANAGE THE LETTER CELLS FROM ONE PLACE ON THE WHOLE GAME---
class letterCellManager {
    constructor() {
        if (letterCellManager.instance) {
            return letterCellManager.instance;
        }
        else {
            letterCellManager.instance = this;
        }

        this.letterCells = [];
    }

    addCellToArray(cell) {
        this.letterCells.push(cell);
    }

    getCellFromArrayByIndex(index) {
        if (this.checkUndefinedIndex(index)) {
            return this.letterCells[index];
        }
        else {
            return -1;
        }
    }

    getAllCellFromArray() {
        return this.letterCells;
    }

    checkUndefinedIndex(index) {
        if (index < this.letterCells.length + 1) {
            return true;
        }
        else {
            return false;
        }
    }

    CreateLetterCell(container, x, y, letter, letterManagerInstance, letterGroup) {
        return new Promise((resolve) => {
            let letterCellSprite = Sprite.from("rect");
            const cell = new letterCell(letterGroup, x, y, letterManagerInstance.letterObjects.get(letter), letterCellSprite, container, 90);
            this.addCellToArray(cell);
            //console.log("create letter cell" + cell.letterObject.letterChar);
            setTimeout(() => {
                resolve();
            }, 150);
        });
    }

    moveLetterToLetterCell(inputWord) {
        console.log("moveLetterToLetterCell HAS WORKED!!: " + inputWord);
        for (const letterObject of this.letterCells) { //TODO: METHODS WORKS WITH O(N^2) TIME, MAKE THIS PROCESS MORE OPTIMIZED ALGORITHM
            for (const wordGroup of letterObject.letterGroup) {
                //letterObject.textObject.
                if (wordGroup == inputWord) {
                    letterObject.rectSprite.alpha = 0.2;
                    console.log("RECT HAS BEEN ALPHAD!!");
                    console.log("letter object letter group is: " + wordGroup);

                }
            }
        }
    }
}

const letterCellManagerInstance = new letterCellManager();
export default letterCellManagerInstance;