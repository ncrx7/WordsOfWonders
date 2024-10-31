import { Graphics } from "pixi.js";
import sceneInitializerInstance, { WORDS } from "./sceneInitializer"; //TODO: I WILL REMOVE THE DEPENDENCY SCENEINITIALIZER FROM INPUT MANAGER. ACCORDING TO THIS, CREATE A METHOD TO SET WORD IN SI. .
import letterCellManagerInstance from "./letterCellManager";
import letterManagerInstance from "./letterManager";

//DEV-NOTE(BATUHAN UYSAL): ---I MADE THIS CLASS SINGLETON TO HAVE ONLY ONE INSTANCE TO MANAGE THE PLAYER INPUTS AND EVENTS FROM ONE PLACE ON THE WHOLE GAME---
class inputEventManager {
    constructor() {
        if (inputEventManager.instance) {
            return inputEventManager.instance;
        }
        else {
            inputEventManager.instance = this;
        }
        this.isDragging = false;

        this.inputLineGraphic = new Graphics();
        this.inputLinesArray = [];

        this.pointerDownStartingPosX;
        this.pointerDownStartingPosY;

        this.inputWord = "";
        this.inputTextObjectsOnInteract = [];

        this.inputWordsFound = [];
    }

    addSceneEvents(gameContainer) {
        gameContainer.eventMode = 'static';
        gameContainer.cursor = 'pointer'

        gameContainer.on("pointermove", this.onPointerMoveOnGameContainer.bind(this));
    }

    addShuffleEvent(gameContainer)
    {
        letterManagerInstance.shuffleSprite.eventMode = "static";
        letterManagerInstance.shuffleSprite.cursor = "pointer";
        letterManagerInstance.shuffleSprite.on("pointerdown", this.onClickShuffleButton.bind(this));
    }

    addEventAllTheLetterObject(letterObjects, gameContainer) {
        //game.addChild(this.inputLineGraphic);

        for (const letterObject of letterObjects.values()) {
            letterObject.textObject.eventMode = 'static';
            letterObject.textObject.cursor = 'pointer';
            letterObject.textObject
                .on("pointerdown", (event) => this.onClickDownLetterObject(event, gameContainer))
                .on("pointerup", (event) => this.onClickUpLetterObject(event, gameContainer))
                .on('pointerupoutside', (event) => this.onClickUpLetterObject(event, gameContainer))
                .on("pointerover", (event) => this.onHoverLetterObjectWhileDrag(event, gameContainer));     
        }
    }


    onClickDownLetterObject(eventArgs, gameContainer) {
        this.isDragging = true;
        console.log("Clicked down letter object" + this.isDragging + eventArgs.data.global);
        this.pointerDownStartingPosX = eventArgs.data.global.x;
        this.pointerDownStartingPosY = eventArgs.data.global.y;

        this.createInputLine(gameContainer);

        this.inputWord += eventArgs.currentTarget.text;
        sceneInitializerInstance.previewWordContainer.visible = true;
        sceneInitializerInstance.previewWordContainer.children[1].text = this.inputWord;
        sceneInitializerInstance.previewWordContainer.children[0].width = this.inputWord.length * 50;

        this.setTextPropertiesOnInteract(eventArgs.currentTarget);
        this.inputTextObjectsOnInteract.push(eventArgs.currentTarget);

        console.log("input word" + this.inputWord);
    }

    onClickUpLetterObject(eventArgs, gameContainer) {
        //TODO: COMPARE INPUT WORD AND WORD ARRAY IF EXIST START THE LETTER PLACE CELL ALGORTIHM
        if(WORDS.includes(this.inputWord) && !this.inputWordsFound.includes(this.inputWord))
        {
            console.log("CORRECT!!");
            letterCellManagerInstance.findLetterRelationWithCell(this.inputWord, gameContainer);
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
        this.clearInputLines(gameContainer);
        this.setTextPropertiesOutInteract();
    }

    onPointerMoveOnGameContainer(eventArgs) {
        if (this.isDragging) {
            let currentPointerPosition = eventArgs.data.global;
            //console.log("Pointer is moving on game container!!!!");

            this.updateInputLine(currentPointerPosition.x, currentPointerPosition.y);
        }
    }

    onHoverLetterObjectWhileDrag(eventArgs, gameContainer) {
        if(this.isDragging)
        {
            if(!this.inputWord.includes(eventArgs.currentTarget.text))
            {
                this.inputWord += eventArgs.currentTarget.text;
                sceneInitializerInstance.previewWordContainer.children[1].text = this.inputWord;
                
              /*   sceneInitializerInstance.previewWordContainer.children[1].position.set(
                    sceneInitializerInstance.previewWordContainer.children[1].position.x - 10,
                    sceneInitializerInstance.previewWordContainer.children[1].position.y
                ); */

                sceneInitializerInstance.previewWordContainer.children[0].width = this.inputWord.length * 50;

                this.setTextPropertiesOnInteract(eventArgs.currentTarget);
                this.inputTextObjectsOnInteract.push(eventArgs.currentTarget);
                //TODO: MAKE A ORANGE CIRCLE AROUND THE LETTER AND MAKE LETTER WHITE AND DISPLAY THE WORD UI ABOVE AND FIX INPUT LINE IN HOVER POS

                this.createInputLine(gameContainer);

                this.pointerDownStartingPosX = eventArgs.data.global.x;
                this.pointerDownStartingPosY = eventArgs.data.global.y;
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
    createInputLine(gameContainer)
    {
        this.inputLineGraphic = new Graphics();
        this.inputLinesArray.push(this.inputLineGraphic); 
        gameContainer.addChild(this.inputLineGraphic);
    }

    updateInputLine(currentPointerPositionX, currentPointerPositionY)
    {
        this.inputLineGraphic.clear(); 
        this.inputLineGraphic.lineStyle(6, 0xFF7F00);
        this.inputLineGraphic.moveTo(this.pointerDownStartingPosX, this.pointerDownStartingPosY);
        this.inputLineGraphic.lineTo(currentPointerPositionX, currentPointerPositionY);
    }

    clearInputLines(gameContainer)
    {
        for (const inputLine of this.inputLinesArray) {
            gameContainer.removeChild(inputLine);
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

const inputManagerInstance = new inputEventManager();
export default inputManagerInstance;