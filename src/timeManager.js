import { gsap } from "gsap";

class timeManager {
    constructor() {
        if (timeManager.instance) {
            return timeManager.instance;
        }
        else {
            timeManager.instance = this;
        }

        this.sceneTimeCounter = 0;
        //this.StartUpdatingSceneTimeCounter();   
    }

    startUpdatingSceneTimeCounter()
    {
            this.sceneTimeCounter++;
            console.log(this.sceneTimeCounter);
            gsap.delayedCall(1, () => this.startUpdatingSceneTimeCounter());
    }

}

const timeManagerInstance = new timeManager();
export default timeManagerInstance;