class Bird{
    constructor(type){
        this.t = type;
        this.bWidth = 30;
        this.bHeight = 30;
        switch (this.t) {
            case 0:
                this.bX = width;
                this.bY = height - (this.bHeight + 30);
                break;
            case 1:
                this.bX = width;
                this.bY = height - (this.bHeight + 20);
                break;
        }
    }

    show(img){
        image(img, this.bX, this.bY, this.bWidth, this.bHeight);
    }

    update(speed){
        this.bX -= speed;
    }

    hits(dino){
        let dR = dino.dX + dino.dWidth/2;
        let dL = dino.dX - dino.dWidth/2;
        let dUp = dino.dY + dino.dHeight/2;
        let dD = dino.dY - dino.dHeight/2

        let bR = this.bX + this.bWidth/2;
        let bL = this.bX - this.bWidth/2;
        let bUp = this.bY + this.bHeight/2
        let bD = this.bY - this.bHeight/2
        if((dL <= bR && dR >= bL) || (bL <= dR && bR >= dL)){
            if((dD <= bUp && dUp >= bD) || (bD <= dUp && bUp >= dD)){
                return true;
            }
        }
        return false;
    }

    isGone(){
        if(this.x < - this.bWidth){
            return true;
        } else {
            return false;
        }
    }
}
