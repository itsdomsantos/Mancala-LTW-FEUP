import Cavidades from "./cavidades.js";
import Armazem from "./armazem.js";


class Tabuleiro{// class do tabuleiro
    constructor(nSeeds, nCavs){
      this.cavidades = new Cavidades(nSeeds, nCavs);
      this.armazemLeft = new Armazem(0);
      this.armazemRight = new Armazem(0);

      this.players = {p1:this.create_player(this.armazemLeft, this.cavidades.cavTop, 'p1'), p2: this.create_player(this.armazemRight, this.cavidades.cavBot, 'p2')}
  
      this.tabuleiro = document.getElementById('tabuleiro');

      this.draw_objects();
      this.checkIfClicked();
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

    create_player(armazem, cavs, p){
        const player = [];
        if(p == 'p1'){
            player.push(armazem);
            cavs.reverse();
        } 

        cavs.forEach(cav =>{
            player.push(cav);
        })
        
        if(p == 'p2') player.push(armazem);
        return player;
    }

    clean_board(){
        this.armazemLeft.ele.remove(); 
        this.armazemRight.ele.remove(); 

        this.players = {};
        this.cavidades.cavTop.ele.innerHTML = '';
        this.cavidades.cavBot.ele.innerHTML = '';
    }

    checkIfClicked(){
        this.cavidades.cavTop.forEach(cav =>{
            cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p1));
        })

        this.cavidades.cavBot.forEach(cav =>{
            cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p2));
        })
    }

    jogada(cav, id, player){
        let seedsToTransfer = 0;

        cav.seeds.forEach(seed =>{
            seedsToTransfer ++;
            seed.remove();
        })

        this.transferSeeds(player, seedsToTransfer, id);
    }

    transferSeeds(player, seedsToTransfer){
        console.log(player, seedsToTransfer);
    }
}

export default Tabuleiro;