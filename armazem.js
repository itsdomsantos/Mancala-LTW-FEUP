import Cavidade from "./cavidade.js";

class Armazem extends Cavidade{
    constructor(nSeeds){
        super(nSeeds);

        this.ele = this.draw(); 
    }

    draw(){
        const arm = document.createElement('div');
        arm.classList.add('armazem');
        this.attachListeners(arm);
        return arm;
    }

    attachListeners(arm) { // função que trata de mostrar o número de seeds da cavidade que tem o cursor por cima
        arm.addEventListener('mouseover', (evt) => {
            const numSeeds = document.createElement('span');
            numSeeds.innerText = this.nSeeds;
            numSeeds.classList.add('num-seeds')
            evt.target.append(numSeeds);
        })
        
        arm.addEventListener('mouseout', (evt) => {
            document.querySelector('.num-seeds').remove();
        })
      }
}

export default Armazem;