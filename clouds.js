class Cloud{
    constructor(type){
        this.x = width;
        this.y = random(35, 85);
        this.t = type;
    }

    show(){
        switch (this.t) {
            case 0:
                image(cloud00, this.x, this.y,45, 45);
                break;
            case 1:
                image(cloud01, this.x, this.y,45, 45);
                break;
            case 2:
                image(cloud02, this.x, this.y,45, 45);
                break;
        }
    }

    update(speed){
        this.x -= speed;
    }

    isGone(){
        if(this.x < -80){
            return true;
        } else {
            return false;
        }
    }

}
