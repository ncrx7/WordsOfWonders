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
        if(this.checkUndefinedIndex(index))
        {
            return this.letterCells[index];
        }
        else{
            return -1;
        }
    }

    getAllCellFromArray() {
        return this.letterCells;
    }

    checkUndefinedIndex(index) {
        if (index < this.letterCells.length + 1){
            return true;
        }
        else{
            return false;
        }
    }

    CreateLetterCell(container, x, y, letter, letterManagerInstance) {
        return new Promise((resolve) => {
            let letterCellSprite = Sprite.from("rect");
            
            const cell = new letterCell(x, y, letterManagerInstance.letterObjects.get(letter), letterCellSprite, container, 90);
            this.addCellToArray(cell);
            //console.log("create letter cell" + cell.letterObject.letterChar);
            setTimeout(() => {
                resolve();
            }, 150);
        });
    }


}

const letterCellManagerInstance = new letterCellManager();
export default letterCellManagerInstance;