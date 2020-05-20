class Cactus{
    constructor(type){
        // this.cWidth = random(15, 50);
        // this.cHeight = random(20, 50);
        this.t = type
        switch (this.t) {
            case 0:
                this.cWidth = 20;
                this.cHeight = 40;
                break;
            case 1:
                this.cWidth = 40;
                this.cHeight = 40;
                break;
            case 2:
                this.cWidth = 20;
                this.cHeight = 50;
                break;
        }
        this.cY = height - this.cHeight - 10;
        this.cX = width;
    }

    show(){
        switch (this.t) {
            case 0:
                image(smallC, this.cX, this.cY, this.cWidth, this.cHeight);
                break;
            case 1:
                image(smallCMany, this.cX, this.cY, this.cWidth, this.cHeight);
                break;
            case 2:
                image(bigC, this.cX, this.cY, this.cWidth, this.cHeight);
                break;
        }
    }

    update(speed){
        this.cX -= speed;
    }

    isOffScreen(){
        if(this.cX < - this.cWidth){
            return true;
        } else {
            return false;
        }
    }

    hits(dino){
        let dR = dino.dX + dino.dWidth/2;
        let dL = dino.dX - dino.dWidth/2;
        let dUp = dino.dY + dino.dHeight/2;
        let dD = dino.dY - dino.dHeight/2

        let cR = this.cX + this.cWidth/2;
        let cL = this.cX - this.cWidth/2;
        let cUp = this.cY + this.cHeight/2
        let cD = this.cY - this.cHeight/2
        if((dL <= cR && dR >= cL) || (cL <= dR && cR >= dL)){
            if((dD <= cUp && dUp >= cD) || (cD <= dUp && cUp >= dD)){
                return true;
            }
        }
        return false;
    }
}
