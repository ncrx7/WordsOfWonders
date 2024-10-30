import { Container, Sprite, Graphics, Text, Assets } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import sceneInitializerInstance, { WORDS } from "./sceneInitializer"; //TODO: I WILL REMOVE THE DEPENDENCY SCENEINITIALIZER FROM INPUT MANAGER. ACCORDING TO THIS, CREATE A METHOD TO SET WORD IN SI. .
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
        this.inputLinesArray = [];

        this.mouseDownStartingPosX;
        this.mouseDownStartingPosY;

        this.inputWord = "";
        this.inputTextObjectsOnInteract = [];

        this.inputWordsFound = [];
    }

    addSceneEvents(game) {
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

    addEventAllTheLetterObject(letterObjects, container) {
        //game.addChild(this.inputLineGraphic);

        for (const letterObject of letterObjects.values()) {
            letterObject.textObject.eventMode = 'static';
            letterObject.textObject.cursor = 'pointer';
            letterObject.textObject
                .on("pointerdown", (event) => this.onClickDownLetterObject(event, container))
                .on("pointerup", (event) => this.onClickUpLetterObject(event, container))
                .on('pointerupoutside', (event) => this.onClickUpLetterObject(event, container))
                .on("pointerover", (event) => this.onHoverLetterObjectWhileDrag(event, container));     
        }
    }


    onClickDownLetterObject(eventArgs, container) {
        this.isDragging = true;
        console.log("Clicked down letter object" + this.isDragging + eventArgs.data.global);
        this.mouseDownStartingPosX = eventArgs.data.global.x;
        this.mouseDownStartingPosY = eventArgs.data.global.y;

        this.createInputLine(container);

        this.inputWord += eventArgs.currentTarget.text;
        sceneInitializerInstance.previewWordContainer.visible = true;
        sceneInitializerInstance.previewWordContainer.children[1].text = this.inputWord;
        sceneInitializerInstance.previewWordContainer.children[0].width = this.inputWord.length * 50;

        this.setTextPropertiesOnInteract(eventArgs.currentTarget);
        this.inputTextObjectsOnInteract.push(eventArgs.currentTarget);

        console.log("input word" + this.inputWord);
    }

    onClickUpLetterObject(eventArgs, container) {
        //TODO: COMPRASE INPUT WORD AND WORD ARRAY IF EXIST START THE LETTER PLACE CELL ALGORTIHM
        if(WORDS.includes(this.inputWord) && !this.inputWordsFound.includes(this.inputWord))
        {
            console.log("CORRECT!!");
            letterCellManagerInstance.findRelationCell(this.inputWord, container);
            this.inputWordsFound.push(this.inputWord);
        }
        else
        {
            console.log("UNCORRECT!!");
            
        }

        this.isDragging = false;
        console.log("Clicked up letter object" + this.isDragging);
        
        this.inputLineGraphic.clear();
        this.inputWord = "";
        sceneInitializerInstance.previewWordContainer.visible = false;
        this.clearInputLines(container);
        this.setTextPropertiesOutInteract();
    }

    onPointerMoveOnGameContainer(eventArgs) {
        if (this.isDragging) {
            let currentPointerPosition = eventArgs.data.global;
            //console.log("Pointer is moving on game container!!!!");

            this.updateInputLine(currentPointerPosition.x, currentPointerPosition.y);
        }
    }

    onHoverLetterObjectWhileDrag(eventArgs, container) {
        if(this.isDragging)
        {
            if(!this.inputWord.includes(eventArgs.currentTarget.text))
            {
                this.inputWord += eventArgs.currentTarget.text;
                sceneInitializerInstance.previewWordContainer.children[1].text = this.inputWord;
                sceneInitializerInstance.previewWordContainer.children[0].width = this.inputWord.length * 50;

                this.setTextPropertiesOnInteract(eventArgs.currentTarget);
                this.inputTextObjectsOnInteract.push(eventArgs.currentTarget);
                //TODO: MAKE A ORANGE CIRCLE AROUND THE LETTER AND MAKE LETTER WHITE AND DISPLAY THE WORD UI ABOVE AND FIX INPUT LINE IN HOVER POS

                this.createInputLine(container);

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

    //TODO: MOVE INPUT LINE METHODS ANOTHER CLASS NAMED INPUTLINEMANAGER.JS
    createInputLine(game)
    {
        this.inputLineGraphic = new Graphics();
        this.inputLinesArray.push(this.inputLineGraphic); 
        game.addChild(this.inputLineGraphic);
    }

    updateInputLine(currentPointerPositionX, currentPointerPositionY)
    {
        this.inputLineGraphic.clear(); 
        this.inputLineGraphic.lineStyle(6, 0xFF7F00);
        this.inputLineGraphic.moveTo(this.mouseDownStartingPosX, this.mouseDownStartingPosY);
        this.inputLineGraphic.lineTo(currentPointerPositionX, currentPointerPositionY);
    }

    clearInputLines(container)
    {
        for (const inputLine of this.inputLinesArray) {
            container.removeChild(inputLine);
        }
    }

    setTextPropertiesOnInteract(textObject)
    {
        textObject.style.fill = 0xFFFFFF;
        textObject.scale.set(1.1, 1.1);
    }

    setTextPropertiesOutInteract()
    {
        for (const textObject of this.inputTextObjectsOnInteract) {
            textObject.style.fill = 0xFF7F00;
            textObject.scale.set(1, 1);
        }
    }
}

const inputManagerInstance = new inputManager();
export default inputManagerInstance;