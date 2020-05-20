function nextGen() {
    fitnessCalc();
    for (let i = 0; i < POP; i++) {
        dinos[i] = pickDino();
    }
    savedDinos = [];
}

function pickDino(){
    //if you want add crossover here
    var index = 0;
    var r = random(1);
    while(r > 0) {
        r = r - savedDinos[index].fitness;
        index++;
    }
    index--;

    let dino = savedDinos[index];
    let child = new Dino(dino.brain);
    child.mutate();
    return child;
}


function fitnessCalc() {
    let sum = 0;
    for (let dino of savedDinos) {
        sum += dino.scr;
    }

    for (let dino of savedDinos) {
        dino.fitness = dino.scr / sum;
    }
}
