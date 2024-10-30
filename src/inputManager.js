import { Container, Sprite, Graphics, Text, Assets } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import { WORDS } from "./sceneInitializer"; //TODO: I WILL REMOVE THE DEPENDENCY SCENEINITIALIZER FROM INPUT MANAGER. ACCORDING TO THIS, CREATE A METHOD TO SET WORD IN SI. .
import letterCellManagerInstance from "./letterCellManager";

//DEV-NOTE(BATUHAN UYSAL): ---I MADE THIS CLASS SINGLETON TO HAVE ONLY ONE INSTANCE TO MANAGE THE PLAYER INPUTS AND EVENTS FROM ONE PLACE ON THE WHOLE GAME---
class inputManager {
    constructor() {
        if (inputManager.instance) {
            return inputManager.instance;
        }
        else {
            inputManager.instance = this;
        }
        this.isDragging = false;

        this.inputLineGraphic = new Graphics();
        this.inputLineGraphic.visible = false;
        //console.log("drag line visibilty: " + this.dragLineGraphic.visible);
        this.mouseDownStartingPosX;
        this.mouseDownStartingPosY;

        this.inputWord = "";
    }

    addSceneEvents(game) {
        //game.on("pointermove", this.onPointerMoveOnGameContainer);
        game.eventMode = 'static';
        game.cursor = 'pointer'

        game.on("pointermove", this.onPointerMoveOnGameContainer.bind(this));
    }

    addEventAllTheLetterObject(letterObjects, game) {
        game.addChild(this.inputLineGraphic);

        for (const letterObject of letterObjects.values()) {
            letterObject.textObject.eventMode = 'static';
            letterObject.textObject.cursor = 'pointer';
            letterObject.textObject
                .on("pointerdown", this.onClickDownLetterObject.bind(this))
                .on("pointerup", this.onClickUpLetterObject.bind(this))
                .on('pointerupoutside', this.onClickUpLetterObject.bind(this))
                .on("pointerover", this.onHoverLetterObjectWhileDrag.bind(this));     
        }
    }


    onClickDownLetterObject(eventArgs) {
        this.isDragging = true;
        console.log("Clicked down letter object" + this.isDragging + eventArgs.data.global);
        this.mouseDownStartingPosX = eventArgs.data.global.x;
        this.mouseDownStartingPosY = eventArgs.data.global.y;
        this.inputLineGraphic.visible = true;
        this.inputWord += eventArgs.currentTarget.text;
        console.log("input word" + this.inputWord);
        
    }

    onClickUpLetterObject() {
        //TODO: COMPRASE INPUT WORD AND WORD ARRAY IF EXIST START THE LETTER PLACE CELL ALGORTIHM
        if(WORDS.includes(this.inputWord))
        {
            console.log("CORRECT!!");
            letterCellManagerInstance.moveLetterToLetterCell(this.inputWord);
            
        }
        else
        {
            console.log("UNCORRECT!!");
            
        }

        this.isDragging = false;
        console.log("Clicked up letter object" + this.isDragging);
        this.inputLineGraphic.visible = false;
        this.inputLineGraphic.clear();
        this.inputWord = "";
    }

    onPointerMoveOnGameContainer(eventArgs) {
        if (this.isDragging) {
            let currentPointerPosition = eventArgs.data.global;
            //console.log("Pointer is moving on game container!!!!");

            this.setInputLine(currentPointerPosition.x, currentPointerPosition.y);
        }
    }

    onHoverLetterObjectWhileDrag(eventArgs) {
        if(this.isDragging)
        {
            if(!this.inputWord.includes(eventArgs.currentTarget.text))
            {
                this.inputWord += eventArgs.currentTarget.text;
                //TODO: MAKE A ORANGE CIRCLE AROUND THE LETTER AND MAKE LETTER WHITE AND DISPLAY THE WORD UI ABOVE AND FIX INPUT LINE IN HOVER POS
                console.log("ITS HOVERED" + " -" +this.inputWord);
            }
            else
            {
                console.log("letter alrady exist in input word!");
            }

        }
    }

    setInputLine(currentPointerPositionX, currentPointerPositionY)
    {
        this.inputLineGraphic.clear(); 
        this.inputLineGraphic.lineStyle(6, 0xFF7F00);
        this.inputLineGraphic.moveTo(this.mouseDownStartingPosX, this.mouseDownStartingPosY);
        this.inputLineGraphic.lineTo(currentPointerPositionX, currentPointerPositionY);
    }
}

const inputManagerInstance = new inputManager();
export default inputManagerInstance;