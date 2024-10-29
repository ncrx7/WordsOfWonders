//import gsap, { Power0 } from "gsap";
import { Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import uiAnimationManager from "./uiAnimationManager";
import sceneInitializerInstance from "./sceneInitializer";

export default class Game extends Container {

  constructor() {
    super();

    this.init();
  }

  init() {
    let logoSprite = Sprite.from("logo");
    this.SetLogoSprite(logoSprite);
    uiAnimationManager.playLogoAnimationOnStart(logoSprite, 0.6, 1, 1.5, 0.5, () => {
      this.removeChild(logoSprite);
      //DEV-NOTE(BATUHAN UYSAL): !!!!IF WE DONT USE THIS SPRITE AGAIN IN-GAME, WE HAVE TO DELETE THIS SPRITE FROM THE MEMORY TO OPTIMIZE MEMORY ALLOCATION!!!!
      //sprite.destroy({ children: true, texture: true, baseTexture: true }); 
      //console.log("callback animation workd")
      sceneInitializerInstance.SetScene(this);
    });

    
  }

  SetLogoSprite(sprite) {
    sprite.anchor.set(0.5);
    sprite.scale.set(0.5);
    this.addChild(sprite);
    sprite.x = GAME_WIDTH * 0.5;
    sprite.y = GAME_HEIGHT * 0.5;
  }
}
