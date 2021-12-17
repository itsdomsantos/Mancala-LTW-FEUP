import Cavidades from "./cavidades.js";
import Armazem from "./armazem.js";


class Tabuleiro{// class do tabuleiro
    constructor(nSeeds, nCavs){
      this.cavidades = new Cavidades(nSeeds, nCavs);
      this.armazemLeft = new Armazem(0);
      this.armazemRight = new Armazem(0);

      this.players = {p1:this.create_player(this.armazemLeft, this.cavidades.cavTop, 'p1'), p2: this.create_player(this.armazemRight, this.cavidades.cavBot, 'p2')}
      this.players.p1.reverse();
      console.log(this.players);
  
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
            cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p1, this.players.p2));
        })

        this.cavidades.cavBot.forEach(cav =>{        
            cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p2, this.players.p1));
        })
    }

    jogada(cav, id, player, outro_Player){
        let seedsToTransfer = 0;

        if(cav.nSeeds == 0){
            console.log("Jogada Impossível");
            return;
        }

        cav.seeds.forEach(seed =>{
            seedsToTransfer ++;
            seed.remove();

            cav.nSeeds = 0;
            cav.setNewNumberSeeds();
        })

        this.transferSeeds(player, seedsToTransfer, id, outro_Player);
    }

    transferSeeds(player, seedsToTransfer, id, outro_Player){

        for(let i = id + 1; i < player.length; i++){
            if(seedsToTransfer == 0) break;

            player.at(i).nSeeds ++;
            player.at(i).setNewNumberSeeds();

            seedsToTransfer --;
        }

        if(seedsToTransfer == 0) return;
        else{
            this.transferSeeds(outro_Player, seedsToTransfer, -1, player); // o outro player vai ter de ser argumento da função transferSeeds
        }
        
    }
}

export default Tabuleiro;