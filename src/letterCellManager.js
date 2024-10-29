import { Container, Sprite, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letterCell from "./letterCell";

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

    CreateLetterCell(container, x, y, letter) {
        return new Promise((resolve) => {
            let letterCellSprite = Sprite.from("rect");
            
            const cell = new letterCell(x, y, letter, letterCellSprite, container, 90);
            this.addCellToArray(cell);
            console.log("create letter cell" + this.letterCells.length);
            setTimeout(() => {
                resolve();
            }, 150);
        });
    }


}

const letterCellManagerInstance = new letterCellManager();
export default letterCellManagerInstance;