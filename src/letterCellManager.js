import { Container, Sprite, Graphics, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letterCell from "./letterCell";
import uiAnimationManager from "./uiAnimationManager";

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

    findRelationCell(inputWord, gameContainer) {
        console.log("moveLetterToLetterCell HAS WORKED!!: " + inputWord);
        for (const letterCellObject of this.letterCells) { //TODO: METHODS WORKS WITH O(N^2) TIME, MAKE THIS PROCESS MORE OPTIMIZED ALGORITHM
            for (const wordGroup of letterCellObject.letterGroup) {
                if (wordGroup == inputWord) {
                    //letterCellObject.rectSprite.tint = 0xFF7F00;

                    let cloneTextObjectToMove = new Text(letterCellObject.letterObject.textObject.text, {
                        fontFamily: 'Arial',
                        fontSize: 50,
                        fill: 0xFFFFFF,
                        align: 'center',
                    });
                    
                    cloneTextObjectToMove.position.set(letterCellObject.letterObject.positionX, letterCellObject.letterObject.positionY );

                    uiAnimationManager.moveLetterToRelationCell(cloneTextObjectToMove,
                        letterCellObject.positionX + letterCellObject.letterObject.textObject.width / 2,
                        letterCellObject.positionY + letterCellObject.letterObject.textObject.height / 4,
                         1.5, //TODO: ALL LETTER CELL SETTINGS CAN BE SET ON THE SCENE INIT WITH A METHOD HERE
                        () => {letterCellObject.rectSprite.tint = 0xFF7F00;}
                        );

                    gameContainer.addChild(cloneTextObjectToMove);
                }
            }
        }
    }


}

const letterCellManagerInstance = new letterCellManager();
export default letterCellManagerInstance;