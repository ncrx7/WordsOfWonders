import gsap from "gsap";

//DEV-NOTE(BATUHAN UYSAL): ---I MADE THIS CLASS SINGLETON TO HAVE ONLY ONE INSTANCE FOR UI ANIMATIONS FROM ONE PLACE ON THE WHOLE GAME---
class uiAnimationManager {
    constructor() {
        if (uiAnimationManager.instance) {
            return uiAnimationManager.instance;
        }
        else {
            uiAnimationManager.instance = this;
        }
    }

    //DEV-NOTE(BATUHAN UYSAL): ---WE CAN GIVE A FUNCTION AS A PARAMETER TO DEFINE ON COMPLETE CALLBACK---
    playLogoAnimationOnStart(sprite, logoScaleAmount, logoRepeatAmount, logoRepeatDurationTime, fadeAnimDurationTime, callBack) {
        gsap.to(sprite, {
            pixi: {
                scale: logoScaleAmount,
            },
            duration: logoRepeatDurationTime,
            repeat: logoRepeatAmount,
            yoyo: true,
            ease: "sine.easeInOut",
            onComplete: () => {
                gsap.to(sprite, {
                    alpha: 0,
                    duration: fadeAnimDurationTime,
                    onComplete: callBack    
                })
            }
        });
    }
    
    moveLetterToTarget(textObject, targetCellPositionX, targetCellPositionY, moveDuration, callback)
    {
        gsap.to(textObject.position, {
            duration: moveDuration, 
            x: targetCellPositionX, 
            y: targetCellPositionY, 
            ease: "power1.out", 
            onComplete: () => {
                console.log("Letter has reached to the cell belongs!!");
                callback();
            }
        });
    }

    moveSpriteToTarget(sprite, targetPositionX, targetPositionY, moveDuration, callback) {
        gsap.to(sprite.position, {
            duration: moveDuration,
            x: targetPositionX,
            y: targetPositionY,
            ease: "power1.in",
            onComplete: () => {
                console.log("Sprite has reached the target position!");
                if (callback) callback();
            }
        });
    }

    playNowContainerAnimation(playNowContainer)
    {
        console.log("play now container animation!!");
        gsap.to(playNowContainer, {
            pixi: {
                scale: 0.8,
            },
            duration: 0.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.easeInOut",
        });
    }
}

const uiAnimationManagerInstance = new uiAnimationManager();
export default uiAnimationManagerInstance;