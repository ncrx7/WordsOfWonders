import { Container, Sprite, Graphics, Text, Assets } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import { WORDS } from "./sceneInitializer"; //TODO: I WILL REMOVE THE DEPENDENCY SCENEINITIALIZER FROM INPUT MANAGER. ACCORDING TO THIS, CREATE A METHOD TO SET WORD IN SI. .
import letterCellManagerInstance from "./letterCellManager";
import letterManagerInstance from "./letterManager";

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
        this.inputTextObjectOnInteract = [];
    }

    addSceneEvents(game) {
        //game.on("pointermove", this.onPointerMoveOnGameContainer);
        game.eventMode = 'static';
        game.cursor = 'pointer'

        game.on("pointermove", this.onPointerMoveOnGameContainer.bind(this));
    }

    addShuffleEvent(game)
    {
        letterManagerInstance.shuffleSprite.eventMode = "static";
        letterManagerInstance.shuffleSprite.cursor = "pointer";
        letterManagerInstance.shuffleSprite.on("pointerdown", this.onClickShuffleButton.bind(this));
    }

    addEventAllTheLetterObject(letterObjects, game) {
        game.addChild(this.inputLineGraphic);

        for (const letterObject of letterObjects.values()) {
            letterObject.textObject.eventMode = 'static';
            letterObject.textObject.cursor = 'pointer';
            letterObject.textObject
                .on("pointerdown", this.onClickDownLetterObject.bind(this))
                .on("pointerup", (event) => this.onClickUpLetterObject(event, game))
                .on('pointerupoutside', (event) => this.onClickUpLetterObject(event, game))
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

        this.setTextPropertiesOnInteract(eventArgs.currentTarget);
        this.inputTextObjectOnInteract.push(eventArgs.currentTarget);

        console.log("input word" + this.inputWord);
    }

    onClickUpLetterObject(eventArgs, container) {
        //TODO: COMPRASE INPUT WORD AND WORD ARRAY IF EXIST START THE LETTER PLACE CELL ALGORTIHM
        if(WORDS.includes(this.inputWord))
        {
            console.log("CORRECT!!");
            letterCellManagerInstance.findRelationCell(this.inputWord, container);
            
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
        this.setTextPropertiesOutInteract();
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
                this.setTextPropertiesOnInteract(eventArgs.currentTarget);
                this.inputTextObjectOnInteract.push(eventArgs.currentTarget);
                //TODO: MAKE A ORANGE CIRCLE AROUND THE LETTER AND MAKE LETTER WHITE AND DISPLAY THE WORD UI ABOVE AND FIX INPUT LINE IN HOVER POS
                console.log("ITS HOVERED" + " -" +this.inputWord);
                this.mouseDownStartingPosX = eventArgs.data.global.x;
                this.mouseDownStartingPosY = eventArgs.data.global.y;
            }
            else
            {
                console.log("letter alrady exist in input word!");
            }

        }
    }

    onClickShuffleButton(eventArgs)
    {
        letterManagerInstance.shuffleLetters();
    }

    setInputLine(currentPointerPositionX, currentPointerPositionY)
    {
        this.inputLineGraphic.clear(); 
        this.inputLineGraphic.lineStyle(6, 0xFF7F00);
        this.inputLineGraphic.moveTo(this.mouseDownStartingPosX, this.mouseDownStartingPosY);
        this.inputLineGraphic.lineTo(currentPointerPositionX, currentPointerPositionY);
    }

    setTextPropertiesOnInteract(textObject)
    {
        textObject.style.fill = 0xFFFFFF;
        textObject.scale.set(1.1, 1.1);
    }

    setTextPropertiesOutInteract()
    {
        for (const textObject of this.inputTextObjectOnInteract) {
            textObject.style.fill = 0xFF7F00;
            textObject.scale.set(1, 1);
        }
    }
}

const inputManagerInstance = new inputManager();
export default inputManagerInstance;