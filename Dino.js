class Dino {
    constructor(brain) {
        this.dWidth = 35;
        this.dHeight = 55;
        this.dX = this.dWidth + 50;
        this.dY = height - this.dHeight - 8;

        this.yVel = 0;
        this.airRes = 0.9;
        this.grav = 1.2;
        this.jumpHeight = -30;
        this.isJumping = false;

        //GA stuff

        this.scr = 0;
        this.fitness = 0;

        if (brain) {
            this.brain = brain.copy();
        } else {
            //inputs: obs x pos, obs y pos, obs vel, dino y, dino vely
            this.brain = new NeuralNetworkModel(11, 55, 2);
        }

    }

    show(img) {
        image(img, this.dX, this.dY, this.dWidth, this.dHeight);
    }

    jump(boolean) {
        if (boolean) {
            if (this.dY == height - this.dHeight - 8) {
                this.yVel += this.jumpHeight;
                this.isJumping = true;
            }
        }
    }

    think(cactus, birds) {
        //espero que esteja funcionando
        let closestC = null;
        let closestDC = Infinity;
        for (let i = 0; i < cactus.length; i++) {
            let distC = (cactus[i].cX + cactus[i].cWidth) - this.dX;
            if (distC < closestDC && distC > 0) {
                closestC = cactus[i];
                closestDC = distC;
            }
        }

        let closestB = null;
        let closestDB = Infinity;
        for (let j = 0; j < birds.length; j++) {
            let distB = (birds[j].bX + birds[j].bWidth) - this.dX;
            if (distB < closestDB && distB > 0) {
                closestB = birds[j];
                closestDB = distB;
            }
        }

        let inputs = [];
        inputs[0] = scrollSpeed / 10; ///isso aqui pode dar problema
        inputs[1] = this.dY / height;
        inputs[2] = this.yVel / 10;

        if (closestC == null && closestB == null) {
            inputs[0] = 0;
            inputs[1] = 0;
            inputs[2] = 0;
            inputs[3] = 0;
            inputs[4] = 0;
            inputs[5] = 0;
            inputs[6] = 0;
            inputs[7] = 0;
            inputs[8] = 0;
            inputs[9] = 0;
            inputs[10] = 0;
        }
        if (closestC != null) {
            inputs[3] = closestC.cX / width;
            inputs[4] = closestC.cY / height;
            inputs[5] = closestC.cWidth / width;
            inputs[6] = closestC.cHeight / height;
            inputs[7] = 0;
            inputs[8] = 0;
            inputs[9] = 0;
            inputs[10] = 0;
        }
        if (closestB != null) {
            inputs[3] = 0;
            inputs[4] = 0;
            inputs[5] = 0;
            inputs[6] = 0;
            inputs[7] = closestB.bX / width;
            inputs[8] = closestB.bY / height;
            inputs[9] = closestB.bWidth / width;
            inputs[10] = closestB.bHeight / height;
        }
        if (closestB != null && closestC != null) {
            inputs[3] = closestC.cX / width;
            inputs[4] = closestC.cY / height;
            inputs[5] = closestC.cWidth / width;
            inputs[6] = closestC.cHeight / height;
            inputs[7] = closestB.bX / width;
            inputs[8] = closestB.bY / height;
            inputs[9] = closestB.bWidth / width;
            inputs[10] = closestB.bHeight / height;
        }

        let output = this.brain.feedForward(inputs);
        // if (output[1] > output[0]) {
        //     this.jump(true);
        // }else {
        //     this.jump(false);
        // }
        // console.log(this.brain.argMax(output));
        this.jump(this.brain.argMax(output));
        // let max = 0;
        // let maxI = 0;
        // for(let i = 0; i < output.length; i++){
        //     if(output[i] > max){
        //         max = output[i];
        //         maxI = i;
        //     }
        // }
        // switch (maxI) {
        //     case 0:
        //         this.jump(true);
        //         break;
        //     case 1:
        //         this.jump(false);
        //         break;
        // }
    }

    update() {
        this.scr++;

        this.dY += this.yVel;
        this.yVel += this.grav;
        this.yVel *= this.airRes;

        //dont fall
        if (this.dY > height - this.dHeight - 8) {
            this.dY = height - this.dHeight - 8;
            this.isJumping = false;
        }
    }

    mutate() {
        this.brain.mutate(0.1);
    }
}
