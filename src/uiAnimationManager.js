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
}

const uiAnimationManagerInstance = new uiAnimationManager();
export default uiAnimationManagerInstance;