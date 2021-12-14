import Cavidades from "./cavidades.js";
import Armazem from "./armazem.js";


class Tabuleiro{// class do tabuleiro
    constructor(nSeeds, nCavs){
      this.cavidades = new Cavidades(nSeeds, nCavs);
      this.armazemTop = new Armazem(0);
      this.armazemBottom = new Armazem(0);
  
      this.tabuleiro = document.getElementById('tabuleiro');
    }

    draw_objects(){
        this.tabuleiro.prepend(this.armazemTop.ele);

        this.cavidades.cavTop.cavs.forEach(cav =>{
            this.tabuleiro.append(cav.ele);
        })

        this.cavidades.cavBot.cavs.forEach(cav =>{
            this.tabuleiro.append(cav.ele);
        })

        this.tabuleiro.append(this.armazemBottom.ele);
    }

    clean_board(){
        this.tabuleiro.innerHTML = '';
        this.cavidades.cavTop.ele.innerHTML = '';
        this.cavidades.cavBot.ele.innerHTML = '';
    }
}

export default Tabuleiro;