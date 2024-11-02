import { Sprite } from "pixi.js";
import { gsap } from "gsap";
import uiAnimationManagerInstance from "./uiAnimationManager";
import timeManagerInstance from "./timeManager";
import { WORDS } from "./sceneInitializer";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import letterManagerInstance from "./letterManager";

class tutorialManager {
    constructor() {
        if (tutorialManager.instance) {
            return tutorialManager.instance;
        }
        else {
            tutorialManager.instance = this;
        }

        this.handSprite;
        this.isTutorialActive;

        gsap.ticker.add(() => {
            this.tutorialCheckLoop();
          });
    }

    createHandSprite(gameContainer) {
        return new Promise(async (resolve) => {
            this.handSprite = Sprite.from("hand");
            this.handSprite.pivot.set(this.handSprite.texture.width / 2, this.handSprite.texture.height / 2);
            this.handSprite.position.set(0, 0);
            this.handSprite.scale.set(0.4, 0.4);
            this.handSprite.visible = false;

            gameContainer.addChild(this.handSprite);

            resolve();
        });
    }

    setHandSpriteVisibility(state) {
        this.handSprite.visible = state;
    }

    async moveHand() {
        this.handSprite.visible = true;
        this.handSprite.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2); 

        let wordIndex = Math.floor(Math.random() * WORDS.length);
        let chosenWord = WORDS[wordIndex];

        for (const wordLetter of chosenWord) {
            if (letterManagerInstance.letterObjects.has(wordLetter))
            {
                this.setHandSpriteVisibility(true)
                const letterObject = letterManagerInstance.letterObjects.get(wordLetter);
                //console.log("letter object position: --->" + letterObject.positionX);
                uiAnimationManagerInstance.moveSpriteToTarget(this.handSprite, letterObject.positionX, letterObject.positionY + 60, 1, () => {this.setHandSpriteVisibility(false) }); 
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }

    tutorialCheckLoop()
    {
        if(timeManagerInstance.sceneTimeCounter > 2 && !this.isTutorialActive)
        {
            this.isTutorialActive = true;
            console.log("working update" + "--" + this.isTutorialActive);
            this.moveHand();
        }

        if(timeManagerInstance.sceneTimeCounter < 0.3)
        {
            this.isTutorialActive = false;
        }
    }
}

const tutorialManagerInstance = new tutorialManager();
export default tutorialManagerInstance;