import Cavidades from "./cavidades.js";
import Armazem from "./armazem.js";


class Tabuleiro{// class do tabuleiro
    constructor(nSeeds, nCavs){
      this.cavidades = new Cavidades(nSeeds, nCavs);
      this.armazemLeft = new Armazem(0);
      this.armazemRight = new Armazem(0);
      this.gameOver = true;

      this.players = {p1:this.create_player(this.armazemLeft, this.cavidades.cavTop, 'p1'), p2: this.create_player(this.armazemRight, this.cavidades.cavBot, 'p2')}
      this.players.p1.reverse(); // inverte os elementos para o player de cima ser tratado da mesma forma que o de baixo
  
      this.tabuleiro = document.getElementById('tabuleiro');

      this.draw_objects();
      this.checkIfClicked();
    }

    draw_objects(){ // desenha o tabuleiro
        this.tabuleiro.prepend(this.armazemLeft.ele);

        this.cavidades.cavTop.forEach(cav =>{
            this.cavidades.cavTop.ele.append(cav.ele); // As cavidades são inseridas como elementos filhos do elemento cavTop
        })

        this.cavidades.cavBot.forEach(cav =>{
            this.cavidades.cavBot.ele.append(cav.ele); // As cavidades são inseridas como elementos filhos do elemento cavBot
        })

        this.tabuleiro.append(this.armazemRight.ele);
    }

    create_player(armazem, cavs, p){ // cria os jogadores
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

    clean_board(){ // limpa o tabuleiro
        this.armazemLeft.ele.remove(); 
        this.armazemRight.ele.remove(); 

        this.players = {};
        this.cavidades.cavTop.ele.innerHTML = '';
        this.cavidades.cavBot.ele.innerHTML = '';
    }

    checkIfClicked(){ // vê se cada cavidade foi clickada
        this.cavidades.cavTop.forEach(cav =>{
            cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p1, this.players.p2));
        })

        this.cavidades.cavBot.forEach(cav =>{        
            cav.ele.addEventListener('click', this.jogada.bind(this, cav, cav.id, this.players.p2, this.players.p1));
        })
    }

    jogada(cav, id, player, outro_Player){ // trata de cada jogada
        let seedsToTransfer = 0;

        if(cav.nSeeds == 0){
            this.jogada_Impossible();
        }
        cav.seeds.forEach(seed =>{
            seedsToTransfer ++;
            seed.remove();

            cav.nSeeds = 0;
            cav.setNewNumberSeeds();
        })

        this.transferSeeds(player, seedsToTransfer, id, outro_Player);
    }

    transferSeeds(player, seedsToTransfer, id, outro_Player){ // faz a transferência das Seeds recursivamente, caso chegue ao aramazem ainda com Seeds para distribuir

        for(let i = id + 1; i < player.length; i++){
            if(seedsToTransfer == 0) break;

            player.at(i).nSeeds ++;
            player.at(i).setNewNumberSeeds();

            seedsToTransfer --;
        }

        if(seedsToTransfer == 0) {
            this.check_If_Game_Is_Over();
            if(this.gameOver == true) this.GameOver();
            this.gameOver = true;
            return;
        }
        else{
            this.transferSeeds(outro_Player, seedsToTransfer, -1, player); // recursiva
        }
        
    }

    jogada_Impossible(){ //jogada impossivel
        const impossivel = document.createElement('span');
        impossivel.innerText = 'Jogada Impossível';
        impossivel.classList.add('impossible');
        this.tabuleiro.append(impossivel);

        impossivel.addEventListener('click', (evt) => {
            document.querySelector('.impossible').remove();
        })
    }

    check_If_Game_Is_Over(){ // vê se todas as cavidades estão vazias
        this.cavidades.cavTop.forEach(cav =>{
            if(cav.nSeeds !== 0) this.gameOver = false;
            console.log(cav.nSeeds);
        })

        this.cavidades.cavBot.forEach(cav =>{        
            if(cav.nSeeds !== 0) this.gameOver = false;
            console.log(cav.nSeeds);
        })

        console.log(this.gameOver);
    }

    GameOver(){ // termina o jogo
        const gameOver = document.createElement('span');
        gameOver.innerText = 'Game Over';
        gameOver.classList.add('gameOver');
        this.tabuleiro.append(gameOver);
    }
}

export default Tabuleiro;