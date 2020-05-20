class LittleP{
    constructor(){
        this.x = 800;
        this.y = random(184, 198);
    }

    show(){
        noStroke();
        fill(50, 50, 50);
        rect(this.x, this.y, 10, 1.5);
    }

    update(speed){
        this.x -= speed;
    }

    isGone(){
        if(this.x < - 0.5){
            return true;
        } else {
            return false;
        }
    }
}
