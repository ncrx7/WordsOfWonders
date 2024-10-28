import { Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";

//DEV-NOTE(BATUHAN UYSAL): ---I MAKE THIS CLASS SINGLETON TO HAVE ONLY ONE INSTANCE FOR UI ANIMATIONS ON THE WHOLE GAME---
class sceneInitializer {
    constructor() {
        if (sceneInitializer.instance) {
            return sceneInitializer.instance;
        }
        else {
            sceneInitializer.instance = this;
        }
    }

    async SetScene(game) {
        console.log("set scene from scene initiliazer")
        await this.SetBackground(game);
      }
    
    SetBackground(game) {
        return new Promise((resolve) => {
            let background = Sprite.from("background");
            background.width = GAME_WIDTH;
            background.height = GAME_HEIGHT;
            game.addChild(background);
            resolve();
        });
      }
}

const sceneInitializerInstance = new sceneInitializer();
export default sceneInitializerInstance;