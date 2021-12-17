import Cavidades from "./cavidades.js";
import Armazem from "./armazem.js";


class Tabuleiro{// class do tabuleiro
    constructor(nSeeds, nCavs){
      this.cavidades = new Cavidades(nSeeds, nCavs);
      this.armazemLeft = new Armazem(0);
      this.armazemRight = new Armazem(0);
  
      this.tabuleiro = document.getElementById('tabuleiro');
    }

    draw_objects(){
        this.tabuleiro.prepend(this.armazemLeft.ele);

        this.cavidades.cavTop.forEach(cav =>{
            this.cavidades.cavTop.ele.append(cav.ele); //  As cavidades têm de ser inseridas como elementos filhos do elemento cavTop, não do tabuleiro
        })

        this.cavidades.cavBot.forEach(cav =>{
            this.cavidades.cavBot.ele.append(cav.ele); // As cavidades têm de ser inseridas como elementos filhos do elemento cavBop, não do tabuleiro
        })

        this.tabuleiro.append(this.armazemRight.ele);
    }

    clean_board(){
        this.armazemLeft.ele.remove(); 
        this.armazemRight.ele.remove(); 

        this.cavidades.cavTop.ele.innerHTML = '';
        this.cavidades.cavBot.ele.innerHTML = '';
    }

    checkIfClicked(){
        this.cavidades.cavTop.forEach(cav =>{
            cav.ele.addEventListener('click', this.jogada.bind(this, cav));
        })

        this.cavidades.cavBot.forEach(cav =>{
            cav.ele.addEventListener('click', this.jogada.bind(this, cav));
        })
    }

    jogada(cav){
        let i = 0;

        console.log("entrei");

        cav.seeds.forEach(seed =>{
            i++;
            seed.remove();
        });

        if(cav.ele.parentElement.id == 'top_cavidades'){ // cavidade de cima (do jogador 1)
            for(let k= 0; k < i; k++){

            }
        }
        else{ // cavidade de baixo (do jogador 2)

        }
    }

    /*jogada_P1(){
        console.log("clicked");

        this.cavidades.cavTop.cavs.forEach(cav =>{            
            cav.seeds.forEach(seed =>{
                seed.remove();
            })
        })
    }

    jogada_P2(){
        console.log("clicked");

        this.cavidades.cavBot.cavs.forEach(cav =>{
            cav.seeds.forEach(seed =>{
                seed.remove();
            })
        })
    }*/
}

export default Tabuleiro;